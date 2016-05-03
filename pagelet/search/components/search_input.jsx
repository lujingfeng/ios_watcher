/**
  * @require ../search.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

import Header from "/pagelet/widget/components/header";
import Rank from "/pagelet/widget/components/rank";
import Loading from "/pagelet/widget/components/loading";

import SearchAction from "/pagelet/search/action/action";
import SearchStore from "/pagelet/search/store/store";

var SearchItem = React.createClass({ 
  mixins: [History],

  toDetail: function(){
    var query = Object.assign({}, this.props.data);
    this.history.pushState("", "detail/1", query);
  },

  render: function(){
    var score = parseFloat(this.props.data.score || 0);

    return (
      <li className="app-item" onClick={this.toDetail}>
        <table>
          <tr>
            <td>
              <img
                className="app-icon" 
                src={this.props.data.icon}></img>
            </td>
            <td>
              <p 
                className="title ellipsis">
                {this.props.index+1}、{this.props.data.title}
              </p>
              <p className="f12 c666 m5 mb5">{this.props.data.developer}</p>
              <div>
                <span className="t-vt c666 f12 mr5">应用</span>
                <Rank value={score} width={14}/>
                <span className="c666 f12 ml5 t-vt">{this.props.data.score}</span>
              </div>
            </td>
          </tr>
        </table>
      </li> 
    );
  }
});

var Search = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      searchKey: null,
      deviceType: "iphone",
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

  onChooseDevice: function(deviceType){
    this.setState({
      deviceType: deviceType
    });
  },

  onSearch: function(searchWord){
    this.setState({
      searchKey: searchWord
    });
    SearchAction.search(searchWord, 1);
  },

  handleScroll: function(e) {
    const _target = e.target;

    console.log(123213);

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

  render: function(){
    var hotApps = ["微信", "去哪儿旅行", "爱奇艺", "神州租车", "贵催等全集", "微信", "去哪儿旅行", "爱奇艺", "神州租车", "贵催等全集"];
    var historySearch = hotApps;

    let {
      deviceType,
      searchResultList
    } = this.state;

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

          <ul className="device-type clearfix">
            <li 
              onClick={e=>this.onChooseDevice("iphone")}
              className={"fl "+(deviceType=="iphone"?"cur":"")}>iPhone</li>
            <li 
              onClick={e=>this.onChooseDevice("ipad")}
              className={"fl "+(deviceType=="ipad"?"cur":"")}>iPad</li>
          </ul>
          <p className="center c999 f12">
            {this.state.searchKey}, {this.state.total}条结果 {new Date().format("yyyy-MM-dd hh:mm:ss")}
          </p>

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

          <ul>
            {
              searchResultList.map((item, idx)=>{
                return <SearchItem key={idx} data={item} index={idx}/>;
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