
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Carrega a aplicação React
  win.loadURL(
    isDev
      ? 'http://localhost:8080'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  // Abre o DevTools automaticamente em desenvolvimento
  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

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

// Configuração do banco de dados SQLite
const Database = require('better-sqlite3');
const db = new Database('vehicles.db');

// Criação das tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS residents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    apartment TEXT NOT NULL,
    plate TEXT UNIQUE NOT NULL
  )
`);

// Handlers do IPC para operações no banco de dados
ipcMain.handle('get-residents', () => {
  const stmt = db.prepare('SELECT * FROM residents');
  return stmt.all();
});

ipcMain.handle('add-resident', (event, resident) => {
  const stmt = db.prepare('INSERT INTO residents (name, apartment, plate) VALUES (?, ?, ?)');
  return stmt.run(resident.name, resident.apartment, resident.plate);
});

