const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("ipcRenderer", {
  // Send messages to the main process
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel, listener) => {
    ipcRenderer.on(channel, (event, ...args) => listener(...args));
  },
  // Receive messages from the main process
  receive: (channel, listener) => {
    ipcRenderer.on(channel, (event, ...args) => listener(...args));
  },
  // Remove event listener
  removeListener: (channel, listener) => {
    ipcRenderer.removeListener(channel, listener);
  },
  // Remove all event listeners for a channel
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
});
