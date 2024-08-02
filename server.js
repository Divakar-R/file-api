const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const folderPath = path.join(__dirname, "files");

// Ensure the folder exists
if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

// API to create a file with the current timestamp
app.post("/create-file", (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${timestamp.replace(/[:.]/g, "-")}.txt`;
  fs.writeFile(path.join(folderPath, filename), timestamp, (err) => {
    if (err) return res.status(500).json({ message: "Error creating file" });
    res.status(201).json({ message: "File created", filename });
  });
});

// API to retrieve all text files in the folder
app.get("/files", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) return res.status(500).json({ message: "Error reading folder" });
    res
      .status(200)
      .json({ files: files.filter((file) => path.extname(file) === ".txt") });
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
