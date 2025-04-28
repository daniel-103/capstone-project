(function () {
    const tutorials = [
        'projectHubTutorial.js',
        'mainPageTutorial.js',
        'hierarchyTutorial.js',
        'textEditorTutorial.js',
        'headerButtonsTutorial.js',
    ];

    let currentStep = 0;

    function loadScript(scriptName, callback) {
        const script = document.createElement('script');
        script.src = `../src/components/tutorials/${scriptName}`;
        script.onload = callback;
        script.onerror = () => {
            console.error(`Failed to load script: ${scriptName}`);
        };
        document.body.appendChild(script);
    }

    function sendStartMessage(scriptName) {
        console.log(`Sending start message to: ${scriptName}`);
        window.postMessage({ action: 'startTutorial', script: scriptName }, '*');
    }

    function nextTutorial() {
        if (currentStep < tutorials.length) {
            const scriptName = tutorials[currentStep];
            console.log(`Loading tutorial: ${scriptName}`);
            loadScript(scriptName, () => {
                console.log(`Tutorial ${scriptName} loaded.`);
                sendStartMessage(scriptName); // Send a message to start the tutorial
                currentStep++;
            });
        } else {
            completeTutorials();
        }
    }

    function completeTutorials() {
        console.log('All tutorials completed!');
        localStorage.setItem('tutorialCompleted', 'true');
    }

    function initTutorials() {
        try {
            const tutorialCompleted = localStorage.getItem('tutorialCompleted');
            console.log(`Tutorial completed status: ${tutorialCompleted}`);
            if (!tutorialCompleted) {
                console.log('First-time user detected. Tutorials will load but only start when instructed.');
                nextTutorial();
            } else {
                console.log('Tutorials already completed.');
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
    }

//    initTutorials();
})();