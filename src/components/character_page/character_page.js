let characterData = null;
let characterId = null;

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    characterId = urlParams.get("id");
    if (!characterId) {
        console.error("No character ID in URL.");
        return;
    }

    try {
        characterData = await window.top.db.get(characterId);
        displayCharacter(characterData);
    } catch (err) {
        console.error("Failed to fetch character doc:", err);
    }
}

function displayCharacter(character) {
    const container = document.getElementById("character-container");
    container.innerHTML = "";

    const modulesObj = character.modules || {};
    for (const moduleKey in modulesObj) {
        const modData = modulesObj[moduleKey];
        if (!modData) continue;

        // Create outer container for the module
        const moduleElem = document.createElement("div");
        moduleElem.classList.add("module", "text-module");
        moduleElem.style.left = (modData.x || 0) + "px";
        moduleElem.style.top = (modData.y || 0) + "px";
        moduleElem.dataset.moduleKey = moduleKey; // used by snap.js to update position

        // Show type 
        const typeElem = document.createElement("div");
        typeElem.classList.add("module-type");
        typeElem.textContent = moduleKey; 

        // Show value
        const valueElem = document.createElement("div");
        valueElem.classList.add("module-value");
        valueElem.contentEditable = "true";
        valueElem.textContent = modData.value || "";

        // Insert them
        moduleElem.appendChild(typeElem);
        moduleElem.appendChild(valueElem);

        // Transparent overlay for border-drag detection
        const dragRegion = document.createElement("div");
        dragRegion.classList.add("module-border-drag-region");
        moduleElem.appendChild(dragRegion);

        container.appendChild(moduleElem);
    }

    // Re-init selection/snapping
    initializeSnapping();
}

// save positions & updated text on ctrl+s
document.addEventListener("keydown", async (event) => {
    if (!(event.ctrlKey && event.key === "s")) { return; }

    event.preventDefault();
    try {
        // Gather new data from DOM
        const moduleElems = document.querySelectorAll(".module.text-module");
        moduleElems.forEach(elem => {
            const key = elem.dataset.moduleKey;
            const valueElem = elem.querySelector(".module-value");
            const xPos = parseInt(elem.style.left, 10) || 0;
            const yPos = parseInt(elem.style.top, 10) || 0;
            
            if (characterData.modules[key]) {
                characterData.modules[key].value = valueElem.textContent;
                characterData.modules[key].x = xPos;
                characterData.modules[key].y = yPos;
            }
        });

        // Save to PouchDB
        const result = await window.top.db.put(characterData);
        characterData._rev = result.rev;

    } catch (err) {
        console.error("Error saving character:", err);
    }
    
});

window.addEventListener("DOMContentLoaded", init);
