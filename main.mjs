import { app, BrowserWindow, ipcMain } from 'electron/main';
import path from 'path';
import pkg from 'whatsapp-web.js';
import { fileURLToPath } from 'url';
import { findChrome } from 'find-chrome-bin'
import { dirname } from 'path';

const  { Client, LocalAuth } = pkg;
let client;

const chromeInfo = await findChrome()
// console.log(chromeInfo)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // devTools: false
    },
  });
  // console.log(__dirname + "\\index.html");
  // win.loadURL(path.join(__dirname + "\\index.html"));
  win.loadURL("http://localhost:5173/");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
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
        console.log("Client is ready! from start whjatsap[p");
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
        console.log("Client is ready! from start whjatsap[p");
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
