
var getRss = require("./get-rss.js");
//var dataCtrl = require("./data-controller.js");
var setting = require("./json/setting.json");

//先頭のやつだけ表示する
var url = setting[0];
getRss.setRssCards(url);
