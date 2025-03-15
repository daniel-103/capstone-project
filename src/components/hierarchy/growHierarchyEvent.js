function growHierarchy (parentFolder) {
    const stringifiedIds = JSON.stringify(parentFolder);
    const growHierarchyEvent = new CustomEvent('growHierarchyEvent', {
        detail: { parentFolder: stringifiedIds }
    });
    window.top.dispatchEvent(growHierarchyEvent);
}

window.top.growHierarchy = growHierarchy;