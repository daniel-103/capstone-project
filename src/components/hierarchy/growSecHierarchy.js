import addFolderClickEvent from "./addFolderClickEvent.js"

function growSecHierarchy (sectionArray,pid) {
    recGetSections(sectionArray,pid);
}

function recGetSections (sectionArray,pid) {
    
    for (const section of sectionArray) {
        if (!section.parentId) {
            createSectionDropdown(section,pid);
            createSectionLabel(section,section.id);
        } else if (section.parentId && section.children.length != 0) {
            createSectionDropdown(section,section.parentId);
            createSectionDropdown(section,section.id);
        } else {
            createSectionLabel(section,section.parentId);
        }

        if (section.children.length != 0) {
            recGetSections(section.children);
        }
    }
}

function createSectionDropdown (section,pid) {
    const folder = document.createElement("li");
        folder.classList.add("folder");
        folder.id = section.id;
        //folder.dataset.parentId = section.parentId;
        folder.dataset.parentId = pid;
        folder.innerHTML = `
            <div class="folder-name">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/>
                </svg>
                <span>${section.labelText}</span>
            </div>
            <ul class="folder-items"></ul>
        `;
        addFolderClickEvent(folder);
        if (!section.parentId) {
            document.getElementById('section-hierarchy').querySelector('.folder-items').appendChild(folder);
        } else {
            document.getElementById(pid).querySelector('.folder-items').appendChild(folder);
        }   
}

function createSectionLabel (section,pid) {
    const file = document.createElement("li");
        file.classList.add("file");
        file.id = section.id;
        file.parentId = pid;
        file.dataset.parentId = pid;
        file.innerHTML = `${section.labelText}`;
        //file.draggable = true;
        file.style.userSelect = 'none';

        document.getElementById(pid).querySelector('.folder-items').appendChild(file);
}

export default growSecHierarchy;