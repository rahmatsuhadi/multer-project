var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require("path")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./public/uploads")

    cb(null, path?.join(__dirname, "../public/uploads"))
  },
  // filename: function (req, file, cb) {
  //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  //   cb(null, file.fieldname + '-' + uniqueSuffix)
  // }
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
  
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }

}

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  
  // fileFilter: fileFilter
});

router.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');

});
router.post("/fileupload", upload.single('image'), function (req, res, next) {

  const file = req?.file?.path;
  if(!file){
    res.status(400).json({status: false, data: "no file is selected"})
  }

  res.send(file)


});

module.exports = router;