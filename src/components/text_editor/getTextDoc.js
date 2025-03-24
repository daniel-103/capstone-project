async function getDoc(projectId) {
    const projectData = await window.top.db.get(projectId);
    let childData = null;
    console.log(projectData);
    for (const childId of projectData.childrenIds) {
        console.log(childId);
        childData = await window.top.db.get(childId)
        if (childData.type === "folder") {
            return getDoc(childData._id);
        }
        return childData._id;
    }
    return null;
}

export default getDoc;