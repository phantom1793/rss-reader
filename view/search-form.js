"use strict";
var $ = require("jquery");

/**
getText
  検索フォームにユーザが入力を行う際にキーコードを取得し、enterが入ると記事の検索を行う
  @param  {Object} e
search
  記事リストから、フォームから受け取ったテキストで検索をかけてマッチした記事を取得してメインコンテンツに表示する
  @param  {string} text
display
  メインコンテンツに検索にマッチした記事を表示する
  @param  {Array} articles
*/

class SearchForm {

  constructor() {
    this.inputText = "";
  }

  getText(e) {
    if(e.keyCode === 13){
      this.search(this.inputText);
      this.inputText = "";
      $("#search-form").val("");
    } else {
      this.inputText = $("#search-form").val();
    }
  }

  search(text) {
    var articles = require("../model/articles.json");
    var searcher = require("../controller/search-article.js");
    var matchedArticles = searcher.search(text);
    this.display(matchedArticles);
  }

  display(articles) {
    var mainContents = require("../view/main-contents.js");
    mainContents.reset();
    mainContents.showArticles(articles, "*");
  }

}

module.exports = new SearchForm();
