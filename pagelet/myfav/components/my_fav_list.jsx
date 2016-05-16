/**
  * @require ../my_fav.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";
import $ from "jquery";

import Header from "/pagelet/widget/components/header";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";

import DetailAction from "/pagelet/appdetail/action/action";
import DetailStore from "/pagelet/appdetail/store/store";

import FavAction from "../action/action";
import FavStore from "../store/store";

var MyFav = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      loading: true,
      list:[]
    }
  },

  componentDidMount: function(){
    this.unSubscribe = FavStore.listen(this.onStateChange.bind(this));
    FavAction.fetFavLsit();
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    this.setState(state);
  },

  onDelete: function(data){
    var id = data.id || data.appId;

    DetailAction.addFav(id, "cancel");
    var app = this.state.list.filter((item, idx)=>{
      if(item.id == id){
        return item;
      }
    })[0]|| null;
    if(app){
      this.state.list.splice(this.state.list.indexOf(app), 1);
      this.setState({list: this.state.list});
    }
  },

  onItemClick: function(item){
    var query = this.props.location.query || {};
    var params = $.extend({}, item);
    var pathName = "/detail/1";

    params.id = params.id || params.appId;

    this.history.pushState(null, pathName, params);
  },

  render: function(){
    let query = this.props.location.query || {};

    return (
      <div className="c-page my-fav-page">
        <Header 
          filterVisible={false}
          showSideNav={this.props.showSideNav}>
          我的关注
        </Header>
        
        <div className="c-body">
          {
            this.state.list.map((item, idx)=>{
              return <AppItem 
                       onItemClick={this.onItemClick}
                       key={idx} 
                       data={item} 
                       type={6} 
                       onDelete={this.onDelete}/>
            })
          }
          {
            this.state.loading?<Loading/>:null
          }
          {!this.state.loading && !this.state.list.length ?<p className="center mt6 c999">您还未关注应用</p>:null}
        </div>
      </div>
    );
  }
});

export default MyFav;