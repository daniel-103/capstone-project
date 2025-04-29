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
        // Select all template cards
        const templateCards = document.querySelectorAll('.template-card');

        // Find the specific card with the title "Empty Project"
        const emptyProjectCard = Array.from(templateCards).find(card => {
            const titleElement = card.querySelector('.template-title');
            return titleElement && titleElement.textContent.trim() === 'Empty Project';
        });

        // Click the specific card if it exists
        if (emptyProjectCard) {
            emptyProjectCard.click();
        }

        // Notify the parent window that the project hub tutorial for first user is complete
//        console.log('window: ', window.top.document.getElementById('window'));
//        window.top.document.getElementById('window').contentWindow.postMessage({ action: 'startprojectHubTutorialFirstUsersComplete' }, '*');
//        window.parent.postMessage({ action: 'startprojectHubTutorialFirstUsersComplete' }, '*');
        window.parent.postMessage({ action: 'startprojectHubTutorialFirstUsersComplete' }, '*');
        console.log('sending message to start main page tutorial for first-time users...');
    }).start();
}

// Listen for messages from other scripts
window.addEventListener('message', (event) => {
    if (event.data.action === 'startprojectHubTutorialFirstUsers') {
        console.log('Starting Project Hub Tutorial via message...');
        startFirstUserTutorial();
    }
});
