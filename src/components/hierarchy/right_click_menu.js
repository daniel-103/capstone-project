
// Handle right-clicks
window.addEventListener('contextmenu', async (e) => {
  e.preventDefault();
  let menu = null;
  const parent = e.target.parentNode;
  const grandParent = parent.parentNode;
  
  if (e.target.className === "file") {
    menu = getFileMenu(e);
  } else if (Array.from(parent.classList).includes("folder")) {
    menu = await getFolderMenu(parent);
  } else if (Array.from(grandParent.classList).includes("folder")) {
    menu = await getFolderMenu(grandParent);
  }
  
  if (menu) window.top.rightClickMenu.show(menu);
  
});

async function getFolderMenu(target) {
  
  let menu = [{
    label: 'Rename',
    clickId: JSON.stringify({
      action: "rename-folder",
      id: target.id,
      parentId: target.parentId,
      currentName: target.textContent
    })
  }];

  const folder = await window.top.db.get(target.id);
  console.log(folder);
  if (folder.childrenIds.length == 0 && !Array.from(target.classList).includes("root")) {
    menu.push({
      label: 'Delete',
      clickId: JSON.stringify({
        action: "delete-folder",
        id: target.id,
        parentId: target.parentId,
        currentName: target.textContent
      })
    })
  }

  return JSON.stringify(menu);
}

function getFileMenu(e) {
  return JSON.stringify([
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
  ])
}

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
      fileElement.innerHTML = newName;
      input.remove();
      if (!newName || newName === originalName) {
        fileElement.textContent = originalName;
        return;
      }

      // Update database
      try {
        const fileDoc = await window.top.db.get(entityId);
        fileDoc.name = newName;
        await window.top.db.put(fileDoc);
        window.top.updateTabName(entityId,newName);

      } catch (error) {
        console.error('Renaming failed, ', error);
      }
    };

    // Event handlers
    input.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') await saveName();
      if (e.key === 'Escape') fileElement.textContent = originalName;
    });

    input.addEventListener('blur',  async (e) => saveName());
  } else if (actionId ==="delete-file") {
    // remove the tab is it exists
    const tabIndex = window.top.tabs.findIndex(tab => tab.id === entityId);
    if (tabIndex != -1) window.top.removeTab(tabIndex);
    
    const parentFolder = await window.top.db.get(parentId);
    console.log(parentFolder);
    parentFolder.childrenIds = parentFolder.childrenIds.filter(id => id !== entityId);
    
    await window.top.db.put(parentFolder);
    await window.top.db.remove(entityId);
    document.getElementById(entityId).remove();
    
  } else if (actionId === "rename-folder") {
    // get elements
    const folderElement = document.getElementById(entityId);
    const folderNameDiv = folderElement.children[0];
    folderNameDiv.classList.add('editing');
    const span = folderNameDiv.children[1];
    const originalName = span.textContent;

    // make editible element
    span.contentEditable = true;
    span.classList.add('editable-folder-name');
    span.focus();
    document.execCommand('selectAll', false, null);

    const saveName = async () => {
      
      const newName = span.textContent.trim();
      if (!newName || newName === originalName) {
        span.textContent = originalName;
        return;
      }

      // Update database
      try {
        const folderDoc = await window.top.db.get(entityId);
        folderDoc.name = newName;
        await window.top.db.put(folderDoc);

      } catch (error) {
        console.error('Renaming failed, ', error);
      }
    };

    // Event listeners
    span.addEventListener('blur', async () => {
      folderNameDiv.classList.remove('editing');
      span.contentEditable = false;
      saveName();
    });

    span.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') span.blur();
    });
    
  } else if (actionId ==="delete-folder") {
    document.getElementById(entityId).remove();
    await window.top.db.remove(entityId);

  }
    
}