const DUBUG = localStorage.getItem('DEBUG') == 'true';

const projectId = localStorage.getItem('projectId');

// Bc this runs after initial theme injection
window.top.injectTheme(document)

document.addEventListener('mouseleave', (event) => {
    slideOut.classList.remove('open');
})

slideOut.addEventListener('mouseleave', (event) => {
    slideOut.classList.remove('open');
})

// Folder selection (last clicked)
function addFolderClickEvent(folder) {
    folder.querySelector('.folder-name').addEventListener('click', () => {
        folder.classList.toggle('open');
        document.querySelectorAll('.selected').forEach(selected => {
            selected.classList.remove('selected');
        });
        folder.classList.add('selected');
    });
}

////////////////////////////////////////////////////////////////

// PROJECT TEMPLATES SHOULD BE CHANGED TO USE THE DB

// They will not work with the future implementation of how pages and modules are handled

////////////////////////////////////////////////////////////////

// const templateFoldersAndFiles = {
// 	1: { folder: 'Short Story Project', files: ['story.txt', 'outline.txt', 'characters.txt'] },
// 	2: { 
// 		folder: 'Novel Project', 
// 		files: ['outline.txt', 'characters.txt', 'worldbuilding.txt', 'notes.txt'],
// 		subfolders: {
// 		  'Chapters': ['chapter_1.txt', 'chapter_2.txt', 'chapter_3.txt']
// 		}
// 	  },
// 	3: { folder: 'Poetry Collection', files: ['poem_1.txt', 'poem_2.txt', 'notes.txt'] },
// 	4: { folder: 'Script Project', files: ['script.txt', 'characters.txt', 'scene_list.txt', 'notes.txt'] },
// 	5: { folder: 'Flash Fiction Project', files: ['story.txt', 'notes.txt'] },
// 	6: { folder: 'Memoir Project', files: ['chapters.txt', 'timeline.txt', 'notes.txt'] },
// 	7: { folder: 'Fairy Tale Project', files: ['story.txt', 'characters.txt', 'moral.txt'] },
// 	8: { folder: 'Myth Project', files: ['myth.txt', 'dieties.txt', 'origins.txt'] },
// 	9: { folder: 'Fable Project', files: ['fable.txt', 'characters.txt', 'moral.txt'] },
// 	10: { folder: 'Autobiography Project', files: ['life_story.txt', 'timeline.txt', 'photos.txt', 'reflections.txt'] }
// };

// async function populateFileHierarchy (templateId) {
//     const hierarchyContainer = document.getElementById('hierarchy');
//     hierarchyContainer.innerHTML = ''; // Clear existing hierarchy

//     const templateData = templateFoldersAndFiles[templateId];
//     if (!templateData) return;

//     const createFolderElement = (folderName, files) => {
//         const folderElement = document.createElement('div');
//         folderElement.classList.add("folder", "root", "selected");
//         folderElement.textContent = folderName;

//         folderElement.innerHTML = `
//             <div class="folder-name">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
//                 <span>${folderName}</span>
//             </div>
//         `;
//         const fileList = document.createElement('ul');
//         fileList.classList.add('folder-items');
//         files.forEach(file => {
//             const fileElement = document.createElement('li');
//             fileElement.classList.add("file");
//             fileElement.innerHTML = `<div class="file-name">${file}</div>`;
//             fileElement.addEventListener('click', () => {
//                 constructPage(file)
//                 // window.parent.postMessage({ type: 'fileClicked', fileName: file }, '*');
//             });
//             fileList.appendChild(fileElement);
//         });

//         folderElement.appendChild(fileList);

//         // Add click event to toggle visibility of files
//         folderElement.querySelector('.folder-name').addEventListener('click', () => {
//             folderElement.classList.toggle('open');
//         });

//         return folderElement;
//     };

//     const mainFolder = createFolderElement(templateData.folder, templateData.files);
//     hierarchyContainer.appendChild(mainFolder);

//     if (templateData.subfolders) {
//         Object.keys(templateData.subfolders).forEach(subfolderName => {
//             const subfolderFiles = templateData.subfolders[subfolderName];
//             const subfolderElement = createFolderElement(subfolderName, subfolderFiles);
//             hierarchyContainer.appendChild(subfolderElement);
//         });
//     }
// }

// window.addEventListener('message', (event) => {
//     // Check if the event data contains the templateId
//     if (event.data && event.data.templateId) {
//         const templateId = event.data.templateId;
//         console.log('Received Template ID in hierarchy.js h:', templateId);

//         // Use the templateId to populate the file hierarchy
//         populateFileHierarchy(templateId);
//     } else {
//         seedHierarchy();
//     }
// });
