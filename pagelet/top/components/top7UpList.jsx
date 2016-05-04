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

var Top7UpList = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      tabs: [
        {name:"免费榜",typeid:"" }, 
        {name:"付费榜",typeid:"" },
        {name:"畅销榜",typeid:"" }
      ],

      topList: [],

      curTypeId: "",//免费、付费和畅销三大榜单的排名数据
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
      <div className="c-page top7-up-list">
        <Header 
          filterEnabled={true}
          showSideNav={this.props.showSideNav}>
          七日排名上升榜
        </Header>
        <div className="c-body">
          <Tabs tabs={this.state.tabs}/>

          <p className="f12 center f-txt">
            所有分类，中国，iPhone, 2016-04-29
          </p>

          <ul className="list">
            <AppItem 
              type={2} 
              onItemClick={this.onItemClick} 
              index={1}
              data={{}}/>
            <AppItem type={2} />
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
            <AppItem type={2} />
            <AppItem type={2}/>
          </ul>
        </div>
      </div>
    );
  }
});

export default Top7UpList;