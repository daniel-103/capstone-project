import addFolderClickEvent from "./addFolderClickEvent.js"

// Get children from set of ids, order them, populate the hierarchy, then do the same for each of their childen recursively 
// Ideally, this would take in a single object, one already fetched from the db, and fetch its children, order them, fetch them, then pass each child to the same function.
// I'll probably change it to do this later now that I'm thinking about it.

// I initially avoided doing this because the way I was thinking about it was that I needed all of the children fetched together to order them, and thinking about only returning their ids recursizely which meant I needed to refetch each child at the top again.
// But if I instead pass the entire fetched child, then there's no need to refetch each child, just grab the object's childrenIds, fetch, sort, and call on each child object.
async function growHierarchy(parentFolder) {
    if (window.top.DEBUG) console.log("growing hierarchy for", parentFolder);
    if (!Array.isArray(parentFolder)) {
        document.getElementById(`${parentFolder._id}`).querySelector('.folder-items').innerHTML = ''; 
    } 
    const childrenIds = Array.isArray(parentFolder)?parentFolder:parentFolder.childrenIds;
    const children = await Promise.all(
        childrenIds.map(childId => {
            if (window.top.DEBUG) console.log(`🛠 [2.2] Fetching child with id: "${childId}"...`);
            return window.top.db.get(childId)
                .then(child => {
                    if (window.top.DEBUG) console.log(`✅ [2.2] Fetched "${child.name?child.name:child.modules[0].value[0]}": `, child);
                    return child;
                })
                .catch(error => {
                    if (window.top.DEBUG) console.error(`❗ [2.2] Failed to fetch child with id "${childId}". Skipping...`, error);
                    return null; // Prevent breaking the Promise.all chain
                });
        })
    );

    // Filter out failed fetches (null values)
    const realChildren = children.filter(child => child !== null);

    // Sort: Folders first, then files; both alphabetically
    realChildren.sort((a, b) => {
        const aName = a.name?a.name:a.modules[0].value[0];
        const bName = b.name?b.name:b.modules[0].value[0];
        if (a.type === b.type) {
            return aName.localeCompare(bName); // Sort alphabetically
        }
        return a.type === "folder" ? -1 : 1; // Folders first
    });

    for (const child of realChildren) {
        const childName = child.name?child.name:child.modules[0].value[0];
        if (child.type === 'folder') {
            const folder = document.createElement("li");
            folder.classList.add("folder");
            folder.id = child._id;
            folder.innerHTML = `
                <div class="folder-name">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                        <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/>
                    </svg>
                    <span>${childName}</span>
                </div>
                <ul class="folder-items"></ul>
            `;

            addFolderClickEvent(folder);
            document.getElementById(child.parentId).querySelector('.folder-items').appendChild(folder);

            if (child.childrenIds && child.childrenIds.length > 0) {
                if (window.top.DEBUG) console.log(`🛠 [2.3] -> [2.1] Constructing hierarchy for ${childName}'s children...`);
                await growHierarchy(child.childrenIds);
            }
        } else if (child.type === 'file') {
            const file = document.createElement("li");
            file.classList.add("file");
            file.id = child._id;
            file.innerHTML = `<div class="file-name">${childName}</div>`;
            file.addEventListener('click', () => {
                if (!child.fileType) {
                    return;
                }
                const pagePath = window.top.pagePaths[child.fileType] + "?id=" + encodeURIComponent(child._id);
                const pageWindow = window.parent.document.getElementById("page-window");
                const tabHeader = window.parent.document.getElementById("tab-header");
                console.log("path: ", pagePath);

                window.parent.addNewTab(childName, pagePath, tabHeader, pageWindow);
            });

            document.getElementById(child.parentId).querySelector('.folder-items').appendChild(file);
        } else {
            if (window.top.DEBUG) console.log(`❗ [2.3] ${childName} has an unknown type "${child.type}". Skipping...`);
        }
    }
}

export default growHierarchy;