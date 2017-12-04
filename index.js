var searchForm = require("./view/search-form");
var reloadSpan = require("./view/reload-span");
var talker = require("./view/taker");
var rssList = require("./view/rss-list");
var mainContents = require("./view/main-contents");
var feedReader = require("./controller/feed-reader");
var $ = require("jquery");


$(document).on("ready", function() {

  (function(){
    var span = require("./model/setting.json")["read_span"];
    feedReader.reset(span);
  })();

  $("#search-form").on("keydown", (e) => {
    searchForm.getText(e);
  });

  $("#auto-read-span").on("change", () => {
    var span = $("#auto-read-span").val();
    var controlleSetting = require("../controller/controlle-setting");
    controlleSetting.changeReloadSpan(span);
    reloadSpan.changeSpan(span);
    feedReader.reset(span);
  });

  $(".rsslist > li > div > input").on("click", function(){
    var siteId = $(this).attr("siteId");
    var articles = require("./model/articles.json");
    var controlleSetting = require("./controller/controlle-setting");
    controlleSetting.changeSelectedSiteId(siteId);
    mainContents.showArticles(articles, siteId);
  });

  feedReader.on("read", (articles) => {
    var selectedSiteId = require("./model/setting.json")["selected_site_id"];
    var controlleArticle = require("./controller/controlle-article.js");
    controlleArticle.addArticle(articles);
    mainContents.showArticles(articles, selectedSiteId);
    rssList.reload(articles);
    talker.talk(controlleArticle.newArticles);
  });

});
