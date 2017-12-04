"use strict";

var $ = require("jquery");

class RssList {

  constructor() {

  }

  restruct() {
    var targetFeedList = require("../model/setting.json")["target_feed_list"];
    targetFeedList.forEach((feed) => {
      var siteName = feed["site_name"];
      var rssUrl = feed["rss_url"];
      var siteId = feed["site_id"];
      var listDom = $(`
          <li>
            <div>
              <input type="button" value="${siteName}" rssUrl="${rssUrl} id="${siteId} />
              <span></span>
            </div>
          </li>
        `);
      $(".rsslist").append(listDom);
    });
  }

  reload(articles) {
    articles.forEach((article) => {
      var siteId = article.siteId;
      var articleCount = Number($(`#${siteId}`).next("span").text());

      if(isNaN(articleCount)) articleCount = 0;

      articleCount++;

      $(`#${siteId}`).next("span").text(String(articleCount));
    });
  }
}

module.exports = new RssList();
