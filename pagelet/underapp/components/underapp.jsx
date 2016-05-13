/**
  * @require ../top.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";
import $ from "jquery";
import Header from "/pagelet/widget/components/header";
import Rank from "/pagelet/widget/components/rank";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";
import Filter from "/pagelet/widget/components/filter";

import {
  countryCode, 
  deviceType, 
  deviceTypeStr, 
  payType,
  payTypeToStr, 
  days2Str,
  countryCode2Str} from "constants";

import UnderAppAction from "../action/action";
import UnderAppStore from "../store/store";

var UnderAppList = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    var now = new Date();
    var defaultDatetime = {};
    defaultDatetime.name = "今天";
    defaultDatetime.value = 1;

    return {
      underAppList: [],

      //filter params
      page: 1,
      country: countryCode.CHINA,
      date: defaultDatetime
    }
  },

  componentDidMount: function(){
    this.unSubscribe = UnderAppStore.listen(this.onStateChange.bind(this));
    this.fetchList();
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  fetchList: function(){
    var state = this.state;
    var date;
    if(typeof state.date.value == "string"){
      date = state.date.value.replace(/\-/g, "");
    }else{
      date = state.date.value;
    }

    UnderAppAction.fetchUnderAppList({
      country: this.state.country,
      date: date,
      page: this.state.page
    });
  },

  onStateChange: function(state){
    if(state.underAppList){
      state.underAppList = this.state.underAppList.concat(state.underAppList);
    }
    this.setState(state);
  },

  handleScroll: function(e) {
    const _target = e.target;

    if (((_target.offsetHeight + _target.scrollTop + 10) >= _target.scrollHeight) 
      && !this.state.loading
      ) {
      this.loadMore();
    }
  },

  loadMore: function(){
    var page = this.state.page + 1;
    this.setState({
      page: page
    }, function(){
      this.fetchList();
    });
  },

  onItemClick: function(data){
    var query = $.extend({}, data);
    this.history.pushState("", "detail/1", query);
  },

  onFilter: function(filter){
    var state = {
      underAppList: [],
      page: 1
    };

  
    if(filter.country){
      state.country = filter.country.value;
    }

    if(filter.datetime){
      state.date = filter.datetime;
    }

    this.setState(state, ()=>{
      this.fetchList();
    });
  },

  render: function(){
    var query = this.props.location.query;

    if(query.filter){
      return <Filter
              onOk={this.onFilter}
              country={true}
              datetime={true}/>;
    }else{
      return this.renderTop();
    }
  },

  renderTop: function(){
    const state = this.state;

    return (
      <div className="c-page under-app-list">
        <Header 
          location={this.props.location}
          filterEnabled={true}
          showSideNav={this.props.showSideNav}>
          下架应用监控
        </Header>

        <div 
          onScroll={this.handleScroll.bind(this)}
          className="c-body">

          <p className="f12 center f-txt">
            {countryCode2Str[this.state.country]} &nbsp;
            {this.state.date.name}
          </p>

          <ul className="list">
            {
              state.underAppList.map((item, idx)=>{
                return (
                  <AppItem 
                  type={7} 
                  onItemClick={this.onItemClick} 
                  index={idx}
                  data={item}/>)
              })
            }
          </ul>
          {
            state.loading ? <Loading/>: null
          }
        </div>
      </div>
    );
  }
});

export default UnderAppList;