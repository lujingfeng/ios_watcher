/**
  * @require ../search.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

import Header from "/pagelet/widget/components/header";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";

import SearchAction from "/pagelet/search/action/action";
import SearchStore from "/pagelet/search/store/store";


var Search = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      tabs: [
        {name: "iPhone", value: 0},
        {name: "iPad", value: 1}
      ],

      searchKey: null,
      device: 0,
      searchResultList: [],

      page: 1,
      total: 0
    }
  },

  componentDidMount: function(){
    this.unSubscribe = SearchStore.listen(this.onStateChange.bind(this));
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

  onTagSelected: function(key){
    this.setState({
      searchKey: key
    });
    SearchAction.search(key, 1);
  },

  onChooseDevice: function(tab){
    this.setState({
      device: tab.value
    });
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

  onClickSearchItem:function(item){
    var query = this.props.location.query || {};
    var params = Object.assign({}, item);
    var pathName = "/detail/";

    if(query.overlay){
      pathName = pathName + "4"
    }else{
      pathName = pathName + "1"
    }

    params.device = this.state.device;

    this.history.pushState("", pathName, params);
  },

  render: function(){
    var hotApps = ["微信", "去哪儿旅行", "爱奇艺", "神州租车", "贵催等全集", "微信", "去哪儿旅行", "爱奇艺", "神州租车", "贵催等全集"];
    var historySearch = hotApps;

    let {
      deviceType,
      searchResultList
    } = this.state;

    let query = this.props.location.query || {};

    return (
      <div className="c-page input-search">
        <Header 
          searchValue={this.state.searchKey}
          onSearch={this.onSearch}
          onCancelSearch={e=>this.history.goBack()}
          type="search"/>

        <div className="default-view" style={{display:this.state.searchKey?"none":"block"}}>
          <label>热门应用</label>
          <div className="tags hot-app">
            {
              hotApps.map((item, idx)=>{
                return <span key={idx} onClick={()=>this.onTagSelected(item)}>{item}</span>
              })
            }
          </div>
          <label>历史搜索</label>
          <div className="tags history">
            {
              historySearch.map((item, idx)=>{
                return <span key={idx} onClick={()=>this.onTagSelected(item)}>{item}</span>
              })
            }
          </div>
        </div>

        <div 
          onScroll={this.handleScroll.bind(this)}
          className="search-result c-body" 
          style={{display:this.state.searchKey?"block":"none"}}>

          <Tabs tabs={this.state.tabs} onSelect={this.onChooseDevice}/>

          {
            query && !query.overlay ?(
              <p className="center c999 f10">
                {this.state.searchKey}, {this.state.total}条结果 {new Date().format("yyyy-MM-dd hh:mm:ss")}
              </p>): null
          }

          {
            query && !query.overlay ? (
              <div className="keyword-desc" >
                <table border="1" cellSpacing="0">
                  <tr>
                    <th>关键字</th>
                    <th>搜索热度</th>
                    <th>搜索结果数</th>
                  </tr>
                  <tr>
                    <td>{this.state.searchKey}</td>
                    <td>123213</td>
                    <td>{this.state.total}</td>
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
          </ul>
        </div>
      </div>
    );
  }
});

export default Search;