/**
  * @require ../detail.less
  */

import React from "react";
import $ from "jquery";
import DetailAction from "../action/action";
import DetailStore from "../store/store";
import {countryCode, countryCode2Str, days2Str, deviceType, payType, payTypeToStr,deviceTypeStr} from "constants";
import iosCompareAction from "/pagelet/compproduct/action/action";
import iosCompareStore from "/pagelet/compproduct/store/store";

var RRank = React.createClass({ 
  getInitialState: function(){
    var query = this.props.query;
    var filter = this.props.filter || {};

    return {
      top1: {},
      top2: {},

      series: [],

      legend: {
        data:[],
        top: "40%",
        itemWidth:50
      },

      days: filter.days ? filter.days.value:1,
      country: filter.country? filter.country.value: countryCode.CHINA,
      payType: filter.pay? filter.pay.value: payType.FREE,
      device: filter.device ? filter.device.value: deviceType.IPHONE,
    }
  },

  componentDidMount: function(){
    this.unSubscribe = DetailStore.listen(this.onStateChange.bind(this));

    this.iosUnscribe = iosCompareStore.listen(this.onRankChange.bind(this));

    var query = this.props.query;
    require.async("/static/lib/echarts.min", (echarts)=>{
      this.intChart(echarts);
    });

    DetailAction.ranklatest({
      id: query.id,
      country: query.country,
      device: query.device
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
    this.iosUnscribe();
  },

  intChart : function(echarts){
    if(!this.refs.chart || this.chart || !echarts){
      return;
    }

    this.chart = echarts.init(this.refs.chart);
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: ''
        },
        grid:[{x: '12%', y: 10, width: '84%', height: '30%'}],
        tooltip: {},
        legend: this.state.legend,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {},
        series: []
    };

    //使用刚指定的配置项和数据显示图表。
    this.chart.setOption(option);

    var query = this.props.query;

    var params = {
      interval: this.state.days,
      country: this.state.country,
      device: this.state.device,
      type: this.state.payType
    };

    if(params.interval == 1 || params.interval == -1){
      //delete params.type;
      iosCompareAction.getRankBy($.extend({
      id: query.id
    }, params), query.title);
    }else{
      iosCompareAction.getCompare($.extend({
        appId: query.id
      }, params), query.title);
    }
  },

  onStateChange: function(state){
    this.setState(state);
  },

  onRankChange: function(state){
    if(state.series){
      this.state.series = this.state.series.concat(state.series);
      this.state.legend.data = this.state.legend.data.concat(state.legend.data);

      this.chart.setOption({
        xAxis: state.xAxis,
        series: this.state.series,
        legend: this.state.legend
      });
    }
  },

  render: function(){
    return (
      <div className="real-rank">

        <h5 className="title">
          <i></i>
          实时排名
        </h5>

        <table border="1" cellSpacing="0">
          <tr>
            <th style={{width:"auto"}}></th>
            <th>{this.state.top1.name||"-"}</th>
            <th>{this.state.top2.name||"-"}</th>
          </tr>
          <tr>
            <td>实时排名</td>
            <td>
              <p className="mt6 f16">{this.state.top1.rank}</p>
              <p className="f12 c999 mb6">{this.state.top1.time}</p>
            </td>
            <td>
              <p className="m6 f16">{this.state.top2.rank}</p>
              <p className="f12 c999 mb6">{this.state.top2.time}</p>
            </td>
          </tr>
        </table>
        <h5 className="title">
          <p className="fr f10">
            {deviceTypeStr[this.state.device]} &nbsp;
            {payTypeToStr[this.state.payType]} &nbsp;
            {countryCode2Str[this.state.country]} &nbsp;
            {days2Str[this.state.days]}
          </p>
          <i></i>
          排名趋势
        </h5>
        <div ref="chart" style={{width:"100%", height: 500}}>

        </div>
      </div>
    );
  }
});

export default RRank;