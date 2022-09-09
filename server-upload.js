const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()
app.use(cors())
app.use(fileupload())
app.use(express.static('files'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send({ ok: 200 })
})

app.post('/upload', (req, res) => {
  const newpath = __dirname + "/uploads/";
  const file = req.files.file;
  const filename = file.name;
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "file upload failed", code: 200 })
    }
    res.status(200).send({ message: "file upload", code: 200 })
  })
})


app.listen(3001, () => { console.log('Server Listening') })
