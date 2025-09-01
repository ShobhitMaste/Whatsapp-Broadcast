const {contextBridge, ipcRenderer} = require('electron');

console.log("working");
contextBridge.exposeInMainWorld('electronAPI', {
    createWhatsappQRcode : () => ipcRenderer.invoke('create-whatsapp-qr'),
    WhatsappReady: () => ipcRenderer.invoke('start-whatsapp'),
    sendMessage: (data) => ipcRenderer.invoke('send-message', data),
    saveTemplate: (data) => ipcRenderer.invoke('save-template', data),
    getTemplate: (key) => ipcRenderer.invoke('get-template', key),
    logout: () => ipcRenderer.invoke('logout')
});