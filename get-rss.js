/*
 * feed.js
 */
/*
  load rss
*/
/*
  get rss
  check is new
  and display those items
*/

"use strict";

var fs = require("fs");
var FeedParser = require('feedparser');
var request = require('request');
var talker = require("./talker.js");
var $ = require("jquery");
var urls = [];




module.exports = {

  addNews: function(url){
    if(urls.indexOf(url) == -1) urls.push(url);
  },
  readRss: function(url, callback){
    var items = [];
    var feedParser = new FeedParser({});
    var req = request(url);
    var that = this;
    req.on("response", function(res) {
      this.pipe(feedParser);
    });
    feedParser.on("readable", function() {
      let item;
      while(item = this.read()){
        items.push(item);
      }
    });
    feedParser.on("end", function() {
      items.forEach(function(item) {
        var title = item.title;
        var desc = item.description;
        var descDom = `
          <div>
            ${desc}
          </div>
        `;
        var href = item.link;
        var imgSrc = $(descDom).find("img").attr("src");
        var card = $(`
          <div class="card">
            <a href="${href}" target="_blank" style="text-decoration:none;">
              <img src="${imgSrc}" />
              <span>${title}</span>
            </a>
          </div>
        `);
        that.addNews(href);
        if(callback) {
          callback(card); //カードを追加
        }
      });
    });
  },
  setRssCards: function(url) {
    var items = [];
    var feedParser = new FeedParser({});
    var req = request(url);
    var addCards = function(dom){
      return function(){
        $(".contents").append(dom);
      }
    };

    $(".contents").empty();
    this.readRss(url, addCards());
  }
}
/*
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
    var desc = item.description;
    console.log(desc);
    var descDom = `
      <div>
        ${desc}
      </div>
    `;
    var href = item.link;
    var imgSrc = $(descDom).find("img").attr("src");
    var card = $(`
      <div class="card">
        <a href="${href}" target="_blank" style="text-decoration:none;">
          <img src="${imgSrc}" />
          <span>${title}</span>
        </a>
      </div>
    `);

    $(".contents").append(card);

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
*/
