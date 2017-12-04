"use strict";

class ControlleArticle {

  constructor() {
    this.articles = require("../model/articles.json");
    this.newArticles = [];
  }

  addArticle(articleArray) {
    var links = [];

    this.articles.forEach((article) => {
      links.push(article.link);
    });

    articleArray.forEach((article) => {
      var link = article.link;
      if(links.indexOf(link) != -1) newArticles.push(link);
    });

    this.articles.push(newArticles);
    this.save();
  }

  save() {
    var fs = require("fs");
    fs.writeFile("../model/articles.json", JSON.stringify(this.articles, null, "    "));
  }
}

module.exports = new ControlleArticle();
