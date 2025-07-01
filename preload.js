const {contextBridge, ipcRenderer} = require('electron');

console.log("woprking");
contextBridge.exposeInMainWorld('electronAPI', {
    createWhatsappQRcode : () => ipcRenderer.invoke('create-whatsapp-qr'),
    WhatsappReady: () => ipcRenderer.invoke('start-whatsapp'),
    sendMessage: (data) => ipcRenderer.invoke('send-message', data)
});