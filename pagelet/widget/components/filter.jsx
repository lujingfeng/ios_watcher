/**
  * @require ../filter.less
  */

import React from "react";
import {History} from "reactRouter";
import Calendar from "./calendar";
import Loading from "./loading";

import {
  countryCode, 
  deviceType, 
  deviceTypeStr, 
  payType,
  payTypeToStr, 
  days2Str,
  countryCode2Str} from "constants";

import Reflux from "reflux";
import $ from "/static/lib/jquery";

var Filterction = Reflux.createActions([
  "fetchConfig",
  "fetchConfigCmp"
]);

Filterction.fetchConfig.preEmit = (query) => {
  var params = {
    type: 'GET',
    url: SEARCH_HOST + '/configlist',
    data: query,
    dataType: 'json'
  }

  $.ajax(params).always(function( res ){
    Filterction.fetchConfigCmp(res);
  });
};

var FilterStore = Reflux.createStore({
    init: function(){
      this.listenTo(Filterction.fetchConfig, this.loading);
      this.listenTo(Filterction.fetchConfigCmp, this.fetchConfigCmp);
    },
    
    loading: function() {
      this.trigger({ 
        loading: true
      });
    },

    fetchConfigCmp: function(config){
      config && (config.loading=false);
      this.trigger(config);
    }
});

var Filter = React.createClass({
  mixins: [History],
  getInitialState: function(){
    return {
      loading: true,
      showCalendar:false,
      score: [
        {name: "1星", value:1},
        {name: "2星", value:2},
        {name: "3星", value:3},
        {name: "4星", value:4},
        {name: "5星", value:5}],

      device: [],
      country:[],
      genres: [],

      subGenres: [],

      curSelected: {
        datetime: this.props.datetimeValue||null,
        days: this.props.daysValue||null,
        country: this.props.countryValue||null,
        device: this.props.deviceValue||null,
        category: this.props.categoryValue||null,
        pay: this.props.payValue||null,
        score:this.props.scoreValue||[]
      }
    }
  },

  onOk: function(){
    this.props.onOk && this.props.onOk(this.state.curSelected);
    if(this.props.location){
      var pathname = this.props.location.pathname;
      var query = this.props.location.query;
      delete query.filter;
      query = $.extend(query, this.state.curSelected);

      this.history.replaceState(null, pathname, query);
    }else{
      this.history.goBack();
    }
  },

  componentDidMount: function(){
    this.unSubscribe = FilterStore.listen(this.onStateChange.bind(this));
    Filterction.fetchConfig();
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    var callback = ()=>{
      if(state.device){
        var root = this.refs.root;
        var height = $(root).outerHeight();
        if(window.innerHeight < height){
          this.setState({
            okStatus: 1
          });
        }
      }
    }
    
    this.setState(state, callback);
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

  onCalendarSelect: function(datetime){
    this.setState({
      showCalendar:false
    });
    var curSelected = this.state.curSelected;
    curSelected.datetime = datetime;

    if(datetime.year && this.props.datetime){
      var d = new Date();
      var prevDate = new Date(d.getTime() - 24*60*60*1000);

      if(datetime.year == d.getFullYear() &&
         datetime.month == (d.getMonth() + 1) &&
         datetime.day == d.getDate()){
        delete datetime.month;
        delete datetime.day;
        delete datetime.year;
        
        datetime.value = 1;
        datetime.name = days2Str[datetime.value];
      }else if(datetime.year == prevDate.getFullYear() &&
         datetime.month == (prevDate.getMonth() + 1) &&
         datetime.day == prevDate.getDate()){
        delete datetime.month;
        delete datetime.day;
        delete datetime.year;
        datetime.value = -1;
        datetime.name = days2Str[datetime.value];
      }else{
        datetime.value = datetime.year + "-" + datetime.month + "-" + datetime.day;
        datetime.name = datetime.value;
      }
    }

    this.setState({curSelected});
  },

  onDevice: function(device){
    var curSelected = this.state.curSelected;
    curSelected.device = device;
    this.setState({curSelected});
  },

  onCountry: function(country){
    var curSelected = this.state.curSelected;
    curSelected.country = country;
    this.setState({curSelected});
  },

  onDatetime: function(datetime){
    var curSelected = this.state.curSelected;
    curSelected.datetime = datetime;
    this.setState({curSelected});
  },

  onDays: function(days){
    var curSelected = this.state.curSelected;
    curSelected.days = days;
    this.setState({curSelected});
  },

  onCategory: function(category){
    var curSelected = this.state.curSelected;
    curSelected.category = category;
    this.setState({curSelected});
  },

  onPay: function(payMethod){
    var curSelected = this.state.curSelected;
    curSelected.pay = payMethod;
    this.setState({curSelected});
  },

  onScore: function(score){
    var curSelected = this.state.curSelected;
    var existedItem = curSelected.score.filter((item)=>{
      if(score.value == item.value){
        return item;
      }
    })[0]||null;

    if(existedItem){
      //curSelected.score.splice(curSelected.score.indexOf(existedItem), 1);
    }else{
      
    }
    curSelected.score = [score];
    this.setState({curSelected});
  },

  clearScore: function(){
    var curSelected = this.state.curSelected;
    if(curSelected.score.length==5){
      curSelected.score = [];
    }else{
      curSelected.score = [];
      this.state.score.forEach((item)=>{
        curSelected.score.push({
          name: item.name,
          value: item.value
        });
      }); 
    }
    this.setState({
      curSelected: curSelected
    });
  },

  render: function(){
    if(this.state.loading){
      return <Loading/>
    }
    if(this.state.showCalendar){
      return (
        <Calendar 
          curDatetime={this.state.curSelected.datetime}
          onSelected={this.onCalendarSelect}
          cancel={this.onCanlendarCancel}/>
        )
    }


    var state = this.state;
    var curSelected = state.curSelected

    var showDevice = !!this.props.device;
    var showCountry = !!this.props.country;
    var showDateTime = !!this.props.datetime;
    var showDays = !!this.props.days;
    var showCategory = !!this.props.category;
    var showPayMethod = !!this.props.showPayMethod;
    var showScore = !!this.props.score;
    var showDateDay = !!this.props.showDateDay;

    var otherLabel;
    var datetime = curSelected.datetime;

    if(datetime && 
      datetime.value != 1 &&
      datetime.value != -1 &&
      datetime.value != 7 &&
      datetime.value != 15 &&
      datetime.value != 30 &&
      datetime.value != 60 ){
      var d = new Date(datetime.year, datetime.month - 1, datetime.day);
      otherLabel = d.format("yyyy-MM-dd");
    }

    var okStyle = {
      padding: "0 12px",
      position: "fixed",
      width: "100%",
      bottom: 0,
      background:"#fff"
    };

    if(this.state.okStatus == 1){
      okStyle.position = "relative";
      okStyle.bottom = "auto";
    }

    return (
      <div className="c-filter" ref="root">
        <div className="hdr">
          筛选
          <i onClick={this.onCancel}>取消</i>
        </div>

        {
          showDevice && state.device.length?(
            <div>
              <h5>设备</h5>
              <ul className="f-type clearfix">
                {
                  state.device.map((item, idx)=>{
                    var props = {};
                    props.onClick=(e=>this.onDevice(item));
                    if(curSelected.device && curSelected.device.value == item.value){
                      props.className="selected";
                    }
                    return (
                      <li {...props}><span>{item.name}</span></li>
                    );
                  })
                }
              </ul>
            </div>):null
        }

        {
          showScore && state.score.length?(
            <div>
              <h5>评级</h5>
              <ul className="f-type clearfix">
                <li 
                  onClick={this.clearScore}
                  className={curSelected.score.length == 5?"selected":""}>
                  <span>全部</span>
                </li>

                {
                  state.score.map((item, idx)=>{
                    var props = {};
                    props.onClick=(e=>this.onScore(item));

                    var existedItem = curSelected.score.filter((score)=>{
                      if(score.value == item.value){
                        return item;
                      }
                    })[0]||null;

                    if(existedItem && curSelected.score.length != 5){
                      props.className="selected";
                    }
                    return (
                      <li {...props}><span>{item.name}</span></li>
                    );
                  })
                }
              </ul>
            </div>):null
        }

        {
          showPayMethod?(
            <div>
              <h5>分类</h5>
              <ul className="f-type clearfix">
                <li 
                  className={curSelected.pay && curSelected.pay.value==payType.FREE?"selected":null}
                  onClick={e=>this.onPay({name:"免费", value:payType.FREE})}>
                  <span>免费</span>
                </li>
                <li 
                  className={curSelected.pay && curSelected.pay.value==payType.FEE?"selected":null}
                  onClick={e=>this.onPay({name:"付费", value:payType.FEE})}>
                  <span>付费</span>
                </li>

                <li 
                  className={curSelected.pay && curSelected.pay.value==payType.HOT?"selected":null}
                  onClick={e=>this.onPay({name:"畅销", value:payType.HOT})}>
                  <span>畅销</span>
                </li>
              </ul>
            </div>): null
        }

        {
          showCountry&&state.country.length?(
            <div>
              <h5>国家</h5>
              <ul className="f-type clearfix">
                {
                  state.country.map((item, idx)=>{
                    var props = {};
                    props.onClick=(e=>this.onCountry(item));
                    if(curSelected.country && curSelected.country.value == item.value){
                      props.className="selected";
                    }
                    return (
                      <li {...props}><span>{item.name}</span></li>
                    );
                  })
                }
              </ul>
            </div>): null
        }
        {
          showDateTime ?(
          <div>
            <h5>时间</h5>
            <ul className="f-type clearfix">
              <li 
                className={curSelected.datetime && curSelected.datetime.value==1?"selected":null}
                onClick={e=>this.onDatetime({name:"今天", value:1})}><span>今天</span></li>
              <li 
                className={curSelected.datetime && curSelected.datetime.value==-1?"selected":null}
                onClick={e=>this.onDatetime({name:"昨天", value:-1})}><span>昨天</span></li>
              <li 
                className={otherLabel?"selected":""}
                style={{width:"50%"}} onClick={this.onOtherDate}>
                <span>
                  {otherLabel||"其他"}
                </span>
              </li>
            </ul>
          </div>):null
        }

        {
          showDays?(
          <div>
            <h5>时间</h5>
            <ul className="f-type clearfix">
              <li 
                className={curSelected.days && curSelected.days.value==1?"selected":null}
                onClick={e=>this.onDays({name:"今天", value:1})}>
                <span>今天</span>
              </li>
              <li 
                className={curSelected.days && curSelected.days.value==-1?"selected":null}
                onClick={e=>this.onDays({name:"昨天", value:-1})}>
                <span>昨天</span>
              </li>
              <li 
                className={curSelected.days && curSelected.days.value==7?"selected":null}
                onClick={e=>this.onDays({name:"7日", value:7})}>
                <span>7日</span>
              </li>
              <li 
                className={curSelected.days && curSelected.days.value==15?"selected":null}
                onClick={e=>this.onDays({name:"15日", value:15})}>
                <span>15日</span>
              </li>

              <li 
                className={curSelected.days && curSelected.days.value==30?"selected":null}
                onClick={e=>this.onDays({name:"30日", value:30})}>
                <span>30日</span>
              </li>
              <li 
                className={curSelected.days && curSelected.days.value==60?"selected":null}
                onClick={e=>this.onDays({name:"60日", value:60})}>
                <span>60日</span>
              </li>
            </ul>
          </div>): null
        }

        {
          showDateDay?(
          <div>
            <h5>时间</h5>
            <ul className="f-type clearfix">
              <li 
                className={curSelected.datetime && curSelected.datetime.value==7?"selected":null}
                onClick={e=>this.onDatetime({name:"7日", value:7})}>
                <span>7日</span>
              </li>
              <li 
                className={curSelected.datetime && curSelected.datetime.value==15?"selected":null}
                onClick={e=>this.onDatetime({name:"15日", value:15})}>
                <span>15日</span>
              </li>

              <li 
                className={curSelected.datetime && curSelected.datetime.value==30?"selected":null}
                onClick={e=>this.onDatetime({name:"30日", value:30})}>
                <span>30日</span>
              </li>
              <li 
                className={curSelected.datetime && curSelected.datetime.value==60?"selected":null}
                onClick={e=>this.onDatetime({name:"60日", value:60})}>
                <span>60日</span>
              </li>

              <li 
                className={otherLabel?"selected":""}
                style={{width:"50%"}} onClick={this.onOtherDate}>
                 <span>{otherLabel||"其他"}</span>
              </li>
            </ul>
          </div>): null
        }

        {showCategory &&state.genres.length?
          (<div>
            <h5>分类</h5>
            <ul className="f-type clearfix">
              {
                state.genres.map((item, idx)=>{
                  var props = {style:{}};
                  props.onClick=(e=>this.onCategory(item));
                  if(curSelected.category && curSelected.category.value == item.value){
                    props.className="selected";
                  }
                  if(item.value == 25 || item.value == 26){
                    return null;
                  }

                  return (
                    <li {...props}>
                     <span>
                      {item.name}
                    </span>
                     {
                       item.value == 25?<i className={this.state.subGenres==item.data?"unfolder":"unfolder fd"} style={{right: 50}}></i>: null
                     }
                     {
                       item.value == 26?<i className={this.state.subGenres==item.data?"unfolder":"unfolder fd"} style={{right: 39}}></i>: null
                     }
                    </li>
                  );
                })
              }
            </ul>
          </div>):null
        }

        {
          showCategory?
        <ul 
          className="f-type clearfix">
          {
            state.genres.map((item, idx)=>{
              var props = {style:{}};
              var name = item.name;

              if(curSelected.category && curSelected.category.value == item.value){
                props.className="selected";
              }

              if(item.value == 25 || item.value == 26){
                
                props.style.width = "50%";

                props.onClick = ()=>{
                  var data = this.state.subGenres == item.data?[]:item.data;

                  this.setState({
                    subGenres: data
                  });
                }

                item.data.filter((subItem, idx)=>{
                  if(this.state.subGenres != item.data && 
                    curSelected.category && 
                    subItem.value == curSelected.category.value){
                     props.className="selected";
                     if(curSelected.category.value != "250" && curSelected.category.value != "260"){
                       name = curSelected.category.name;
                     }
                  }
                });
              }else{
                return null;
              }

              return (
                <li {...props}>
                 <span>
                  {name}
                   {
                     item.value == 25?<i className={this.state.subGenres==item.data?"unfolder":"unfolder fd"} style={{right: 50}}></i>: null
                   }
                   {
                     item.value == 26?<i className={this.state.subGenres==item.data?"unfolder":"unfolder fd"} style={{right: 39}}></i>: null
                   }
                </span>
                </li>
              );
            })
          }
        </ul>:null
      }

        <ul 
          style={{marginBottom:this.state.okStatus==1?0:60}}
          className="f-type clearfix">
          {
            this.state.subGenres.map((item, idx)=>{
              var props = {};
              props.onClick=(e=>this.onCategory(item));
              console.log(curSelected.category.value, item.value);
              if(curSelected.category && curSelected.category.value == item.value){
                props.className="selected";
              }
              return <li {...props}><span>{item.name}</span></li>;
            })
          } 
        </ul>

        <div style={okStyle}>
          <button 
            onClick={this.onOk}
            style={{width:"100%"}}
            className="btn main-btn mt12 mb12">确定</button>
        </div>
      </div>
    );
  }
});

export default Filter