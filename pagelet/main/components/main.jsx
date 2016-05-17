/**
  * @require ../main.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";
import $ from "jquery";
import {getCookie} from "/static/minxins/utils";
import SideNav from "./side_nav";

import Popup from "./pagelet/widget/components/popup";


var MainView = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      confirmVisible: false,
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

  onTapMasker: function(){
    this.setState({
      confirmVisible: false
    });
  },

  logOut: function(){
    this.refs.sideNav.onLogout();
  },

  showConfirm: function(){
    this.setState({
      confirmVisible: true
    });
  },

  render: function(){

    return (
      <div className="__runtime__">
        {this.renderChildren()}
        <SideNav ref="sideNav" showConfirm={this.showConfirm}/>
        {
          this.state.confirmVisible?
          <Popup ref="confirm" onTapMasker={this.onTapMasker}>
            <div className="c-confirm">
              <p>您确认要退出登录吗？</p>
              <div>
                <button className="btn normal" onClick={this.logOut}>退出</button>
                <button className="btn main-btn" onClick={this.onTapMasker}>取消</button>
              </div>
            </div>
          </Popup>: null
        }
      </div>
    );
  }
});

export default MainView;