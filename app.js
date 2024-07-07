const express = require('express')
const bodyParser= require('body-parser');
const app = express();

const fs = require('fs');
const path = require('path');
app.use(bodyParser.urlencoded({extended: true}))

//ROUTES WILL GO HERE
var uploadRouter = require('./routes/upload');

app.use('/', uploadRouter);

app.get('/list', (req, res) => {
    const directoryPath = path.join(__dirname, './public/uploads'); // Adjust the path as per your directory structure
    // Baca isi direktori 'upload'
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).send('Error reading directory');
        }
        // Kirim daftar file sebagai respons
        res.json({ files });
    });
});
 
app.listen(3001, () => console.log('Server started on port 3000'));