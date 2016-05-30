/**
  * @require ../calendar.less
  */

import React from "react";
import {History} from "reactRouter";

var Month = React.createClass({
  getInitialState: function(){
    return {}
  },

  daysOfMonth: function(year, month){
    var d = new Date(year, month, 0);
    return d.getDate();
  },

  onSelect: function(date){
    this.props.onSelected(date);
  },

  render: function(){
    var array =[];
    var days = this.daysOfMonth(this.props.year, this.props.month);
    var date = new Date(this.props.year, this.props.month-1, 1);
    var week = date.getDay();
    var initialArray = [];

    for(var w=0; w<week;w++){
      initialArray.push("");
    }

    for(var d=1; d<=days; d++){
      var time = +new Date(this.props.year, this.props.month - 1, d);
      initialArray.push({
        year: this.props.year,
        month: this.props.month,
        day: d,
        time: time
      });
    }

    var row1 = initialArray.slice(0, 7);
    var row2 = initialArray.slice(7, 14);
    var row3 = initialArray.slice(14, 21);
    var row4 = initialArray.slice(21, 28);
    var row5 = initialArray.slice(28, 35);
    var row6 = initialArray.slice(35, initialArray.length);

    var curDatetime = this.props.curDatetime;
    var now = Date.now();

    if(curDatetime && curDatetime.value == 1){
      var curDate = new Date();
      curDatetime.year = curDate.getFullYear();
      curDatetime.month = curDate.getMonth() + 1;
      curDatetime.day = curDate.getDate();
    }

    if(curDatetime && curDatetime.value == -1){
      var curDate = new Date();
      curDate.setTime(curDate.getTime() - 24 * 60 * 60 * 1000);
      curDatetime.year = curDate.getFullYear();
      curDatetime.month = curDate.getMonth() + 1;
      curDatetime.day = curDate.getDate();
    }


    var thisMonth = new Date(this.props.year, this.props.month -1);

    return (
      <div className="c-month">
        <h5>{thisMonth.format("yyyy年MM月")}</h5>
        <table>
          <tr>
            <th>周日</th>
            <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
            <th>周六</th>
          </tr>
          <tr>
          {
            row1.map((item, idx)=>{
              var props = {};

              if(curDatetime && typeof curDatetime.year!="undefined"&&
                 curDatetime.year==item.year &&
                 curDatetime.month == item.month &&
                 curDatetime.day == item.day){
                props.className = "selected";
                props.id = "curDatetime";
              }

              if(item.time > now){
                props.className = " disabled";
              }else{
                props.onClick = e=>{this.onSelect(item)};
              }
              return <td {...props}>{item.day||""}</td>
            })
          }
          </tr>
          <tr>
          {
            row2.map((item, idx)=>{
              var props = {};

              if(curDatetime && typeof curDatetime.year!="undefined"&&
                 curDatetime.year==item.year &&
                 curDatetime.month == item.month &&
                 curDatetime.day == item.day){
                props.className = "selected";
                props.id = "curDatetime";
              }

              if(item.time > now){
                props.className = " disabled";
              }else{
                props.onClick = e=>{this.onSelect(item)};
              }
              return <td {...props}>{item.day||""}</td>
            })
          }
          </tr>
          <tr>
          {
            row3.map((item, idx)=>{
              var props = {};

              if(curDatetime && typeof curDatetime.year!="undefined"&&
                 curDatetime.year==item.year &&
                 curDatetime.month == item.month &&
                 curDatetime.day == item.day){
                props.className = "selected";
                props.id = "curDatetime";
              }

              if(item.time > now){
                props.className = " disabled";
              }else{
                props.onClick = e=>{this.onSelect(item)};
              }

              return <td {...props}>{item.day||""}</td>
            })
          }
          </tr>
          <tr>
          {
            row4.map((item, idx)=>{
              var props = {};

              if(curDatetime && typeof curDatetime.year!="undefined"&&
                 curDatetime.year==item.year &&
                 curDatetime.month == item.month &&
                 curDatetime.day == item.day){
                props.className = "selected";
                props.id = "curDatetime";
              }

              if(item.time > now){
                props.className = " disabled";
              }else{
                props.onClick = e=>{this.onSelect(item)};
              }

              return <td {...props}>{item.day||""}</td>
            })
          }
          </tr>
          <tr>
          {
            row5.map((item, idx)=>{
              var props = {};

              if(curDatetime && typeof curDatetime.year!="undefined"&&
                 curDatetime.year==item.year &&
                 curDatetime.month == item.month &&
                 curDatetime.day == item.day){
                props.className = "selected";
                props.id = "curDatetime";
              }

              if(item.time > now){
                props.className = " disabled";
              }else{
                props.onClick = e=>{this.onSelect(item)};
              }

              return <td {...props}>{item.day||""}</td>
            })
          }
          </tr>
          <tr>
          {
            row6.map((item, idx)=>{
              var props = {};

              if(curDatetime && typeof curDatetime.year!="undefined"&&
                 curDatetime.year==item.year &&
                 curDatetime.month == item.month &&
                 curDatetime.day == item.day){
                props.className = "selected";
                props.id = "curDatetime";
              }

              if(item.time > now){
                props.className = " disabled";
              }else{
                props.onClick = e=>{this.onSelect(item)};
              }
              return <td {...props}>{item.day||""}</td>
            })
          }
          </tr>
        </table>
      </div>
    );
  }
});

var Calendar = React.createClass({ 

  mixins: [History],

  getInitialState: function(){
    return {}
  },

  componentDidMount: function(){
    var month = document.querySelector("#curDatetime");
    month && month.scrollIntoView();
  },

  onCancel: function(){
    this.props.cancel && this.props.cancel();
  },

  render: function(){
    var today = new Date();
    var thisYear = today.getFullYear();
    var months = [];
    
    for(var startYear=2014; startYear < thisYear; startYear++){
      break;
      for(var m=1; m <= 12; m++){
        months.push(
          <Month 
            year={startYear} 
            month={m} 
            curDatetime={this.props.curDatetime}
            onSelected={this.props.onSelected}/>
          );
      }
    }

    var curMonth = today.getMonth()+1;
    for(var i=3; i<=curMonth; i++){
      months.push(
          <Month 
            year={thisYear} 
            month={i} 
            curDatetime={this.props.curDatetime}
            onSelected={this.props.onSelected}/>
          );
    }
  
    return (
      <div className="c-page c-calendar">
        <div className="hdr">
          选择时间
          <i onClick={this.onCancel}>取消</i>
        </div>

        <div className="c-body" ref="list">
          {months}
        </div>
      </div>
    );
  }
});

export default Calendar;