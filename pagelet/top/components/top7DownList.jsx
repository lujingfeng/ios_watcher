/**
  * @require ../top.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

import Header from "/pagelet/widget/components/header";
import Rank from "/pagelet/widget/components/rank";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";
import Filter from "/pagelet/widget/components/filter";

import {countryCode, deviceType, payType} from "constants";

import TopAction from "../action/action";
import TopStore from "../store/store";

var Top7DownList = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      loading: false,
      
      tabs: [
        {name:"免费榜",typeid:"" }, 
        {name:"付费榜",typeid:"" },
        {name:"畅销榜",typeid:"" }
      ],

      list: [],

      genres: "",
      payType: payType.FREE,
      device: deviceType.IPHONE,
      country: countryCode.CHINA,

      page: 1,
      total: 0
    }
  },

  componentDidMount: function(){
    this.unSubscribe = TopStore.listen(this.onStateChange.bind(this));

    TopAction.fetDownTopList({
      genres: "",
      type: this.state.payType,
      device: this.state.device,
      country: this.state.country,
      test: true
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    this.setState(state);
  },

  handleScroll: function(e) {
    const _target = e.target;

    if (((_target.offsetHeight + _target.scrollTop + 10) >= _target.scrollHeight) 
      && !this.state.loading &&
      this.state.searchResultList.length < this.state.total
      ) {
      this.loadMore();
    }
  },

  loadMore: function(){

  },

  onItemClick: function(data){
    var query = Object.assign({}, data);
    this.history.pushState("", "detail/1", query);
  },

  render: function(){
    var query = this.props.location.query;

    if(query.filter){
      return <Filter/>;
    }else{
      return this.renderTop();
    }
  },

  renderTop: function(){
    var list = this.state.list || [];

    return (
      <div className="c-page top7-down-list">
        <Header 
          filterEnabled={true}
          showSideNav={this.props.showSideNav}>
          七日排名下降榜
        </Header>
        <div className="c-body">
          <Tabs tabs={this.state.tabs}/>

          <p className="f12 center f-txt">
            所有分类，中国，iPhone, 2016-04-29
          </p>

          <ul className="list">
            {
              list.map((item, idx)=>{
                return (
                  <AppItem 
                    type={2} 
                    onItemClick={this.onItemClick} 
                    index={idx}
                    data={item}/>
                  )
              })
            }
          </ul>
          {
            this.state.loading?<Loading/>:null
          }
        </div>
      </div>
    );
  }
});

export default Top7DownList;