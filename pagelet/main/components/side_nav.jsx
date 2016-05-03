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

  onNav: function(path){
    this.hide();
    this.history.pushState(null, path);
  },

  render: function(){
    if(!this.state.visible){
      return null;
    }

    return (
      <div className="c-page side-page" ref="root" onClick={this.onMask}>
        <div className="side-nav">
          <div className="profile">
            123@gmail.com
          </div>
          <ul>
            <li onClick={e=>this.onNav("/toplist")}>
              <i className="icon"></i>
              iOS榜单排名
            </li>
            <li>
              <i className="icon"></i>
              七日排名上升榜
            </li>
            <li>
              <i className="icon"></i>
              七日排名下降榜
            </li>
            <li>
              <i className="icon"></i>
              关键词热度排行榜
            </li>
            <li>
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
              <i className="icon"></i>
              我的关注
            </li>
          </ul>

          <ul>
            <li>
              <i className="icon"></i>
              关于我们
            </li>
            <li>
              <a href="tel:4006343800">
                <i className="icon"></i>
                400-6343-800
              </a>
            </li>
            <li style={{color:"red"}}>
              <i className="icon"></i>
              退出
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

export default SideNav;