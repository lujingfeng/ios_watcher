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
import {send} from "/static/minxins/utils";

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
    var defaultDatetime = {
      name: "今天",
      value: 1
    };

    var locQuery = this.props.location.query;
    var country;

    defaultDatetime = locQuery.datetime?locQuery.datetime:defaultDatetime;
    country = locQuery.country?locQuery.country.value:countryCode.CHINA;

    return {
      underAppList: [],

      //filter params
      page: 1,
      country: country,
      date: defaultDatetime
    }
  },

  componentDidMount: function(){
    this.unSubscribe = UnderAppStore.listen(this.onStateChange.bind(this));
    this.fetchList();
    send({
      type: "offshelve",
      opra: "pv",
      label: "下架应用监控"
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  fetchList: function(){
    var state = this.state;
    var date;

    if(state.date.value == -1 || state.date.value == 1){
      date = state.date.value;
    }else{
      date = state.date.value.replace(/\-/g, "");
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
    query.id = data.appId;
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
      if(filter.datetime.year){
        var datetime = filter.datetime;
        var d = new Date(datetime.year, datetime.month - 1, datetime.day);
        filter.datetime.value =d.format("yyyy-MM-dd");
        filter.datetime.name = d.format("yyyy-MM-dd");
      }
      state.date = filter.datetime;
    }

    this.setState(state, ()=>{
      this.fetchList();
    });
  },

  render: function(){
    var query = this.props.location.query;

    if(query.filter){
      var props = {};
      props.countryValue = {name: countryCode2Str[this.state.country], value: this.state.country};
      props.datetimeValue = this.state.date;

      return <Filter
              onOk={this.onFilter}
              country={true}
              location = {this.props.location}
              datetime={true} {...props}/>;
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
          {
            this.state.errorText?<p className="center c999">暂无数据</p>:null
          }
        </div>
      </div>
    );
  }
});

export default UnderAppList;