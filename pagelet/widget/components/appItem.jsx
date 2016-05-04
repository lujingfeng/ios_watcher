/**
  * @require ../app_item.less
  */

import React from "react";
import Rank from "/pagelet/widget/components/rank";


var AppItem = React.createClass({

  getInitialState: function(){
    return {
      type: this.props.type || 1//1: 搜索Item 2: 
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

  render: function(){
    var data = this.props.data || {};
    var type = this.state.type;

    var column2, column3;

    //搜索Item app关键字覆盖item
    if(type == 1 || type == 3){

      //返回的是字符串
      var score = parseFloat(data.score || 0);

      column2 = (
        <td>
          <p 
            style={{width: 200}}
            className="title ellipsis">
            {this.props.index+1}、{data.title}
          </p>
          <p className="f12 c666 m5 mb5">{data.developer}</p>
          <div>
            <span className="t-vt c666 f12 mr5">应用</span>
            <Rank value={score} width={14}/>
            <span className="c666 f12 ml5 t-vt">{data.score}</span>
          </div>
        </td>
      );

      if(type == 3){
        column3 = (
          <td>
            <div className="f10 center">
              <i className="icon-q"></i>
              查看
            </div>
          </td>
        );
      }
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
            <span className="c666 f12 mr5">游戏</span>
            <span className="c666 f12 ml5 t-vt">第{3}名</span>
          </div>
        </td>);
      column3 = (
        <td>
          <i className="up down"></i>
          <i className="f12">01</i>
        </td>
      );
    }

    return (
      <li className="app-item" onClick={this.onClickItem}>
        <table>
          <tr>
            <td>
              <img
                className="app-icon" 
                src={data.icon}/>
            </td>

            {column2}

            {column3}
          </tr>
        </table>
      </li> 
    );
  }
});

export default AppItem;