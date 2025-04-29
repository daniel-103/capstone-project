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
        })
        .onchange((targetElement) => {
            const toggleSectionViewBtn = document.getElementById('toggle-section-btn');

            if (targetElement.id === 'toggle-section-btn') {
                console.log('targetElement.id:', targetElement.id);
                // Switch back to the file hierarchy
                toggleSectionViewBtn.click();
            }
        })
        .oncomplete(() => {
            const toggleFileViewBtn = document.getElementById('toggle-file-btn');

            // Switch to the file hierarchy
            toggleFileViewBtn.click();
            
            // Grab the 'file-hierarchy' element
            const fileHierarchy = document.getElementById('file-hierarchy');
            console.log('File hierarchy:', fileHierarchy);
            
            // Find the element with the class 'folder root selected' under 'file-hierarchy'
            const selectedFolder = fileHierarchy.querySelector('.folder.root.selected');
            console.log('Selected folder:', selectedFolder);    

            // Find the 'folder-items' element under the selected folder
            const folderItems = selectedFolder.querySelector('.folder-items');
            console.log('Folder items:', folderItems);

            // Locate the 'story' element
            const storyFile = folderItems.querySelector('.file');

            // Check if the 'story' element exists
            if (storyFile) {
                // Extract the name from the element's text content
                const storyName = storyFile.textContent.trim(); 
                console.log('Story name:', storyName);
                storyFile.click(); // Click the story file to open it
            } else {
                console.error('Story file not found.');
            }

            // Notify the parent window that the Hierarchy tutorial is complete after a delay
            setTimeout(() => {
                window.parent.postMessage({ action: 'hierarchyTourComplete' }, '*');
                console.log('Hierarchy tutorial completion message sent.');
            }, 1000); // 1000ms = 1 second delay
        }).start();
    }
});