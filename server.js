const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

//Middleware Function
const logRequest = (req, res, next) => {
  console.log(`---[${new Date().toLocaleString()}] Request Success---`);
  next(); // Move on to next phase
};
// Apply Middleware to all Routes
app.use(logRequest);

// Initialize Passport
app.use(passport.initialize());

// this authentication is based on Local strategy(usename/password)
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("WELCOME TO MY HOTEL");
});

//Import the router files
const personRoutes = require("./routes/personRoutes");
const MenuItemRoutes = require("./routes/menuItemRoutes");
//Use the router
app.use("/person", personRoutes);
app.use("/menu", MenuItemRoutes);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
