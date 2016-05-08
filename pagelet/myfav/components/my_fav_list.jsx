/**
  * @require ../my_fav.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

import Header from "/pagelet/widget/components/header";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";

var MyFav = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
    }
  },

  componentDidMount: function(){
  
  },

  componentWillUnmount: function(){
    //this.unSubscribe();
  },

  onStateChange: function(state){
    this.setState(state);
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
          <AppItem type={6}/>
        </div>
      </div>
    );
  }
});

export default MyFav;