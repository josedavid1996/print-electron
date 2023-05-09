const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');
const url = require('url');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');



// const printerName = 'Microsoft Print to PDF';
function createWindow() {
  const isDev = !app.isPackaged

  const win = new BrowserWindow({
    width: 800,
    height: 800,
    frame: false,
    resizable: false,
    transparent: true,
    maximizable: true,
    autoHideMenuBar: true,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'src/preload/index.js')
    }
  })

  console.log(__dirname)

  win.loadURL(path.join(__dirname, 'src/index.html'))

  if (isDev) win.webContents.openDevTools()

  win.on('closed', () => win.destroy())

  return win
}


async function printPDF() {
  console.log(path.join(__dirname, 'src/assets/impresion-demo.pdf'))
  // Crear una ventana oculta para imprimir el PDF
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Escuchar el evento 'ready-to-show' para imprimir el PDF
  win.webContents.on('ready-to-show', async () => {
    // Configurar la impresora y las opciones de impresión
    const printerName = 'Microsoft Print to PDF';
    const options = {
      landscape: true,
      marginsType: 1,
      pageSize: 'A4'
    };

    // Imprimir el archivo PDF utilizando la API de impresión de Electron
    const res = await win.webContents.print({
      silent: true,
      deviceName: printerName,
      printBackground: false,
      pageSize: options.pageSize,
      landscape: options.landscape,
      margins: {
        marginType: options.marginsType
      },
      // Especificar la ruta del archivo PDF a imprimir
      pdfPath: path.join(__dirname, 'src/assets/impresion-demo.pdf')
    });
    console.log("res", res)
    win.close();
    app.quit();
  });

  // Cargar una página en blanco para que se dispare el evento 'ready-to-show'
}





ipcMain.on("saludo", () => {
  console.log("hola desde el servidor")
})
ipcMain.on('print-pdf', (pdfPath) => {


  printPDF(pdfPath)
});


app.whenReady().then(() => {
  mainWindow = createWindow()

  // 

  // initHandlers(mainWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow()
    }
  })
})
