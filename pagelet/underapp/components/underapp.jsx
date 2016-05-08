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

import UnderAppAction from "../action/action";
import UnderAppStore from "../store/store";

var UnderAppList = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      underAppList: [],

      //filter params
      page: 1,
      country: "cn",
      date: "20160409"
    }
  },

  componentDidMount: function(){
    this.unSubscribe = UnderAppStore.listen(this.onStateChange.bind(this));
    UnderAppAction.fetchUnderAppList({
      country: this.state.country,
      date: this.state.date,
      page: this.state.page
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
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
    });

    UnderAppAction.fetchUnderAppList({
      country: this.state.country,
      date: this.state.date,
      page: this.state.page + 1
    });
  },

  onItemClick: function(data){
    var query = Object.assign({}, data);
    this.history.pushState("", "detail/1", query);
  },

  render: function(){
    var query = this.props.location.query;

    if(query.filter){
      return <Filter/>;
    }else{
      return this.renderTop();
    }
  },

  renderTop: function(){
    const state = this.state;

    return (
      <div className="c-page under-app-list">
        <Header 
          filterEnabled={true}
          showSideNav={this.props.showSideNav}>
          下架应用监控
        </Header>

        <div 
          onScroll={this.handleScroll.bind(this)}
          className="c-body">

          <p className="f12 center f-txt">
            中国, 2016-04-29
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