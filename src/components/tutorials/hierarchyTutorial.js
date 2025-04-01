window.addEventListener('message', (event) => {
    if (event.data.action === 'startHierarchyTour') {
        introJs().setOptions({
            steps: [
                {
                    element: '#file-hierarchy-container',
                    intro: "This is the File Hierarchy. It displays your project's file structure."
                },
                {
                    element: '#new-file-btn',
                    intro: "Click this button to create a new file in your project."
                },
                {
                    element: '#new-folder-btn',
                    intro: "Click this button to create a new folder in your project."
                },
                {
                    element: '#to-root-btn',
                    intro: "This button lets you view the root directory as the starting point."
                },
                {
                    element: '#to-current-btn',
                    intro: "This button lets you view the current directory as the starting point."
                },
                {
                    element: '#toggle-section-btn',
                    intro: "Use this button to toggle the Section Hierarchy view."
                },
                {
                    element: '#section-hierarchy-container',
                    intro: "This is the Section Hierarchy. It displays the structure of sections within your project."
                }
            ]
        }).oncomplete(() => {
            // Notify the parent window that the Hierarchy tutorial is complete
            window.parent.postMessage({ action: 'hierarchyTourComplete' }, '*');
        }).start();
    }
});