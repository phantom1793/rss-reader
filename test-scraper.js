/*
 * feed.js
 */

var FeedParser = require('feedparser');
var request = require('request');
//var feed = 'http://phiary.me/rss';
var feed = "http://news.nicovideo.jp/ranking/comment?rss=2.0";
//var feed = "http://seasons.host/shadow/feed.rss";
var openJtalk = require("openjtalk");
var myTalker = new openJtalk();
var req = request(feed);
var feedparser = new FeedParser({});

var items = [];
var talkerPromiseArray = [];

req.on('response', function (res) {
  this.pipe(feedparser);
});

feedparser.on('meta', function(meta) {
  console.log('==== %s ====', meta.title);
});

feedparser.on('readable', function() {
  while(item = this.read()) {
    // console.log(item);
    items.push(item);
  }
});

feedparser.on('end', function() {
  // show titles
  items.forEach(function(item) {
    var title = item.title;
    //console.log(title);
    /*
    var func = function(title) {
      return new Promise(function(resolve, reject){
        console.log(title);
        myTalker.talk(title, resolve);
      });
    }
    */
    console.log(item);
    talkerPromiseArray.push(function(){
      return new Promise(function(resolve, reject){
        console.log(title);
        myTalker.talk(title, resolve);
      })});

    //myTalker.talk(title);
    //console.log('- [' + item.title + ']' + '(' + item.link + ')');
  });
  console.log("END");
  talkerPromiseArray.reduce(function(current, next){
    return current.then(next);
  }, Promise.resolve());
});
