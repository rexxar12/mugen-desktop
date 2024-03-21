const { app, BrowserWindow } = require("electron");
const path = require("path");
const startServer = require("./electron-src/fileManager/index.cjs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./electron/preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:6969/");
    win.openDevTools();
  } else {
    win.loadFile(join(__dirname, "./dist/index.html"));
  }
};

app.whenReady().then(() => {
  createWindow();
  try {
    startServer();
    
  } catch (error) {
    console.error(error);
  }
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
