/**
  * @require ../header.less
  */

import React from "react";
import $ from "jquery";
import {History} from "reactRouter";

var Header = React.createClass({ 

  mixins: [History],

  getInitialState: function(){
    return {
      type: this.props.type || "normal",
      searchKey: this.props.searchValue||""
    }
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.searchValue != this.props.searchValue){
      this.setState({
        searchKey: nextProps.searchValue
      });
    }
    if(nextProps.type != this.props.type){
      this.setState({
        type: nextProps.type
      });
    }
  },

  componentDidMount: function(){
   
  },

  componentWillUnmount: function(){
  },

  onStateChange: function(state){

  },

  onSearch: function(){
    console.log(this.state.searchKey);
    this.props.onSearch && this.props.onSearch(this.state.searchKey);
  },

  onCancelSearch: function(){
    this.props.onCancelSearch && this.props.onCancelSearch();
  },

  toSearch: function(){
    this.history.pushState(null, "/search/input");
  },

  render: function(){
    let type = this.state.type;

    return (
      <div className="c-header">
        {
          type == "search" ? (
            <div className="search">
              <div className="input-con">
                <input 
                  value={this.state.searchKey}
                  onChange={e=>this.setState({searchKey:e.target.value})}
                  type="text"/>
                <i className="icon-query" onClick={this.onSearch}></i>
              </div>
              <i className="cl" onClick={this.onCancelSearch}>取消</i>
            </div>
          ): null
        }

        {
          type == "normal" ? (
            <div className="normal">
              <div className="icon-menu" onClick={e=>this.props.showSideNav()}></div>
              <div className="middle">
                {this.props.children}
              </div>

              <div className="right">
                <i className="icon-query" onClick={this.toSearch}></i>
                <i className="icon-filter"></i>
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
});

export default Header;