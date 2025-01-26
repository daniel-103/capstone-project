// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const PouchDB = require('pouchdb');
PouchDB.plugin(require("pouchdb-find"));

const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let db;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
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

  // Create the database
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'db'); // Rename 'db' to final name
  console.log(`Database path: ${dbPath}`);
  db = new PouchDB(dbPath);

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html');
  // mainWindow.loadFile('src/components/template/template.html');
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



ipcMain.handle('get-app-path', () => {
    return __dirname;
})



ipcMain.handle('put', async (event, doc) => {
  try {
    const result = await db.put(doc);
    return result;
  } catch (error) {return error}
});

ipcMain.handle('get', async (event, id) => {
  try {
    const doc = await db.get(id);
    return doc;
  } catch (error) {return error}
});

ipcMain.handle('remove', async (event, id) => {
  try {
    const doc = await db.get(id);
    const result = await db.remove(doc);
    return result;
  } catch (error) {return error}
});

ipcMain.handle('find', async (event, query) => {
  try {
    const doc = await db.find(query);
    const result = doc.docs;
    return result;
  } catch (error) {return error}
});

ipcMain.handle('createIndex', async (event, indexDef) => {
  try {
      const result = await db.createIndex(indexDef);
      return result;
  } catch (error) {return error}
});

ipcMain.handle('allDocs', async (event, options) => {
  try {
      const result = await db.allDocs(options);
      return result;
  } catch (error) {return error}
});

ipcMain.handle('getIndexes', async () => {
  try {
      const indexes = await db.getIndexes();
      return indexes;
  } catch (error) {return error}
});
