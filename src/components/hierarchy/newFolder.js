// New folder
document.getElementById('new-folder-btn').addEventListener('click', (event) => {
    const selectedFolder = document.getElementsByClassName('folder selected')[0];
    selectedFolder.classList.add('open');

    const folder = document.createElement('li');
    folder.classList.add('folder');

    const folderNameDiv = document.createElement('div');
    folderNameDiv.classList.add('folder-name', 'editing');
    folderNameDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>`;
    
    const span = document.createElement('span');
    span.contentEditable = true;
    span.classList.add('editable-folder-name');
    folderNameDiv.appendChild(span);
    folder.appendChild(folderNameDiv);

    const folderItems = document.createElement('ul');
    folderItems.classList.add('folder-items');
    folder.appendChild(folderItems);

    document.querySelector('.selected').querySelector('.folder-items').appendChild(folder);
    addFolderClickEvent(folder);

    // Automatically focus and select the input
    span.focus();
    document.execCommand('selectAll', false, null);

    // Handle the blur event to save the name and replace the input with a span
    span.addEventListener('blur', () => {
        folderNameDiv.classList.remove('editing');
        span.contentEditable = false;
        if (!span.textContent.trim()) {
            span.textContent = 'New Folder';
        }

        const name = span.textContent

        if (DUBUG) console.log(`🛠 [3] Creating new folder "${name}"...`);
        window.top.db.post({
            projectId: projectId,
            name: name,
            type: "folder",
            parentId: selectedFolder.id,
            childrenIds: [],
            date: {
                created: new Date(),
                last: new Date(),
            }
        })
            .then((result) => {
                if (DUBUG) console.log(`✅ [3] Created "${name}".`, result);
                if (DUBUG) console.log(`🛠 [3.1] Fetching ${name}'s parent...`);
                window.top.db.get(selectedFolder.id)
                    .then(parentFolder => {
                        if (DUBUG) console.log(`✅ [3.1] Fetched ${name}'s parent:`, parentFolder);
                        if (DUBUG) console.log(`🛠 [3.2] Appending ${name}'s id to its parent's childrenIds...`);
                        parentFolder.childrenIds.push(result.id);
                        window.top.db.put(parentFolder)
                            .then((putResult) => {
                                if (DUBUG) console.log(`✅ [3.2] Linked ${name} to its parent:`, putResult);
                                selectedFolder.querySelector('.folder-items').innerHTML = '';   // Need a better way to order items than deleating everything and regenerating them
                                growHierarchy(parentFolder.childrenIds);
                                document.getElementById(putResult.id).classList.add('open', 'selected');
                            })
                            .catch(error => {
                                if (DUBUG) console.log(`❌ [3.2] Couldn't link ${name} to its parent:`, error);
                            });
                    })
                    .catch(error => {
                        if (DUBUG) console.log(`❌ [3.1] Couldn't fetch ${name}'s parent:`, error);
                    });
            })
    });

    span.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            span.blur();
        }
    });
});