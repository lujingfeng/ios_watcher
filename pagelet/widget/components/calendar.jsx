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
      initialArray.push({
        year: this.props.year,
        month: this.props.month,
        day: d
      });
    }

    var row1 = initialArray.slice(0, 7);
    var row2 = initialArray.slice(7, 14);
    var row3 = initialArray.slice(14, 21);
    var row4 = initialArray.slice(21, 28);
    var row5 = initialArray.slice(28, 35);
    var row6 = initialArray.slice(35, initialArray.length);


    return (
      <div className="c-month">
        <h5>{this.props.year+"年"+this.props.month+"月"}</h5>
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
              return <td onClick={e=>{this.onSelect(item)}}>{item.day||""}</td>
            })
          }
          </tr>
          <tr>
          {
            row2.map((item, idx)=>{
              return <td onClick={e=>{this.onSelect(item)}}>{item.day||""}</td>
            })
          }
          </tr>
          <tr>
          {
            row3.map((item, idx)=>{
              return <td onClick={e=>{this.onSelect(item)}}>{item.day||""}</td>
            })
          }
          </tr>
          <tr>
          {
            row4.map((item, idx)=>{
              return <td onClick={e=>{this.onSelect(item)}}>{item.day||""}</td>
            })
          }
          </tr>
          <tr>
          {
            row5.map((item, idx)=>{
              return <td onClick={e=>{this.onSelect(item)}}>{item.day||""}</td>
            })
          }
          </tr>
          <tr>
          {
            row6.map((item, idx)=>{
              return <td onClick={e=>{this.onSelect(item)}}>{item.day||""}</td>
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
    var lastMonth = document.querySelector(".c-month:last-child");
    lastMonth.scrollIntoView();
  },

  onCancel: function(){
    this.props.cancel && this.props.cancel();
  },

  render: function(){
    var today = new Date();
    var thisYear = today.getFullYear();
    var months = [];
    
    for(var startYear=2014; startYear < thisYear; startYear++){
      for(var m=1; m <= 12; m++){
        months.push(
          <Month 
            year={startYear} 
            month={m} 
            onSelected={this.props.onSelected}/>
          );
      }
    }

    var curMonth = today.getMonth()+1;
    for(var i=1; i<=curMonth; i++){
      months.push(
          <Month 
            year={thisYear} 
            month={i} 
            onSelected={this.props.onSelected}/>
          );
    }
  
    return (
      <div className="c-page c-calendar">
        <div className="hdr">
          选择时间
          <i className="c999" onClick={this.onCancel}>取消</i>
        </div>

        <div className="c-body" ref="list">
          {months}
        </div>
      </div>
    );
  }
});

export default Calendar;