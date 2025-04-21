
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
        parentId: e.target.parentId,
        currentName: e.target.textContent
      })
    },
    {
      label: 'Delete',
      clickId: JSON.stringify({
        action: "delete-file",
        id: e.target.id,
        parentId: e.target.parentId,
        currentName: e.target.textContent
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
    const fileElement = document.getElementById(entityId);
    if (!fileElement) return;

    
    const originalName = fileElement.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalName;
    
    // Replace file content with input
    fileElement.innerHTML = '&#8203;';
    fileElement.appendChild(input);
    input.focus();

    // Handle save/cancel
    const saveName = async () => {
      const newName = input.value.trim();
      if (!newName || newName === originalName) {
        fileElement.textContent = originalName;
        return;
      }

      // Update database
      try {
        const fileDoc = await window.top.db.get(entityId);
        fileDoc.name = newName;
        await window.top.db.put(fileDoc);
        const parentFolder = await window.top.db.get(parentId);
        await window.top.growHierarchy(parentFolder);
        window.top.updateTabName(entityId,newName);

      } catch (error) {
        console.error('Renaming failed, ', error);
      }
    };

    // Event handlers
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveName();
      if (e.key === 'Escape') fileElement.textContent = originalName;
    });

    input.addEventListener('blur', saveName);
  } else if (actionId ==="delete-file") {
    // remove the tab is it exists
    const tabIndex = window.top.tabs.findIndex(tab => tab.id === entityId);
    if (tabIndex != -1) window.top.removeTab(tabIndex);
    
    const parentFolder = await window.top.db.get(parentId);
    await window.top.db.remove(entityId);
    await window.top.growHierarchy(parentFolder);
  }
    
}