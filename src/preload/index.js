
const { contextBridge, ipcRenderer } = require('electron')
const { join } = require("path")

const ruta = join(__dirname, '../assets/impresion-demo.pdf')


const api = {
  saludo: () => ipcRenderer.send("saludo"),
  printPdf: () => ipcRenderer.send('print-pdf'),


}

contextBridge.exposeInMainWorld('api', api)
