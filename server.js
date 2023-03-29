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

const client = new Client({
    host: conf.host,
    port: conf.port,
    user: conf.user,
    password: conf.password,
    database: conf.database
})

client.connect(err => {
  if(err) {
    console.log(err)
  } else {
    console.log("Success!")
  }
})

var sql = "SELECT * FROM customer";

app.get('/api/customers', (req, res) => {
  client.query (
    sql,
    (err, rows, fields) => {
      res.send(rows)
    }
  );
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})