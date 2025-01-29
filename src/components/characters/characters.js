async function initCharactersPage() {    
    
    const characters = await getCharacters();

    const pageList = document.getElementById("page-list");
    pageList.innerHTML = "";

    characters.forEach((character) => {
        const module = createCharacterPageModule(character);
        pageList.appendChild(module);
    });

    pageList.append(createAddCharacterModule());
}

async function getCharacters() {
    const query = { selector: { fileType: 'character' } };

    const characters = await window.top.db.find(query);

    return characters;
}

function createCharacterPageModule(character) {
    const path = "../character_page/character_page.html";
    const container = document.createElement("div");
    container.classList.add("page-module");

    const characterName = character.modules?.name?.value || "no name";
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
        const newCharacter = await createNewCharacter();
        const characterName = newCharacter.modules?.name?.value || "no name";
        console.log("some id: ", newCharacter._id);
        const path = "../character_page/character_page.html?id= "+ encodeURIComponent(newCharacter._id)
        //replaceCurrentTab(newCharacter.name, path);
    });

    return container;
};

async function createNewCharacter() {
    const randomId = "character_" + Math.random().toString(36).substring(2, 9);

    const newCharacter = {
        type: 'folder',
        fileType: 'character',
        modules: {
            name:        { value: 'New Character', position: {x: 0, y: 0} },
            description: { value: 'Description',   position: {x: 0, y: 0} },
            backstory:   { value: 'Backstory',     position: {x: 0, y: 0} }
        }
    };

    const result = await window.top.db.post(newCharacter);
    console.log("new info:", result);
    newCharacter._rev = result.rev;
    newCharacter._id = result.id;


    const pageList = document.getElementById("page-list");
    const newModule = createCharacterPageModule(newCharacter);
    pageList.insertBefore(newModule, pageList.lastChild);

    return newCharacter;
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

window.addEventListener('DOMContentLoaded', initCharactersPage);

