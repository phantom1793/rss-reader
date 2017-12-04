"use strict";
var EventEmitter = require("events").EventEmitter;
var FeedParser = require("feedparser");
var request = require("request");
var uuid = require("uuid-v4");
var $ = require("jquery");


/**
  @param  {Object} em
  @param  {string} mode
  @param  {string} readIntervalId

  reading
    指定された時間ごとにすべてのサイトの新しいRSSフィードを読み込む
  reset
    readingを実行するタイマーを指定された時間にリセットする
    @param {string} span
*/

class FeedReader {

  constructor() {
    this.em = new EventEmitter;
    this.mode = "read";
    this.readIntervalId;
    this.reading();
  }

  reading() {
    if(mode === "halt") return;
    var targetFeedList = require("../model/setting.json")["target_feed_list"];

    for(let target of targetFeedList) {
      var articles = [];
      var rssUrl = target["rss_url"];
      var siteId = target["site_id"];
      var req = request(rssUrl);
      var feedParser = new FeedParser({});

      req.on("response", (res) => {
        req.pipe(feedParser);
      });

      feedParser.on("readable", () => {
        var item;

        while(item = feedParser.read()) {
          var title = item.title;
          var description = item.description;
          var link = item.link;
          var imgSrc = $(`
              <div>
                ${description}
              </div>
            `).find("img").attr("src");
          var article = {
            title: title,
            description: description,
            imgSrc: imgSrc,
            link: link,
            id: uuid(),
            siteId: siteId
          };
          articles.push(article);
        }
      });

      feedParser.on("end", () => {
        this.em.emit("read", articles);
      });
    }
  }

  reset(span) {
    var spanNumber = Number(span);

    clearInterval(this.readIntervalId);

    if(isNaN(spanNumber) this.mode = "halt";
    else this.readIntervalId = setInterval(() => {this.reading();}, spanNumber);
  }
}

module.exports = new FeedReader();
