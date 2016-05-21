
import React from "react";
import {ReactRouter, Router, Route} from "/static/lib/reactRouter";
import $ from "/static/lib/jquery";

import MainView from "/pagelet/main/components/main";
import Search from "/pagelet/search/components/index";
import InputSearch from "/pagelet/search/components/search_input";
import AppDetail from "/pagelet/appdetail/components/detail";
import TopList from "/pagelet/top/components/topList";
import Top7UpList from "/pagelet/top/components/top7UpList";
import Top7DownList from "/pagelet/top/components/top7DownList"
import UnderAppMonitor from "/pagelet/underapp/components/underapp";
import HotKeyword from "/pagelet/hotkeyword/components/hotkeyword";
import CompAnalysis from "/pagelet/compproduct/components/index";
import AppCompare from "/pagelet/compproduct/components/compare";
import MyFavList from "/pagelet/myfav/components/my_fav_list";
import ASOService from "/pagelet/widget/components/aso_service";
import About from "/pagelet/widget/components/about";

import {getCookie, setCookie,send} from "/static/minxins/utils";

//setCookie("uname", "卢景锋", 100000000000000000);


send({
  type: "entry",
  opra: "pv",
  label: document.referrer
});


var init = function(){
  var uname = getCookie("uname");
  var hash = location.hash;

  if(!uname && location.hash.indexOf("myfavlist") >-1){
    location.href = "/check/login-page";
  }
}
init();

window.addEventListener("hashchange", ()=>{
  init();
});


$.ajaxSetup ({
  cache: false //关闭AJAX缓存
});

React.initTapEventPlugin();

React.render((
  <Router>
    <Route path="/" component={MainView}>
      <Route name="defaultSearch" path="/search" component={Search} />
      <Route name="inputSearch" path="/search/input" component={InputSearch} />

      <Route path="/detail/:module" component={AppDetail} />
      <Route path="/toplist" component={TopList} />
      <Route path="/top7uplist" component={Top7UpList} />
      <Route path="/top7Downlist" component={Top7DownList} />
      <Route path="/under_app_monitor" component={UnderAppMonitor}/>

      //关键词热度排行榜
      <Route path="/hotkeywords" component={HotKeyword}/>

      //竞品分析
       <Route path="/comp_analysis" component={CompAnalysis}/>
       //竞品对比
       <Route path="/appcompare" component={AppCompare}/>
       //我的关注
       <Route path="/myfavlist" component={MyFavList}/>
       //ASO优化服务
       <Route path="/aso_service" component={ASOService}/>

       //关于我们
       <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.body);


