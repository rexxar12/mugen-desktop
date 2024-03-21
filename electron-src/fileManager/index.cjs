const express = require("express");
const fs = require("fs");
const os = require("os");
const path = require("path");
const multer = require("multer");

// Create the server
const server = express();
const port = 3000;

// Create the "fileSync" directory in the downloads folder if it doesn't exist
const downloadsPath = path.join(os.homedir(), "Downloads", "fileSync");
fs.mkdirSync(downloadsPath, { recursive: true });

// Log the current IP address of the machine
const ifaces = os.networkInterfaces();
let currentIp = "127.0.0.1";
for (const devName in ifaces) {
  const iface = ifaces[devName];
  for (const alias of iface) {
    if (alias.family === "IPv4" && alias.address !== "127.0.0.1") {
      console.log("Current IP address:", alias.address);
      currentIp = alias.address;
      break;
    }
  }
}
server.get("/ip", (req, res) => {
  res.send(currentIp);
});
server.get("/hello", (req, res) => {
  res.status(200).send({message: "Hello, World!"});
});
// Move multer setup below the declaration of downloadsPath
const upload = multer({ dest: downloadsPath });

// API endpoint to receive files and save them to the folder
server.post("/upload", upload?.single("file"), (req, res) => {
  if (!req?.file) {
    res.status(400).send("No file uploaded");
    return;
  }
  console.log("File received:");
  const file = req?.file;
  const filename = file?.originalname;

  fs.rename(
    path.join(downloadsPath, file?.filename),
    path.join(downloadsPath, filename),
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving file");
      } else {
        res.status(200).send("File saved successfully");
      }
    }
  );
});

module.exports = function startServer() {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};
