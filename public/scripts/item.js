function Item(parent, name, autoStatus, status=0, notes="") {
  this.creationDate=Date.now(),
  this.parent=parent,
  this.name=name,
  this.autoStatus=autoStatus,
  this.status= status, // 0:Waiting 1:To Do 2:In Progress 3:Done 
  this.notes=notes, 
  this.children=[],
  

  this.getStatus = function(){
    if(this.autoStatus && this.children.length > 0){
      let childrenStatus=[];
      for(let i=0; i<this.children.length; i++){
        childrenStatus[i] = this.children[i].getStatus();
      }
      return childrenStatus.reduce(Math.min);
    }
    else{
      return status;
    }
  },

  this.getId = function(){
    if(parent=="")
      return Date.now()+"root";
    else
      return Date.now()+this.name;
  },

  this.addChild = function (childName, childAutoStatus, childStatus=0, childNotes=""){
    const child = new Item(this, childName,childAutoStatus, childStatus, childNotes);
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
      //'parent':(this.parent == "") ? "" : this.parent.name,
      'creationDate':this.creationDate,
      'name':this.name,
      'status':this.getStatus(),
      'autoStatus':this.autoStatus,
      'notes':this.notes,
      'children': []
    }

    for(let i=0; i<this.children.length; i++){
      serializableItem.children.push(this.children[i].serializable());
    }

    return serializableItem;
  }
};

function ReadItem(serializableItem, parent=""){
  let root = new Item(parent, serializableItem.name,serializableItem.autoStatus, serializableItem.status, serializableItem.no);
  for (let i=0; i<serializableItem.children.length; i++){
    const childItem = ReadItem(serializableItem.children[i], root);
    root.children.push(childItem);
  }
  return root;
}
