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

    return {
      id: query.id,
      country: filter.country? filter.country.value: countryCode.CHINA,
      duraTime: filter.days?filter.days.value: 1,
      device: filter.device ? filter.device.value : deviceType.IPHONE,
      bIndex: 1,
      count: 1000,
      score: scores ||"1,2,3,4,5",

      list: []
    }
  },

  componentDidMount: function(){

    DetailAction.commentDetail({
      id: this.state.id,//711可用
      duraTime: this.state.duraTime,
      country: this.state.country,
      device: this.state.device,
      bIndex: this.state.bIndex,
      count: this.state.count,
      score: this.state.score
    });

    this.unSubscribe = DetailStore.listen(this.onStateChange.bind(this));
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    this.setState(state);
  },

  render: function(){
    var list = this.state.list;

    var filter = this.props.filter || {};
    var scores = filter.score||[];
    var scoreLabel = scores.map((s)=>{
      return s.name;
    });

    scoreLabel = scoreLabel.join(",");

    return (
      <div className="comment">
        <h5 className="title">
          <p className="fr f-txt f10 c999">{scoreLabel||"所有评级"}, {days2Str[this.state.duraTime]}</p>
          <i></i>
          评论详情
        </h5>

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
        </table>
        {
          this.state.loading?<Loading/>: null
        }

      </div>
    );
  }
});

export default Comment;