let themePath;

// Get theme from local storage
const themeFile = localStorage.getItem('theme') || 'assets/themes/dark.css';


// Get path from ipc through context bridge
window.electron.getAppPath().then(appPath => {
    // Construct theme path
    themePath = `${appPath}/src/${themeFile}`;
});

// Once document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Inject theme for the root document
    injectTheme(document);
});

function injectTheme(object) {
    // console.log('injecting theme into object', object);

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

    // Recursively inject into nested iframes
    doc.querySelectorAll('iframe').forEach(nestedIframe => {
        // Try to inject theme into nested iframe
        injectTheme(nestedIframe);

        // Wait for it to load and try again just in case       this should be replaced so iframes arent injected twice
        nestedIframe.addEventListener('load', () => {
            injectTheme(nestedIframe);
        });
    });
}

window.injectTheme = injectTheme;