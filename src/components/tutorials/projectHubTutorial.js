const tourButton = window.top.document.getElementById('help-tutorial-btn');

// Attach the event listener to the button
tourButton.addEventListener('click', function () {
    startTutorial();
});

function startTutorial() {
    introJs().setOptions({
        steps: [
            {
                intro: "Welcome to Skriptor!"
            },
            {
                intro: "This is the Project Hub! This is where you can manage your projects."
            },
            {
                element: '#templateGallery',
                intro: "Here is the gallery of templates you can use."
            },
            {
                element: '.dropdown',
                intro: "Use this dropdown to view all your projects."
            },
            {
                element: '#projectGallery',
                intro: "This section displays your current projects."
            }
        ]
    }).start();
}

function startFirstUserTutorial() {
    introJs().setOptions({
        steps: [
            {
                intro: "Welcome to Skriptor!"
            },
            {
                intro: "This is the Project Hub! This is where you can manage your projects."
            },
            {
                element: '#templateGallery',
                intro: "Here is the gallery of templates you can use."
            },
            {
                element: '.dropdown',
                intro: "Use this dropdown to view all your projects."
            },
            {
                element: '#projectGallery',
                intro: "This section displays your current projects."
            }
        ]
    }).oncomplete(() => {
        // Find and click the "Autobiography" template
        const autobiographyTemplate = Array.from(document.querySelectorAll('#templateGallery .template-card'))
            .find(card => card.querySelector('.template-title')?.textContent.trim().toLowerCase() === 'autobiography project');
        console.log('Autobiography Template:', autobiographyTemplate);
        if (autobiographyTemplate) {
            console.log('Clicking the "Autobiography" template...');
            autobiographyTemplate.click();
        } else {
            console.error('The "Autobiography" template was not found in the template gallery!');
        }
    }).start();
}

// Listen for messages from other scripts
window.addEventListener('message', (event) => {
    if (event.data.action === 'startTutorial' && event.data.script === 'projectHubTutorial.js') {
        console.log('Starting Project Hub Tutorial via message...');
        startFirstUserTutorial();
    } else {
        console.warn('Unrecognized message received:', event.data);
    }
});