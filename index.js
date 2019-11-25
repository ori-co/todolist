const express = require('express')
const app = express();
//const Item = require('./item')

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

function Item(parent, name, notes="") {
  this.creationDate=Date.now(),
  this.parent=parent,
  this.name=name, 
  this.notes=notes, 
  this.children=[],

  this.getId = function(){
    if(parent=="")
      return Date.now()+"root";
    else
      return Date.now()+this.name;
  },

  this.addChild = function (childName, childNotes=""){
    const child = new Item(this, childName, childNotes);
    this.children.push(child);

    return child;
  },

  this.removeChild = function(child){

    let childIndex=-1;
    for(let i=0; i<this.children.length; i++){
      if (this.children[i].getId() == child.getId()){
        childIndex=i;
      }
    }

    if (childIndex >= 0){
      this.children[childIndex].parent = "";
      this.children.splice(childIndex, 1);
    }
  },

  this.setParent = function(newparent){
    this.parent.removeChild(this);
    this.parent = newparent;
    newparent.children.push(this);
  },

  this.serializable= function(){
    let serializableItem = {
      'parent':(this.parent == "") ? "" : this.parent.name,
      'name':this.name,
      'notes':this.notes,
      'children': []
    }

    for(let i=0; i<this.children.length; i++){
      serializableItem.children.push(this.children[i].serializable());
    }

    return serializableItem;
  }
};

var root = new Item("", "root");
var child1 = root.addChild("001");
var child2 = root.addChild("002");
var child3 = root.addChild("003");
var child4 = root.addChild("004");

child4.setParent(child1);

console.log(JSON.stringify(root.serializable()));