const programId = 'Skriptor'

const staticProgramObject = {
    _id: programId,
    projects: []
};

// Fetch the 'Program Object' that keeps track of all of the projects. It's the highest level object. (the root)
console.log('🛠 [0] Fetching Program Object...');
window.top.db.get(programId)
    .then(programObject => {
        console.log("✅ [0] Fetched Program Object:", programObject);
    })
    .catch(error => {
        console.log("❌ [0] Couldn't fetch Program Object:", error);
        console.log("🛠 [0.1] Creating new Program Object...");
        window.top.db.put(staticProgramObject)
            .then(response => {
                console.log("✅ [0.1] Created new Program Object:", response);
            })
            .catch(error => {
                console.log("❌ [0.1] Couldn't create new Program Object:", error);
            })
    });


window.top.db.createIndex({
    index: { fields: ['type'] }
});

window.db.post({
    type: 'character',
    modules: {
        name:        { value: 'bob', position: {x: 0, y: 0} },
        description: { value: 'Description',   position: {x: 0, y: 0} },
        backstory:   { value: 'Backstory',     position: {x: 0, y: 0} }
    }
});

window.db.post({
    type: 'character',
    modules: {
        name:        { value: 'bob2', position: {x: 0, y: 0} },
        description: { value: 'Description',   position: {x: 0, y: 0} },
        backstory:   { value: 'Backstory',     position: {x: 0, y: 0} }
    }
});



// async function deleteCharacters() {
//     await Promise.all((await window.top.db.getAll({ include_docs: true })).filter(doc => doc.type === 'character').map(doc => window.top.db.remove(doc._id)));
// }

// deleteCharacters();
