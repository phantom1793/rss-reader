"use strict";
var $ = require("jquery");
/**
  @param {string} span
    記事を再読み込みするまでのスパン
      ---: 読み込まない
      5
      10
      15
      20
      25
      30
  changeSpan
     スパンを変更する
     @param {string} span
*/


class ReloadSpan {

  constructor() {
    var setting = require("../model/setting.json");
    this.span = setting["reload_span"];
    $("#auto-read-span").val(this.span);
  }

  changeSpan(span) {
    $("#auto-read-span").val(span);
    this.span = span;
  }

}
