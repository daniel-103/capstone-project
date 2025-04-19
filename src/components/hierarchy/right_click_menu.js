
// Handle right-clicks
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  if (!(e.target.className === "file" && e.target.id)) return;
  
  window.top.rightClickMenu.show(JSON.stringify([
    {
      label: 'Rename',
      clickId: JSON.stringify({
        action: "rename-file",
        id: e.target.id
      })
    },
    {
      label: 'Delete',
      clickId: JSON.stringify({
        action: "delete-file",
        id: e.target.id
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
  try {
    const info = JSON.parse(actionId)
    actionId = info.action;
    entityId = info.id;
  } catch (e) {
    console.log(e);
  }
  
  if (actionId === "rename-file") {
    console.log("in heirarchy", actionId, entityId);
  } else if (actionId ==="delete-file") {
    console.log("in heirarchy", actionId, entityId);
  }
    
}