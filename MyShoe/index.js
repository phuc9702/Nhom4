const express = require("express");
const homeRoute = require("./routes/home");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const collection = require("./models/login_signup");
const bcrypt = require('bcrypt');
const app = express();
const post = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/shoe");
const db = mongoose.connection;
db.on("error", () => {
  console.log("Something went wrong to connect to database");
});
db.once("open", () => {
  console.log("DB connection has been made seccessfully");
});
db.one;
app.set("view engine", "ejs");
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", homeRoute);
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

//dang kí 
app.post("/signup", async (req, res) => {

  const data = {
      name: req.body.username,
      password: req.body.password
  }

  // Check if the username already exists in the database
  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
      res.send('User already exists. Please choose a different username.');
  } else {
      // Hash the password using bcrypt
      const saltRounds = 10; // Number of salt rounds for bcrypt
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      data.password = hashedPassword; // Replace the original password with the hashed one

      const userdata = await collection.insertMany(data);
      console.log(userdata);
      res.redirect("/login")
  }

});
// đăng nhập
app.post("/login", async (req, res) => {
  try {
      const check = await collection.findOne({ name: req.body.username });
      if (!check) {
          res.send("User name cannot found")
      }
      // Compare the hashed password from the database with the plaintext password
      const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
      if (!isPasswordMatch) {
          res.send("wrong Password");
      }
      else {
          res.render("home");
      }
  }
  catch {
      res.send("wrong Details");
  }
});

app.listen(post, () => console.log(`Example app listening on post ${post}!`));