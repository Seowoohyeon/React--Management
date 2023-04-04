const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors');
const pg = require('./database');
const fs = require('fs');
const app = express()
const port = process.env.prot || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const data = fs.readFileSync('./database.json')
const conf = JSON.parse(data)
const { Client } = require('pg');
const { Connection } = require("pg/lib");
const multer = require('multer')
const upload = multer({dest: './upload'})

const client = new Client({
  host: conf.host,
  port: conf.port,
  user: conf.user,
  password: conf.password,
  database: conf.database
})

client.connect(err => {
  if (err) {
    console.log(err)
  } else {
    console.log("Success!")
  }
})

app.use(cors());

var sql = "SELECT * FROM customer";

app.get('/api/customers', (req, res) => {
  client.query(
    sql,
    (err, rows, fields) => {
      res.send(rows)
    }
  );
});

app.use('/image', express.static('./upload'))

app.post('/api/customers', upload.single('image'), (req, res) => {
  let query = "INSERT INTO CUSTOMER(id, image, name, birthday, gender, job) VALUES (nextval('seq1'), $1, $2, $3, $4, $5)"
  let image = req.file.filename
  let name = req.body.name
  let birthday = req.body.birthday
  let gender = req.body.gender
  let job = req.body.job
  let params = [image, name, birthday, gender, job]
  console.log(params)
  client.query(
    query, params,
    (err, result) => {
      if(err) {
        console.log(err)
        console.log(query)
        return
      }
      console.log(result)
      res.send(result)
    }
  );
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})