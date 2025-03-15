function seedHierarchy () {
    const seedHierarchyEvent = new CustomEvent('seedHierarchyEvent');
    window.top.dispatchEvent(seedHierarchyEvent);
}

window.top.seedHierarchy = seedHierarchy;