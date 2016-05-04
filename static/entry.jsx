
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
      <Route path="/hotkeywords" component={HotKeyword}/>
    </Route>
  </Router>
), document.body);


