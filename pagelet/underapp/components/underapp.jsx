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

var UnderAppList = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      underAppList: [],

      page: 1,
      total: 0
    }
  },

  componentDidMount: function(){
    //this.unSubscribe = SearchStore.listen(this.onStateChange.bind(this));
  },

  componentWillUnmount: function(){
    //this.unSubscribe();
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
    var page = this.state.page + 1;
    this.setState({
      page: page
    });

    SearchAction.search(this.state.searchKey, page);
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
    return (
      <div className="c-page under-app-list">
        <Header 
          filterEnabled={true}
          showSideNav={this.props.showSideNav}>
          下架应用监控
        </Header>
        <div className="c-body">

          <p className="f12 center f-txt">
            中国, 2016-04-29
          </p>

          <ul className="list">
            <AppItem 
              type={2} 
              onItemClick={this.onItemClick} 
              index={1}
              data={{}}/>
            <AppItem type={2}/>
            <AppItem type={2}/>
            <AppItem type={2}/>
            <AppItem type={2} />
            <AppItem type={2}/>
            <AppItem type={2} />
            <AppItem type={2}/>
            <AppItem type={2} />
            <AppItem type={2}/>
            <AppItem type={2} />
            <AppItem type={2}/>
            <AppItem type={2} />
            <AppItem type={2}/>
          </ul>
        </div>
      </div>
    );
  }
});

export default UnderAppList;