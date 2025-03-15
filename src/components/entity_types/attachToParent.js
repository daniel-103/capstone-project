async function attachToParent (parentId, fileId) {
    window.top.db.get(parentId).then(parentFolder => {
        parentFolder.childrenIds.push(fileId);
        parentFolder.childrenIds = [...new Set(parentFolder.childrenIds)];
        window.top.db.put(parentFolder).then(() => {
            window.top.growHierarchy(parentFolder);
        }); 
    });
}

export default attachToParent;