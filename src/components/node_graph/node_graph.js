import nodeGraphData from "../entity_types/node_relation.js"
import attachToParent from "../entity_types/attachToParent.js";

async function initNodeGraphPage() {    
    const nodeGraphs = await getNodeGraphs();

    const pageList = document.getElementById("page-list");
    pageList.innerHTML = "";
    nodeGraphs.forEach((nodeGraph) => {
        if (nodeGraph.modules[0].value) {
            const module = createNodeGraphPageModule(nodeGraph);
            pageList.appendChild(module);
        }
        
    });

    pageList.append(createAddNodeGraphModule());
}

async function getNodeGraphs() {
    const query = { selector: { fileType: 'nodeGraph' } };

    const nodeGraphs = await window.top.db.find(query);

    return nodeGraphs;
}

function createNodeGraphPageModule(nodeGraph) {
    const path = "../base_page/base_page.html";
    const container = document.createElement("div");
    container.classList.add("page-module");

    const nodeGraphName = nodeGraph.modules[0]?.value[0] || "no name";
    const pageName = document.createElement("span");
    pageName.textContent = nodeGraphName;
    container.appendChild(pageName);

    container.addEventListener("click", () => {
        replaceCurrentTab(pageName, path + "?id=" + encodeURIComponent(nodeGraph._id));
    });

    // add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", async (e) => {
        e.stopPropagation();
        try {
            await window.top.db.remove(nodeGraph._id, nodeGraph._rev);
            container.remove();
        } catch (err) {
            console.error("Failed to delete character:", err);
        }
    });

    container.appendChild(deleteButton);
    return container;
}

function createAddNodeGraphModule() {
    const container = document.createElement("div");
    container.classList.add("page-module");

    const pageName = document.createElement("span");
    pageName.textContent = "Create New Relationship Graph";
    container.appendChild(pageName);

    container.addEventListener("click", async () => {
        const newNodeGraph = await initNewNodeGraph(nodeGraphData);
        console.log("some id: ", newNodeGraph._id);
    });

    return container;
}

async function initNewNodeGraph(entityData) {
    const newNodeGraph = await createNewNodeGraph(entityData);

    await attachToParent(entityData.parentId, entityData._id);

    const pageList = document.getElementById("page-list");
    const newModule = createNodeGraphPageModule(newNodeGraph);
    pageList.insertBefore(newModule, pageList.lastChild);

    return newNodeGraph;
}

async function createNewNodeGraph(newNodeGraph) {
    const result = await window.top.db.post(newNodeGraph);
    newNodeGraph._rev = result.rev;
    newNodeGraph._id = result.id;

    return newNodeGraph;
}

function replaceCurrentTab(title, path) {
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

window.addEventListener('DOMContentLoaded', initNodeGraphPage);