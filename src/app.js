const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();

app.use(express.static(path.join(__dirname, "files")));

app.post("/upload", fileUpload({ createParentPath: true }), (req, res) => {
  const files = req.files;
  Object.keys(files).forEach((key) => {
    const filepath = path.join(__dirname, "files", files[key].name);
    files[key].mv(filepath, (err) => {
      if (err) {
        return res.status(500).json({ status: "error", message: err });
      }
    });
    console.log(files);
    return res.json({
      status: "sucess",
      message: files[Object.keys(files)[0]].name,
    });
  });
  console.log(req.files);
});

app.get("/", (req, res) => {
  console.log("hello world is the thing");
  return res.sendFile(path.join(__dirname, "views", "index.html"));
});

module.exports = app;
