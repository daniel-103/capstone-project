
// Handle right-clicks
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  if (!(e.target.className === "file" && e.target.id)) return;
  
  window.top.rightClickMenu.show(JSON.stringify([
    {
      label: 'Rename',
      clickId: JSON.stringify({
        action: "rename-file",
        id: e.target.id,
        parentId: e.target.parentId
      })
    },
    {
      label: 'Delete',
      clickId: JSON.stringify({
        action: "delete-file",
        id: e.target.id,
        parentId: e.target.parentId
      })
    },
  ]));
  
});

// Handle menu actions
window.top.rightClickMenu.onMenuAction(async (actionId) => {
    handleClick(actionId);
});

async function handleClick(actionId) {
  let entityId = null;
  let parentId = null;
  try {
    const info = JSON.parse(actionId)
    actionId = info.action;
    entityId = info.id;
    parentId = info.parentId;
  } catch (e) {
    console.log(e);
  }
  
  if (actionId === "rename-file") {
    console.log("in heirarchy", actionId, entityId);
    console.log("parent: ", parentId);
  } else if (actionId ==="delete-file") {
    // remove the tab is it exists
    const tabIndex = window.top.tabs.findIndex(tab => tab.id === entityId);
    if (tabIndex != -1) window.top.removeTab(tabIndex);
    console.log('asdsad', window.top.currTabIndex);
    const parentFolder = await window.top.db.get(parentId);
    await window.top.db.remove(entityId);
    await window.top.growHierarchy(parentFolder);
  }
    
}