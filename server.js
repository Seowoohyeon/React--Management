const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors');
const app = express()
const port = process.env.prot || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '서우현',
            'birthday': '971012',
            'gender': '남자',
            'job': '개발자'
          },
          {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '김범수',
            'birthday': '970000',
            'gender': '남자',
            'job': 'Node'
          },
          {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '김보람',
            'birthday': '970000',
            'gender': '남자',
            'job': '학원생'
          }
    ])
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})