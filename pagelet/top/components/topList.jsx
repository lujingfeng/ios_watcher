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
import {countryCode, deviceType, payType} from "constants";

import TopAction from "../action/action";
import TopStore from "../store/store";

var TopList = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    var tabs = [
                  {name:"免费榜",payType: payType.FREE }, 
                  {name:"付费榜",payType: payType.FEE },
                  {name:"畅销榜",payType: payType.HOT }
               ];

    var now = new Date();

    return {
      tabs: tabs,
      list: [],

      genres: "",
      payType: payType.FREE,
      date: now.format("yyyy-MM-dd"),
      country: countryCode.CHINA,
      device: deviceType.IPHONE,

      page: 1,
      total: 0
    }
  },

  componentDidMount: function(){
    this.unSubscribe = TopStore.listen(this.onStateChange.bind(this));

    var now = new Date();

    TopAction.fetchList({
      genres: this.state.genres,
      date: this.state.date,
      country: this.state.country,
      device: this.state.device,
      type: this.state.payType,
      test: true
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    this.setState(state);
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

  loadMore: function(){
    var page = this.state.page + 1;
    this.setState({
      page: page
    });

    SearchAction.search(this.state.searchKey, page);
  },

  onItemClick: function(data){
    var query = Object.assign({}, data);
    this.history.pushState("", "detail/1", query);
  },

  onSelectTab: function(tab){
    this.setState({
      payType: tab.payType
    }, ()=>{
      TopAction.fetchList({
        date: this.state.date,
        country: this.state.country,
        device: this.state.device,
        type: this.state.payType,
        test: true
      });
    });
  },  

  onFilter: function(filterParams){
    console.log(filterParams);
  },

  render: function(){
    var query = this.props.location.query;

    if(query.filter){
      return <Filter
               onOk={this.onFilter}
               device={true}
               country={true}
               datetime={true}
               days={true}
               category={true}/>;
    }else{
      return this.renderTop();
    }
  },

  renderTop: function(){
    var list = this.state.list || [];

    return (
      <div className="c-page top-list">
        <Header 
          filterEnabled={true}
          showSideNav={this.props.showSideNav}>
          iOS榜单排名
        </Header>
        <div className="c-body">
          <Tabs 
            onSelect={this.onSelectTab}
            tabs={this.state.tabs}/>

          <p className="f12 center f-txt">
            所有分类，中国，iPhone, 2016-04-29
          </p>

          <ul className="list">
            {
              list.map((item, idx)=>{
                return (
                  <AppItem 
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

export default TopList;