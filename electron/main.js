
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, '../public/favicon.ico'),
    backgroundColor: '#0F0F0F', // Match app's dark theme
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    // In development, load from the dev server
    mainWindow.loadURL('http://localhost:8080');
    // Open DevTools for debugging
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from the built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

// Create window when Electron is ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS, re-create window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for file system operations
ipcMain.handle('select-directory', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  
  if (canceled) {
    return null;
  }
  return filePaths[0];
});

ipcMain.handle('create-project-structure', async (event, { basePath, structure }) => {
  try {
    // Create the project structure recursively
    createStructure(basePath, structure);
    return { success: true, path: basePath };
  } catch (error) {
    console.error('Error creating project structure:', error);
    return { success: false, error: error.message };
  }
});

// Helper function to create directory structure
function createStructure(basePath, structure) {
  // Create base directory if it doesn't exist
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }
  
  // Create all subdirectories and files
  if (structure && typeof structure === 'object') {
    Object.entries(structure).forEach(([name, content]) => {
      const itemPath = path.join(basePath, name);
      
      if (typeof content === 'object') {
        // If content is an object, it's a directory
        if (!fs.existsSync(itemPath)) {
          fs.mkdirSync(itemPath, { recursive: true });
        }
        // Create its contents recursively
        createStructure(itemPath, content);
      } else if (typeof content === 'string') {
        // If content is a string, it's a file with that content
        fs.writeFileSync(itemPath, content);
      } else if (content === null) {
        // If content is null, it's an empty file
        fs.writeFileSync(itemPath, '');
      }
    });
  }
}
