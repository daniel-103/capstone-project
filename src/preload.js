// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld('electron', {
    minimize: () => ipcRenderer.send('minimize-window'),
    maximize: () => ipcRenderer.send('maximize-window'),
    close: () => ipcRenderer.send('close-window'),
    getAppPath: () => ipcRenderer.invoke('get-app-path')
});

// set theme manually. This is only needed once. After that, the theme is saved in localStorage
localStorage.setItem('theme', 'assets/themes/spaceDust.css');

// set theme to dark if it doesn't exist
if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'assets/themes/dark.css');