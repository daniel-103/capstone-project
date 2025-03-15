import growHierarchy from "./growHierarchy.js";
import addFolderClickEvent from "./addFolderClickEvent.js"

const projectId = localStorage.getItem('projectId');
const folderNames = document.querySelectorAll('.folder-name');

document.addEventListener('DOMContentLoaded', window.top.injectTheme(document))

// const defaultPagePath = "../default_page/default_page.html";
const tabHeader = window.parent.document.getElementById("tab-header");
const pageWindow = window.parent.document.getElementById("page-window");

folderNames.forEach(folderName => {addFolderClickEvent(folderName)});



// New file
document.getElementById('new-file-btn').addEventListener('click',(event) => {
    slideOut.classList.toggle('open');
});

const slideOut = document.getElementById('new-file-slide-out');
for (const button of slideOut.querySelectorAll('button')) {
    // grab button attribute and create an eventListener to create the page with the module dictated by the attached attribute
    // just going to create an empty page for now...
    button.addEventListener('click', () => {
        tabs = window.parent.tabs;
        
        window.parent.addNewTab(`Tab ${tabs.length + 1}`, defaultPagePath, tabHeader, pageWindow);
    
        // projectId should be in localStorage
        // grab selected folder (_id will be in attribute)
        const parentId = document.getElementsByClassName('folder selected')[0].id

        const name = 'New File'         // get similarly to how folders are made
                                            // I think this will involve creating the element first then doing db stuff.
                                            // Will have to swap stuff around
        const fileType = 'character'    // determine later

        // push new page to db
        console.log(`🛠 [3] Creating new ${fileType} page "${name}"...`);
        window.top.db.post({
            projectId: projectId,
            name: name,
            type: "file",
            fileType: fileType,
            parentId: parentId,
            date: {
                created: new Date(),
                last: new Date(),
            },
            modules: {}               // determine later
        })
        .then((result) => {
            console.log(`✅ [3] Created "${name}".`, result);
            console.log(`🛠 [3.1] Fetching ${name}'s parent...`);
            window.top.db.get(parentId)
                .then(parentFolder => {
                    console.log(`✅ [3.1] Fetched ${name}'s parent:`, parentFolder);
                    console.log(`🛠 [3.2] Appending ${name}'s id to its parent's childrenIds...`);
                    parentFolder.childrenIds.push(result.id);
                    window.top.db.put(parentFolder)
                        .then((putResult) => {
                            console.log(`✅ [3.2] Linked ${name} to its parent:`, putResult);
                            growHierarchy([result.id]);
                            document.getElementById(putResult.id).classList.add('open');
                            slideOut.classList.remove('open');
                        })
                        .catch(error => {
                            console.log(`❌ [3.2] Couldn't link ${name} to its parent:`, error);
                        });
                })
                .catch(error => {
                    console.log(`❌ [3.1] Couldn't fetch ${name}'s parent:`, error);
                });
        })
        .catch(error => {
            console.log(`❌ [3] Couldn't create file:`, error);
        });
    });   
}

document.addEventListener('mouseleave', (event) => {
    slideOut.classList.remove('open');
})

slideOut.addEventListener('mouseleave', (event) => {
    slideOut.classList.remove('open');
})



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

        console.log(`🛠 [3] Creating new folder "${name}"...`);
        window.top.db.post({
            projectId: projectId,
            name: name,
            type: "folder",
            parentId: selectedFolder.id,
            childrenIds: [],
            date: {
                created: new Date(),
                last: new Date(),
            },
            modules: {}               // determine later
        })
            .then((result) => {
                console.log(`✅ [3] Created "${name}".`, result);
                console.log(`🛠 [3.1] Fetching ${name}'s parent...`);
                window.top.db.get(selectedFolder.id)
                    .then(parentFolder => {
                        console.log(`✅ [3.1] Fetched ${name}'s parent:`, parentFolder);
                        console.log(`🛠 [3.2] Appending ${name}'s id to its parent's childrenIds...`);
                        parentFolder.childrenIds.push(result.id);
                        window.top.db.put(parentFolder)
                            .then((putResult) => {
                                console.log(`✅ [3.2] Linked ${name} to its parent:`, putResult);
                                selectedFolder.querySelector('.folder-items').innerHTML = '';   // Need a better way to order items than deleating everything and regenerating them
                                growHierarchy(parentFolder);
                                document.getElementById(putResult.id).classList.add('open');
                                slideOut.classList.remove('open');
                            })
                            .catch(error => {
                                console.log(`❌ [3.2] Couldn't link ${name} to its parent:`, error);
                            });
                    })
                    .catch(error => {
                        console.log(`❌ [3.1] Couldn't fetch ${name}'s parent:`, error);
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

})



// View Current as Root
const toCurrentBtn = document.getElementById('to-current-btn')
toCurrentBtn.addEventListener('click', (event) => {

})





const hierarchy = document.getElementById('hierarchy');

// Initialize the hierarchy by creating the root folder, then growing
async function seedHierarchy() {
    hierarchy.innerHTML = '';
    console.log(`🛠 [2] Starting Hierarchy Construction. Fetching project root with id "${projectId}"...`);
    window.top.db.get(projectId)
        .then(object => {
            console.log(`✅ [2] Fetched project "${object.name}"`, object);
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

            console.log(`🛠 [2.1] Constructing hierarchy for ${object.name}'s children...`);
            growHierarchy(object)
        })
        .catch(error => {
            console.log("❌ [2] Couldn't fetch project:", error);
        })
}

/*
seedHierarchy(projectId)
*/
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
    const hierarchyContainer = document.getElementById('hierarchy');
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
                console.log(`File clicked: ${file}`);
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

window.addEventListener('message', (event) => {
    // Check if the event data contains the templateId
    if (event.data && event.data.templateId) {
        const templateId = event.data.templateId;
        console.log('Received Template ID in hierarchy.js h:', templateId);

        // Use the templateId to populate the file hierarchy
        populateFileHierarchy(templateId);
    } else {
        seedHierarchy();
    }
});

// Support running growHierarchy from other places in the project
window.top.addEventListener("growHierarchyEvent", (event) => {
    growHierarchy(JSON.parse(event.detail.parentFolder));
})

// Support running seedHierarchy from other places in the project
window.top.addEventListener("seedHierarchyEvent", (event) => {
    seedHierarchy();
})