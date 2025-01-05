// Add event listeners for the window controls
document.getElementById('minimize').addEventListener('click', () => {
    window.electron.minimize();
});

document.getElementById('maximize').addEventListener('click', () => {
    window.electron.maximize();
});

document.getElementById('close').addEventListener('click', () => {
    window.electron.close();
});