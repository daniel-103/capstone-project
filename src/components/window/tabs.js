window.top.tabs = window.top.tabs || [];

window.currTabIndex = 0

const defaultPagePath = "../default_page/default_page.html";
const startPagePath = "../text_editor/text_editor.html";
const basePage = "../base_page/base_page.html"

window.top.pagePaths = {"character" : basePage, "relationship" : basePage, "textDocument" : startPagePath};

function runTabs() {
    const tabHeader = document.getElementById("tab-header");
    const pageWindow = document.getElementById("page-window");

    addNewTab(`Tab 1`, startPagePath, tabHeader, pageWindow);

    // initPlusButton(tabHeader, pageWindow);
}

window.defaultPagePath = defaultPagePath;
window.addNewTab = addNewTab;

// Plus button should be deprecated at some point now that the new file button in the hierarchy has been implemented.
// function initPlusButton(tabHeader, pageWindow) {
//     window.plusButton = document.createElement("button");
//     plusButton.textContent = "+";
//     plusButton.addEventListener("click", () => {
//         addNewTab(`Tab ${tabs.length+1}`, defaultPagePath, tabHeader, pageWindow);
//     });

//     tabHeader.appendChild(plusButton);
// }

function createTab(index, tabHeader, pageWindow) {
    const currTab = window.top.tabs[index];

    const tabContainer = document.createElement("div");
    tabContainer.classList.add("tab");

    // Tab Header
    const tabButton = document.createElement("button");
    tabButton.textContent = currTab.title;
    
    tabButton.addEventListener("click", () => {
        const currIndex = window.top.tabs.indexOf(currTab);
        switchTab(currIndex);
    });

    // Close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>';
    closeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const currIndex = window.top.tabs.indexOf(currTab);
        removeTab(currIndex);
    });

    tabContainer.appendChild(tabButton);
    tabContainer.appendChild(closeButton);

    // Page associated with tab
    const iframe = document.createElement("iframe");
    iframe.id = "textEditorIframe";
    // iframe.classList.add("import");
    iframe.src = currTab.path
    iframe.style.display = "none";
    // iframe.style.width = "100%";
    // iframe.style.height = "100%";
    // iframe.style.border = "none";

    currTab.containerElem = tabContainer;
    currTab.closeElem = closeButton;
    currTab.buttonElem = tabButton;
    currTab.iframeElem = iframe;

    if (window.plusButton) {
        tabHeader.insertBefore(tabContainer, window.plusButton);
    } else {
        tabHeader.appendChild(tabContainer);
    }

    // Inject theme into iframe
    iframe.addEventListener("load", () => {
        window.top.injectTheme(iframe.contentDocument);
    });
    
    pageWindow.appendChild(iframe); 
}

function switchTab(index) {
window.top.tabs[currTabIndex].iframeElem.style.display = "none";
    window.top.tabs[currTabIndex].containerElem.classList.remove("active");

    window.top.tabs[index].iframeElem.style.display = "block";
    window.top.tabs[index].containerElem.classList.add("active");

    currTabIndex = index;
}

window.top.switchTabById = async (id) => {
    // switch to tab if it's open
    // I know addNewTab already does this so I could just call it without checking but the page would need to be fetched every time.
    // Checking if a page already exists with the same id prevent any unnecessary fetches.
    const tabIndex = window.top.tabs.findIndex(tab => tab.id == id);
    if (tabIndex >= 0) {
        switchTab(tabIndex);
        return;
    }

    // if not, fetch page and create it
    // const tabHeader = document.getElementById("tab-header");
    const mainWindow = window.top.document.getElementById("window").contentDocument
    const tabHeader = mainWindow.getElementById("tab-header");
    const pageWindow = mainWindow.getElementById("page-window");
    window.top.db.get(id)
        .then(page => {
            const path = window.top.pagePaths[page.fileType] + "?id=" + encodeURIComponent(page._id)
            addNewTab(page.name, path, tabHeader, pageWindow)
        })

    // const page = await window.top.db.get(id);
    // const path = window.top.pagePaths[page.fileType] + "?id=" + encodeURIComponent(page._id)
    // addNewTab(page.name, path, tabHeader, pageWindow)

}

function addNewTab(title, path, tabHeader, pageWindow) {
    const query = path.split("?")[1];
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("id");
    const newTabInfo = { title, path, id };
    const newIndex = window.top.tabs.length;
    
    // Switch to tab if it already exists
    if (id) {
        const index = window.top.tabs.findIndex((tab) => tab.id === id);
        if (index != -1) {
            switchTab(index);
            return;
        }
    }

    window.top.tabs.push(newTabInfo);

    createTab(newIndex, tabHeader, pageWindow)
    switchTab(newIndex);
}

function removeTab(index) {
    const tabInfo = window.top.tabs[index];

    tabInfo.containerElem.remove();
    tabInfo.iframeElem.remove();

    window.top.tabs.splice(index, 1);

    if (index <= currTabIndex) {
        currTabIndex = Math.max(0, currTabIndex-1);
    }
    if (window.top.tabs.length > 0) {
        switchTab(currTabIndex);
    }
    
}

document.addEventListener("DOMContentLoaded", runTabs);
