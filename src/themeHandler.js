let themePath;

// Get theme from local storage
const themeFile = localStorage.getItem('theme') || 'assets/themes/dark.css';

// Get path from ipc through context bridge
window.electron.getAppPath().then(appPath => {
    // Construct theme path
    themePath = `${appPath}/src/${themeFile}`;

    // Start theme injection from the root document
    injectTheme(document);
});

function injectTheme(object) {
    // Inject theme for the current object (document or imported object)
    const doc = object.contentDocument || object;

    // Do nothing if no document
    if (!doc) return;

    // Create or update theme link 
    const existingLink = doc.querySelector('#theme-link');
    if (!existingLink) {
        const link = doc.createElement('link');
        link.id = 'theme-link';
        link.rel = 'stylesheet';
        link.href = themePath;
        doc.head.appendChild(link);
    } else {
        existingLink.href = themePath;
    }

    // Recursively inject into nested imported objects
    doc.querySelectorAll('.import').forEach(nestedObject => {
        nestedObject.addEventListener('load', () => {
            injectTheme(nestedObject);
        });
    });
}