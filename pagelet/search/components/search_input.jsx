/**
  * @require ../search.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";
import $ from "jquery";
import {send} from "/static/minxins/utils";

import Header from "/pagelet/widget/components/header";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";

import {countryCode, deviceType, countryToCode} from "constants";

import SearchAction from "/pagelet/search/action/action";
import SearchStore from "/pagelet/search/store/store";


var Search = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      loading:true,

      tabs: [
        {name: "iPhone", value: deviceType.IPHONE},
        {name: "iPad", value: deviceType.IPAD}
      ],
      device: deviceType.IPHONE,
      country: countryCode.CHINA,

      searchResultList: [],
      hotWords:[],
      records: [],
      hot:"",

      page: 1,
      total: 0
    }
  },

  componentDidMount: function(){
    this.unSubscribe = SearchStore.listen(this.onStateChange.bind(this));
    SearchAction.fetchHotApp();
    SearchAction.fetchHistory();

    var locQuery = this.props.location.query;

    if(locQuery.searchWord){
      this.onSearch(locQuery.searchWord);
    }

    send({
      type: "search",
      opra: "pv",
      label:"搜索"
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    if(state.searchResultList){
      state.searchResultList = this.state.searchResultList.concat(state.searchResultList);
    }
     this.setState(state);
  },

  onTagSelected: function(searchWord){
    this.onSearch(searchWord);

    send({
      type: "search",
      opra: "history",
      label: searchWord
    });
  },

  onChooseDevice: function(tab){
    var locQuery = this.props.location.query;

    this.setState({
      device: tab.value,
      searchResultList:[]
    }, ()=>{
      SearchAction.search(
        locQuery.searchWord, 
        1, 
        this.state.country,
        this.state.device
      );
    });
  },

  onSearch: function(searchWord){
    this.setState({
      searchResultList: [],
      page:1,
      total: 0,
      hot:""
    });

    SearchAction.search(
      searchWord, 
      1, 
      this.state.country,
      this.state.device
    );

    SearchAction.addHistory(searchWord);
    SearchAction.searchWordHot(searchWord);
    this.history.replaceState(null, this.props.location.pathname, {searchWord:searchWord});

    send({
      type: "search",
      opra: "search",
      label: searchWord
    });
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
    var locQuery = this.props.location.query;
    this.setState({
      page: page
    });

    SearchAction.search(locQuery.searchWord, page);
  },

  onClickSearchItem:function(item){
    var query = this.props.location.query || {};
    var params = $.extend({}, item);
    var pathName = "/detail/";

    if(query.overlay){
      pathName = pathName + "4"
    }else{
      pathName = pathName + "1"
    }
    params.id = params.infoId||params.id;
    params.id = params.id || params.appId;

    params.device = this.state.device;
    params.country = countryToCode[params.country];

    this.history.pushState(null, pathName, params);

    send({
      type: "search",
      opra: "hot",
      label: params.title
    });
  },

  render: function(){
    let {
      deviceType,
      searchResultList
    } = this.state;

    let query = this.props.location.query || {};
    let searchWord = query.searchWord;

    return (
      <div className="c-page input-search">
        <Header 
          searchValue={searchWord}
          onSearch={this.onSearch}
          onCancelSearch={e=>this.history.goBack()}
          type="search"/>

        <div className="default-view" style={{display:searchWord?"none":"block"}}>
          <label>热门应用</label>
          <div className="tags hot-app">
            {
              this.state.hotWords.map((item, idx)=>{
                return <span key={idx} onClick={()=>this.onClickSearchItem(item)}>{item.title}</span>
              })
            }
          </div>
          <label>历史搜索</label>
          <div className="tags history">
            {
              this.state.records.map((item, idx)=>{
                return <span key={idx} onClick={()=>this.onTagSelected(item)}>{item}</span>
              })
            }
          </div>
        </div>

        {
          searchWord?
          <div 
            onScroll={this.handleScroll.bind(this)}
            className="search-result c-body">

            {
              false?<Tabs tabs={this.state.tabs} onSelect={this.onChooseDevice}/>:null
            }

            {
              query && !query.overlay ?(
                <p className="center f10 mt12">
                  {searchWord}，{this.state.total}条结果，{new Date().format("yyyy-MM-dd hh:mm:ss")}
                </p>): null
            }

            {
              query && !query.overlay ? (
                <div className="keyword-desc" >
                  <table border="1" cellSpacing="0">
                    <tr>
                      <th>关键词</th>
                      <th>搜索热度</th>
                      <th>搜索结果数</th>
                    </tr>
                    <tr>
                      <td>{searchWord}</td>
                      <td>{this.state.hot||"-"}</td>
                      <td>{this.state.total||"-"}</td>
                    </tr>
                  </table>
                </div>
                ): null
            }

            <ul>
              {
                searchResultList.map((item, idx)=>{
                  return (
                    <AppItem 
                      key={idx}
                      type={query.overlay?3:1} 
                      onItemClick={this.onClickSearchItem}
                      data={item} 
                      index={idx}/>)
                })
              }
              {
                this.state.loading?<Loading/>:null
              }
              {
                this.state.total==0&&!this.state.loading?<p className="center c999">{"没有搜索到应用"}</p>:""
              }
            </ul>
          </div>: null
        }
      </div>
    );
  }
});

export default Search;