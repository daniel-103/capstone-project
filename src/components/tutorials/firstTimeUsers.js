function initTutorials() {
    try {
        const tutorialCompleted = localStorage.getItem('tutorialCompleted');
        console.log(`Tutorial completed status: ${tutorialCompleted}`);
        if (tutorialCompleted === null) {
            console.log('First-time user detected. Tutorials will load but only start when instructed.');
            const windowIframe = document.getElementById('window');
            windowIframe.contentWindow.postMessage({ action: 'startprojectHubTutorialFirstUsers' }, '*');
        } else {
            console.log('Tutorials already completed.');
        }
    } catch (error) {
        console.error('Error accessing localStorage:', error);
    }
}

initTutorials();

// Listen for messages from the iframes
window.addEventListener('message', (event) => {
    console.log('Message received F:', event.data);
    if (event.data.action === 'startprojectHubTutorialFirstUsersComplete') {
        const helpButton = document.getElementById('help');
        const helpTutorialButton = document.getElementById('help-tutorial-btn');
        console.log('Help button:', helpButton);
        console.log('Help Tutorial button:', helpTutorialButton);
        if (helpButton) {
            helpButton.click();
            setTimeout(() => {
                helpTutorialButton.click();
            }, 1000);
            helpButton.click();
        } else {
            console.error('Help button not found in the top window.');
        }
    }
});

export function completeTutorials() {
    console.log('All tutorials completed!');
    localStorage.setItem('tutorialCompleted', 'true');
}