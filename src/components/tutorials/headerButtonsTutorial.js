window.addEventListener('message', (event) => {
    if (event.data.action === 'startHeaderButtonsTour') {
        const dropdowns = [
            {
                menuButton: document.getElementById('file'), // File menu button
                menuContent: document.getElementById('file').parentElement.querySelector(".header-dropdown-wrapper"), // File dropdown content
                steps: [
                    {
                        element: '#file',
                        intro: "This is the File menu. Click here to access file-related actions like saving, opening, and exporting documents.",
                        position: 'bottom'
                    },
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
                        position: 'bottom'
                    },
                    {
                        element: '#file-settings-btn',
                        intro: "Access the settings menu to configure your preferences.",
                        position: 'bottom'
                    },
                    {
                        element: '#file-project-types-btn',
                        intro: 'Click here to explore different project types available in the application.',
                        position: 'bottom'
                    }
                ]
            },
            {
                menuButton: document.getElementById('edit'), // Edit menu button
                menuContent: document.getElementById('edit').parentElement.querySelector(".header-dropdown-wrapper"), // Edit dropdown content
                steps: [
                    {
                        element: '#edit',
                        intro: "This is the Edit menu. Click here to access editing actions like undo, redo, cut, copy, and paste.",
                        position: 'bottom'
                    },
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
                        element: '#view',
                        intro: "This is the View menu. Click here to access options for zooming and resetting the view.",
                        position: 'bottom'
                    },
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
                        element: '#insert',
                        intro: "This is the Insert menu. Click here to add elements like images and tables to your document.",
                        position: 'bottom'
                    },
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
                        element: '#format',
                        intro: "This is the Format menu. Click here to access formatting options like headers, footers, and page numbers.",
                        position: 'bottom'
                    },
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
                        element: '#tools',
                        intro: "This is the Tools menu. Click here to access tools like spelling and grammar check or word count.",
                        position: 'bottom'
                    },
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
            return new Promise((resolve, reject) => {
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
                        reject(); // Reject the promise to stop the tutorial
                    })
                    .start(); // Start the tutorial for this dropdown
            });
        };

        // Add tutorial step for the "Logo" button
        const logoStep = {
            element: '#logo-btn',
            intro: 'This is the logo button. Clicking it will take you back to the project hub.',
            position: 'bottom'
        };

        // Function to start the tutorial for the logo button
        const startLogoTutorial = () => {
            return new Promise((resolve, reject) => {
                introJs()
                    .setOptions({
                        steps: [logoStep],
                        tooltipClass: 'introjs-tooltip'
                    })
                    .oncomplete(() => resolve()) // Resolve the promise when the tutorial is complete
                    .onexit(() => reject()) // Reject the promise if the tutorial is exited
                    .start();
            });
        };

        // Iterate through each dropdown and start its tutorial
        const runTutorial = async () => {
            await startLogoTutorial();
            for (const dropdown of dropdowns) {
                await startDropdownTutorial(dropdown);
            }
        };

        runTutorial(); // Start the full tutorial
    }
});
