/**
  * @require ../header.less
  */

import React from "react";
import $ from "jquery";
import {History} from "reactRouter";

var Header = React.createClass({ 

  mixins: [History],

  getInitialState: function(){
    let filterVisible;

    if(typeof this.props.filterVisible == "undefined"){
      filterVisible = true;
    }else{
      filterVisible = !!this.props.filterVisible;
    }

    return {
      type: this.props.type || "normal",
      searchKey: this.props.searchValue||"",

      filterEnabled: !!this.props.filterEnabled,
      filterVisible: filterVisible
    }
  },

  componentWillReceiveProps: function(nextProps){
    var state = {};

    if(nextProps.searchValue != this.props.searchValue){
      state.searchKey = nextProps.searchValue;
    }
    if(nextProps.type != this.props.type){
      state.type = nextProps.type;
    }
    if(nextProps.filterEnabled != this.props.filterEnabled){
      state.filterEnabled = nextProps.filterEnabled;
    }
    if(nextProps.filterVisible != this.props.filterVisible){
      state.filterVisible = nextProps.filterVisible;
    }
    this.setState(state);
  },

  componentDidMount: function(){
    
  },

  componentWillUnmount: function(){

  },

  onStateChange: function(state){

  },

  onSearch: function(){
    if(this.state.searchKey && this.props.onSearch){
      this.props.onSearch(this.state.searchKey);
    }
  },

  onCancelSearch: function(){
    this.props.onCancelSearch && this.props.onCancelSearch();
  },

  toSearch: function(){
    this.history.pushState(null, "/search/input");
  },

  toFilter: function(){
    const {toFilter} = this.props;
    const {filterEnabled} = this.state;
    const loc = this.props.location;

    if(filterEnabled && toFilter){
      toFilter();
    }

    if(filterEnabled){
      var pathname = location.hash.slice(2, location.hash.indexOf("?"));
      this.history.pushState(null, pathname, $.extend({filter:true}, loc.query));
    }
  },

  onSubmit: function(e){
    e.preventDefault();
    this.onSearch();
  },

  render: function(){
    let type = this.state.type;
    let filterStyle = {};
    const state = this.state;

    if(!state.filterEnabled){
      filterStyle.opacity = 0.5;
    }

    if(!state.filterVisible){
      filterStyle.display = "none";
    }

    return (
      <div className="c-header">
        {
          type == "search" ? (
            <div className="search">
              <div className="input-con">
                <form onSubmit={this.onSubmit}>
                  <input 
                    ref="search"
                    onKeyUp={this.onKeyUp}
                    placeholder={this.props.placeholder}
                    value={this.state.searchKey}
                    onChange={e=>this.setState({searchKey:e.target.value})}
                    type="search"/>
                  <i className="icon-q" onClick={this.onSearch}></i>
                </form>
              </div>
              <i className="cl" onClick={this.onCancelSearch}>取消</i>
            </div>
          ): null
        }

        {
          type == "normal" ? (
            <div className="normal">
              <div className="icon-menu" onClick={e=>this.props.showSideNav()}></div>
              <div 
                style={!state.filterVisible?{right:40}: null}
                className="middle">
                {this.props.children}
              </div>

              <div className="right">
                <i className="icon-q" onClick={this.toSearch}></i>
                <i 
                 style={filterStyle}
                 className="icon-filter" 
                 onClick={this.toFilter}></i>
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
});

export default Header;