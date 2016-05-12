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

import Filter from "/pagelet/widget/components/filter";


var AppDetail = React.createClass({
  getInitialState: function(){
    return {
      filter: null
    }
  },

  onFilter: function(filter){
    this.setState({
      filter: filter
    });
  },

  render: function(){
    var query = this.props.location.query;
    if(query.filter){
      return <Filter
              onOk={this.onFilter}
              showPayMethod={true}
              device={true}
              country={true}
              days={true}/>
    }else{
      return this.renderDetail();
    }
  },

  renderDetail: function(){
    var query = this.props.location.query;
    var params = this.props.params;
    var bottomView;
    var filterEnabled = false;


    if(params.module == 1){
      bottomView = <AppInfo query={query}/>
    }else if(params.module == 2){
      filterEnabled = true;
      bottomView = <RealRank query={query} filter={this.state.filter}/>
    }else if(params.module == 3){
      bottomView = <VersionLog query={query}/>
    }else if(params.module == 4){
      bottomView = <KeyWords query={query}/>
    }else if(params.module == 5){
      filterEnabled = true;
      bottomView = <Comment query={query}/>
    }else if(params.module == 6){
      bottomView = <AppLevel query={query}/>
    }

    return (
      <div className="c-page c-app-detail">
        <Header 
          location={this.props.location}
          filterEnabled={filterEnabled}
          showSideNav={this.props.showSideNav}>应用详情</Header>
        <div className="c-body" >
          <BaseInfo query={query}/>
          <Categofy 
            query={query} 
            ctyValue={params.module}/>
          <div
            className="category-detail">
            {bottomView}
          </div>
        </div>
      </div>
    );
  }
});

export default AppDetail;