const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');


// Código adicional de configuración de Electron
app.on('ready', createWindow);

function createWindow() {
  // Crear una nueva ventana del navegador
  const mainWindow = new BrowserWindow({
    width: 935,
    height: 640,
    minWidth: 935,
    minHeight: 640,
    icon: path.join(__dirname, 'inventario.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: false,
      preload: path.join(__dirname,"preload.js"),
    },
  });

  // Cargar el archivo HTML principal de la aplicación
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './src/html/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );


  mainWindow.webContents.openDevTools();

  // Código adicional de la lógica de tu aplicación

  // Cerrar la base de datos al salir de la aplicación
  app.on('before-quit', () => {
    db.close();
  });

  function helloTest(){
    return "Hello, world! from NodeJS!";
  }

  ipcMain.handle("helloTest",() => {
    return helloTest();
  })
}
