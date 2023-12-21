const { app, BrowserWindow, dialog, ipcMain, ipcRenderer } = require('electron');
const {autoUpdater } = require('electron-updater');
const fs = require('fs');
const path = require('path');
const url = require('url');

const userDataPath = app.getPath('userData');

// Código adicional de configuración de Electron
app.whenReady(createWindow).then(() => {
  configDatabase()
  createWindow()
});


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
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Cargar el archivo HTML principal de la aplicación
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './src/html/index.html')
    })

  );

  mainWindow.webContents.openDevTools();
  mainWindow.webContents.send('userData',path.join(app.getPath('userData'), 'my-database'));
  
  

  // Código adicional de la lógica de tu aplicación

  // Cerrar la base de datos al salir de la aplicación
  app.on('before-quit', () => {
    db.close();

  });
}
function configDatabase() {

  const databseApp = path.join(userDataPath,"mysqlite.db")
  if(!fs.existsSync(databseApp)){
    const dbStatic = path.join(__dirname,"mysqlite.db")
    try{
      fs.copyFileSync(dbStatic,databseApp);
    }
    catch(error){
      console.log(error)
    }
  }

  ipcMain.on('userData',(event) => {
    event.reply('db-path',databseApp)
  })

}

// Configurar la URL de actualización (debe coincidir con la configuración en package.json)
//autoUpdater.setFeedURL('https://github.com/MarvinZzvla/MiInventario-SQL-PC');

// Gestionar eventos de actualización
autoUpdater.on('checking-for-update', () => {
  console.log('Buscando actualizaciones ...')

  // Evento cuando se está buscando una actualización
});

autoUpdater.on('update-available', () => {
  autoUpdater.autoDownload = true;
  // Evento cuando hay una actualización disponible

  console.log("Se ha encontrado una actualización")
});

autoUpdater.on('update-not-available', () => {
  // Evento cuando no hay actualización disponible

  console.log('La app esta actualizada ...')
});

autoUpdater.on('error', (error) => {
  // Evento en caso de error durante la actualización
  console.error('Error durante la actualización:', error.message);
});

autoUpdater.on('update-downloaded', () => {
  mostrarNotificacionActualizacionPendiente()
  // autoUpdater.quitAndInstall();
  // Evento cuando la actualización se ha descargado y está lista para ser instalada

});

// Comprobar si hay actualizaciones al iniciar la aplicación
app.on('ready', () => {
  
  autoUpdater.checkForUpdates();
});


function mostrarNotificacionActualizacionPendiente(error) {
  const opciones = {
    type: 'question',
    buttons: ['Aceptar', 'Rechazar'],
    defaultId: 0,
    title: 'Actualización Pendiente',
    message: 'Una nueva versión de la aplicación está lista para instalarse. ¿Desea actualizar ahora?',
  };

  const respuesta = dialog.showMessageBoxSync(null, opciones,)
  if (respuesta == 0) {
    autoUpdater.quitAndInstall();
  }
  else {

  }
}
