import React from "react";
import {History} from "/static/lib/reactRouter";
import {getCookie, setCookie} from "/static/minxins/utils";

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

  onClose: function(e){
    e.stopPropagation();
    this.hide();
  },

  onClickLogin: function(){
    if(!getCookie("uname")){
      location.replace("/check/login-page");
    }
  },

  onLogout: function(){
    setCookie("uname", "", 0);
    location.replace("/#/search");
    this.hide();
  },

  render: function(){
    if(!this.state.visible){
      return null;
    }

    var uname = getCookie("uname");

    return (
      <div className="c-page side-page" ref="root" onClick={this.onMask}>
        <div className="side-nav">
          <div className="profile" onClick={this.onClickLogin}>
            <i className="awatar"></i>
            <span className="ellipsis">{getCookie("uname")||"登录 / 注册"}</span>
            <div className="close" onClick={this.onClose}></div>
          </div>
          <ul className="nav1">
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
            <li onClick={e=>this.onNav("/search/input", {overlay: true})} style={{display:"none"}}>
              <i className="icon"></i>
              App关键词覆盖数
            </li>
            <li onClick={e=>this.onNav("/aso_service")}>
              <i className="icon"></i>
              ASO优化服务
            </li>
          </ul>
          <ul>
            <li onClick={e=>this.onNav("/myfavlist")}>
              <i className="icon fav"></i>
              我的关注
            </li>
          </ul>

          <ul>
            <li onClick={e=>this.onNav("/about")}>
              <i className="icon about"></i>
              关于我们
            </li>
            <li style={{dislay:"none"}}>
              <i className="icon callin"></i>
              <a href="tel:4006343800">
                400-6343-800
              </a>
            </li>
            {
              uname?
              <li style={{color:"red",paddingLeft: 50}} onClick={e=>this.props.showConfirm()}>
                退出
              </li>:null
            }
          </ul>
        </div>
      </div>
    );
  }
});

export default SideNav;