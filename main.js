const { app, BrowserWindow,autoUpdater,dialog } = require('electron');
const path = require('path');
const url = require('url');

// Configurar la URL de actualización (debe coincidir con la configuración en package.json)
autoUpdater.setFeedURL('https://github.com/MarvinZzvla/MiInventario-SQL-PC');

// Gestionar eventos de actualización
autoUpdater.on('checking-for-update', () => {
  console.log('Buscando actualizaciones ...')
  // Evento cuando se está buscando una actualización
});

autoUpdater.on('update-available', () => {
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
  // Evento cuando la actualización se ha descargado y está lista para ser instalada
  
});

// Comprobar si hay actualizaciones al iniciar la aplicación
app.on('ready', () => {
  autoUpdater.checkForUpdates();
});

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
      devTools: true,
      preload: path.join(__dirname,"preload.js"),
    },
  });

  // Cargar el archivo HTML principal de la aplicación
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './src/html/index.html')
    })
  );




  mainWindow.webContents.openDevTools();

  // Código adicional de la lógica de tu aplicación

  // Cerrar la base de datos al salir de la aplicación
  app.on('before-quit', () => {
    db.close();
  });
}


function mostrarNotificacionActualizacionPendiente() {
  const opciones = {
    type: 'question',
    buttons: ['Aceptar', 'Rechazar'],
    defaultId: 0,
    title: 'Actualización Pendiente',
    message: 'Una nueva versión de la aplicación está lista para instalarse. ¿Desea actualizar ahora?',
  };

  dialog.showMessageBox(null, opciones, (respuesta) => {
    if (respuesta === 0) {
      // El usuario eligió 'Aceptar', puedes proceder con la instalación aquí
      autoUpdater.quitAndInstall();
    } else {
      // El usuario eligió 'Rechazar', puedes manejarlo según tus necesidades
    }
  });
}
