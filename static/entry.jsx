
import React from "react";
import {ReactRouter, Router, Route} from "/static/lib/reactRouter";
import $ from "/static/lib/jquery";

import MainView from "/pagelet/main/components/main";
import Search from "/pagelet/search/components/index";
import InputSearch from "/pagelet/search/components/search_input";
import AppDetail from "/pagelet/appdetail/components/detail";
import TopList from "/pagelet/top/components/topList";

$.ajaxSetup ({
  cache: false //关闭AJAX缓存
});

React.initTapEventPlugin();

React.render((
  <Router>
    <Route path="/" component={MainView}>
      <Route name="defaultSearch" path="/search" component={Search} />
      <Route name="inputSearch" path="/search/input" component={InputSearch} />

      <Route name="appDetail" path="/detail/:module" component={AppDetail} />
      <Route name="topList" path="/toplist" component={TopList} />
    </Route>
  </Router>
), document.body);


