//define all dependencies
const fs = require('fs'); //FileSystem - any work with physically saved files
const url = require('url'); //forms request object based on url you,re enter in search bar
const express = require('express'); //module to simplify work with node
const queryString = require('querystring'); //module, which separate query into object's key-value
const app = express(); //start express
const PORT = 3567; //default port, just to save time

let globalData; //define global store variable
init(); //add data to global store


app.get('/items/*', (req, res) => {
  //TODO: https://github.com/SirSerje/hello-node/issues/2
  let temp = globalData;
  let url_parts = url.parse(req.url);
  let requestSettings = queryString.parse(url_parts.query);

  let pages = getNewsPerPage(requestSettings);

  if (pages === undefined) res.sendStatus(404);
  res.send(temp.slice(pages.from, pages.to))
  // res.sendStatus(200)
});

app.get('/item/*', (req, res) => {
  //TODO: implementation needed
});

app.listen(PORT, () => console.log(`example on ${PORT}`));

function init() {
  globalData = JSON.parse(fs.readFileSync('./public/d.json', 'utf8'));
}

/* method to validate is correct page, human requested*/
function getNewsPerPage(props) {
  //FIXME: https://github.com/SirSerje/hello-node/issues/1
  let {size, page} = props;
  size = Number(size);
  page = Number(page);
  let length = globalData.length;
  let to = size * page;
  let from = to - size;

  if (to > length) return undefined;
  return {from, to}

}
