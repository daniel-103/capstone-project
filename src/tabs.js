const tabs = [
    { title: "Tab 1", path: "components/page/page.html"},
    { title: "Tab 2", path: "components/page/page.html"}
];

let currTabIndex = 0

function runTabs() {
    const tabHeader = document.getElementById("tab-header");
    const pageWindow = document.getElementById("page-window");

    tabs.forEach((_,index) => {
        createTab(index, tabHeader, pageWindow);
    });

    switchTab(currTabIndex);

    initPlusButton(tabHeader, pageWindow);
}

function initPlusButton(tabHeader, pageWindow) {
    window.plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.addEventListener("click", () => {
        addNewTab(`Tab ${tabs.length+1}`, "components/page/page.html", tabHeader, pageWindow);
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
    closeButton.textContent = "X";
    closeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const currIndex = tabs.indexOf(currTab);
        removeTab(currIndex);
    });

    tabContainer.appendChild(tabButton);
    tabContainer.appendChild(closeButton);

    // Page associated with tab
    const iframe = document.createElement("iframe");
    iframe.src = currTab.path
    iframe.style.display = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    currTab.containerElem = tabContainer;
    currTab.closeElem = closeButton;
    currTab.buttonElem = tabButton;
    currTab.iframeElem = iframe;

    if (window.plusButton) {
        tabHeader.insertBefore(tabContainer, window.plusButton);
    } else {
        tabHeader.appendChild(tabContainer);
    }
    
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
    console.log(index);
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
