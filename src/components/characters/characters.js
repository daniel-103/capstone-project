import characterData from "../entity_types/character.js"
import attachToParent from "../entity_types/attachToParent.js";

async function initCharactersPage() {    
    const characters = await getCharacters();

    const pageList = document.getElementById("page-list");
    pageList.innerHTML = "";
    characters.forEach((character) => {
        if (character.modules[0].value) {
            const module = createCharacterPageModule(character);
            pageList.appendChild(module);
        }
        
    });

    pageList.append(createAddCharacterModule());
}

async function getCharacters() {
    const query = { selector: { fileType: 'character' } };

    const characters = await window.top.db.find(query);

    return characters;
}

function createCharacterPageModule(character) {
    const path = "../base_page/base_page.html";
    const container = document.createElement("div");
    container.classList.add("page-module");

    const characterName = character.modules[0]?.value[character.changeIndex || 0] || "no name";
    const pageName = document.createElement("span");
    pageName.textContent = characterName;
    container.appendChild(pageName);

    container.addEventListener("click", () => {
        replaceCurrentTab(characterName, path + "?id=" + encodeURIComponent(character._id));
    });

    // add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", async (e) => {
        e.stopPropagation();
        try {
            await window.top.db.remove(character._id, character._rev);
            container.remove();
        } catch (err) {
            console.error("Failed to delete character:", err);
        }
    });

    container.appendChild(deleteButton);
    return container;
}

function createAddCharacterModule() {
    
    const container = document.createElement("div");
    container.classList.add("page-module");

    const pageName = document.createElement("span");
    pageName.textContent = "Add New Character";
    container.appendChild(pageName);

    container.addEventListener("click", async () => {
        const newCharacter = await initNewCharacter(characterData);
        console.log("some id: ", newCharacter._id);
    });

    return container;
};

async function initNewCharacter(entityData) {
    const newCharacter = await createNewCharacter(entityData);

    await attachToParent(entityData.parentId, entityData._id);

    const pageList = document.getElementById("page-list");
    const newModule = createCharacterPageModule(newCharacter);
    pageList.insertBefore(newModule, pageList.lastChild);

    return newCharacter;
}

async function createNewCharacter(newCharacter) {

    const result = await window.top.db.post(newCharacter);
    newCharacter._rev = result.rev;
    newCharacter._id = result.id;

    return newCharacter;
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

window.addEventListener('DOMContentLoaded', initCharactersPage);

