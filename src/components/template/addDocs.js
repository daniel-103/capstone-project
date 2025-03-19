async function addDocs(docs, parent) {
    for (const doc of docs) {
        doc.document.parentId = parent._id;
        const result = await window.top.db.post(doc.document);
        const newDoc = await window.top.db.get(result.id);
        console.log(`current doc id: ${newDoc._id}`);
        parent.childrenIds.push(newDoc._id);
        
        if (doc.type === 'folder') {
            await addDocs(doc.children, newDoc);
        }
    };
    console.log("Final parent: ", parent);
    await window.top.db.put(parent)
}

export default addDocs;