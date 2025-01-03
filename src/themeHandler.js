// document.getElementById('theme-stylesheet').href = themeFile;
// localStorege.setItem('theme', themeFile);

// Get theme from local storage (for later)
const themeFile = localStorage.getItem('theme') || 'assets/themes/light.css';
document.getElementById('theme-stylesheet').href = themeFile;

// Get path from ipc through context bridge
window.electron.getAppPath().then(appPath => {
    // For each imported object
    document.querySelectorAll('.import').forEach(importedObject => {
        // Wait until it's loaded
        importedObject.onload = () => {
            // Get the child document
            const childDoc = importedObject.contentDocument || importedObject.contentWindow.document;
            // Apply the link if the child document exists
            if (childDoc) {
                const link = childDoc.createElement('link');
                link.rel = 'stylesheet';
                link.href = `${appPath}/src/${themeFile}`;
                childDoc.head.appendChild(link);
            }
        }
    });
});


