const fs = require('fs');
const url = require('url');
const express = require('express')
const queryString = require('querystring');
const app = express()
const PORT = 3567

let globalData
init()

app.get('/', (req, res) => {
  let temp = globalData
  console.log(globalData.length)
  res.send(temp)
  // res.sendStatus(200)
})

//TODO: need support query request
// queryString.parse('size=1&page=2');
//https://www.w3schools.com/nodejs/ref_querystring.asp
app.get('/api/*', (req, res) => {
  let temp = globalData
  console.log(globalData.length)
  res.send(temp)
  // res.sendStatus(200)
})

app.listen(PORT, () => console.log(`example on ${PORT}`))

//run on server start
function init() {

  globalData = JSON.parse(fs.readFileSync('./public/d.json', 'utf8'));
  /*  fs.readFile('./public/d.json', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    globalData = data;
  });*/
}
