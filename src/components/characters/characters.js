async function initCharactersPage() {    
    
    const characters = await getCharacters();

    const pageList = document.getElementById("page-list");

    characters.forEach((character) => {
        const module = createCharacterPageModule(character.name);
        pageList.appendChild(module);
    });

    pageList.append(createAddCharacterModule("bob"));
}

async function getCharacters() {
    const query = { selector: { type: 'character' } };

    const characters = await window.top.db.find(query);

    return characters;
}

function createCharacterPageModule(title) {
    const path = "../character_page/character_page.html"
    const container = document.createElement("div");
    container.classList.add("page-module");

    const pageName = document.createElement("span");
    pageName.textContent = title;

    container.appendChild(pageName);

    container.addEventListener("click", () => {
        replaceCurrentTab(title, path);
    });

    return container;
}

function createAddCharacterModule(title) {
    const path = "../character_page/character_page.html"
    const container = document.createElement("div");
    container.classList.add("page-module");

    const pageName = document.createElement("span");
    pageName.textContent = "Add New Character";

    container.appendChild(pageName);

    container.addEventListener("click", () => {
        createNewCharacter(title);
        replaceCurrentTab(title, path);
    });

    return container;
};

async function createNewCharacter(name) {
    window.top.db.put({ type: 'character', name: `${name}`});
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

