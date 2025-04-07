import { displayModules, bringToFront, currentZ } from "../module_space/modules_display.js";
import { displayChangesPanel, deleteChange, addNewChange } from "../module_space/module_changes.js";
import { setupSaveHandler } from "../module_space/page_save.js";
import { moduleAdd } from "../module_space/module_add.js"
import { moduleDelete } from "../module_space/module_delete.js";
import addFileOption from "../template/addFileOption.js";
import { addSelect } from "../module_space/add_module_select.js";

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

    const moduleAddHandler = (e) => moduleAdd(entityData, e.detail.modulePath, "#page-container");
    const addFileOptionHandler = (e) => addFileOption(entityData);
    window.addEventListener("add-module-event", moduleAddHandler)
    window.addEventListener("add-type-event", addFileOptionHandler)

    displayModules(entityData, "#page-container");
    addSelect();
    moduleDelete(entityData);
    displayChangesPanel(entityData);
    setupSaveHandler(entityData, window.top.db);
  } catch (err) {
    console.error("Failed to fetch document:", err);
  }
}

window.addEventListener("DOMContentLoaded", init);

