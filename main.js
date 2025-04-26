// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');

const path = require('path');
const fs = require('fs');
const db = require('./src/db');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1250,
    height: 800,
    frame: false,
    webPreferences: { 
      preload: path.join(__dirname, 'src/preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  // Hide the menu bar
  mainWindow.setMenuBarVisibility(false)

  // Open devtools if in dev env
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Initialize PouchDB
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'Skriptor');
  db.initPouchDB(dbPath);

  // Load the index.html of the app.
  mainWindow.loadFile('src/index.html');
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Window controls
ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
  } else {
      mainWindow.maximize();
  }
});

ipcMain.on('close-window', () => {
  mainWindow.close();
});

ipcMain.on('get-module-page-menu', (event, template) => {
  const processMenu = (items) => items.map(item => {
    if (item.submenu) item.submenu = processMenu(item.submenu);
    if (item.clickId) {
      item.click = () => {
        event.sender.send('module-menu-action', item.clickId);
      };
    }
    return item;
  });

  try {
    const menu = Menu.buildFromTemplate(processMenu(JSON.parse(template)));
    menu.popup();
  } catch (error) {
    console.error('Menu error:', error);
  }
});

ipcMain.handle('get-app-path', () => {
    return __dirname.replace(/\\/g, '/');
})

ipcMain.handle('clearPouch', db.clearPouch);
ipcMain.handle('clearCouch', db.clearCouch);
ipcMain.handle('deleteCouch', db.deleteCouch);
ipcMain.handle('linkCouch', (_, url) => db.linkCouch(url));
ipcMain.handle('unlinkCouch', db.unlinkCouch);
ipcMain.handle('merge', db.merge);
ipcMain.handle('mergeToPouch', db.mergeToPouch);
ipcMain.handle('mergeToCouch', db.mergeToCouch);
ipcMain.handle('replicateToCouch', db.replicateToCouch);
ipcMain.handle('replicateToPouch', db.replicateToPouch);
ipcMain.handle('sync', db.sync);
ipcMain.handle('unsync', db.unsync);

ipcMain.handle('put', async (_, doc) => db.put(doc));
ipcMain.handle('post', async (_, doc) => db.post(doc));
ipcMain.handle('update', async (_, id, updates) => db.update(id, updates));
ipcMain.handle('get', async (_, id) => db.get(id));
ipcMain.handle('getAll', async (_) => db.getAll());
ipcMain.handle('remove', async (_, id) => db.remove(id));
ipcMain.handle('find', async (_, query) => db.find(query));
ipcMain.handle('createIndex', async (_, indexDef) => db.createIndex(indexDef));
ipcMain.handle('allDocs', async (_, options) => db.allDocs(options));
ipcMain.handle('getIndexes', async (_) => db.getIndexes());

// Application specific
// THESE SHOULD BE MOVED TO THEIR OWN FILES (if no two files need the same code)
// This is only really needed if two separate files need to call the same function.
// newProject is only called by project.js so it should be moved there at some point.

ipcMain.handle('getThemes', async () => {
  const themesPath = path.join(__dirname, 'src/assets/themes');
  return getThemes(themesPath)
})

function getThemes(dir) {
  let results = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
          results.push({ folder: file.name, children: getThemes(filePath) });
      } else if (file.isFile() && file.name.endsWith('.css')) {
          results.push({ file: file.name, path: filePath });
      }
  }
  return results;
}

ipcMain.handle('openThemes', async () => {
  const themesPath = path.join(__dirname, 'src/assets/themes');
  if (fs.existsSync(themesPath)) {
    shell.openPath(themesPath);
  } else {
    // create it then open
    return { error: true, message: 'Folder does not exist' };
  }
})