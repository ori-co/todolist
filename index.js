const express = require('express')
const app = express();
const {Item, ReadItem} = require('./item')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

/*
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});*/

app.listen(8000, () => {
  console.log('http://localhost:8000');
});

/*
var root = new Item("", "root", true);
var child1 = root.addChild("First Subject", true,0,"very important");
var child2 = root.addChild("Second Subject", false, 1);
var child3 = root.addChild("Last Subject", true, 2);
var child4 = root.addChild("Sub subject", false, 3);

child4.setParent(child1);

console.log(JSON.stringify(root.serializable()));
*/

var fs = require("fs");
var json = fs.readFileSync("data/root.json");
var root = ReadItem(JSON.parse(json), "");
console.log(JSON.stringify(root.serializable()));
