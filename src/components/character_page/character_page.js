
async function init() {
    // get character id
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get("id");
    if (!characterId) {
        console.error("No character ID provided in the query string.");
        return;
    }

    try {
        const character = await window.top.db.get(characterId);
        displayCharacter(character);
    } catch (err) {
        console.error("Failed to fetch character doc:", err);
    }
}

function displayCharacter(character) {
    const container = document.getElementById("character-container");
    container.innerHTML = "";

    const modules = character.modules || {};

    // Display each module in its own box
    for (const key in modules) {
        const moduleData = modules[key];
        if (!moduleData || typeof moduleData !== "object") {
            continue;
        }

        const box = document.createElement("div");
        box.classList.add("character-module-box");

        // Add attributes and values
        const fieldType = document.createElement("div");
        const fieldValue = document.createElement("div");
        fieldValue.textContent = moduleData.value || "";

        box.appendChild(fieldType);
        box.appendChild(fieldValue);

        container.appendChild(box);
    }
}

window.addEventListener("DOMContentLoaded", init);