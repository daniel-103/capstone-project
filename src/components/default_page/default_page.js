const pagePaths = [
    { title: "Snapping Grid", path: "../page/page.html"},
    { title: "Timeline", path: "../timeline/timeline.html"},
    { title: "Text Editor", path: "../text_editor/text_editor.html"}
];

function initDefaultPage() {
    const pageList = document.getElementById("page-list");

    pagePaths.forEach(({title, path}) => {
        const module = createPageModule(title, path);
        pageList.appendChild(module);
    });
}

function createPageModule(title, path) {
    const container = document.createElement("div");
    container.classList.add("page-module");

    const pageName = document.createElement("span");
    pageName.textContent = title;

    container.appendChild(pageName);

    container.addEventListener("click", () => {
        replaceCurrentTab(title, path);
    });

    return container;
}

function replaceCurrentTab(title, path) {
    const currTabIndex = window.parent.currTabIndex;
    const currTab = window.parent.tabs[currTabIndex];

    currTab.title = title;
    currTab.path = path;

    if (currTab.buttonElem) {
        currTab.buttonElem.textContent = title;
    }

    if (currTab.iframeElem) {
        currTab.iframeElem.src = path;
    }
}

document.addEventListener("DOMContentLoaded", initDefaultPage);
