const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const folderPath = path.join(__dirname, "files");

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// API to create a file with the current timestamp
app.post("/create-file", (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${timestamp.replace(/[:.]/g, "-")}.txt`; // Replace invalid filename characters
  const filePath = path.join(folderPath, filename);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error creating file" });
    }
    res.status(201).json({ message: "File created", filename });
  });
});

// API to retrieve all text files in the folder
app.get("/files", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading folder" });
    }
    const txtFiles = files.filter((file) => path.extname(file) === ".txt");
    res.status(200).json({ files: txtFiles });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
