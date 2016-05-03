/**
  * @require ../top.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

import Header from "/pagelet/widget/components/header";
import Rank from "/pagelet/widget/components/rank";
import Loading from "/pagelet/widget/components/loading";


var TopList = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      topList: [],

      page: 1,
      total: 0
    }
  },

  componentDidMount: function(){
    //this.unSubscribe = SearchStore.listen(this.onStateChange.bind(this));
  },

  componentWillUnmount: function(){
    //this.unSubscribe();
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

  render: function(){
    return (
      <div className="c-page top-list">
        <Header showSideNav={this.props.showSideNav}>iOS榜单排名</Header>
        <div className="c-body">
          <ul className="top-nav">
            <li>免费榜</li>
            <li>付费榜</li>
            <li>畅销榜</li>
          </ul>
          <p className="f12">所有分类，中国，iPhone, 2016-04-29</p>
          <div className="list">

          </div>
        </div>
      </div>
    );
  }
});

export default TopList;