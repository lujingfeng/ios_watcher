/**
  * @require ../main.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";
import $ from "jquery";
import {getCookie} from "/static/minxins/utils";
import SideNav from "./side_nav";


var MainView = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      showSideNav: ()=>{this.refs.sideNav.show();},
      isLogin: ()=>{return this.isLogin();}
    }
  },

  isLigin: function(){
    return getCookie("uname");
  },

  componentDidMount: function(){
    
  },

  componentWillUnmount: function(){

  },

  onStateChange: function(state){

  },

  renderChildren: function () {
    return React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, this.state);
    }.bind(this));
  },

  render: function(){

    return (
      <div className="__runtime__">
        {this.renderChildren()}
        <SideNav ref="sideNav"/>
      </div>
    );
  }
});

export default MainView;