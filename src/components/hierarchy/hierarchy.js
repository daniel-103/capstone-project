import growHierarchy from "./growHierarchy.js";
import addFolderClickEvent from "./addFolderClickEvent.js"
import addNewFileOptions from "./addNewFileOptions.js";

const projectId = localStorage.getItem('projectId');
if (window.top.DEBUG) console.log("in hierarchy.js current projectId: ", localStorage.getItem('projectId'));
const folderNames = document.querySelectorAll('.folder-name');

document.addEventListener('DOMContentLoaded', window.top.injectTheme(document))

folderNames.forEach(folderName => {addFolderClickEvent(folderName)});

// New file
document.getElementById('new-file-btn').addEventListener('click',(event) => {
    slideOut.classList.toggle('open');
});

const slideOut = document.getElementById('new-file-slide-out');
window.top.db.get(projectId).then((project) => {
    addNewFileOptions(JSON.parse(project.fileOptions));
});

window.top.addEventListener('updateFileOptions', (event) => {
    addNewFileOptions(JSON.parse(event.detail.data));
});

document.addEventListener('mouseleave', (event) => {
    slideOut.classList.remove('open');
});

slideOut.addEventListener('mouseleave', (event) => {
    slideOut.classList.remove('open');
});

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

        if (window.top.DEBUG) console.log(`🛠 [3] Creating new folder "${name}"...`);
        window.top.db.post({
            name: name,
            type: "folder",
            parentId: selectedFolder.id,
            childrenIds: [],
            date: {
                created: new Date(),
                last: new Date(),
            },
        })
            .then((result) => {
                if (window.top.DEBUG) console.log(`✅ [3] Created "${name}".`, result);
                if (window.top.DEBUG) console.log(`🛠 [3.1] Fetching ${name}'s parent...`);
                window.top.db.get(selectedFolder.id)
                    .then(parentFolder => {
                        if (window.top.DEBUG) console.log(`✅ [3.1] Fetched ${name}'s parent:`, parentFolder);
                        if (window.top.DEBUG) console.log(`🛠 [3.2] Appending ${name}'s id to its parent's childrenIds...`);
                        parentFolder.childrenIds.push(result.id);
                        window.top.db.put(parentFolder)
                            .then((putResult) => {
                                if (window.top.DEBUG) console.log(`✅ [3.2] Linked ${name} to its parent:`, putResult);
                                selectedFolder.querySelector('.folder-items').innerHTML = '';   // Need a better way to order items than deleating everything and regenerating them
                                growHierarchy(parentFolder);
                                document.getElementById(putResult.id).classList.add('open');
                                slideOut.classList.remove('open');
                            })
                            .catch(error => {
                                if (window.top.DEBUG) console.log(`❌ [3.2] Couldn't link ${name} to its parent:`, error);
                                window.top.notify('error', `Couldn't link ${name} to its parent`);
                            });
                    })
                    .catch(error => {
                        if (window.top.DEBUG) console.log(`❌ [3.1] Couldn't fetch ${name}'s parent:`, error);
                        window.top.notify('error', `Couldn't fetch ${name}'s parent`);
                    });
            })
    });

    span.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            span.blur();
        }
    });
});



// View Root as Root
const toTopBtn = document.getElementById('to-root-btn')
toTopBtn.addEventListener('click', (event) => {
    seedHierarchy(projectId)
})



// View Current as Root
const toCurrentBtn = document.getElementById('to-current-btn')
toCurrentBtn.addEventListener('click', (event) => {
    const selectedFolder = document.getElementsByClassName('folder selected')[0];
    seedHierarchy(selectedFolder.id)
})


// Toggle View Buttons
const hierarchyContainer = document.getElementById('hierarchy-container')
const fileHierarchyContainer = document.getElementById('file-hierarchy-container')
const sectionHierarchyContainer = document.getElementById('section-hierarchy-container')
const toggleSectionViewBtn = document.getElementById('toggle-section-btn')
const toggleFileViewBtn = document.getElementById('toggle-file-btn')

// Toggle Section View
toggleSectionViewBtn.addEventListener('click', (event) => {

    // move containers
    fileHierarchyContainer.style.transform = 'translateX(-100%)'
    sectionHierarchyContainer.style.transform = 'translateX(0%)'

    // move this section's button
    toggleSectionViewBtn.style.transition = 'transform 0.2s ease'
    toggleSectionViewBtn.style.transform = `translateX(${fileHierarchyContainer.offsetWidth}px)`

    // move other section's button to initial position
    toggleFileViewBtn.style.transition = ''
    toggleFileViewBtn.style.transform = `translateX(-${fileHierarchyContainer.offsetWidth}px)`
    // force update then apply move transition
    requestAnimationFrame(() => {
        toggleFileViewBtn.style.transition = 'transform 0.2s ease'
        toggleFileViewBtn.style.transform = `translateX(0px)`
    })
})

// Toggle File View
toggleFileViewBtn.addEventListener('click', (event) => {
    
    // move containers
    fileHierarchyContainer.style.transform = ''
    sectionHierarchyContainer.style.transform = ''

    // move this section's button
    toggleFileViewBtn.style.transition = 'transform 0.2s ease'
    toggleFileViewBtn.style.transform = `translateX(-${fileHierarchyContainer.offsetWidth}px)`

    // move other section's button to initial position
    toggleSectionViewBtn.style.transition = ''
    toggleSectionViewBtn.style.transform = `translateX(${fileHierarchyContainer.offsetWidth}px)`
    // force update then apply move transition
    requestAnimationFrame(() => {
        toggleSectionViewBtn.style.transition = 'transform 0.2s ease'
        toggleSectionViewBtn.style.transform = `translateX(0px)`
    })
})




const hierarchy = document.getElementById('file-hierarchy');

// Initialize the hierarchy by creating the root folder, then growing
async function seedHierarchy(rootId) {
    hierarchy.innerHTML = '';
    if (window.top.DEBUG) console.log(`🛠 [2] Starting Hierarchy Construction. Fetching project root with id "${rootId}"...`);
    window.top.db.get(rootId)
        .then(object => {
            if (window.top.DEBUG) console.log(`✅ [2] Fetched project "${object.name}"`, object);
            const folder = document.createElement('div');
            folder.classList.add("folder", "root", "selected");
            folder.id = object._id;
            folder.innerHTML = `
                <div class="folder-name">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                    <span>${object.name}</span>
                </div>
                <ul class="folder-items"></ul>
            `;
            addFolderClickEvent(folder)
            hierarchy.appendChild(folder);

            if (window.top.DEBUG) console.log(`🛠 [2.1] Constructing hierarchy for ${object.name}'s children...`);
            growHierarchy(object)
        })
        .catch(error => {
            if (window.top.DEBUG) console.log("❌ [2] Couldn't fetch project:", error);
            window.top.notify('error', `Couldn't fetch project`);
            
        })
}

const sec_hierarchy = document.getElementById('section-hierarchy');

async function seedSecHierarchy(rootId) {
    let projectData = await window.top.db.get(rootId);
    let entityId = projectData.childrenIds[0];   

    sec_hierarchy.innerHTML = '';
    if (window.top.DEBUG) console.log(`🛠 [2] Starting Hierarchy Construction. Fetching project root with id "${rootId}"...`);
    window.top.db.get(entityId)
    .then(object => {
        if (window.top.DEBUG) console.log(`✅ [2] Fetched entity "${object.name}"`, object);
        const folder = document.createElement('div');
        folder.classList.add("folder", "root", "selected");
        folder.id = object._id;
        folder.innerHTML = `
            <div class="folder-name">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                <span>${'Section List'}</span>
            </div>
            <ul class="folder-items"></ul>
        `;
        addFolderClickEvent(folder)
        sec_hierarchy.appendChild(folder);

        //if (window.top.DEBUG) console.log(`🛠 [2.1] Constructing hierarchy for ${object.name}'s children...`);
        //growHierarchy(object)
    })
    .catch(error => {
        if (window.top.DEBUG) console.log("❌ [2] Couldn't fetch project:", error);
        window.top.notify('error', `Couldn't fetch project`);
        
    })
}

const templateFoldersAndFiles = {
	1: { folder: 'Short Story Project', files: ['story.txt', 'outline.txt', 'characters.txt'] },
	2: { 
		folder: 'Novel Project', 
		files: ['outline.txt', 'characters.txt', 'worldbuilding.txt', 'notes.txt'],
		subfolders: {
		  'Chapters': ['chapter_1.txt', 'chapter_2.txt', 'chapter_3.txt']
		}
	  },
	3: { folder: 'Poetry Collection', files: ['poem_1.txt', 'poem_2.txt', 'notes.txt'] },
	4: { folder: 'Script Project', files: ['script.txt', 'characters.txt', 'scene_list.txt', 'notes.txt'] },
	5: { folder: 'Flash Fiction Project', files: ['story.txt', 'notes.txt'] },
	6: { folder: 'Memoir Project', files: ['chapters.txt', 'timeline.txt', 'notes.txt'] },
	7: { folder: 'Fairy Tale Project', files: ['story.txt', 'characters.txt', 'moral.txt'] },
	8: { folder: 'Myth Project', files: ['myth.txt', 'dieties.txt', 'origins.txt'] },
	9: { folder: 'Fable Project', files: ['fable.txt', 'characters.txt', 'moral.txt'] },
	10: { folder: 'Autobiography Project', files: ['life_story.txt', 'timeline.txt', 'photos.txt', 'reflections.txt'] }
};

async function populateFileHierarchy (templateId) {
    const hierarchyContainer = document.getElementById('file-hierarchy');
    hierarchyContainer.innerHTML = ''; // Clear existing hierarchy

    const templateData = templateFoldersAndFiles[templateId];
    if (!templateData) return;

    const createFolderElement = (folderName, files) => {
        const folderElement = document.createElement('div');
        folderElement.classList.add("folder", "root", "selected");
        folderElement.textContent = folderName;

        folderElement.innerHTML = `
            <div class="folder-name">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                <span>${folderName}</span>
            </div>
        `;
        const fileList = document.createElement('ul');
        fileList.classList.add('folder-items');
        files.forEach(file => {
            const fileElement = document.createElement('li');
            fileElement.classList.add("file");
            fileElement.innerHTML = `<div class="file-name">${file}</div>`;
            fileElement.addEventListener('click', () => {
                if (window.top.DEBUG) console.log(`File clicked: ${file}`);
                window.parent.postMessage({ type: 'fileClicked', fileName: file }, '*');
            });
            fileList.appendChild(fileElement);
        });

        folderElement.appendChild(fileList);

        // Add click event to toggle visibility of files
        folderElement.querySelector('.folder-name').addEventListener('click', () => {
            folderElement.classList.toggle('open');
        });

        return folderElement;
    };

    const mainFolder = createFolderElement(templateData.folder, templateData.files);
    hierarchyContainer.appendChild(mainFolder);

    if (templateData.subfolders) {
        Object.keys(templateData.subfolders).forEach(subfolderName => {
            const subfolderFiles = templateData.subfolders[subfolderName];
            const subfolderElement = createFolderElement(subfolderName, subfolderFiles);
            hierarchyContainer.appendChild(subfolderElement);
        });
    }
}


// Support running growHierarchy from other places in the project
window.top.addEventListener("growHierarchyEvent", (event) => {
    growHierarchy(JSON.parse(event.detail.parentFolder));
})

// Support running seedHierarchy from other places in the project
window.top.addEventListener("seedHierarchyEvent", (event) => {
    seedHierarchy();
})

window.top.addEventListener("getSelectedFolder", async (event) => {
    const parentId = document.getElementsByClassName('folder selected')[0].id;
    if (window.top.DEBUG) console.log(event);
        
    await addEntity("../text_editor/text_editor.html", event.detail, parentId).catch(error => {
        if (window.top.DEBUG) console.log(`❌ [3] Couldn't create file:`, error);
        window.top.notify('error', `Couldn't create file`);
    });
})


seedHierarchy(projectId);
seedSecHierarchy();