window.addEventListener('message', (event) => {
    if (event.data.action === 'startHeaderButtonsTour') {
        const dropdowns = [
            {
                menuButton: document.getElementById('file'), // File menu button
                menuContent: document.getElementById('file').parentElement.querySelector(".header-dropdown-wrapper"), // File dropdown content
                steps: [
                    {
                        element: '#file-save-btn',
                        intro: "This button saves your document.",
                        position: 'bottom'
                    },
                    {
                        element: '#file-save-as-btn',
                        intro: "Use this to save your document in different formats.",
                        position: 'bottom'
                    },
                    {
                        element: '#file-save-as-pdf-btn',
                        intro: "Save your document as a PDF file.",
                        position: 'bottom',
                        onBefore: () => {
                            // Open the dropdown for file-save-as-btn
                            const fileSaveAsBtn = document.getElementById('file-save-as-btn');
                            const fileSaveAsDropdown = fileSaveAsBtn.parentElement.querySelector(".foldout-wrapper");
                            fileSaveAsDropdown.classList.add("open");
                            fileSaveAsBtn.classList.add("open");
                        }
                    },
                    {
                        element: '#file-save-as-docx-btn',
                        intro: "Save your document as a DOCX file.",
                        position: 'bottom'
                    },
                    {
                        element: '#file-save-as-txt-btn',
                        intro: "Save your document as a TXT file.",
                        position: 'bottom'
                    },
                    {
                        element: '#file-open-btn',
                        intro: "Click here to open an existing document.",
                        position: 'bottom',
                        onBefore: () => {
                            // Close the dropdown for file-save-as-btn
                            const fileSaveAsBtn = document.getElementById('file-save-as-btn');
                            const fileSaveAsDropdown = fileSaveAsBtn.parentElement.querySelector(".foldout-wrapper");
                            fileSaveAsDropdown.classList.remove("open");
                            fileSaveAsBtn.classList.remove("open");
                        }
                    },
                    {
                        element: '#file-settings-btn',
                        intro: "Access the settings menu to configure your preferences.",
                        position: 'bottom'
                    }
                ]
            },
            {
                menuButton: document.getElementById('edit'), // Edit menu button
                menuContent: document.getElementById('edit').parentElement.querySelector(".header-dropdown-wrapper"), // Edit dropdown content
                steps: [
                    {
                        element: '#edit-undo-btn',
                        intro: "Click here to undo your last action (Ctrl + Z).",
                        position: 'bottom'
                    },
                    {
                        element: '#edit-redo-btn',
                        intro: "Click here to redo your last undone action (Ctrl + Y).",
                        position: 'bottom'
                    },
                    {
                        element: '#edit-cut-btn',
                        intro: "Use this to cut the selected text (Ctrl + X).",
                        position: 'bottom'
                    },
                    {
                        element: '#edit-copy-btn',
                        intro: "Use this to copy the selected text (Ctrl + C).",
                        position: 'bottom'
                    },
                    {
                        element: '#edit-paste-btn',
                        intro: "Use this to paste the copied or cut text (Ctrl + V).",
                        position: 'bottom'
                    },
                    {
                        element: '#edit-find-btn',
                        intro: "Click here to find specific text in your document.",
                        position: 'bottom'
                    },
                    {
                        element: '#edit-replace-btn',
                        intro: "Click here to find and replace text in your document.",
                        position: 'bottom'
                    }
                ]
            },
            {
                menuButton: document.getElementById('view'), // View menu button
                menuContent: document.getElementById('view').parentElement.querySelector(".header-dropdown-wrapper"), // View dropdown content
                steps: [
                    {
                        element: '#view-zoom-in-btn',
                        intro: "Use this button to zoom in on your document (Ctrl + Shift + +).",
                        position: 'bottom'
                    },
                    {
                        element: '#view-zoom-out-btn',
                        intro: "Use this button to zoom out of your document (Ctrl + -).",
                        position: 'bottom'
                    },
                    {
                        element: '#view-reset-zoom-btn',
                        intro: "Click here to reset the zoom level to default (Ctrl + 0).",
                        position: 'bottom'
                    }
                ]
            },
            {
                menuButton: document.getElementById('insert'), // Insert menu button
                menuContent: document.getElementById('insert').parentElement.querySelector(".header-dropdown-wrapper"), // Insert dropdown content
                steps: [
                    {
                        element: '#insert-image-btn',
                        intro: "Click here to insert an image into your document.",
                        position: 'bottom'
                    },
                    {
                        element: '#insert-table-btn',
                        intro: "Click here to insert a table into your document.",
                        position: 'bottom'
                    }
                ]
            },
            {
                menuButton: document.getElementById('format'), // Format menu button
                menuContent: document.getElementById('format').parentElement.querySelector(".header-dropdown-wrapper"), // Format dropdown content
                steps: [
                    {
                        element: '#insert-header-btn',
                        intro: "Use this to insert a header into your document.",
                        position: 'bottom'
                    },
                    {
                        element: '#insert-footer-btn',
                        intro: "Use this to insert a footer into your document.",
                        position: 'bottom'
                    },
                    {
                        element: '#insert-page-number-btn',
                        intro: "Use this to insert page numbers into your document.",
                        position: 'bottom'
                    }
                ]
            },
            {
                menuButton: document.getElementById('tools'), // Tools menu button
                menuContent: document.getElementById('tools').parentElement.querySelector(".header-dropdown-wrapper"), // Tools dropdown content
                steps: [
                    {
                        element: '#tools-spelling-btn',
                        intro: "Click here to check spelling and grammar in your document.",
                        position: 'bottom'
                    },
                    {
                        element: '#tools-word-count-btn',
                        intro: "Click here to view the word count of your document.",
                        position: 'bottom'
                    }
                ]
            }
        ];

        // Function to open a dropdown menu
        const openDropdown = (menuButton, menuContent) => {
            menuContent.classList.toggle("open");
            menuButton.classList.toggle("open");
        };

        // Function to close a dropdown menu
        const closeDropdown = (menuButton, menuContent) => {
            menuContent.classList.remove("open");
            menuButton.classList.remove("open");
        };

        // Start the tutorial for each dropdown menu
        const startDropdownTutorial = (dropdown) => {
            return new Promise((resolve) => {
                openDropdown(dropdown.menuButton, dropdown.menuContent); // Open the dropdown menu
                introJs()
                    .setOptions({
                        steps: dropdown.steps.map((step) => ({
                            ...step,
                            onBeforeChange: step.onBefore || (() => {}), // Execute onBefore if defined
                            onAfterChange: step.onAfter || (() => {}) // Execute onAfter if defined
                        })),
                        tooltipClass: 'introjs-tooltip'
                    })
                    .onbeforechange((targetElement) => {
                        const step = dropdown.steps.find((s) => s.element === `#${targetElement.id}`);
                        if (step && step.onBefore) step.onBefore();
                    })
                    .oncomplete(() => {
                        closeDropdown(dropdown.menuButton, dropdown.menuContent); // Close the dropdown menu after the tutorial
                        resolve();
                    })
                    .onexit(() => {
                        closeDropdown(dropdown.menuButton, dropdown.menuContent); // Close the dropdown menu if the tutorial is exited
                        resolve(); // Resolve the promise to move to the next dropdown
                    })
                    .start(); // Start the tutorial for this dropdown
            });
        };

        // Iterate through each dropdown and start its tutorial
        const runTutorial = async () => {
            for (const dropdown of dropdowns) {
                await startDropdownTutorial(dropdown);
            }
        };

        runTutorial(); // Start the full tutorial
    }
});


/*
window.addEventListener('message', async (event) => {
    if (event.data.action === 'startHeaderButtonsTour') {
        console.log("opening file button");
        const file = document.getElementById('file');
        console.log("file button", file);
        const fileDropdown = document.getElementById('file').parentElement.querySelector(".header-dropdown-wrapper");
        console.log("File dropdown:", fileDropdown);
        fileDropdown.classList.toggle("open");
        file.classList.toggle("open");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const fileSave = document.getElementById('file-save-as-btn');
        const fileSaveDropdown = fileSave.parentElement.querySelector(".foldout-wrapper");
        fileSaveDropdown.classList.toggle("open");
        fileSave.classList.toggle("open");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        fileDropdown.classList.remove("open");
        file.classList.remove("open");

    }
});
*/
