import { app, BrowserWindow, ipcMain } from 'electron/main';
import path from 'path';
import pkg from 'whatsapp-web.js';
import { fileURLToPath } from 'url';
import { findChrome } from 'find-chrome-bin'
import { dirname } from 'path';
import { saveTemplate, getTemplate } from './utils/storage.mjs';
import {rimraf} from "rimraf" 
import fs from "fs"


const  { Client, LocalAuth } = pkg;
let client;

const chromeInfo = await findChrome()
// console.log(chromeInfo)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const flagPath = path.join(app.getPath("userData"), "delete_on_start.flag");
const authDir = path.join(__dirname, ".wwebjs_auth");
const cacheDir = path.join(__dirname, ".wwebjs_cache");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: false
    },
  });
  // console.log(__dirname + "\\html\\index.html");
  win.loadURL(path.join(__dirname + "\\html\\index.html"));
  // win.loadURL("http://localhost:5173/");
};

console.log(app.getPath("userData"))

ipcMain.handle('logout', async () => {
  fs.writeFileSync(flagPath, "logout");
  app.relaunch();
  app.quit();
});

// console.log(__dirname + "\\.wwebjs_auth")
console.log(__dirname + "\\.wwebjs_cache")
app.whenReady().then(() => {
  if (fs.existsSync(flagPath)) {
    try {
      rimraf.sync(authDir);
      rimraf.sync(cacheDir);
      console.log("Deleted old session after logout");
    } catch (err) {
      console.error("Error deleting session:", err);
    }
    fs.unlinkSync(flagPath); // remove marker
      app.relaunch();
      app.quit();
  }

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed",async () => {
  console.log('(SIGINT) Shutting down...');
      try {
        await client.destroy();
        console.log("Client Killed");
      } catch (e) {
        console.log("error\n" + e);
      }
      console.log('client destroyed');
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("create-whatsapp-qr", async () => {
  try {
    return new Promise((resolve, reject) => {
      // Create a new client instance
      client = new Client({
        puppeteer: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          executablePath: chromeInfo.executablePath
        },
        authStrategy: new LocalAuth(),
      });

      // When the client received QR-Code
      client.on("qr", (qr) => {
        console.log("QR RECEIVED", qr);
        // qrcode.generate(qr, { small: true });
        resolve(qr);
      });

      client.on("ready", () => {
        console.log("Client is ready! from create QR");
        resolve(1);
      });

      // Start your client
      client.initialize();

      client.on("auth_failure", (msg) => {
        reject(new Error("Auth failed: " + msg));
      });
    });
  } catch (err) {
    console.error("[create-whatsapp-qr] Error:", err);
    throw err; // rethrow to pass error to renderer (React side)
  }
});

ipcMain.handle("start-whatsapp", async () => {
  // When the client is ready, run this code (only once)
  try{
    return new Promise((resolve, reject) => {
      client.on("ready", () => {
        console.log("Client is ready! from start Whatsapp");
        resolve(1);
      });
    })
  } catch (err) {
    console.log("error is start whatspp" + err);
  }
});

ipcMain.handle("send-message", async (event, { number, message }) => {
  try{
    return new Promise(async (resolve, reject) => {
      // console.log(number, message);
      if (client) {
        number = number.includes("@c.us") ? number : `${number}@c.us`;
        for(const mess of message){
          await client.sendMessage(number, mess);
        }
        resolve("sent")
      } else {
        throw new Error("Whatsapp client not initialized");
      }
    })
  } catch(err) {
    console.log(err);
  }
});

ipcMain.handle("save-template", (event, data) => saveTemplate(data));
ipcMain.handle("get-template", (event, key) => getTemplate(key));

app.on('quit', (event, Exitcode) => {
  console.log("quitted");
})