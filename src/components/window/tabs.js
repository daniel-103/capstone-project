window.tabs = [];

window.currTabIndex = 0

const defaultPagePath = "../text_editor/text_editor.html";

function runTabs() {
    const tabHeader = document.getElementById("tab-header");
    const pageWindow = document.getElementById("page-window");

    addNewTab(`Tab 1`, defaultPagePath, tabHeader, pageWindow);

    initPlusButton(tabHeader, pageWindow);
}

function initPlusButton(tabHeader, pageWindow) {
    window.plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.addEventListener("click", () => {
        addNewTab(`Tab ${tabs.length+1}`, defaultPagePath, tabHeader, pageWindow);
    });

    tabHeader.appendChild(plusButton);
}

function createTab(index, tabHeader, pageWindow) {
    
    const currTab = tabs[index];

    const tabContainer = document.createElement("div");
    tabContainer.classList.add("tab");

    // Tab Header
    const tabButton = document.createElement("button");
    tabButton.textContent = currTab.title;
    
    tabButton.addEventListener("click", () => {
        const currIndex = tabs.indexOf(currTab);
        switchTab(currIndex);
    });

    // Close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>';
    closeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const currIndex = tabs.indexOf(currTab);
        removeTab(currIndex);
    });

    tabContainer.appendChild(tabButton);
    tabContainer.appendChild(closeButton);

    // Page associated with tab
    const iframe = document.createElement("iframe");
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
        window.parent.injectTheme(iframe);
    });
    
    pageWindow.appendChild(iframe); 
}

function switchTab(index) {
    tabs[currTabIndex].iframeElem.style.display = "none";
    tabs[currTabIndex].containerElem.classList.remove("active");

    tabs[index].iframeElem.style.display = "block";
    tabs[index].containerElem.classList.add("active");

    currTabIndex = index;
}

function addNewTab(title, path, tabHeader, pageWindow) {
    const newTabInfo = { title, path };

    const newIndex = tabs.length;

    tabs.push(newTabInfo);

    createTab(newIndex, tabHeader, pageWindow) 
    switchTab(newIndex);
}

function removeTab(index) {
    // console.log(index);
    const tabInfo = tabs[index];

    tabInfo.containerElem.remove();
    tabInfo.iframeElem.remove();

    tabs.splice(index, 1);

    if (index <= currTabIndex) {
        currTabIndex = Math.max(0, currTabIndex-1);
    }
    if (tabs.length > 0) {
        switchTab(currTabIndex);
    }
    
}

document.addEventListener("DOMContentLoaded", runTabs);
