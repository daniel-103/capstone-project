// relationships_page.js
import { displayModules } from "../module_space/modules_display.js";
import { displayChangesPanel } from "../module_space/module_changes.js";
import { setupSaveHandler } from "../module_space/page_save.js";

let relationshipData = null;
let relationshipId = null;

async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  relationshipId = urlParams.get("id");
  if (!relationshipId) {
    console.error("No relationship ID in URL.");
    return;
  }
  try {
    relationshipData = await window.top.db.get(relationshipId);
    // Ensure each module's value is an array.
    Object.keys(relationshipData.modules || {}).forEach(key => {
      const mod = relationshipData.modules[key];
      if (!Array.isArray(mod.value)) {
        mod.value = [mod.value];
      }
    });
    displayModules(relationshipData, "#page-container");
    displayChangesPanel(relationshipData);
    setupSaveHandler(relationshipData, window.top.db);
  } catch (err) {
    console.error("Failed to fetch relationship document:", err);
  }
}

window.addEventListener("DOMContentLoaded", init);
