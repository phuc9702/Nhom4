const express = require("express");
const homeRoute = require("./routes/home");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/shoe');
const db = mongoose.connection;
db.on("error", () => {
  console.log("Something went wrong to connect to database")
});
db.once("open", () => {
  console.log("DB connection has been made seccessfully");
});
db.one
app.set("view engine", "ejs");
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/", homeRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
