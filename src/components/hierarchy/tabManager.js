// const defaultPagePath = "../default_page/default_page.html";
const tabHeader = window.parent.document.getElementById("tab-header");
const pageWindow = window.parent.document.getElementById("page-window");

function createTab(tabName, pageId) {
    if (DUBUG) console.log(`🛠 [11] Creating new tab for "${tabName}" with id "${pageId}"...`);
    const tabHeader = parent.document.getElementById('tab-header');
    const tabElement = document.createElement('div');
    tabElement.classList.add('tab');
    tabElement.dataset.pageId = pageId;

    const tabNameElement = document.createElement('p');
    tabNameElement.textContent = tabName;

    tabElement.appendChild(tabNameElement);

    const closeTabBtn = document.createElement('btn');
    closeTabBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>';
    closeTabBtn.style = 'width: 1rem;'

    // Delete tab button on tab close (X)
    closeTabBtn.addEventListener('click', function(event) {
        event.stopPropagation();

        // Is the staged page tab being closed?
        if (window.top.stagedPage._id == this.parentElement.dataset.pageId) {
            // Need to save it before closing.

            // Make the open the next available tab
            const tabs = Array.from(tabHeader.querySelectorAll('.tab'))
            // Find the index of the tab to be deleted
            const index = tabs.findIndex(tab => tab.dataset.pageId == pageId);

            // Remove the tab
            this.parentElement.remove();

            // Get the tabs after removal (can do this by removing it from the other array but this is just simpler)
            const updatedTabs = Array.from(tabHeader.querySelectorAll('.tab'))
            // If there are still tabs left,
            if (!updatedTabs.length == 0) {
                // If tab was the last tab, next tab is the previous, else it's the next 
                const nextIndex = index >= updatedTabs.length ? index - 1 : index;

                // Get the next tab
                const nextTab = updatedTabs[nextIndex];
                // Get the next tab's id
                const nextPageId = nextTab.dataset.pageId;
                // Set it as the active tab
                nextTab.classList.add('active');
                // Get the next tab's page
                window.top.db.get(nextPageId)
                    .then(page => {
                        constructPage(page)
                    })
            } else {
                // There's no tabs left, set html page to blank
                pageWindow.innerHTML = '';
            }
        } else {
            // The staged page is not being removed, all good. Just remove the button.
            this.parentElement.remove();
        }
    })

    tabElement.appendChild(closeTabBtn);

    // Open page on tab click
    tabElement.addEventListener('click', () => {
        for (const tab of tabHeader.querySelectorAll('.tab')) {
            tab.classList.remove('active');
        }
        tabElement.classList.add('active');
        window.top.db.get(pageId)
            .then(page => constructPage(page))
    })

    tabHeader.appendChild(tabElement);

    if (DUBUG) console.log(`✅ [11] Created tab for "${tabName}".`, tabElement);
}