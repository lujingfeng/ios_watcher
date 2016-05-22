/**
  * @require ../comp_analysis.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";
import $ from "jquery";
import Header from "/pagelet/widget/components/header";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";
import {
  countryCode, 
  deviceType, 
  deviceTypeStr, 
  payType,
  payTypeToStr, 
  days2Str,
  countryCode2Str} from "constants";
import Filter from "/pagelet/widget/components/filter";
import MyFavItem from "./my_fav_item";
import CompareAction from "../action/action";
import CompareStore from "../store/store";

var AppCompare = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    var query = this.props.location.query;

    return {
      series: [],

      legend: {
        data:[],
        top: "45%",
        itemWidth:50
      },

      app_1: query.app_1,
      app_2: query.app_2,

      days: 1,
      country: countryCode.CHINA,
      payType: payType.FREE,
      device: deviceType.IPHONE,
    }
  },

  componentDidMount: function(){

    var _this = this;
    this.unSubscribe = CompareStore.listen(this.onStateChange.bind(this));
    require.async("/static/lib/echarts.min", (echarts)=>{
      this.echarts = echarts;
      this.intChart(echarts);
    });
    this.history.listen(()=>{
      var query = this.props.location.query;
      if(!query.filter){
        console.log("filter");
        this.intChart(this.echarts);
      }else{
        this.state.legend.data = [];
        this.state.series = [];
      }
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
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
        geo:{top:0},
        grid:[{x: '12%', y: '10', width: '84%', height: '30%'}],
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

    var params = {
      interval: this.state.days,
      country: this.state.country,
      device: this.state.device,
      type: this.state.payType
    };

    if(params.interval == 1 || params.interval == -1){
      //delete params.type;
      CompareAction.getRankBy($.extend({
        id: this.state.app_1.id
      }, params), this.state.app_1.title);

      CompareAction.getRankBy($.extend({
        id: this.state.app_2.id
      }, params), this.state.app_2.title);

    }else{
      CompareAction.getCompare($.extend({
        appId: this.state.app_1.id
      }, params), this.state.app_1.title);

      CompareAction.getCompare($.extend({
        appId: this.state.app_2.id
      }, params),this.state.app_2.title);
    }
  },

  onStateChange: function(state){
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

  onFilter: function(selected){
    var state = {};
    if(selected.days){
      state.days = selected.days.value;
    }
    if(selected.country){
      state.country = selected.country.value;
    }
    if(selected.pay){
      state.payType = selected.pay.value;
    }
    if(selected.device){
      state.device = selected.device.value;
    }

    this.setState(state);
  },

  render: function(){
    var query = this.props.location.query;

    var renderContent;

    if(query.filter){
      this.chart && this.chart.dispose();
      this.chart = null;

      var props = {};

      props.showPayMethod = props.device = props.days = props.country = true;

      props.payValue = {name: payTypeToStr[this.state.payType], value:this.state.payType};
      props.deviceValue = {name: deviceTypeStr[this.state.device], value:this.state.device};
      props.daysValue = {name:days2Str[this.state.days], value: this.state.days};
      props.countryValue = {name: countryCode2Str[this.state.country], value:this.state.country};

      renderContent =(
            <Filter
              onOk={this.onFilter}
              {...props}/>);
    }else{
      renderContent = this.renderCompare();
    }

    return renderContent;
  },

  toDetail: function(data){
    data.id = data.id || data.appId;
    var pathName = "/detail/1";

    this.history.pushState(null, pathName, data);
  },

  renderCompare: function(){
    let query = this.props.location.query || {};

    return (
      <div className="c-page app-compare">
        <Header 
          location={this.props.location}
          filterEnabled={true}
          showSideNav={this.props.showSideNav}>
          竞品对比
        </Header>
        
        <div className="c-body">
          <ul className="clearfix rel">
            <MyFavItem 
              type="comp" 
              data={this.state.app_1} 
              onClick={this.toDetail}/>
            <MyFavItem 
              type="comp" 
              data={this.state.app_2}
              onClick={this.toDetail}/>
            <i className="icon-vs"></i>
          </ul>

          <div className="content">
            <h5 className="title">
              <p className="fr f10 c999">
                {deviceTypeStr[this.state.device]} &nbsp;
                {payTypeToStr[this.state.payType]} &nbsp;
                {countryCode2Str[this.state.country]} &nbsp;
                {days2Str[this.state.days]}
              </p>
              <i></i>
              排名趋势对比图
            </h5>
          </div>

          <div ref="chart" id="cmp-chart" style={{width:"100%", height: 500}}>

          </div>
        </div>
      </div>
    );
  }
});

export default AppCompare;