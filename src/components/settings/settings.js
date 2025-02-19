const themeSection = document.getElementById('theme-section');
const themeList = document.getElementById('theme-list');

themeSection.querySelector('p').addEventListener('click', (event) => {
    themeList.parentElement.classList.toggle('open')
})

//window.top.document.getElementById('overlay').classList.add('open')

window.top.electron.getThemes()
   .then(themes => {
        themeList.innerHTML = '';
        createList(themes, themeList);
    })

const oldTheme = localStorage.getItem('theme');
console.log(oldTheme)

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