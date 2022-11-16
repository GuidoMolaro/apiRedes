const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const cors = require('cors');
const {deleteByFile, deleteAll, storeFiles, getFiles} = require("./app.service");
app.use(fileUpload({
  createParentPath: true
}))

app.use(cors())

app.post('/upload', async (req, res) => {
  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      storeFiles(req.files);
      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/', async(req, res) => {
  try {
    deleteByFile(req.params.filename);
    //send response
    res.send({
      status: true,
      message: 'Tuples deleted',
    });
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
})

app.get('/', async(req, res) =>{
  try {
    const users = await getFiles()
    console.log(users)
    res.send(users)
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
})

app.listen(8080, () => console.log("Connected"));