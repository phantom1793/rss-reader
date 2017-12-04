"use strict";


class SearchArticle {

  constructor() {
    this.articles = require("../model/articles.json");
  }

  search(text) {
    var wordList = text.split(/\s+/);
    var matchedArticles = [];

    this.articles.forEach((article) => {
      var title = article.title;
      var description = article.description;
      wordList.forEach((word) => {
        if(word.indexOf(title) != -1 || word.indexOf(description) != -1) {
          matchedArticles.push(article);
          break;
        }
      });
    });
  }
}

module.exports = new SearchArticle();
