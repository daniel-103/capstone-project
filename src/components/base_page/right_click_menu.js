const moduleTypes = {'text editor' : '../scripts/richEditorText.js'};
const default_module = { type: "New Module",    value: ["{\"ops\":[{\"insert\":\"\\n\"}]}"],      position: { x: 500, y: 550 }, size: { width: "400px", height: "120px" }, scripts: ['../scripts/richEditorText.js']  };
// Create menu items with click IDs
const formattedModuleTypes = Object.keys(moduleTypes).map(moduleType => ({
  label: moduleType,
  clickId: moduleType
}));

// Handle right-clicks
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  
  window.top.rightClickMenu.show(JSON.stringify([
    {
      label: 'Add Module',
      submenu: formattedModuleTypes
    }
  ]));
});

// Handle menu actions
window.top.rightClickMenu.onMenuAction(async (actionId) => {
    
    handleClick(actionId);
});

async function handleClick(actionId) {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    const entityId = urlParams.get("id");
    let entityData = null;
    if (!entityId) {
        console.error("No entity ID in URL.");
        return;
      }
    console.log(entityId, "aefoiehwoiev");
    try {
        entityData = await window.top.db.get(entityId);
      } catch (err) {
        console.error("Failed to fetch document:", err);
      }

    if (entityData) {
        console.log("there is data", moduleTypes[actionId]);
    }
    const addModuleEvent = new CustomEvent('add-module-event', {
        detail: { modulePath: moduleTypes[actionId] }
    });
    window.dispatchEvent(addModuleEvent);
}