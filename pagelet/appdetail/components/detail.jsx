import React from "react";
import $ from "jquery";
import {History} from "reactRouter";

import Header from "/pagelet/widget/components/header";

import BaseInfo from "./baseinfo";
import Categofy from "./category";
import AppInfo from "./appinfo";
import RealRank from "./realrank";
import VersionLog from "./version_log";
import KeyWords from "./keywords";
import Comment from "./comment";
import AppLevel from "./applevel";
import {send} from "/static/minxins/utils";

import Filter from "/pagelet/widget/components/filter";
import Dialog from "/pagelet/widget/components/dialog";

import DetailAction from "../action/action";
import DetailStore from "../store/store";

var AppDetail = React.createClass({
  mixins: [History],

  getInitialState: function(){

    var realFilter = null;
    var locQuery = this.props.location.query;

    if(locQuery.country && locQuery.device && locQuery.days && locQuery.pay){
      realFilter = {};
      realFilter.days = locQuery.days;
      realFilter.pay = locQuery.pay;
      realFilter.country = locQuery.country;
      realFilter.device = locQuery.device;
    }
    return {
      realFilter: realFilter,
      commentFilter: {
        score:[
            {name: "1星", value: 1},
            {name: "2星", value: 2},
            {name: "3星", value: 3},
            {name: "4星", value: 4},
            {name: "5星", value: 5}
          ],
        datetime:{name:"7日", value:7}
      },
      detailInfo: {},
      appId: ""
    }
  },

  componentDidMount: function(){
    //this.refs.favComfirm.show();
    this.unSubscribe = DetailStore.listen(this.onStateChange.bind(this));
    send({
      type: "detail",
      opra: "pv"
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    if(state.isEight){
      this.refs.favComfirm.show();
    }

    if(state.detailInfo){
      this.setState({
        detailInfo: state.detailInfo,
        appId: state.detailInfo.appId
      });
      var pathname = this.props.location.pathname;
      var query = this.props.location.query;
      query.appId = state.detailInfo.appId;
      //this.history.replaceState(null, pathname, query);
    }
  },

  onFilter: function(filter){
    var params = this.props.params;
    if(params.module == 2){
      this.setState({
        realFilter: filter
      });
    }else if(params.module == 5){
      this.setState({
        commentFilter: filter
      });
    }
  },

  onFavOk: function(){
    this.history.pushState(null, "/myfavlist");
  },

  handleScroll: function(e){
    const _target = e.target;

    if ((_target.offsetHeight + _target.scrollTop + 10) >= _target.scrollHeight) {
      var params = this.props.params;
      if(params.module == 5){
        this.refs.comment.loadMore();
      }
    }
  },

  render: function(){
    var query = this.props.location.query;
    var state = this.state;
    query.appId = this.state.appId || query.appId;

    if(query.filter){
      var props = {
        location: this.props.location
      };
      var params = this.props.params;

      if(params.module == 2){
        var filter = this.state.realFilter;
        props.showPayMethod = props.device = props.country = props.days = true;

        props.payValue=filter&&filter.pay?filter.pay:{"name": "免费", value:"free"};
        props.deviceValue=filter&&filter.device?filter.device:{"name": "iPhone", value:0};
        props.countryValue=filter&&filter.country?filter.country:{"name": "中国", value:1};
        props.daysValue=filter&&filter.days?filter.days:{"name": "今天", value:1};


      }else if(params.module == 5){
        props.showDateDay = true;
        props.score = true;
        var filter = state.commentFilter;

        props.datetimeValue = filter && filter.datetime ? filter.datetime: {name:"7日", value:7};
        props.scoreValue = filter && filter.score ? filter.score: [
          {name: "1星", value:1},
          {name: "2星", value:2},
          {name: "3星", value:3},
          {name: "4星", value:4},
          {name: "5星", value:5}];

        if(props.datetimeValue.value == 1 || props.datetimeValue.value == -1){
          delete props.datetimeValue.value;
          delete props.datetimeValue.name;
        }
      }

      return <Filter onOk={this.onFilter} {...props}/>
    }else{
      return this.renderDetail();
    }
  },

  renderDetail: function(){
    var query = this.props.location.query;
    var params = this.props.params;
    var bottomView;
    var filterEnabled = false;

    if(params.module == 1){
      bottomView = <AppInfo query={query}/>
    }else if(params.module == 2){
      filterEnabled = true;
      bottomView = <RealRank query={query} filter={this.state.realFilter}/>
    }else if(params.module == 3){
      bottomView = <VersionLog query={query}/>
    }else if(params.module == 4){
      bottomView = <KeyWords query={query}/>
    }else if(params.module == 5){
      filterEnabled = true;
      bottomView = <Comment ref="comment" query={query} filter={this.state.commentFilter}/>
    }else if(params.module == 6){
      bottomView = <AppLevel query={query}/>
    }

    return (
      <div className="c-page c-app-detail">
        <Header 
          location={this.props.location}
          filterEnabled={filterEnabled}
          showSideNav={this.props.showSideNav}>应用详情</Header>
        <div className="c-body" onScroll={this.handleScroll.bind(this)}>
          <BaseInfo query={query}/>
          <Categofy 
            query={query} 
            ctyValue={params.module}/>
          <div
            className="category-detail">
            {bottomView}
          </div>
        </div>

        <Dialog 
          ref="favComfirm" 
          okText="管理应用"
          onOk={this.onFavOk}
          buttonkey={Dialog.buttonKeys.CANCEL_OK}>
          <div>
            <p>您关注的应用已达8个</p>
            <p>请管理应用或联系客服</p>
          </div>
        </Dialog>
      </div>
    );
  }
});

export default AppDetail;