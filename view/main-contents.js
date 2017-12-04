"use strict";
var $ = require("jquery");

/**
  reset
    メインコンテンツをリセットする
  showArticles
    メインコンテンツの記事リストを更新する
    @param  {Array} articles
    @param  {string} selectedSiteId
*/

class MainContents {

  constructor() {}

  reset() {
    $(".contents").empty();
  }

  showArticles(articles, selectedSiteId) {
    articles.forEach((val,index) => {
      var title = val.title;
      var imgSrc = val.imgSrc;
      var id = val.id;
      var siteId = val.siteId;
      var card = $(`
          <div class="card" id="${id}">
            <img src="${imgSrc}" />
            <span>${title}</span>
          </div>
        `);
      if(selectedSiteId === siteId || selectedSiteId === "*") $(".contents").append(card);
    });
  }
}

module.exports = new MainContents();
