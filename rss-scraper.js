
var targetUrl = "http://news.nicovideo.jp/ranking/comment?rss=2.0";

var client = require('cheerio-httpcli');
var openJtalk = require("openjtalk");
var myTalker = new openJtalk();

var titles = [];

// Googleで「node.js」について検索する。
client.fetch(targetUrl, {}, function (err, $, res) {
  console.log($.html());
  $("div.entry > h3 > a > span").each(function() {
    console.log("sss");
    console.log($(this).text());
  });
});
