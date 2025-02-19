// Theme injector V2

// If no theme in localStorage
async function init() {
    if (!localStorage.getItem('theme')) {
        const appPath = await window.electron.getAppPath();
        localStorage.setItem('theme', `${appPath}/src/assets/themes/dark/dark.css`)
    }
} 

init();


// Inject theme on document
function injectTheme(documentElement) {
    // Get theme from localStorage
    const theme = localStorage.getItem('theme');

    // Get head of document  
    const head = documentElement.head;

    // Try getting current link
    let link = head.querySelector('.theme-link');

    // If no link, create a new one
    if (!link) {
        link = documentElement.createElement('link');
        // Add class for identification
        link.classList.add('theme-link');
        link.rel = 'stylesheet';
        // Append to head
        head.appendChild(link);
    }

    // Set theme
    link.href = theme;

    // For iframes in document
    for (const iframe of documentElement.querySelectorAll('iframe')) {
        // Recursively inject the themes
        injectTheme(iframe.contentDocument)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial theme injection
    injectTheme(document)
})