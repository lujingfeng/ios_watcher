/**
  * @require ../detail.less
  */

import React from "react";
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
      series: [],

      legend: {
        data:[],
        top: "45%",
        itemWidth:50
      },

      days: filter.days ? filter.days.value:30,
      country: filter.country? filter.country.value: countryCode.CHINA,
      payType: filter.pay? filter.pay.value: payType.FREE,
      device: filter.device ? filter.device.value: deviceType.IPHONE,
    }
  },

  componentDidMount: function(){
    this.iosUnscribe = iosCompareStore.listen(this.onRankChange.bind(this));

    var query = this.props.query;

    DetailAction.realRank({
      country: query.country,
      device: query.device,
      id: query.id
    });

    require.async("/static/lib/echarts.min", (echarts)=>{
      this.intChart(echarts);
    });
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
        grid:[{x: '12%', y: '10%', width: '84%', height: '30%'}],
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

    iosCompareAction.getCompare(Object.assign({
      appId: query.id
    }, params), query.title);
  },

  componentWillUnmount: function(){
    this.iosUnscribe();
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
            <th></th>
            <th>总榜（免费）</th>
            <th>软件（免费）</th>
          </tr>
          <tr>
            <td>实时排名</td>
            <td>
              <p className="m10 f16">1500</p>
              <p className="f12 c999 mb10">2015-01-08前</p>
            </td>
            <td>
              <p className="m10 f16">1200</p>
              <p className="f12 c999 mb10">2015-01-08前</p>
            </td>
          </tr>
        </table>
        <h5 className="title">
          <p className="fr f10 c999">
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