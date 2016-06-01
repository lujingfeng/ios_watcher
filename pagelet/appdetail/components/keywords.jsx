/**
  * @require ../detail.less
  */

import React from "react";

import DetailAction from "../action/action";
import DetailStore from "../store/store";
import Loading from "/pagelet/widget/components/loading";

var Keywords = React.createClass({ 
  getInitialState: function(){
    return {
      loading:false,
      keywords:[]
    };
  },
  componentDidMount: function(){
    DetailAction.keywordCover(this.props.query.appId);
    this.unSubscribe = DetailStore.listen(this.onStateChange.bind(this));
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    this.setState(state);
  },

  render: function(){
    
    return (
      <div className="keywords-overide">
        <h5 className="title">
          <i></i>
          关键词覆盖数（共覆盖<a>{this.state.keywords.length}</a>个词）
        </h5>
        <table className="border">
          <tr>
            <th>关键词</th>
            <th style={{width:50}}>排名</th>
            <th>搜索指数</th>
            <th>搜索结果数</th>
          </tr>
          {
            this.state.keywords.map((item)=>{
              return (<tr>
                <td>
                  {item.keyword}
                </td>
                <td>
                  {item.rank}
                </td>
                <td>
                  {item.hot}
                </td>
                <td>
                  {item.count}
                </td>
              </tr>)
            })
          }
        </table>
        {
          this.state.loading?<Loading/>:null
        }

      </div>
    );
  }
});

export default Keywords;