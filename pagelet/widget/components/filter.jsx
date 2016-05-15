/**
  * @require ../filter.less
  */

import React from "react";
import {History} from "reactRouter";
import Calendar from "./calendar";
import Loading from "./loading";

import {payType} from "constants";

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

      curSelected: {
        datetime: null,
        days: this.props.daysValue||null,
        country: null,
        device: null,
        category: null,
        pay: null,
        score:this.props.scoreValue||[]
      }
    }
  },

  onOk: function(){
    this.props.onOk && this.props.onOk(this.state.curSelected);
    this.history.goBack();
  },

  componentDidMount: function(){
    this.unSubscribe = FilterStore.listen(this.onStateChange.bind(this));
    Filterction.fetchConfig();
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    this.setState(state);
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
      curSelected.score.splice(curSelected.score.indexOf(existedItem), 1);
    }else{
      curSelected.score.push(score);
    }
    this.setState({curSelected});
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

    return (
      <div className="c-filter">
        <div className="hdr">
          筛选
          <i className="c999" onClick={this.onCancel}>取消</i>
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
                {
                  state.score.map((item, idx)=>{
                    var props = {};
                    props.onClick=(e=>this.onScore(item));

                    var existedItem = curSelected.score.filter((score)=>{
                      if(score.value == item.value){
                        return item;
                      }
                    })[0]||null;

                    if(existedItem){
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
              <h5>是否支付</h5>
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
                style={{width:"50%"}} onClick={this.onOtherDate}><span>其他</span></li>
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

        {showCategory &&state.genres.length?
          (<div>
            <h5>分类</h5>
            <ul className="f-type clearfix">
              {
                state.genres.map((item, idx)=>{
                  var props = {};
                  props.onClick=(e=>this.onCategory(item));
                  if(curSelected.category && curSelected.category.value == item.value){
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

        <ul 
          className="f-type clearfix" 
          style={{display:"none"}}>
          <li><span>全部</span></li>
          <li><span>流行时尚</span></li>
          <li><span>家居园艺</span></li>
          <li><span>户外自然</span></li> 

          <li style={{width: "50%"}}>
            <span>娱乐场游戏</span>
            <i className="unfolder"></i>
          </li>
          <li style={{width: "50%"}}>
            <span>报刊杂志</span>
            <i className="unfolder"></i>
          </li>  
        </ul>

        <div style={{padding:"0 12px"}}>
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