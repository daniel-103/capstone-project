const moduleTypes = ['one', 'two', 'twoungou'];

// Create menu items with click IDs
const formattedModuleTypes = moduleTypes.map(moduleType => ({
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
window.top.rightClickMenu.onMenuAction((actionId) => {
  console.log(actionId);
});