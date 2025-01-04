
const folderNames = document.querySelectorAll('.folder-name');

folderNames.forEach(folderName => {addFolderClickEvent(folderName)});

document.getElementById('new-folder-btn').addEventListener('click', function() {
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
    addFolderClickEvent(folderNameDiv);

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
    });

    span.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            span.blur();
        }
    });
});

function addFolderClickEvent(folderName) {
    folderName.addEventListener('click', () => {
        const folderItem = folderName.parentElement;
        folderItem.classList.toggle('open');

        document.querySelectorAll('.selected').forEach(selected => {
            selected.classList.remove('selected');
        });
        folderItem.classList.add('selected');
    });
}
