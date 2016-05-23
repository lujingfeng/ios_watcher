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
    }
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.type != this.props.type){
      this.setState({
        type: nextProps.type
      });
    }
    this.setState({isShowDelete:false});
  },

  onClickItem: function(){
    this.props.onItemClick && this.props.onItemClick(this.props.data);
  },

  onTouchStart: function(e){
    return false;
    var touch = getTouch(e.nativeEvent);
    this.startX = touch.pageX;
  },

  onTouchEnd: function(e){
    return;
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

  onDelete: function(e){
    e.stopPropagation();
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
          <p 
            style={{width: width}}
            className="f12 c666 m5 mb5 ellipsis">
            {data.developer}
          </p>
          {
            !this.props.isCompare?
            <div>
              <span className="t-vt c666 f12 mr6">{data.genres}</span>
              <Rank value={score} width={14}/>
              <span className="c666 f12 ml6 t-vt">{data.score}</span>
            </div>:null
          }
        </td>
      );

    //排名item
    }else if(type == 2){
      let width = window.innerWidth - 150;
      var topType;
      var rank = data.rank;

      if(data.other){
        var other = data.other.split("|");
        topType = other[0];
        rank = other[1];
      }

      column2 = (
        <td>
          <p 
            style={{width: width}}
            className="title ellipsis">
            {this.props.index+1}、{data.title}
          </p>
          <p 
            style={{width: width}}
            className="f12 c666 m5 mb5 ellipsis">{data.developer}</p>
          <div>
            <span className="c666 f12 mr6">{data.other?topType:"当前"}</span>
            <span className="c666 f12 ml6 t-vm">{rank == "落榜" ? "落榜": "第"+rank+"名"}</span>
          </div>
        </td>);

      var rankFloat = data.rankfloat;
      var icon = "";
      if(this.props.flag == 1){
        icon = rankFloat!=0?"up":"";
      }else if(this.props.flag == 2){
        icon = rankFloat!=0?"down":"";
      }else{
        if(rankFloat > 0){
          icon = "up";
        }else if(rankFloat < 0){
          icon = "down";
        }
      }

      column3 = (
        <td className="center">
          <i className={icon}></i>
          <i className="f12 t-vm">{Math.abs(rankFloat)!=0?Math.abs(rankFloat):""}</i>
        </td>
      );
    //竞品对比参考Item
    }else if(type==4){
      var width = 170;

      column2 = (
        <td>
          <p 
            style={{width: width}}
            className="title ellipsis">
            {data.title}
          </p>
          <p 
           style={{width: width}}
           className="f12 c666 m5 mb5 ellipsis">{data.developer}</p>
        </td>);
      column3 = (
        <td>
          <a className="f12 c-main s-txt">已选中</a>
        </td>
      );
    //我的关注Item
    }else if(type == 6){
      //返回的是字符串
      let score = parseFloat(data.score || 0);
      let width = window.innerWidth - 120;

      column2 = (
        <td>
          <p 
            style={{width: width}}
            className="title ellipsis">
            {data.title}
          </p>
          <p 
           style={{width: width}}
           className="f12 c666 m5 mb5 ellipsis">{data.developer}</p>
          <div className="ellipsis" style={{width: width}}>
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
          this.props.isShowDelete?(
            <div className="del" onClick={this.onDelete}>
            </div>
          ): null
        }
      </li> 
    );
  }
});

export default AppItem;