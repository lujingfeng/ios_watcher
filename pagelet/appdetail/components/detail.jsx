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

import Filter from "/pagelet/widget/components/filter";
import Dialog from "/pagelet/widget/components/dialog";

import DetailAction from "../action/action";
import DetailStore from "../store/store";

var AppDetail = React.createClass({
  mixins: [History],

  getInitialState: function(){
    return {
      filter: null
    }
  },

  componentDidMount: function(){
    //this.refs.favComfirm.show();
    this.unSubscribe = DetailStore.listen(this.onStateChange.bind(this));
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    if(state.isEight){
      this.refs.favComfirm.show();
    }
  },

  onFilter: function(filter){
    this.setState({
      filter: filter
    });
  },

  onFavOk: function(){
    this.history.pushState(null, "/myfavlist");
  },

  render: function(){
    var query = this.props.location.query;
    var state = this.state;

    if(query.filter){
      var props = {};
      var params = this.props.params;

      if(params.module == 2){
        props.showPayMethod = true;
        props.device = true;
        props.country = true;
        props.days = true;
      }else if(params.module == 5){
        props.days = true;
        props.score = true;

        props.daysValue = state.filter && state.filter.days ? state.filter.days: null;
        props.scoreValue = state.filter && state.filter.score ? state.filter.score: [];
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
      bottomView = <RealRank query={query} filter={this.state.filter}/>
    }else if(params.module == 3){
      bottomView = <VersionLog query={query}/>
    }else if(params.module == 4){
      bottomView = <KeyWords query={query}/>
    }else if(params.module == 5){
      filterEnabled = true;
      bottomView = <Comment query={query} filter={this.state.filter}/>
    }else if(params.module == 6){
      bottomView = <AppLevel query={query}/>
    }

    return (
      <div className="c-page c-app-detail">
        <Header 
          location={this.props.location}
          filterEnabled={filterEnabled}
          showSideNav={this.props.showSideNav}>应用详情</Header>
        <div className="c-body" >
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
            <p>您关注的应用超过8个</p>
            <p>请管理应用和联系客服</p>
          </div>
        </Dialog>
      </div>
    );
  }
});

export default AppDetail;