
window.top.document.getElementById('overlay').classList.add('open')

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
                urlSpanElements.full.innerHTML = constructFullURL()
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

// function parseFullURL() {
//     const url = new URL(getUrlSpanContent().full);

//     return {
//         user: url.username,
//         pass: url.password,
//         hostname: url.hostname,
//         port: url.port,
//         dbname: url.pathname.replace("/", "")
//     }
// }


// Dropdown
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownBtn.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
})

for (const item of document.querySelectorAll(".dropdown-menu li")) {
    item.addEventListener('click', () => {
        dropdownBtn.textContent = item.textContent;
        dropdownBtn.dataset.value = item.dataset.value
        dropdownMenu.style.display = 'none';
    })
}

// Submit
document.getElementById('submit-url-btn').addEventListener('click', () => {
    let url
    try {
        url = new URL(getUrlSpanContent().full);
    } catch (error) {
        window.top.error("[ERROR] A valid URL must be provided", 5)
        return;
    }

    const syncMethod = dropdownBtn.dataset.value
    if (!syncMethod) {
        window.top.error("[ERROR] A sync method must be chosen", 5)
        return;
    }

    try {
        fetch(`http://${url.hostname}:${url.port}${url.pathname}`, {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(`${url.username}:${url.password}`),
            }
        })
            .then(response => {
                if (!response.ok) {
                    window.top.error(`[ERROR] ${response.status} (${response.statusText})`, 5)
                    return;
                }
                
                const fullUrl = getUrlSpanContent().full
                console.log(fullUrl)
                const res = window.top.db.setCouchURL(fullUrl, syncMethod)
                if (res.error) {
                    window.top.error(`[ERROR] ${res.message}`)
                    return;
                }
                console.log(res.message)
            })
            .catch(error => {
                window.top.error("[ERROR] Connection timed out", 5)
                console.error(error)
            })
    } catch (error) {
        console.log(error)
    }
    
})


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