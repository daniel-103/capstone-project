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

// Commented these out so they don't keep getting created
// window.db.post({
//     type: 'character',
//     modules: {
//         name:        { value: 'bob', position: {x: 0, y: 0} },
//         description: { value: 'Description',   position: {x: 0, y: 0} },
//         backstory:   { value: 'Backstory',     position: {x: 0, y: 0} }
//     }
// });

// window.db.post({
//     type: 'character',
//     modules: {
//         name:        { value: 'bob2', position: {x: 0, y: 0} },
//         description: { value: 'Description',   position: {x: 0, y: 0} },
//         backstory:   { value: 'Backstory',     position: {x: 0, y: 0} }
//     }
// });

// If you need to delete any excess characters, uncomment this code and run it.
// async function deleteCharacters() {
//     await Promise.all((await window.top.db.getAll({ include_docs: true })).filter(doc => doc.type === 'character').map(doc => window.top.db.remove(doc._id)));
// }
// deleteCharacters();

// const date = new Date();
// window.db.put({
//     _id: "123",
//     name: "NewWorldMain",
//     type: "folder",
//     parentId: null,
//     image: "dog.jpg", //  ../../assets/images/'image'
//     description: "This is a test project",
//     childrenIds: [
//         "file1-0987654321",
//         "Characters-1234123412"
//     ],
//     date: {
//         created: date,
//         last: date
//     }
//   })
//   .catch(error => {});  // It already exists, its fine