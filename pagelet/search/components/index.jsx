/**
  * @require ../search.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";
import {send} from "/static/minxins/utils";
import Header from "/pagelet/widget/components/header";
var Search = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
    }
  },

  componentDidMount: function(){
    send({
      type: "search",
      opra: "pv",
      label: "首页"
    });
  },

  componentWillUnmount: function(){

  },

  onStateChange: function(state){

  },

  onDefaultSearchTouch: function(e){
    e.preventDefault();
    this.history.pushState("",'/search/input');
  },

  render: function(){
    return (
      <div className="c-page c-search">
        <div className="icon-menu" onClick={e=>this.props.showSideNav()}></div>
        <i className="ver f12">iOS版</i>
        <div className="default">
          <div className="coolchuan"></div>
          <div 
            className="input-search">
            <input 
              onClick={this.onDefaultSearchTouch}
              placeholder="支持应用名称或AppID搜索"
              type="text"/>
            <i 
              onClick={this.onDefaultSearchTouch}
              className="icon-query"></i>
          </div>
        </div>
      </div>
    );
  }
});

export default Search;