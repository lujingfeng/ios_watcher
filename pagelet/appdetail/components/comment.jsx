/**
  * @require ../detail.less
  */

import React from "react";
import Rank from "/pagelet/widget/components/rank";
import Loading from "/pagelet/widget/components/loading";

import DetailAction from "../action/action";
import DetailStore from "../store/store";

import {
  countryCode, 
  deviceType, 
  deviceTypeStr, 
  payType,
  payTypeToStr, 
  days2Str,
  countryCode2Str} from "constants";

var Comment = React.createClass({ 

  getInitialState: function(){
    var query = this.props.query;
    var filter = this.props.filter || {};
    var scores = filter.score||[];

    scores = scores.map((s)=>{
      return s.value;
    });

    scores = scores.join(",");

    if(filter.datetime && filter.datetime.year){
      var date = new Date(filter.datetime.year, filter.datetime.month - 1, filter.datetime.day);
      filter.datetime.value = date.format("yyyy-MM-dd");
      filter.datetime.name = date.format("yyyy-MM-dd");
    }

    return {
      loading: true,

      id: query.id,
      country: filter.country? filter.country.value: countryCode.CHINA,
      duraTime: filter.datetime,
      device: filter.device ? filter.device.value : deviceType.IPHONE,
      bIndex: 1,
      count: 50,
      score: scores,

      list: []
    }
  },

  componentDidMount: function(){
    this.fetchList();
    this.unSubscribe = DetailStore.listen(this.onStateChange.bind(this));
  },

  fetchList: function(){
    DetailAction.commentDetail({
      id: this.state.id,//711可用
      duraTime: this.state.duraTime.value,
      country: this.state.country,
      device: this.state.device,
      bIndex: this.state.bIndex,
      count: this.state.count,
      score: this.state.score
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    if(state.list){
      state.list = this.state.list.concat(state.list);
    }
    this.setState(state);
  },

  loadMore: function(){
    this.setState({
      bIndex: ++this.state.bIndex
    });
  },

  render: function(){
    var list = this.state.list;
    var state = this.state;
    var filter = this.props.filter || {};
    var scores = filter.score||[];
    var name;

    var scoreLabel = scores.map((s)=>{
      return s.name;
    });

    scoreLabel = scoreLabel.join(",");

    return (
      <div className="comment">
        <h5 className="title">
          <p className="fr f-txt f10">
            {scoreLabel && scores.length ==5 ? "所有评级":scoreLabel} {this.state.duraTime.name}
          </p>
          <i></i>
          评论详情
        </h5>
        { 
          list.length ?
          <table className="border">
            <tr>
              <th>评论内容</th>
            </tr>
            {
              list.map((item, idx)=>{
                return (
                  <tr>
                    <td>
                      <p>
                      {item.content}
                      </p>
                      <div className="c999 f10 mt6">
                        <i className="mr6 t-vt">{item.authorName}</i>
                        <i className="mr6 t-vt">{item.versionName}</i>
                        <Rank value={parseInt(item.score)} width={14}/>
                        <i className="ml6 t-vt">{item.dateTime}</i>
                      </div>
                    </td>
                  </tr>)
              })
            }
          </table>:null
        }

        {
          !this.state.loading && !list.length?<p className="center">暂无数据</p>:null
        }

        {
          this.state.loading?<Loading/>: null
        }

      </div>
    );
  }
});

export default Comment;