const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const path = require("path");
const compression = require("compression");

app.use(compression());
app.use(express.static(__dirname + "/dist"));

app.listen(port, () => {
  console.log("server running!");
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.get("/about", (req, res) => {
  res.end(`
        <h1>Hello world!</h1>
    `);
});
