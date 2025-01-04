// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld('electron', {
    getAppPath: () => ipcRenderer.invoke('get-app-path'),
});

// set theme manually. This is only needed once. After that, the theme is saved in localStorage
localStorage.setItem('theme', 'assets/themes/dark.css');

// set theme to dark if it doesn't exist
if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'assets/themes/dark.css');