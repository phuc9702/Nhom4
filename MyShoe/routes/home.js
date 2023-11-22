const express = require("express");
const router = express.Router();
const Shoe = require('../models/Shoe');


// router.get('/',(req, res, next) => {
//     res.send('Express router is working')
// })
router.get("/", (req, res, next) => {
  Shoe.find()
    .then(docs => {
      res.render("home", { Shoes: docs });
    })
    .catch(err => {
      console.log("Có điều gì đó sai với MongoDB (không thể truy xuất)");
      next(err); // Chuyển lỗi đến middleware xử lý lỗi
    });
});


router.post("/add",async (req, res, next) => {
  const maGiay      = req.body.maGiay;
  const tenGiay     = req.body.tenGiay;
  const hangSX      = req.body.hangSX;
  const kieuGiay    = req.body.kieuGiay;
  const soLuong     = req.body.soLuong;
  const gia         = req.body.gia;


  console.log(maGiay, tenGiay, hangSX,kieuGiay, soLuong, gia);
  try {
    const newShoe = new Shoe({
      maGiay,
      tenGiay,
      hangSX,
      kieuGiay,
      soLuong,
      gia,
    });


    const savedShoe = await newShoe.save();
    console.log("Data is recorded successfully", savedShoe);
    res.redirect("/");
  } catch (err) {
    console.error("Something went wrong to save data to database", err);
    res.status(500).send("Internal Server Error");
  }
});


//show edit
router.get('/edit/:id', (req, res, next) => {
  const shoeId = req.params.id;

  Shoe.findOne({ _id: shoeId })
    .then(docs => {
      if (!docs) {
        console.log("Không thể tìm thấy giày với ID đã cho");
        // Xử lý trường hợp không tìm thấy giày
        res.redirect('/'); // Chuyển hướng về trang chủ hoặc xử lý theo yêu cầu của bạn
        return;
      }

      res.render('edit', { Shoe: docs });
    })
    .catch(err => {
      console.log("Không thể truy xuất dữ liệu và chỉnh sửa do vấn đề cơ sở dữ liệu");
      next(err);
    });
});

//to update
router.post('/edit/:id', (req, res, next) => {
  // Use the { new: true } option to return the modified document
  Shoe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(docs => {
      // Handle the updated document
      res.redirect('/');
    })
    .catch(err => {
      console.log("Something went wrong updating your data");
      next(err);
    });
});
// del
router.get('/delete/:id', (req, res, next) => {
  Shoe.findByIdAndDelete(req.params.id)
    .then(docs => {
      if (!docs) {
        console.log("Document not found for deletion");
        res.redirect('/');
        return;
      }
      console.log("Delete successful");
      res.redirect('/');
    })
    .catch(err => {
      console.log("Something went wrong deleting data");
      next(err);
    });
});




module.exports = router;
