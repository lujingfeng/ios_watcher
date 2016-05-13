/**
  * @require ../detail.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

var DetailCategory = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      category: this.props.ctyValue,
    }
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.ctyValue != this.props.ctyValue){
      this.setState({
        category: nextProps.ctyValue
      });
    }
  },

  onCategofy: function(category){
    this.history.pushState("", "/detail/"+category, this.props.query);
  },

  render: function(){
    var query = this.props.query;
    var category = this.state.category;
    
    return (
      <div className="c-category">
          <div className="tabs">
            <div 
              className={category == 1 ?"cur":null}
              onClick={e=>{this.onCategofy(1)}}>应用信息</div>
            <div 
              className={category == 2 ?"cur":null}
              onClick={e=>{this.onCategofy(2)}}>实时排名</div>
            <div 
              className={category == 3 ?"cur":null}
              onClick={e=>{this.onCategofy(3)}}>版本记录</div>
            <div 
              style={{display:"none"}}
              className={category == 4 ?"cur":null}
              onClick={e=>{this.onCategofy(4)}}>关键词覆盖数</div>
            <div 
              className={category == 5 ?"cur":null}
              onClick={e=>{this.onCategofy(5)}}>评论详情</div>
            <div 
              className={category == 6 ?"cur":null}
              onClick={e=>{this.onCategofy(6)}}>应用评级</div>
          </div>
      </div>
    );
  }
});

export default DetailCategory;