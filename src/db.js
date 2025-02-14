const programId = 'Skriptor'

const staticProgramObject = {
    _id: programId,
    projects: []
};

console.log("❓ [-1] Sorry for all of these logs. Debugging was a nightmare. Feel free to comment them out if they are too annoying. I'll try to remove them or make debug mode later")
// Hey, looks like you either followed this message from the console or you stumbled upon this.
// I'm using my own way of logging and debugging with the following format:

// Symbol for type of log, easyily distinguishable
    // 🛠: Doing something. 
        // Shows the start of a process.
    // ✅: Successfull response. 
        // Process was successful. Return the result
    // ❌: Error response. 
        // Process was unsuccessful. Return the error
    // ❗: Warning response. 
        // Process was unsuccessful but it's ok. The process will either be skipped or has error handling to recover. Return the error
// Tracker, kind of like an id to see where the log came from and any associated logs.
    // Subsequent processes are shown in [] and represented using decimal versioning. (0.8, 0.9, 0.10, 0.11, ...)
    // You can choose any number as long as it's locally unique. Like you can reause 0 outside of initial project loading since it's only used here.
// Message, a brief description of what the log is about.
// Return object, only for responses, not used when showing the start of a process.

// See a few of the logs in this file and in components/hierarchy/hierarchy.js for example
// Feel free to adopt this type of logging and debugging.

// Fetch the 'Program Object' that keeps track of all of the projects. It's the highest level object. (the root)
console.log('🛠 [0] Fetching Program Object...');
window.top.db.get(programId)
    .then(programObject => {
        console.log("✅ [0] Fetched Program Object:", programObject);
    })
    .catch(error => {
        console.log("❗ [0] Couldn't fetch Program Object:", error);
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

// Comment this out if you are getting annoyed with the errors in the terminal.
const date = new Date();
window.db.get("123")
    .catch(error => {
        window.db.put({
            _id: "123",
            name: "NewWorldMain",
            type: "folder",
            parentId: null,
            image: "dog.jpg",
            description: "This is a test project",
            childrenIds: ["456"],
            date: {
                created: date,
                last: date
            }
        })
        .then(() => {
            window.db.put({
                _id: "456",
                parentId: "123",
                type: "file",
                fileType: "character",
                name: "Bobathy",
                date: {
                    created: new Date(),
                    last: new Date(),
                },
                modules: [
                    {
                        type: "title",
                        name: "Bob (Short for Bobathy)",
                        position: {
                            x: 0,
                            y: 0
                        },
                        scripts: ["thing.js"]
                    },
                    {
                        type: "textBox",
                        content: "Bob is just a really cool guy.",
                        position: {
                            x: 8,
                            y: 16
                        }
                    },
                    {
                        type: "textBox",
                        content: "In 1989, Bob has incurred 19.5 million dollars in debt to the IRS over multiple counts of tax fraud.",
                        position: {
                            x: 8,
                            y: 64
                        }
                    }
                ]
            })
        })
        .then(console.log("✅ Document created"));
    });

