import relationshipData from "../entity_types/relationship.js"

async function initrelationshipsPage() {    
    
    const relationships = await getRelationships();

    const pageList = document.getElementById("page-list");
    pageList.innerHTML = "";

    relationships.forEach((relationship) => {
        const module = createRelationshipPageModule(relationship);
        pageList.appendChild(module);
    });

    pageList.append(createAddRelationshipModule());
}

async function getRelationships() {
    const query = { selector: { fileType: 'relationship' } };

    const relationships = await window.top.db.find(query);

    return relationships;
}

function createRelationshipPageModule(relationship) {
    const path = "../base_page/base_page.html";
    const container = document.createElement("div");
    container.classList.add("page-module");

    const relationshipName = relationship.modules[0]?.value[[relationship.changeIndex || 0]] || "no name";
    const pageName = document.createElement("span");
    pageName.textContent = relationshipName;
    container.appendChild(pageName);

    container.addEventListener("click", () => {
        replaceCurrentTab(relationshipName, path + "?id=" + encodeURIComponent(relationship._id));
    });

    // add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", async (e) => {
        e.stopPropagation();
        try {
            await window.top.db.remove(relationship._id, relationship._rev);
            container.remove();
        } catch (err) {
            console.error("Failed to delete relationship:", err);
        }
    });

    container.appendChild(deleteButton);
    return container;
}

function createAddRelationshipModule() {
    
    const container = document.createElement("div");
    container.classList.add("page-module");

    const pageName = document.createElement("span");
    pageName.textContent = "Add New relationship";
    container.appendChild(pageName);

    container.addEventListener("click", async () => {
        const newRelationship = await initNewRelationship(relationshipData);
        console.log("some id: ", newRelationship._id);
    });

    return container;
};

async function initNewRelationship(entityData) {
    const newrelationship = await createNewRelationship(entityData);

    const pageList = document.getElementById("page-list");
    const newModule = createRelationshipPageModule(newrelationship);
    pageList.insertBefore(newModule, pageList.lastChild);

    return newrelationship;
}

async function createNewRelationship(newrelationship) {

    const result = await window.top.db.post(newrelationship);
    newrelationship._rev = result.rev;
    newrelationship._id = result.id;

    return newrelationship;
}

function replaceCurrentTab(title, path) {
    console.log("path: ", path);
    const currTabIndex = window.parent.currTabIndex;
    const currTab = window.parent.tabs[currTabIndex];

    currTab.title = title;
    currTab.path = path;

    if (currTab.buttonElem) {
        currTab.buttonElem.textContent = title;
    }

    if (currTab.iframeElem) {
        currTab.iframeElem.src = path;
    }
}

window.addEventListener('DOMContentLoaded', initrelationshipsPage);

