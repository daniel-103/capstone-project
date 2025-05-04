import { displayModules } from "../module_space/modules_display.js";
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

    const moduleAddHandler = (e) => {
      if (!e.detail.entityId || e.detail.entityId !== entityData._id) return;
      moduleAdd(entityData, e.detail.modulePath, "#page-container");
    }
    const addFileOptionHandler = async (e) => {
      if (!e.detail.entityId || e.detail.entityId !== entityData._id) return;
      const newEntityData = await window.top.db.get(entityId);
      addFileOption(newEntityData);
    }
    window.addEventListener("add-module-event", moduleAddHandler)
    window.addEventListener("add-type-event", addFileOptionHandler)

    displayModules(entityData, "#page-container");
    addSelect();
    moduleDelete(entityData);
    setupSaveHandler(entityData, window.top.db);
  } catch (err) {
    console.error("Failed to fetch document:", err);
  }
}

window.addEventListener("DOMContentLoaded", init);

