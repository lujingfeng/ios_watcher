/**
  * @require ../comp_analysis.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

import Header from "/pagelet/widget/components/header";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";
import {
  countryCode, 
  deviceStrToint,
  countryCode2Str, 
  countryToCode,
  days2Str, deviceType, payType, payTypeToStr,deviceTypeStr} from "constants";

import MyFavItem from "./my_fav_item";

import SearchAction from "/pagelet/search/action/action";
import SearchStore from "/pagelet/search/store/store";

import FavAction from "/pagelet/myfav/action/action";
import FavStore from "/pagelet/myfav/store/store";


var AppCompare = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      loading: false,

      searchKey: null,
      searchResultList: [],

      favList: [],

      page: 1,
      total: 0
    }
  },

  componentDidMount: function(){
    this.unSubscribe = SearchStore.listen(this.onStateChange.bind(this));
    this.unFavSubscribe = FavStore.listen(this.onFavStateChange.bind(this));
    FavAction.fetFavLsit();
  },

  componentWillUnmount: function(){
    this.unSubscribe();
    this.unFavSubscribe();
  },

  onStateChange: function(state){
    if(state.searchResultList){
      state.searchResultList = this.state.searchResultList.concat(state.searchResultList);
    }
    this.setState(state);
  },

  onFavStateChange: function(state){
    if(state.list){
      state.favList = state.list;
    }
    this.setState(state);
  },

  onSearch: function(searchWord){
    this.setState({
      searchKey: searchWord,
      searchResultList: [],
      page:1,
      total: 0
    });
    SearchAction.search(searchWord, 1);
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
    var page = this.state.page + 1;
    this.setState({
      page: page
    });

    SearchAction.search(this.state.searchKey, page);
  },

  onClickItem:function(item){
    var params = {};

    var query = this.props.location.query || {};

    params.app_1 = query;
    params.app_2 = item;

    var pathName = "/appcompare";

    this.history.pushState(null, pathName, params);
  },

  onClickFavItem: function(data){
    data.id = data.id || data.appId;
    data.device = deviceStrToint[data.device];
    data.country = countryToCode[data.country];

    this.onClickItem(data);
  },

  render: function(){
    let {
      searchResultList,
      searchKey,
      favList
    } = this.state;

    let query = this.props.location.query || {};
    var appId = query.id || query.appId;

    return (
      <div className="c-page comp-analysis">
        <Header 
          searchValue={searchKey}
          onSearch={this.onSearch}
          placeholder="搜索应用查看排名对比"
          onCancelSearch={e=>this.history.goBack()}
          type="search"/>

        <div className="appselected">
          <AppItem type={4} data={query}/>
        </div>
        
        <div 
          onScroll={this.handleScroll.bind(this)}
          className="search-result c-body">

          {
            searchResultList.length ? (
              <ul 
                className="search-list">
                {
                  searchResultList.map((item, idx)=>{
                    var searchId = item.id || item.appId;
                    if(searchId == appId){
                      return null;
                    }
                    return (
                      <AppItem 
                        key={idx}
                        type={5} 
                        onItemClick={this.onClickItem}
                        data={item} 
                        index={idx}/>)
                  })
                }
                {
                  this.state.loading?<Loading/>:null
                }
              </ul>):null
          }

          {
            !this.state.loading && !searchResultList.length && favList.length?(
              <ul className="my-fav-list clearfix">
                <h5 className="title">
                  <i></i>
                  关注对比
                </h5>
                {
                  favList.map((item, idx)=>{
                    var favId = item.id || item.appId;
                    if(favId == appId){
                      return null;
                    }
                    return <AppItem  
                              index={idx}
                              type={5} 
                              isCompare={true}
                              data={item} 
                              onItemClick={this.onClickFavItem}/>
                  })
                }
              </ul>):null
          }

          {
            this.state.loading?<Loading/>:null
          }
        </div>
      </div>
    );
  }
});

export default AppCompare;