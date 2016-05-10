/**
  * @require ../filter.less
  */

import React from "react";
import {History} from "reactRouter";
import Calendar from "./calendar";

var Filter = React.createClass({
  mixins: [History],
  getInitialState: function(){
    return {
      showCalendar:false
    }
  },

  onCancel: function(){
    this.history.goBack();
  },

  onOtherDate: function(){
    this.setState({
      showCalendar: true
    });
  },

  onCanlendarCancel: function(){
    this.setState({
      showCalendar:false
    });
  },

  onCalendarSelect: function(date){
    this.setState({
      showCalendar:false
    });
    console.log(date);
  },

  render: function(){
    if(this.state.showCalendar){
      return (
        <Calendar 
          onSelected={this.onCalendarSelect}
          cancel={this.onCanlendarCancel}/>
        )
    }
    return (
      <div className="c-filter">
        <div className="hdr">
          筛选
          <i className="c999" onClick={this.onCancel}>取消</i>
        </div>

        <h5>设备</h5>
        <ul className="f-type clearfix">
          <li><span>iPhone</span></li>
          <li><span>iPad</span></li>
        </ul>

        <h5>国家</h5>
        <ul className="f-type clearfix">
          <li><span>中国</span></li>
          <li><span>香港</span></li>
          <li><span>台湾</span></li>
          <li><span>美国</span></li>
          <li><span>日本</span></li>
          <li><span>韩国</span></li>
        </ul>

        <h5>时间</h5>
        <ul className="f-type clearfix">
          <li><span>今天</span></li>
          <li><span>昨天</span></li>
          <li style={{width:"50%"}} onClick={this.onOtherDate}><span>其他</span></li>
        </ul>

        <h5>时间</h5>
        <ul className="f-type clearfix">
          <li><span>今天</span></li>
          <li><span>昨天</span></li>
          <li><span>7日</span></li>
          <li><span>15日</span></li>
          <li><span>30日</span></li>
          <li><span>60日</span></li>
          <li><span>90日</span></li>
        </ul>


        <h5>分类</h5>
        <ul className="f-type clearfix">
          <li><span>全部分类</span></li>
          <li><span>图书</span></li>
          <li><span>商业</span></li>
          <li><span>商品指南</span></li>

          <li><span>教育</span></li>
          <li><span>娱乐</span></li>
          <li><span>财务</span></li>
          <li><span>美食佳饮</span></li>

          <li><span>健康健美</span></li>
          <li><span>儿童</span></li>
          <li><span>生活</span></li>
          <li><span>医疗</span></li>

          <li><span>音乐</span></li>
          <li><span>导航</span></li>
          <li><span>新闻</span></li>
          <li><span>效率</span></li>

          <li><span>参考</span></li>
          <li><span>购物</span></li>
          <li><span>社交</span></li>
          <li><span>体育</span></li>

          <li><span>旅行</span></li>
          <li><span>工作</span></li>
          <li><span>天气</span></li>
          <li><span>摄影录像</span></li>  

          <li style={{width: "50%"}}>
            <span>娱乐场游戏</span>
            <i className="unfolder"></i>
          </li>
          <li style={{width: "50%"}}>
            <span>报刊杂志</span>
            <i className="unfolder"></i>
          </li>       
        </ul>
        <ul className="f-type clearfix">
          <li><span>全部</span></li>
          <li><span>流行时尚</span></li>
          <li><span>家居园艺</span></li>
          <li><span>户外自然</span></li> 
        </ul>

        <div style={{padding:"0 12px"}}>
          <button 
            style={{width:"100%"}}
            className="btn main-btn mt12 mb12">确定</button>
        </div>
      </div>
    );
  }
});

export default Filter