const express = require("express");
const homeRoute = require("./routes/home");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const collection = require("./models/login_signup");
const bcrypt = require('bcrypt');
const app = express();
const Shoe = require('./models/Shoe');

const post = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/shoe");
const db = mongoose.connection;
db.on("error", () => {
  console.log("Đã có lỗi xảy ra khi kết nối đến cơ sở dữ liệu");
});
db.once("open", () => {
  console.log("Đã kết nối đến cơ sở dữ liệu thành công");
});
// db.one;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

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

  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
    return res.send('Người dùng đã tồn tại. Vui lòng chọn tên người dùng khác.');
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;

    await collection.insertMany(data);
    res.redirect("/login");
  }
});

// đăng nhập
app.post("/login", async (req, res) => {
  try {
    const user = await collection.findOne({ name: req.body.username });

    if (!user) {
      return res.status(401).send("Tên người dùng không tồn tại");
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send("Mật khẩu không chính xác");
    }

    const docs = await Shoe.find();
    return res.render("home", { Shoes: docs });
  } catch (error) {
    console.error("Lỗi trong quá trình đăng nhập:", error);
    return res.status(500).send("Lỗi Nội Bộ của Máy Chủ");
  }
});



app.listen(post, () => console.log(`Example app listening on post ${post}!`));