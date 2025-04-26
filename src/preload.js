// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');
const { replicate } = require('pouchdb');
const { mergeToPouch, deleteCouch } = require('./db');

// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld('electron', {
    minimize: () => ipcRenderer.send('minimize-window'),
    maximize: () => ipcRenderer.send('maximize-window'),
    close: () => ipcRenderer.send('close-window'),

    getAppPath: () => ipcRenderer.invoke('get-app-path'),
    
    getThemes: () => ipcRenderer.invoke('getThemes'),
    openThemes: () => ipcRenderer.invoke('openThemes'),
});

// Database methods
contextBridge.exposeInMainWorld('db', {
  // dbs
  clearPouch: () => ipcRenderer.invoke('clearPouch'),
  clearCouch: () => ipcRenderer.invoke('clearCouch'),
  deleteCouch: () => ipcRenderer.invoke('deleteCouch'),
  linkCouch: (url) => ipcRenderer.invoke('linkCouch', url),
  unlinkCouch: () => ipcRenderer.invoke('unlinkCouch'),
  merge:() => ipcRenderer.invoke('merge'),
  mergeToPouch: () => ipcRenderer.invoke('mergeToPouch'),
  mergeToCouch: () => ipcRenderer.invoke('mergeToCouch'),
  replicateToCouch: () => ipcRenderer.invoke('replicateToCouch'),
  replicateToPouch: () => ipcRenderer.invoke('replicateToPouch'),
  sync: () => ipcRenderer.invoke('sync'),
  unsync: () => ipcRenderer.invoke('unsync'),

  // objects
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
    
  // other
  newProject: (doc) => ipcRenderer.invoke('newProject', doc)
});

// Right click menu for module pages
contextBridge.exposeInMainWorld('rightClickMenu', {
    show: (template) => ipcRenderer.send('get-module-page-menu', template),
    onMenuAction: (callback) => {
      ipcRenderer.on('module-menu-action', (_, actionId) => callback(actionId));
    }
  });