function growHierarchy (childIds) {
    const stringifiedIds = JSON.stringify(childIds);
    const growHierarchyEvent = new CustomEvent('growHierarchyEvent', {
        detail: { childIds: stringifiedIds }
    });
    window.top.dispatchEvent(growHierarchyEvent);
}

window.top.growHierarchy = growHierarchy;