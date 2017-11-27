var getRss = require("./get-rss");
var $ = require("jquery");
var setting = require("./json/setting.json");

init();
function init(){
  for(let obj of setting){
    let siteName = obj.site_name;
    let siteUrl = obj.site_url;
    let listDom = $(`
        <li>
          <input type="button" value=${siteName} data=${siteUrl}/>
        </li>
      `);
    $(".sidebar-left > ul").append(listDom);
  }
  $(".sidebar-left > ul > li > input").on("click",function() {
    var url = $(this).attr("data");
    console.log(url);
    getRss.setRssCards(url);
  });
}
