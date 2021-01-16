var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
const path = require('path');

app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

// -------- STATIC

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});