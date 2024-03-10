const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

app.get("/", function (req, res) {
  res.send("WELCOME TO MY HOTEL");
});

const personRoutes = require("./routes/personRoutes");
const MenuItemRoutes = require("./routes/menuItemRoutes");
app.use("/person", personRoutes);
app.use("/menu", MenuItemRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
