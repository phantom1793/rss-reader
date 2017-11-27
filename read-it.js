var openJtalk = require("openjtalk");

var myTalker = new openJtalk();

var talkerPromise = new Promise(function(resolve,reject){
  myTalker.talk("おまんこいくいくいっちゃうぅうぅ", resolve);
});

talkerPromise.then(function(){
  return new Promise(function(res, rej){
    myTalker.talk("あなたのザーメンくだしゃいいいい！", res);
  });
}).then(function(resolve, reject){
  myTalker.talk("んほおおおおおぉぉぉぉ!", resolve);
});
