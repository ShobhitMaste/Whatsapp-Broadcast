const { Client, LocalAuth } = window.require("whatsapp-web.js");
const qrcode = window.require("qrcode-terminal");

// Create a new client instance
const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth(),
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Client is ready!");
});

// When the client received QR-Code
client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

let done = false;
// Listening to all incoming messages
function sendMessageMine(number, message) {
  number = number.includes("@c.us") ? number : `${number}@c.us`;
  // console.log(number);
  client.sendMessage(number, message);
}

client.on("message_create", (message) => {
  console.log(message.body);
  if (!done) {
    sendMessageMine("919582240012", "Hello how are you doing");
    done = true;
    setTimeout(() => {
      done = false;
    }, 1000);
  }
});

// Start your client
client.initialize();
