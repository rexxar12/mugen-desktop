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

server.get("/hello", (req, res) => {
  console.log("Received request");
  res.status(200).send({message: "Hello, World!"});
});
// Move multer setup below the declaration of downloadsPath
const upload = multer({ dest: downloadsPath });

// API endpoint to receive files and save them to the folder
server.post("/upload", upload.array("files", 10), (req, res) => {
  console.log("Received file upload request");
  if (!req.files || req.files.length === 0) {
    res.status(400).send("No files uploaded");
    return;
  }
  console.log("Files received:");
  req.files.forEach((file, index) => {
    const filename = file.originalname;
    console.log(`Filename ${index + 1}: ${filename}`);
    fs.rename(
      path.join(downloadsPath, file.filename),
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
});

module.exports = function startServer() {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};
