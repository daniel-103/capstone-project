// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const PouchDB = require('pouchdb');
PouchDB.plugin(require("pouchdb-find"));

const path = require('path');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let pouchDB;
let couchDB;

const createWindow = () => {
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

  // Create the pouch database
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'Skriptor');
  console.log(`Database path: ${dbPath}`);
  pouchDB = new PouchDB(dbPath);  

  // and load the index.html of the app.
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



ipcMain.handle('get-app-path', () => {
    return __dirname.replace(/\\/g, '/');
})



ipcMain.handle('put', async (_, doc) => {
  try {
    const result = await pouchDB.put(doc);
    return result;
  } catch (error) {throw error}
});

ipcMain.handle('post', async (_, doc) => {
  try {
    const result = await pouchDB.post(doc);
    return result;
  } catch (error) {throw error}
});

// await window.pouchDB.update('docID', { name: 'Updated Name', data.last: new Date() });
ipcMain.handle('update', async (_, id, updates) => {
  try {
      const doc = await pouchDB.get(id);
      const updatedDoc = { ...doc, ...updates }; // Merge existing fields
      const response = await pouchDB.put(updatedDoc);
      return response;
  } catch (error) {throw error}
});

ipcMain.handle('get', async (_, id) => {
  try {
    const doc = await pouchDB.get(id);
    return doc;
  } catch (error) {throw error}
});

ipcMain.handle('getAll', async () => {
  try {
    const result = await pouchDB.allDocs({ include_docs: true });
    return result.rows.map(row => row.doc);
  } catch (error) {throw error}
});

ipcMain.handle('remove', async (_, id) => {
  try {
    const doc = await pouchDB.get(id);
    const result = await pouchDB.remove(doc);
    return result;
  } catch (error) {return error}
});

ipcMain.handle('find', async (_, query) => {
  try {
    const doc = await pouchDB.find(query);
    const result = doc.docs;
    return result;
  } catch (error) {return error}
});

ipcMain.handle('createIndex', async (_, indexDef) => {
  try {
      const result = await pouchDB.createIndex(indexDef);
      return result;
  } catch (error) {return error}
});

ipcMain.handle('allDocs', async (_, options) => {
  try {
      const result = await pouchDB.allDocs(options);
      return result;
  } catch (error) {return error}
});

ipcMain.handle('getIndexes', async () => {
  try {
      const indexes = await pouchDB.getIndexes();
      return indexes;
  } catch (error) {return error}
});

ipcMain.handle('setCouchURL', async (_, url, syncType) => {
  try {
    return await setCouchURL(url, syncType);
  } catch (error) {
    return { error: true, message: error.message };
  }
});

async function setCouchURL(url, syncType) {
  if (!url) return { error: true, message: 'Invalid URL' };

  try {
    couchDB = new PouchDB(url);
    console.log('hi')
    
    switch (syncType) {
      case 'merge':
        pouchDB.sync(couchDB, { live: true, retry: true })
          .on('change', info => console.log('Sync change:', info))
          .on('error', error => console.log('Sync error:', error));
        return { message: 'Updated CouchDB URL:', url };

      case 'ovrR':
        await pouchDB.replicate.to(couchDB, { live: false });
        return await setCouchURL(url, 'merge');

      case 'ovrL':
        await pouchDB.replicate.from(couchDB, { live: false });
        return await setCouchURL(url, 'merge');
      
      default:
        return { error: true, message: 'Invalid sync method' };

    }
  } catch (error) {
    console.log(error)
    return error
  }
}


// Application specific
// THESE SHOULD BE MOVED TO THEIR OWN FILES (if no two files need the same code)
// This is only really needed if two separate files need to call the same function.
// newProject is only called by project.js so it should be moved there at some point.

ipcMain.handle('newProject', async (_, newProj) => {
  try {
    const newProjPostResponse = await pouchDB.post(newProj);
    const programObject = await pouchDB.get('Skriptor');
    programObject.projects.push(newProjPostResponse.id);
    const programUpdateResponse = await pouchDB.put(programObject);
    return { newProjPostResponse, programUpdateResponse };
  } catch (error) {return error}
})

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