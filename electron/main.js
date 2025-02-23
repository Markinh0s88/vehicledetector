
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('better-sqlite3');

const isDev = process.env.NODE_ENV === 'development';
const db = new sqlite3('database.db');

// Criar tabela de residentes se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS residents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    apartment TEXT NOT NULL,
    plate TEXT NOT NULL UNIQUE
  )
`);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:8080');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  // Handlers para o SQLite
  ipcMain.handle('add-resident', async (event, resident) => {
    try {
      const stmt = db.prepare('INSERT INTO residents (name, apartment, plate) VALUES (?, ?, ?)');
      stmt.run(resident.name, resident.apartment, resident.plate);
      return { success: true };
    } catch (error) {
      console.error('Erro ao adicionar residente:', error);
      throw error;
    }
  });

  ipcMain.handle('get-residents', async () => {
    try {
      const stmt = db.prepare('SELECT * FROM residents');
      return stmt.all();
    } catch (error) {
      console.error('Erro ao buscar residentes:', error);
      throw error;
    }
  });

  ipcMain.handle('find-resident', async (event, plate) => {
    try {
      const stmt = db.prepare('SELECT * FROM residents WHERE plate = ?');
      return stmt.get(plate);
    } catch (error) {
      console.error('Erro ao buscar residente:', error);
      throw error;
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

