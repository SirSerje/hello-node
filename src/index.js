const fs = require('fs')
const url = require('url')
const express = require('express')
const queryString = require('querystring')
const app = express()
const PORT = 3567

//define global store variable
let globalData
init()

app.get('/api/*', (req, res) => {
  let temp = globalData
  let url_parts = url.parse(req.url)
  let requestSettings = queryString.parse(url_parts.query)

  getNewsPerPage(requestSettings)
  res.send(temp)
  // res.sendStatus(200)
})

app.listen(PORT, () => console.log(`example on ${PORT}`))

function init() {
  globalData = JSON.parse(fs.readFileSync('./public/d.json', 'utf8'));
}

function getNewsPerPage(props) {
  let {size, page} = props
  size = Number(size)
  page = Number(page)
  let length = globalData.length
  let to = size * page - 1
  let from = to - size + 1

  for (let i = from; i <= to; i++) {
    if (i > length) {
      console.log('OVER')
      break
    } else {
      console.log('element:', i)
    }
  }
}
