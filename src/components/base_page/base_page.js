import { displayModules, bringToFront, currentZ } from "../module_space/modules_display.js";
import { displayChangesPanel, deleteChange, addNewChange } from "../module_space/module_changes.js";
import { setupSaveHandler } from "../module_space/page_save.js";

let entityData = null;
let entityId = null;

async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  entityId = urlParams.get("id");
  if (!entityId) {
    console.error("No entity ID in URL.");
    return;
  }
  try {
    entityData = await window.top.db.get(entityId);
    
    displayModules(entityData, "#page-container");
    displayChangesPanel(entityData);
    setupSaveHandler(entityData, window.top.db);
  } catch (err) {
    console.error("Failed to fetch document:", err);
  }
}

window.addEventListener("DOMContentLoaded", init);
