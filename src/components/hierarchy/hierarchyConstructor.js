// Initialize the hierarchy by creating the root folder, then growing
async function seedHierarchy() {
    if (DUBUG) console.log(`🛠 [2] Starting Hierarchy Construction. Fetching project root with id "${projectId}"...`);
    window.top.db.get(projectId)
        .then(object => {
            if (DUBUG) console.log(`✅ [2] Fetched project "${object.name}"`, object);
            const folder = document.createElement('div');
            folder.classList.add("folder", "root", "selected");
            folder.id = object._id;
            folder.innerHTML = `
                <div class="folder-name">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                    <span>${object.name}</span>
                </div>
                <ul class="folder-items"></ul>
            `;
            addFolderClickEvent(folder)
            hierarchy.appendChild(folder);

            if (DUBUG) console.log(`🛠 [2.1] Constructing hierarchy for ${object.name}'s children...`);
            growHierarchy(object.childrenIds)
        })
        .catch(error => {
            if (DUBUG) console.log("❌ [2] Couldn't fetch project:", error);
        })
}

// Get children from set of ids, order them, populate the hierarchy, then do the same for each of their childen recursively 
// Ideally, this would take in a single object, one already fetched from the db, and fetch its children, order them, fetch them, then pass each child to the same function.
// I'll probably change it to do this later now that I'm thinking about it.

// I initially avoided doing this because the way I was thinking about it was that I needed all of the children fetched together to order them, and thinking about only returning their ids recursizely which meant I needed to refetch each child at the top again.
// But if I instead pass the entire fetched child, then there's no need to refetch each child, just grab the object's childrenIds, fetch, sort, and call on each child object.
async function growHierarchy(childrenIds) {
    const children = await Promise.all(
        childrenIds.map(childId => {
            if (DUBUG) console.log(`🛠 [2.2] Fetching child with id: "${childId}"...`);
            return window.top.db.get(childId)
                .then(child => {
                    if (DUBUG) console.log(`✅ [2.2] Fetched "${child.name}": `, child);
                    return child;
                })
                .catch(error => {
                    if (DUBUG) console.error(`❗ [2.2] Failed to fetch child with id "${childId}". Skipping...`, error);
                    return null; // Prevent breaking the Promise.all chain
                });
        })
    );

    // Filter out failed fetches (null values)
    const realChildren = children.filter(child => child !== null);

    // Sort: Folders first, then files; both alphabetically
    realChildren.sort((a, b) => {
        if (a.type === b.type) {
            return a.name.localeCompare(b.name); // Sort alphabetically
        }
        return a.type === "folder" ? -1 : 1; // Folders first
    });

    for (const child of realChildren) {
        if (child.type === 'folder') {
            const folder = document.createElement("li");
            folder.classList.add("folder");
            folder.id = child._id;
            folder.innerHTML = `
                <div class="folder-name">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                        <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/>
                    </svg>
                    <span>${child.name}</span>
                </div>
                <ul class="folder-items"></ul>
            `;

            addFolderClickEvent(folder);
            document.getElementById(child.parentId).querySelector('.folder-items').appendChild(folder);

            if (child.childrenIds && child.childrenIds.length > 0) {
                if (DUBUG) console.log(`🛠 [2.3] -> [2.1] Constructing hierarchy for ${child.name}'s children...`);
                await growHierarchy(child.childrenIds);
            }
        } else if (child.type === 'file') {
            const file = document.createElement("li");
            file.classList.add("file");
            file.id = child._id;

            const fileName = document.createElement("div");
            fileName.classList.add("file-name");
            fileName.textContent = child.name;
            fileName.addEventListener("click", () => {

                constructPage(child);
                
                // Check if tab exists
                const tabHeader = window.parent.document.getElementById('tab-header')
                let currentTab = tabHeader.querySelector(`[data-page-id="${child._id}"]`)
                console.log(currentTab);
                if (!currentTab) {
                    createTab(child.name, child._id);
                    currentTab = tabHeader.querySelector(`[data-page-id="${child._id}"]`)
                }

                for (const tab of tabHeader.querySelectorAll('.tab')) {
                    tab.classList.remove('active');    
                }
                currentTab.classList.add('active');



            
            })
            file.appendChild(fileName);

            document.getElementById(child.parentId).querySelector('.folder-items').appendChild(file);
        } else {
            if (DUBUG) console.log(`❗ [2.3] ${child.name} has an unknown type "${child.type}". Skipping...`);
        }
    }
}

seedHierarchy()