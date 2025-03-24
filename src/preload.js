// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld('electron', {
    minimize: () => ipcRenderer.send('minimize-window'),
    maximize: () => ipcRenderer.send('maximize-window'),
    close: () => ipcRenderer.send('close-window'),

    getAppPath: () => ipcRenderer.invoke('get-app-path'),
    
    getThemes: () => ipcRenderer.invoke('getThemes'),
});

// Database methods
contextBridge.exposeInMainWorld('db', {
    put: (doc) => ipcRenderer.invoke('put', doc),
    post: (doc) => ipcRenderer.invoke('post', doc),
    update: (id, updates) => ipcRenderer.invoke('update', id, updates),
    get: (id) => ipcRenderer.invoke('get', id),
    getAll: () => ipcRenderer.invoke('getAll'),
    remove: (id) => ipcRenderer.invoke('remove', id),
    find: (query) => ipcRenderer.invoke('find', query),
    createIndex: (indexDef) => ipcRenderer.invoke('createIndex', indexDef),
    allDocs: (options) => ipcRenderer.invoke('allDocs', options),
    getIndexes: () => ipcRenderer.invoke('getIndexes'),

    setCouchURL: (url, syncType) => ipcRenderer.invoke('setCouchURL', url, syncType),

    newProject: (doc) => ipcRenderer.invoke('newProject', doc),
});