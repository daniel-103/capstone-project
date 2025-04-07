// Sorry if you find bugs in this. I was viciously high writting most of this. 
// (actually writting this soon after the edible hit and I can already fortell the amount of delicious spaghetti I'm bout to cook up)

window.top.document.getElementById('overlay').classList.add('open');
let passedConfirmation = {};

// couchdb
const urlSpanElements = {
    user: document.getElementById('url-user-input'),
    pass: document.getElementById('url-pass-input'),
    hostname: document.getElementById('url-hostname-input'),
    port: document.getElementById('url-port-input'),
    dbname: document.getElementById('url-dbname-input'),
    full: document.getElementById('url-full-input'),
}

const fullUrlContainerElement = document.getElementById('full-url-container');
for (const spanElement of Object.values(urlSpanElements)) {
    spanElement.addEventListener('input', () => {
        try {
            if (spanElement.id != 'url-full-input') {
                urlSpanElements.full.innerHTML = constructFullURL();
                new URL(getUrlSpanContent().full);
            }
            else {
                const splitUrl = new URL(getUrlSpanContent().full);
                urlSpanElements.user.innerHTML = splitUrl.username;
                urlSpanElements.pass.innerHTML = splitUrl.password;
                urlSpanElements.hostname.innerHTML = splitUrl.hostname;
                urlSpanElements.port.innerHTML = splitUrl.port;
                urlSpanElements.dbname.innerHTML = splitUrl.pathname.replace("/", "");
            }

            fullUrlContainerElement.style.outline = '0.25rem solid rgba(0, 255, 0, 0.25)';
        } catch (error) {
            console.log(error)
            fullUrlContainerElement.style.outline = '0.25rem solid rgba(255, 0, 0, 0.25)';
        }
    })
}

function getUrlSpanContent() {
    return Object.fromEntries(Object.entries(urlSpanElements).map(([key, value]) => [key, value.innerHTML]));
}

function constructFullURL() {
    const spanContent = getUrlSpanContent();
    let fullURL = ''
    if (!spanContent.user) return fullURL;
    fullURL += 'http://' + spanContent.user;
    if (!spanContent.pass) return fullURL;
    fullURL += ":" + spanContent.pass;
    if (!spanContent.hostname) return fullURL;
    fullURL += "@" + spanContent.hostname;
    if (!spanContent.port) return fullURL;
    fullURL += ":" + spanContent.port;
    if (!spanContent.dbname) return fullURL;
    fullURL += "/" + spanContent.dbname;
    return fullURL;
}

// Connect
document.getElementById('connect-url-btn').addEventListener('click', async () => {
    let url;
    try {
        url = new URL(getUrlSpanContent().full);
    } catch (error) {
        window.top.notify('error', "A valid URL must be provided", 5);
        return;
    }

    await setConnectionStatus('connecting');

    // test url
    try {
        const response = await fetch(`${url.origin}${url.pathname}`, {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(`${url.username}:${url.password}`),
            }
        })

        // test connection
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    console.log('[1]')
                    const res = await fetch(`${url.origin}${url.pathname}`, {
                        method: "PUT",
                        headers: {
                            "Authorization": "Basic " + btoa(`${url.username}:${url.password}`),
                        }
                    });
                    console.log(res)
                    if (!res.ok) {
                        window.top.notify('error', `${response.status} (${response.statusText}) after trying to create remote database`, 10);
                    }
                    window.top.notify('info', `No remote database "${url.pathname.replace("/", "")}" was found but one with the same name was created for you.`, 10);
                    break;
            
                default:
                    console.log('[2]')
                    await setConnectionStatus('not connected');
                    window.top.notify('error', `${response.status} (${response.statusText})`, 5);
                    console.log(response);
                    return;
            }            
        }
    } catch (error) {
        console.log('[3]')
        window.top.notify('error', "Could not connect to host.", 5);
        await setConnectionStatus('not connected');
        console.log(error);
        return;
    }

    const res = await window.top.db.linkCouch({
        hash: url.hash,
        host: url.host,
        hostname: url.hostname,
        href: url.href,
        origin: url.origin,
        password: url.password,
        pathname: url.pathname,
        port: url.port,
        protocol: url.protocol,
        search: url.search,
        username: url.username
    });
    console.log(res)
    if (res.error) {
        window.top.notify('error', `${res.message}`);
        await setConnectionStatus('not connected');
        return;
    }

    // some weird stuff was happening here 
    await setConnectionStatus('connected');
    window.top.notify('success', `${res.message}`, 5);
    localStorage.setItem('CouchDBURL', url.href);
})

const connectionStatusElement = document.getElementById('connection-status');

async function setConnectionStatus(status) {
    switch (status) {
        case "not connected":
            // styling
            connectionStatusElement.innerHTML = 'Not Connected';
            connectionStatusElement.style.color = 'red';

            connectionStatusElement.style.transition = '';
            connectionStatusElement.style.backgroundColor = 'red';
            requestAnimationFrame(() => {
                connectionStatusElement.style.transition = 'background-color cubic-bezier(0,.5,0,1) 1s';
                connectionStatusElement.style.backgroundColor = 'transparent';
            });

            // lock other options
            document.getElementById('action-subsection').classList.add('disabled');
            document.getElementById('sync-subsection').classList.add('disabled');
            break;

        case "connecting":
            // styling
            connectionStatusElement.innerHTML = 'Connecting...';  // replace with THROBBER 😳
            connectionStatusElement.style.color = '';

            // cancel button
            break;

        case "connected":
            // styling
            connectionStatusElement.innerHTML = 'Connected';
            connectionStatusElement.style.color = 'rgba(64, 255, 64, 1)';

            connectionStatusElement.style.transition = '';
            connectionStatusElement.style.backgroundColor = 'rgba(64, 255, 64, 1)';
            requestAnimationFrame(() => {
                connectionStatusElement.style.transition = 'background-color cubic-bezier(0,.5,0,1) 1s';
                connectionStatusElement.style.backgroundColor = 'transparent';
            });

            // create disconnect button
            const previousDisconnectBtn = document.getElementById('disconnect-url-btn');
            if (previousDisconnectBtn) previousDisconnectBtn.remove();
            const disconnectBtn = document.createElement('button');
            disconnectBtn.id = 'disconnect-url-btn';
            disconnectBtn.innerHTML = 'Disconnect';
            disconnectBtn.addEventListener('click', async () => {
                await setConnectionStatus('disconnecting');
                const r = await window.top.db.unlinkCouch();
                if (r.error) {
                    window.top.notify('error', `${res.message}`);
                    return;
                }
                localStorage.removeItem('CouchDBURL');
                await setConnectionStatus('not connected');
                window.top.notify('success', `${r.message}`, 5);
                disconnectBtn.remove();
            })

            document.getElementById('connection-buttons').appendChild(disconnectBtn);
            
            // unlock other options
            document.getElementById('action-subsection').classList.remove('disabled');
            document.getElementById('sync-subsection').classList.remove('disabled');
            break;
        
        case "disconnecting":
            // styling
            connectionStatusElement.innerHTML = 'Disconnecting...';   // replace with THROBBER 😳
            connectionStatusElement.style.color = '';

            // unsync
            if (synced) {
                setSyncStatus('unsyncing');
                const r = await window.top.db.unsync();
                if (r.error) {
                    window.top.notify('error', `${res.message}`);
                    await setConnectionStatus("connected");
                    setSyncStatus('synced');
                    return;
                }

                localStorage.setItem('synced', false);
                setSyncStatus('not synced');
                window.top.notify('success', `${r.message}`, 5);
                document.getElementById('unsync-btn')?.remove();
            }

            // cancel button
            break;

        default:
            // wtf is wrong with you. use one of the accepted strings above dumby
            break;
    }
}



// Actions Dropdown
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownBtn.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
})

for (const item of document.querySelectorAll(".dropdown-menu li")) {
    item.addEventListener('click', () => {
        dropdownBtn.textContent = item.textContent;
        dropdownBtn.dataset.value = item.dataset.value;
        dropdownMenu.style.display = 'none';
    })
}

// Start
const actionBtn = document.getElementById('action-btn');
actionBtn.addEventListener('click', async () => {
    const action = dropdownBtn.dataset.value;
    if (!action) {
        window.top.notify('error', "An action must be selected.", 5);
        return;
    }

    let response;
    switch (action) {
        case 'merge':
            if (synced) {
                window.top.notify('warning', "This action does nothing since the local database is always merged with the synced remote database", 5);
                return;
            } else {
                response = await window.top.db.merge();
            }

            break;

        case 'mergeToPouch':
            if (synced) {
                window.top.notify('warning', "This action does nothing since the local database is always merged with the synced remote database", 5);
                return;
            }
            response = await window.top.db.mergeToPouch();
            break;
            
        case 'mergeToCouch':
            if (synced) {
                window.top.notify('warning', "This action does nothing since the local database is always merged with the synced remote database", 5);
                return;
            }

            response = await window.top.db.mergeToCouch();
            break;
            
        case 'overwritePouch':
            if (!passedConfirmation.overwritePouch) {
                window.top.notify('warning', "This action will perminantly delete all local project data. (Click again to confirm)", 5);
                passedConfirmation = {};
                passedConfirmation.overwritePouch = true;
                return;
            }

            if (synced) {
                try {
                    await window.top.db.unsync();
                    response = await window.top.db.replicateToPouch();
                    await window.top.db.sync();
                } catch (error) {
                    response = { error: true, message: "oopsiee" };
                }
                return;
            }

            response = await window.top.db.replicateToPouch();
            break;
    
        case 'overwriteCouch':
            if (!passedConfirmation.overwriteCouch) {
                window.top.notify('warning', "This action will perminantly delete all remote project data (Click again to confirm)", 5);
                passedConfirmation = {};
                passedConfirmation.overwriteCouch = true;
                return;
            }

            if (synced) {
                try {
                    await window.top.db.unsync();
                    response = await window.top.db.replicateToCouch();
                    await window.top.db.sync();
                } catch (error) {
                    response = { error: true, message: "oopsiee" };
                }
                return;
            }
            
            response = await window.top.db.replicateToCouch();
            break;
        
        case 'clearPouch':
            if (!passedConfirmation.clearPouch) {
                window.top.notify('warning', "This action will perminantly delete all project data in the local database (Click again to confirm)", 5);
                passedConfirmation = {};
                passedConfirmation.clearPouch = true;
                return;
            }

            response = await window.top.db.clearPouch()
            break;
        
        case 'clearCouch':
            if (!passedConfirmation.clearCouch) {
                window.top.notify('warning', "This action will perminantly delete all project data in the remote database (Click again to confirm)", 5);
                passedConfirmation = {};
                passedConfirmation.clearCouch = true;
                return;
            }

            response = await window.top.db.clearCouch()
            break;

        case 'deleteCouch':
            if (!passedConfirmation.deleteCouch) {
                window.top.notify('warning', "This action will perminantly delete the remote database and all project data in it (Click again to confirm)", 5);
                passedConfirmation = {};
                passedConfirmation.deleteCouch = true;
                return;
            }

            await setConnectionStatus('disconnecting');
            response = await window.top.db.deleteCouch();
            localStorage.removeItem('CouchDBURL');
            await setConnectionStatus('not connected');
            // window.top.notify('success', `${r.message}`, 5);
            document.getElementById('disconnect-url-btn')?.remove();
            

            break;

        default:
            // this should like never happen but whatever
            response = { error: true, message: "Invalid action" }
            break;
    }

    passedConfirmation = {};

    if (response.error) {
        window.top.notify('error', response.message, 5);
    }

    window.top.notify('success', response.message, 5);
})



const syncStatusElement = document.getElementById('sync-status');

function setSyncStatus(status) {
    switch (status) {
        case "not synced":
            // styling
            syncStatusElement.innerHTML = 'Not Synced';
            syncStatusElement.style.color = 'red';

            syncStatusElement.style.transition = '';
            syncStatusElement.style.backgroundColor = 'red';
            requestAnimationFrame(() => {
                syncStatusElement.style.transition = 'background-color cubic-bezier(0,.5,0,1) 1s';
                syncStatusElement.style.backgroundColor = 'transparent';
            });

            // create sync button
            const previousSyncBtn = document.getElementById('sync-btn');
            if (previousSyncBtn) previousSyncBtn.remove();
            const syncBtn = document.createElement('button');
            syncBtn.id = 'sync-btn';
            syncBtn.innerHTML = 'Sync';
            syncBtn.addEventListener('click', async () => {
                setSyncStatus('syncing');
                const r = await window.top.db.sync();
                if (r.error) {
                    window.top.notify('error', `${res.message}`);
                    setSyncStatus('not synced');
                    return;
                }
                setSyncStatus('synced');
                localStorage.setItem('synced', true);
                syncBtn.remove();
                window.top.notify('success', `${r.message}`, 5);
            })

            document.getElementById('sync-buttons').appendChild(syncBtn);
            break;
        
        case "syncing":
            // styling
            syncStatusElement.innerHTML = 'Syncing...';
            syncStatusElement.style.color = '';

            // cancel button
            break;
            
        case "synced":
            // styling
            syncStatusElement.innerHTML = 'Synced';
            syncStatusElement.style.color = 'rgba(64, 255, 64, 1)';

            syncStatusElement.style.transition = '';
            syncStatusElement.style.backgroundColor = 'rgba(64, 255, 64, 1)';
            requestAnimationFrame(() => {
                syncStatusElement.style.transition = 'background-color cubic-bezier(0,.5,0,1) 1s';
                syncStatusElement.style.backgroundColor = 'transparent';
            });

            // create unsync button
            const previousUnsyncBtn = document.getElementById('unsync-btn');
            if (previousUnsyncBtn) previousUnsyncBtn.remove();
            const unsyncBtn = document.createElement('button');
            unsyncBtn.id = 'unsync-btn';
            unsyncBtn.innerHTML = 'Unsync';
            unsyncBtn.addEventListener('click', async () => {
                setSyncStatus('unsyncing');
                const r = await window.top.db.unsync();
                if (r.error) {
                    window.top.notify('error', `${res.message}`);
                    return;
                }
                localStorage.setItem('synced', false);
                setSyncStatus('not synced');
                window.top.notify('success', `${r.message}`, 5);
                unsyncBtn.remove();
            })

            document.getElementById('sync-buttons').appendChild(unsyncBtn);
            break;
        
        case "unsyncing":
            // styling
            syncStatusElement.innerHTML = 'Unsyncing...';
            syncStatusElement.style.color = '';

            // cancel button
            break;

        default:
            // wtf is wrong with you. use one of the accepted strings above dumby
            break;
    }
}

// Sync
// document.getElementById('sync-btn').addEventListener('click', async () => {
//     setSyncStatus('syncing');

//     const res = await window.top.db.sync();
//     if (res.error) {
//         window.top.notify('error', `${res.message}`);
//         setSyncStatus('not synced');
//         return;
//     }

//     setSyncStatus('synced');
//     localStorage.setItem('synced', true);
//     window.top.notify('success', `${res.message}`, 5);

// })



// set up the connection status visuals and url if already linked
const url = localStorage.getItem('CouchDBURL');
const synced = localStorage.getItem('synced') == 'true';
if (url) {
    setConnectionStatus('connected');

    urlSpanElements.full.innerHTML = url;

    const splitUrl = new URL(getUrlSpanContent().full);
    urlSpanElements.user.innerHTML = splitUrl.username;
    urlSpanElements.pass.innerHTML = splitUrl.password;
    urlSpanElements.hostname.innerHTML = splitUrl.hostname;
    urlSpanElements.port.innerHTML = splitUrl.port;
    urlSpanElements.dbname.innerHTML = splitUrl.pathname.replace("/", "");

    // then set up the sync status visuals if already synced
    if (synced) {
        setSyncStatus('synced');
    } else {
        setSyncStatus('not synced');
    }
} else {
    setConnectionStatus('not connected');
    setSyncStatus('not synced');
}





// themes
const themeSection = document.getElementById('theme-section');
const themeList = document.getElementById('theme-list');

themeSection.querySelector('p').addEventListener('click', (event) => {
    themeList.parentElement.classList.toggle('open')
})


window.top.electron.getThemes()
   .then(themes => {
        themeList.innerHTML = '';
        createList(themes, themeList);
    })

const oldTheme = localStorage.getItem('theme');

function createList(items, parentElement) {
    items.forEach(item => {
        const li = document.createElement('li');
        if (item.folder) {
            const name = document.createElement('p');
            name.textContent = item.folder;
            li.classList.add('folder');

            name.addEventListener('click', (event) => {
                event.stopPropagation();
                li.classList.toggle('open');
            })
            li.appendChild(name);

            const ul = document.createElement('ul');
            createList(item.children, ul);
            li.appendChild(ul);

            
        } else {
            const name = document.createElement('p');
            name.textContent = item.file.replace(/\.css$/, "");
            li.classList.add('file');

            name.addEventListener('click', (event) => {
                localStorage.setItem('theme', item.path);
                window.top.injectTheme(window.top.document);
                console.log('click')
            });
            li.appendChild(name);
        }
        parentElement.appendChild(li);
    });
}

document.getElementById("theme-refresh-btn").addEventListener("click", () => {
    window.top.electron.getThemes()
        .then(themes => {
            themeList.innerHTML = '';
            createList(themes, themeList);
        })
});

document.getElementById('cancel-settings-btn').addEventListener("click", () => {
    localStorage.setItem('theme', oldTheme);
    window.frameElement.classList.remove('open');
    window.top.injectTheme(window.top.document);
});

document.getElementById('submit-settings-btn').addEventListener("click", () => {
    window.frameElement.classList.remove('open')
});