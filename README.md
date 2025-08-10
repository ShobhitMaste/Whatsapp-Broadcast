# WhatsApp Broadcast Automation 

**Send WhatsApp messages to multiple phone numbers—even unsaved contacts—from your desktop app.**

---

## Overview

WhatsApp Broadcast Automation is a desktop application built with **Electron.js** and **React**, designed to help users send personalized messages to multiple recipients from WhatsApp Web—all without saving their numbers beforehand.

---

## Features

- Send messages in bulk to both saved and unsaved numbers  
- Supports plain text messaging and rich media if enabled  
- Handles messaging queue, timing, and event-driven automation logic

---

## Technologies Used

Frontend: React, HTML5, CSS3  
Backend / Logic: Node.js, Electron, JavaScript  
UI / Design: Bootstrap 5, Google Fonts, Custom SVG Icons  
Build Tool: Vite  

---

## File Structure

Whatsapp-Broadcast/
├── main.mjs  
├── preload.js  
├── index.html  
├── script.js  
├── styles.css  
├── icon.ico  
├── questionMark.png  
├── tick.png  
├── package.json  
└── license.md  

---

## Getting Started

### Prerequisites

- Node.js (v16 or newer)  
- npm (v8+) or yarn  
- Electron-compatible environment  
- Google Chrome (for first-time WhatsApp Web QR login)

### Installation & Usage

```bash
# Clone this repository
git clone https://github.com/ShobhitMaste/Whatsapp-Broadcast.git
cd Whatsapp-Broadcast

# Install dependencies
npm install

# Launch in development
npm run dev

# Build a distributable version
npm run build
```

Once launched, scan the WhatsApp QR code to link your WhatsApp Web session to the app.

---

## How It Works

1. Electron boots up the desktop shell and loads your React-based interface.  
2. `preload.js` sets up a secure context bridge for UI-to-Automation communication.  
3. Message queues are managed via the UI and dispatched through `script.js` logic.  
4. The automation supports unsaved numbers by using WhatsApp Web URL logic.

---

## Limitations & Compliance

- This project does **not** integrate with the official WhatsApp Business API; it relies on browser automation via an active WhatsApp Web session.  
- WhatsApp may require your number to be saved in recipients' contacts for some bulk messaging features to work fully.  
- Use responsibly—automated messaging at scale can violate WhatsApp Terms of Service and may lead to account blocks.

---

## Use Cases

- Sending appointment reminders or updates to unsaved numbers  
- Group messaging for marketing or outreach without manual contact entry  
- Internal team notifications via WhatsApp Web interface
- Use for marketing of a business

---

## Contributing

Contributions are welcome! Please open an issue to discuss major changes or submit pull requests for enhancements.

---
---

## 🔗 Links

- GitHub repository: [ShobhitMaste/Whatsapp-Broadcast](https://github.com/ShobhitMaste/Whatsapp-Broadcast)
