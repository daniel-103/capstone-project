import { displayModules, bringToFront, currentZ } from "../module_space/modules_display.js";
import { displayChangesPanel, deleteChange, addNewChange } from "../module_space/module_changes.js";
import { setupSaveHandler } from "../module_space/page_save.js";

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
    // Ensure each module's value is an array.
    Object.keys(characterData.modules || {}).forEach(key => {
      const mod = characterData.modules[key];
      if (!Array.isArray(mod.value)) {
        mod.value = [mod.value];
      }
    });
    displayModules(characterData, "#page-container");
    displayChangesPanel(characterData);
    setupSaveHandler(characterData, window.top.db);
  } catch (err) {
    console.error("Failed to fetch document:", err);
  }
}

window.addEventListener("DOMContentLoaded", init);
