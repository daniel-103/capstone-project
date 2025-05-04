const moduleTypes = {'text editor' : '../scripts/richEditorText.js'};
const default_module = { type: "New Module",    value: ["{\"ops\":[{\"insert\":\"\\n\"}]}"],      position: { x: 500, y: 550 }, size: { width: "400px", height: "120px" }, scripts: ['../scripts/richEditorText.js']  };



// Handle right-clicks
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  const activeTab = window.top.tabs.find(tab => tab.containerElem.classList.contains("active"));
  const entityId = activeTab.id;

  // Create menu items with click IDs
  const formattedModuleTypes = Object.keys(moduleTypes).map(moduleType => ({
    label: moduleType,
    clickId: JSON.stringify({ action: moduleType, fileId: entityId })
  }));
  
  window.top.rightClickMenu.show(JSON.stringify([
    {
      label: 'Add Module',
      submenu: formattedModuleTypes
    },
    {
      label: 'Save Page as Type',
      clickId: JSON.stringify({ action: "Add File Type", fileId: entityId})
    }
  ]));
});

// Handle menu actions
window.top.rightClickMenu.onMenuAction(async (actionId) => {
    handleClick(actionId);
});

async function handleClick(actionId) {
    let info = null;
    try {
      info = JSON.parse(actionId);
      actionId = info.action;
    } catch (e) {
      console.log(e);
    }
    const urlParams = new URLSearchParams(window.location.search);
    const entityId = urlParams.get("id");
    let entityData = null;
    if (!entityId) {
        console.error("No entity ID in URL.");
        return;
      }
    try {
        entityData = await window.top.db.get(entityId);
      } catch (err) {
        console.error("Failed to fetch document:", err);
      }

    let addModuleEvent = null;

    // Define event based off what was clicked
    if (Object.keys(moduleTypes).includes(actionId)) {
      addModuleEvent = new CustomEvent('add-module-event', {
          detail: { modulePath: moduleTypes[actionId], entityId: info.fileId }
      });
    } else if (actionId === "Add File Type") {
      if (!info) return;
      addModuleEvent = new CustomEvent('add-type-event', {
        detail: { entityId: info.fileId }
      });
    }

    if (addModuleEvent) {
      window.dispatchEvent(addModuleEvent);
    }
    
}