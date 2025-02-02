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
    const path = "../relationship_page/relationship_page.html";
    const container = document.createElement("div");
    container.classList.add("page-module");

    const relationshipName = relationship.modules?.name?.value[0] || "no name";
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
        const newRelationship = await createnewRelationship();
        const relationshipName = newRelationship.modules?.name?.value[1] || "no name";
        console.log("some id: ", newRelationship._id);
        const path = "../relationship_page/relationship_page.html?id= "+ encodeURIComponent(newRelationship._id)
    });

    return container;
};

async function createnewRelationship() {
    const randomId = "relationship_" + Math.random().toString(36).substring(2, 9);

    const newRelationship = {
        type: 'folder',
        fileType: 'relationship',
        modules: {
          name:            { value: ['New Relationship'],  position: { x:  31, y:  62 }, size: { width: "200px", height: "40px" } },
          entities:        { value: ['Entities Involved'], position: { x: 465, y: 432 }, size: { width: "465px", height: "220px" } },
          history:         { value: ['History'],           position: { x: 465, y:  62 }, size: { width: "465px", height: "260px" } },
          dynamics:        { value: ['Dynamics'],          position: { x:  31, y: 167 }, size: { width: "325px", height: "125px" } },
          conflict:        { value: ['Conflict'],          position: { x:  31, y: 550 }, size: { width: "325px", height: "125px" } },
          potential:       { value: ['Potential'],         position: { x:  31, y: 350 }, size: { width: "325px", height: "145px" } },
        },
        changes: ['Beginning'],
        changeIndex: 0
      }
      

    const result = await window.top.db.post(newRelationship);
    console.log("new info:", result);
    newRelationship._rev = result.rev;
    newRelationship._id = result.id;


    const pageList = document.getElementById("page-list");
    const newModule = createRelationshipPageModule(newRelationship);
    pageList.insertBefore(newModule, pageList.lastChild);

    return newRelationship;
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

