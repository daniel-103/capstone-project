// Theme injector V2

// Get the current theme from localStorage
const theme = localStorage.getItem('theme');

// Inject theme on document
function injectTheme(documentElement) {
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