const slideOut = document.getElementById('new-file-slide-out');
console.log(slideOut)

// New file
document.getElementById('new-file-btn').addEventListener('click',(event) => {
    slideOut.classList.toggle('open');
});

// Different kinds of new pages
const newEmptyPageBtn = document.getElementById('btn-new-empty');
newEmptyPageBtn.addEventListener('click', (event) => {
    console.log('empty')

    // Get name
    const fileName = 'test'

    window.top.db.post({
        parentId: "123",    // selected folder
        type: "file",       
        fileType: "character",  // ?
        name: fileName,         // uh
        date: {
            created: new Date(),
            last: new Date(),
        },
        modules: []
    })
        .then((postResult) => {
            window.top.db.get(postResult.id)
                .then(page => {
                    console.log(page)
                    constructPage(page)
                })
        })

})

const newWritingPageBtn = document.getElementById('btn-new-writing');
newWritingPageBtn.addEventListener('click', (event) => {
    console.log('writing')
})
const newCharacterPageBtn = document.getElementById('btn-new-character');
newCharacterPageBtn.addEventListener('click', (event) => {
    console.log('character')
})

const newLocationPageBtn = document.getElementById('btn-new-location');
newLocationPageBtn.addEventListener('click', (event) => {
    console.log('location')
})

const newFactionPageBtn = document.getElementById('btn-new-faction');
newFactionPageBtn.addEventListener('click', (event) => {
    console.log('faction')
})

// const newRelationshipPageBtn = document.getElementById('btn-new-relationship');
// newRelationshipPageBtn.addEventListener('click', (event) => {

// })

// const newTimelinePageBtn = document.getElementById('btn-new-timeline');
// newTimelinePageBtn.addEventListener('click', (event) => {

// })



// for (const button of slideOut.querySelectorAll('button')) {
//     // grab button attribute and create an eventListener to create the page with the module dictated by the attached attribute
//     // just going to create an empty page for now...
//     button.addEventListener('click', () => {
//         tabs = window.parent.tabs;
        
//         window.parent.addNewTab(`Tab ${tabs.length + 1}`, defaultPagePath, tabHeader, pageWindow);
    
//         // projectId should be in localStorage
//         // grab selected folder (_id will be in attribute)
//         const parentId = document.getElementsByClassName('folder selected')[0].id

//         const name = 'New File'         // get similarly to how folders are made
//                                             // I think this will involve creating the element first then doing db stuff.
//                                             // Will have to swap stuff around
//         const fileType = 'character'    // determine later

//         // push new page to db
//         if (DUBUG) console.log(`🛠 [3] Creating new ${fileType} page "${name}"...`);
//         window.top.db.post({
//             projectId: projectId,
//             name: name,
//             type: "file",
//             fileType: fileType,
//             parentId: parentId,
//             date: {
//                 created: new Date(),
//                 last: new Date(),
//             },
//             modules: []               // determine later
//         })
//         .then((result) => {
//             if (DUBUG) console.log(`✅ [3] Created "${name}".`, result);
//             if (DUBUG) console.log(`🛠 [3.1] Fetching ${name}'s parent...`);
//             window.top.db.get(parentId)
//                 .then(parentFolder => {
//                     if (DUBUG) console.log(`✅ [3.1] Fetched ${name}'s parent:`, parentFolder);
//                     if (DUBUG) console.log(`🛠 [3.2] Appending ${name}'s id to its parent's childrenIds...`);
//                     parentFolder.childrenIds.push(result.id);
//                     window.top.db.put(parentFolder)
//                         .then((putResult) => {
//                             if (DUBUG) console.log(`✅ [3.2] Linked ${name} to its parent:`, putResult);
//                             growHierarchy([result.id]);
//                             document.getElementById(putResult.id).classList.add('open');
//                             slideOut.classList.remove('open');
//                         })
//                         .catch(error => {
//                             if (DUBUG) console.log(`❌ [3.2] Couldn't link ${name} to its parent:`, error);
//                         });
//                 })
//                 .catch(error => {
//                     if (DUBUG) console.log(`❌ [3.1] Couldn't fetch ${name}'s parent:`, error);
//                 });
//         })
//         .catch(error => {
//             if (DUBUG) console.log(`❌ [3] Couldn't create file:`, error);
//         });
//     });   
// }