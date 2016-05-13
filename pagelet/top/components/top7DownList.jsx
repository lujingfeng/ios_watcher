/**
  * @require ../top.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

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


import TopAction from "../action/action";
import TopStore from "../store/store";

var Top7DownList = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    var tabs = [
        {name:"免费榜",payType: payType.FREE }, 
        {name:"付费榜",payType: payType.FEE },
        {name:"畅销榜",payType: payType.HOT }
      ];

    return {
      loading: false,
      flag: 2,

      tabIndex: 0,
      tabs: tabs,

      list: [],

      genres: "总榜",
      payType: payType.FREE,
      device: deviceType.IPHONE,
      country: countryCode.CHINA,

      page: 1,
      pageSize: 20
    }
  },

  componentDidMount: function(){
    this.unSubscribe = TopStore.listen(this.onStateChange.bind(this));
    this.fetchList();
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  fetchList: function(){
    TopAction.fetDownTopList({
      genres: this.state.genres,
      type: this.state.payType,
      device: this.state.device,
      country: this.state.country
    });
  },

  onStateChange: function(state){
    this.setState(state);
  },

  handleScroll: function(e) {
    const _target = e.target;

    if (((_target.offsetHeight + _target.scrollTop + 10) >= _target.scrollHeight)) {
      this.loadMore();
    }
  },

  loadMore: function(){
    var page = this.state.page + 1;
    this.setState({
      page: page
    });
  },

  onItemClick: function(data){
    var query = $.extend({}, data);
    this.history.pushState("", "detail/1", query);
  },

  onSelectTab: function(tab, tabIndex){
    this.setState({
      tabIndex: tabIndex,
      list:[],
      page: 1,
      payType: tab.payType
    }, ()=>{
      this.fetchList();
    });
  },

  onFilter: function(filter){
    var state = {
      list: [],
      page: 1
    };

    if(filter.device){
      state.device = filter.device.value;
    }
    if(filter.country){
      state.country = filter.country.value;
    }

    if(filter.category){
      state.genres = filter.category.name;
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
              device={true}
              country={true}
              category={true}/>;
    }else{
      return this.renderTop();
    }
  },

  renderTop: function(){
    var list = this.state.list || [];

    list = list.slice(0, this.state.page * this.state.pageSize)

    return (
      <div className="c-page top7-up-list">
        <Header 
          location={this.props.location}
          filterEnabled={true}
          showSideNav={this.props.showSideNav}>
          七日排名下降榜
        </Header>
        <div className="c-body" onScroll={this.handleScroll}>
          <Tabs 
            tabIndex={this.state.tabIndex}
            onSelect={this.onSelectTab}
            tabs={this.state.tabs}/>

          <p className="f12 center f-txt">
            {this.state.genres} &nbsp;
            {countryCode2Str[this.state.country]} &nbsp;
            {deviceTypeStr[this.state.device]}
          </p>

          <ul className="list">
            {
              list.map((item, idx)=>{
                return (
                  <AppItem 
                    flag={this.state.flag}
                    type={2} 
                    onItemClick={this.onItemClick} 
                    index={idx}
                    data={item}/>
                  )
              })
            }
          </ul>
          {
            this.state.loading?<Loading/>:null
          }
        </div>
      </div>
    );
  }
});

export default Top7DownList;