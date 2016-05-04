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
          关键词热度排行榜
        </Header>
        <div className="c-body">

          <p className="f12 center f-txt">
            所有分类，中国，iPhone, 2016-04-29
          </p>

          <div className="ml12 mt12 mr12 mb12">
            <table className="border">
              <tr>
                <th>排名</th>
                <th>关键词</th>
                <th>搜索热度</th>
                <th>搜索结果数</th>
              </tr>
              <tr>
                <td style={{width:37}}>1</td>
                <td className="cmain">微信</td>
                <td style={{width:65}}>10500</td>
                <td style={{width:65}}>200</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

export default UnderAppList;