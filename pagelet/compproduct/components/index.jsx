/**
  * @require ../comp_analysis.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

import Header from "/pagelet/widget/components/header";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";

import MyFavItem from "./my_fav_item";

import SearchAction from "/pagelet/search/action/action";
import SearchStore from "/pagelet/search/store/store";

var AppCompare = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      searchKey: null,
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
    params.equipment = this.state.equipment;

    this.history.pushState("", pathName, params);
  },

  onClickFavItem: function(){
    this.history.pushState(null, "/appcompare");
  },

  render: function(){
    let {
      searchResultList,
      searchKey
    } = this.state;

    let query = this.props.location.query || {};

    return (
      <div className="c-page comp-analysis">
        <Header 
          searchValue={searchKey}
          onSearch={this.onSearch}
          onCancelSearch={e=>this.history.goBack()}
          type="search"/>

        <AppItem type={4} data={query}/>
        
        <div 
          onScroll={this.handleScroll.bind(this)}
          className="search-result c-body">

          <ul style={{display:searchKey && searchResultList.length?"block":"none"}}>
            {
              searchResultList.map((item, idx)=>{
                return (
                  <AppItem 
                    key={idx}
                    type={5} 
                    onItemClick={this.onClickSearchItem}
                    data={item} 
                    index={idx}/>)
              })
            }
            {
              this.state.loading?<Loading/>:null
            }
          </ul>

          <ul className="my-fav-list clearfix">
            <MyFavItem onClick={this.onClickFavItem}/>
            <MyFavItem/>
            <MyFavItem/>
            <MyFavItem/>
            <MyFavItem/>
            <MyFavItem/>
          </ul>
        </div>
      </div>
    );
  }
});

export default AppCompare;