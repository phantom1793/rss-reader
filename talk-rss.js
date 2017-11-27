var openJtalk = require("openjtalk"); // talk
var myTalker = new openJtalk();


module.exports = {
  talk: function(title, resolve) {
    myTalker.talk(title, resolve);
  }
}
