import React from "react";
import $ from "jquery";
import {History} from "reactRouter";

import Header from "/pagelet/widget/components/header";

import BaseInfo from "./baseinfo";
import Categofy from "./category";
import AppInfo from "./appinfo";
import RealRank from "./realrank";
import VersionLog from "./version_log";
import KeyWords from "./keywords";
import Comment from "./comment";
import AppLevel from "./applevel";

var AppDetail = React.createClass({
  getInitialState: function(){
    return {}
  },

  handleScroll: function(e) {
    const _target = e.target;

    if (((_target.offsetHeight + _target.scrollTop + 10) >= _target.scrollHeight) 
      && !this.state.loading &&
      this.state.searchResultList.length < this.state.total
      ) {
      this.loadMore();
    }
  },

  render: function(){
    var query = this.props.location.query;
    var params = this.props.params;
    var bottomView;

    if(params.module == 1){
      bottomView = <AppInfo query={query}/>
    }else if(params.module == 2){
      bottomView = <RealRank query={query}/>
    }else if(params.module == 3){
      bottomView = <VersionLog/>
    }else if(params.module == 4){
      bottomView = <KeyWords query={query}/>
    }else if(params.module == 5){
      bottomView = <Comment query={query}/>
    }else if(params.module == 6){
      bottomView = <AppLevel query={query}/>
    }

    return (
      <div className="c-page c-app-detail">
        <Header showSideNav={this.props.showSideNav}>应用详情</Header>
        <div className="c-body" >
          <BaseInfo query={query}/>
          <Categofy 
            query={query} 
            ctyValue={params.module}/>
          <div 
            onScroll={this.handleScroll.bind(this)}
            className="category-detail">
            {bottomView}
          </div>
        </div>
      </div>
    );
  }
});

export default AppDetail;