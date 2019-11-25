const io = require('socket.io-client');
const socket = io('http://localhost');

socket.on('JSONdata', (jsondata) => {

    var root = ReadItem(JSON.parse(json), "");
    console.log(JSON.stringify(root.serializable()));

});

$(document).ready(function () {
    socket.emit('getData', 'root');
});


        