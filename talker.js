var openJtalk = require("openjtalk"); // talk
var EventEmitter = require('events').EventEmitter;

var talkerEmitter = new EventEmitter;
var myTalker: new openJtalk();
var paper = [];

talker.on("talk", function(content){
  talker.emit("talking");
  myTalker.talk(content, function(){
    talker.emit("finish");
  });
});

talker.on("talking", function(){

});

talker.on("finish", function(){

});


module.exports = talkerEmitter;
