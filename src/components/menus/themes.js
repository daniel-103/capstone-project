console.log('bla')

// Just on the logo button for now.
document.getElementById('logo-btn').addEventListener('click', () => {
    if (localStorage.getItem('theme') === 'assets/themes/dark.css') {
        localStorage.setItem('theme', 'assets/themes/spaceDust.css');
    } else {
        localStorage.setItem('theme', 'assets/themes/dark.css');
    }
    injectTheme(document);
    console.log('Theme changed');
    location.reload();
});