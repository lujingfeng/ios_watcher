/**
  * @require ../comp_analysis.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

import Header from "/pagelet/widget/components/header";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";
import {countryCode, deviceType, payType} from "constants";

import MyFavItem from "./my_fav_item";

import CompareAction from "../action/action";
import CompareStore from "../store/store";

var AppCompare = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    var query = this.props.location.query;

    return {
      app_1: query.app_1,
      app_2: query.app_2
    }
  },

  componentDidMount: function(){
    this.unSubscribe = CompareStore.listen(this.onStateChange.bind(this));
    require.async("/static/lib/echarts.min", (echarts)=>{
      var chart = echarts.init(this.refs.chart);
      // 指定图表的配置项和数据
        var option = {
            title: {
                text: ''
            },
            tooltip: {},
            legend: {
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ["2012","2013","2014"]
            },
            yAxis: {},
            series: [{
              name: 'app1',
              smooth: true,
              type: 'line',
              data: [5, 400, 36]
            }, {
              name: 'app2',
              smooth: true,
              type: 'line',
              data: [3, 600, 20]
            },{
              name: 'app3',
              smooth: true,
              type: 'line',
              data: [8, 1000, 800]
            }, {
              name: 'app2',
              smooth: true,
              type: 'line',
              data: [1, 200, 100]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chart.setOption(option);
    });

    CompareAction.getCompare({
      appId: "347" || this.state.app_1.appId,
      interval: 7,
      country: countryCode.CHINA,
      device: deviceType.IPHONE,
      type: payType.FREE
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    this.setState(state);
  },

  render: function(){
    let query = this.props.location.query || {};

    return (
      <div className="c-page app-compare">
        <Header showSideNav={this.props.showSideNav}>
          竞品对比
        </Header>
        
        <div className="c-body">
          <ul className="clearfix rel">
            <MyFavItem type="comp" data={this.state.app_1}/>
            <MyFavItem type="comp" data={this.state.app_2}/>
            <i className="icon-vs"></i>
          </ul>

          <div className="content">
            <h5 className="title">
              <p className="fr f10 c999">今日, 免费, 中国, 7天</p>
              <i></i>
              排名趋势对比图
            </h5>
          </div>

          <div ref="chart" style={{width:"100%", height: 200}}>

          </div>
        </div>
      </div>
    );
  }
});

export default AppCompare;