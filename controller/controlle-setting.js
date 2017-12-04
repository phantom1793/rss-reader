"use strict";


class ControlleSetting {

  constructor() {
    this.setting = require("../model/setting.json");
  }

  changeReloadSpan(span) {
    this.setting["reload_span"] = span;
    this.save();
  }
  changeSelectedSiteId(id) {
    this.setting["selected_site_id"] = id;
    this.save();
  }
  save() {
    var fs = require("fs");
    fs.writeFile("../model/setting.json", JSON.stringify(this.setting, null, "    "));
  }
}

module.exports = new ControlleSetting();
