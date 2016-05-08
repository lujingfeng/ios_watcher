/**
  * @require ../app_item.less
  */

import React from "react";
import Rank from "/pagelet/widget/components/rank";

var getTouch = function(e){
  return e.touches.length ? e.touches[0]:
          (e.targetTouches.length?e.targetTouches[0]:e.changedTouches[0])
}

var AppItem = React.createClass({

  getInitialState: function(){
    return {
      type: this.props.type || 1,//1: 搜索Item 2: 
      isShowDelete: false
    }
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.type != this.props.type){
      this.setState({
        type: nextProps.type
      });
    }
  },

  onClickItem: function(){
    this.props.onItemClick && this.props.onItemClick(this.props.data);
  },

  onTouchStart: function(e){
    var touch = getTouch(e.nativeEvent);
    this.startX = touch.pageX;
  },

  onTouchEnd: function(e){
    var touch = getTouch(e.nativeEvent);
    if(touch.pageX - this.startX > 10){
      this.setState({
        isShowDelete:true
      });
    }else if((touch.pageX - this.startX) < -10){
      this.setState({
        isShowDelete: false
      });
    }
  },

  onDelete: function(){
    this.props.onDelete && this.props.onDelete(this.props.data);
  },

  render: function(){
    const data = this.props.data || {};
    const type = this.state.type;
    const state = this.state;

    var column2, column3;
    var trProps={};


    //1:搜索Item  3:app关键字覆盖item 5: 对比搜索结果item
    if(type == 1 || type == 3 || type == 5){

      //返回的是字符串
      let score = parseFloat(data.score || 0);
      let width = 200;

      if(type == 3){
        column3 = (
          <td>
            <div className="f10 center">
              <i className="icon-q"></i>
              查看
            </div>
          </td>
        );
      }else if(type == 5){
        column3 = (
          <td>
            <div className="f10 center">
              <i className="icon-vs"></i>
              <p>排名对比</p>
            </div>
          </td>
        );
        width = 160;
      }

      column2 = (
        <td>
          <p 
            style={{width: width}}
            className="title ellipsis">
            {this.props.index+1}、{data.title}
          </p>
          <p className="f12 c666 m5 mb5">{data.developer}</p>
          <div>
            <span className="t-vt c666 f12 mr6">{data.genres}</span>
            <Rank value={score} width={14}/>
            <span className="c666 f12 ml6 t-vt">{data.score}</span>
          </div>
        </td>
      );

    //排名item
    }else if(type == 2){
      column2 = (
        <td>
          <p 
            style={{width: 170}}
            className="title ellipsis">
            {this.props.index+1}、{data.title}
          </p>
          <p className="f12 c666 m5 mb5">{data.developer}</p>
          <div>
            <span className="c666 f12 mr6">游戏</span>
            <span className="c666 f12 ml6 t-vt">第{3}名</span>
          </div>
        </td>);
      column3 = (
        <td>
          <i className="up down"></i>
          <i className="f12">01</i>
        </td>
      );
    //竞品对比参考Item
    }else if(type==4){
      column2 = (
        <td>
          <p 
            style={{width: 170}}
            className="title ellipsis">
            {data.title}
          </p>
          <p className="f12 c666 m5 mb5">{data.developer}</p>
        </td>);
      column3 = (
        <td>
          <a className="f12 c-main">已选中</a>
        </td>
      );
    //我的关注Item
    }else if(type == 6){
      //返回的是字符串
      let score = parseFloat(data.score || 0);

      column2 = (
        <td>
          <p 
            style={{width: 200}}
            className="title ellipsis">
            {data.title}
          </p>
          <p className="f12 c666 m5 mb5">{data.developer}</p>
          <div>
            <span className="t-vt c666 f12 mr6">{data.genres}</span>
            <Rank value={score} width={14}/>
            <span className="c666 f12 ml6 t-vt">{data.score}</span>
          </div>
        </td>
      );

      trProps.onTouchStart = this.onTouchStart.bind(this);
      trProps.onTouchEnd = this.onTouchEnd.bind(this);
    //app下架列表item
    }else if(type == 7){
      column2 = (
        <td>
          <p 
            style={{width: 200}}
            className="title ellipsis">
            {data.title}
          </p>
          <p className="f12 c666 m5 mb5">{data.developer}</p>
          <div>
            <span className="t-vt c666 f12 mr6">{data.genres}</span>
            <span className="c666 f12 ml6 t-vt">{data.score}</span>
          </div>
        </td>
      );
    }

    return (
      <li className="app-item" onClick={this.onClickItem}>
        <table>
          <tr {...trProps}>
            {
              (
                <td>
                  <img
                    className="app-icon" 
                    src={data.icon}/>
                </td>)
            }

            {column2}

            {column3}
          </tr>
        </table>
        {
          state.isShowDelete?(
            <div className="del" onClick={this.onDelete}>
              删除
            </div>
          ): null
        }
      </li> 
    );
  }
});

export default AppItem;