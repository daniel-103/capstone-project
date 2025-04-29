document.addEventListener('DOMContentLoaded', () => {
    const tourButton = window.top.document.getElementById('help-tutorial-btn'); 

    // Attach the event listener to the button
    tourButton.addEventListener('click', function () {
        // Start the tutorial for the parent window
        mainPageTutorial();
    });

    function mainPageTutorial() {
        introJs().setOptions({
            steps: [
                {
                    intro: "Welcome to the main page! Let me guide you through its features."
                },
                {
                    element: '#leftPanel',
                    intro: "This is the left panel, which contains the File Hierarchy."
                },
                {
                    element: '#rightPanel',
                    intro: "This is the right panel, which contains the Text Editor."
                },
                {
                    intro: "Now, let's start the tutorial inside the File Hierarchy."
                }
            ]
        }).oncomplete(() => {
            // Send a message to the Hierarchy iframe to start its tutorial
            const hierarchyIframe = document.getElementById('hierarchyIframe');
            hierarchyIframe.contentWindow.postMessage({ action: 'startHierarchyTour' }, '*');
        }).start();
    }

    // Listen for messages from the iframes
    window.addEventListener('message', (event) => {
        console.log('Message received M:', event.data);
        if (event.data.action === 'hierarchyTourComplete') {
            // Start the Text Editor tutorial after the Hierarchy tutorial is complete
            const textEditorIframe = document.getElementById('textEditorIframe');
            textEditorIframe.contentWindow.postMessage({ action: 'startTextEditorTour' }, '*');
        } else if (event.data.action === 'textEditorTourComplete') {
            window.parent.postMessage({ action: 'startHeaderButtonsTour' }, '*');
        }
    });
});