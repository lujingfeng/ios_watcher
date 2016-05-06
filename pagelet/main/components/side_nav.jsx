import React from "react";
import {History} from "/static/lib/reactRouter";

var SideNav = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      visible: false
    }
  },

  componentDidMount: function(){
    
  },

  componentWillUnmount: function(){

  },

  onStateChange: function(state){

  },

  show: function(){
    this.setState({
      visible: true
    }, ()=>{
      setTimeout(()=>{
        this.refs.root.className += " visible";
      },20);
    });
  },  

  hide: function(){
    this.setState({
      visible: false
    });
  },

  onMask: function(e){
    if(e.target == this.refs.root){
      this.hide();
    }
  },

  onNav: function(path, query){
    this.hide();
    this.history.pushState(null, path, query);
  },

  onClose: function(){
    this.hide();
  },

  render: function(){
    if(!this.state.visible){
      return null;
    }

    return (
      <div className="c-page side-page" ref="root" onClick={this.onMask}>
        <div className="side-nav">
          <div className="profile">
            <i className="awatar"></i>
            <span>123@gmail.com</span>
            <div className="close" onClick={this.onClose}></div>
          </div>
          <ul>
            <li onClick={e=>this.onNav("/toplist")}>
              <i className="icon"></i>
              iOS榜单排名
            </li>
            <li onClick={e=>this.onNav("/top7uplist")}>
              <i className="icon"></i>
              七日排名上升榜
            </li>
            <li onClick={e=>this.onNav("/top7downlist")}>
              <i className="icon"></i>
              七日排名下降榜
            </li>

            <li onClick={e=>this.onNav("/under_app_monitor")}>
              <i className="icon"></i>
              下架应用监控
            </li>

            <li onClick={e=>this.onNav("/hotkeywords")} style={{display:"none"}}>
              <i className="icon"></i>
              关键词热度排行榜
            </li>
            <li onClick={e=>this.onNav("/search/input", {overlay: true})}>
              <i className="icon"></i>
              App关键词覆盖数
            </li>
            <li>
              <i className="icon"></i>
              ASO优化服务
            </li>
          </ul>
          <ul>
            <li>
              <i className="icon fav"></i>
              我的关注
            </li>
          </ul>

          <ul>
            <li>
              <i className="icon about"></i>
              关于我们
            </li>
            <li>
              <i className="icon callin"></i>
              <a href="tel:4006343800">
                <i className="icon"></i>
                400-6343-800
              </a>
            </li>
            <li style={{color:"red",paddingLeft: 50}}>
              退出
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

export default SideNav;