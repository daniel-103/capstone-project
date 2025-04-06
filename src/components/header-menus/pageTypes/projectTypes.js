async function initPageTypes() {
    // Retrieve all project types
    let allTypesDoc = await window.top.db.get('entityTypes');
    let allTypes = JSON.parse(allTypesDoc.entityTypes);

    // Retrieve current project types
    const projectId = localStorage.getItem('projectId');
    const project = await window.top.db.get(projectId);
    let projectTypes = JSON.parse(project.fileOptions);

    window.allTypes = [...allTypes];
    window.projectTypes = [...projectTypes];

    renderLists();
    setupActionButtons();
}

function renderLists() {
    const allTypesList = document.getElementById('all-types-list');
    const projectTypesList = document.getElementById('project-types-list');
    
    allTypesList.innerHTML = '';
    projectTypesList.innerHTML = '';

    window.allTypes.forEach(type => {
        allTypesList.appendChild(createTypeItem(type, true));
    });

    window.projectTypes.forEach(type => {
        projectTypesList.appendChild(createTypeItem(type, false));
    });
}

function createTypeItem(type, isAllTypes) {
    const item = document.createElement('div');
    item.className = 'type-item';
    
    const content = document.createElement('div');
    content.textContent = type.name;
    
    const actions = document.createElement('div');
    actions.className = 'type-actions';

    // Add button is only for adding from allTypes to projectTypes
    if (isAllTypes) {
        const addBtn = document.createElement('button');
        addBtn.className = 'add-btn';
        addBtn.textContent = 'Add';
        addBtn.onclick = () => {
            window.projectTypes = addType(window.projectTypes, type);
            renderLists();
        };
        actions.appendChild(addBtn);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
        if (isAllTypes) {
            window.allTypes = deleteType(window.allTypes, type);
            window.projectTypes = deleteType(window.projectTypes, type);
        } else {
            window.projectTypes = deleteType(window.projectTypes, type);
        }
        renderLists();
    };
    actions.appendChild(deleteBtn);

    item.appendChild(content);
    item.appendChild(actions);
    return item;
}

function setupActionButtons() {
    document.getElementById('save-btn').onclick = async () => {
        // Save all types
        const allTypesDoc = await window.top.db.get('entityTypes');
        await window.top.db.put({
            _id: 'entityTypes',
            _rev: allTypesDoc._rev,
            entityTypes: JSON.stringify(window.allTypes)
        });

        // Save project types
        const projectDoc = await window.top.db.get(localStorage.getItem('projectId'));
        projectDoc.fileOptions = JSON.stringify(window.projectTypes);
        await window.top.db.put(projectDoc);


        // Update tpyes UI
        const event = new CustomEvent('updateFileOptions', {
            detail: {
                data: JSON.stringify(window.projectTypes)
            }
        });
        window.top.dispatchEvent(event);

        // Close overlay
        window.top.document.getElementById('overlay').classList.remove("open");
    };

    document.getElementById('cancel-btn').onclick = () => {
        // Close overlay 
        window.top.document.getElementById('overlay').classList.remove("open");
    };
}

function deleteType(types, type) {
    return types.filter(currType => JSON.stringify(currType) !== JSON.stringify(type));
}

function addType(types, newType) {
    // keep page types all unique
    const currTypes = types.map(type => JSON.stringify(type));
    const newTypeString = JSON.stringify(newType);

    if (!currTypes.includes(newTypeString)) {
        return [...types, newType];
    }

    return types;
}

window.addEventListener("DOMContentLoaded", initPageTypes);