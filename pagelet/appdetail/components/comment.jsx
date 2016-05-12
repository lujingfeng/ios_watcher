/**
  * @require ../detail.less
  */

import React from "react";
import Rank from "/pagelet/widget/components/rank";


import DetailAction from "../action/action";
import DetailStore from "../store/store";
import {countryCode, deviceType} from "constants";

var Comment = React.createClass({ 

  getInitialState: function(){
    var query = this.props.query;

    return {
      id: query.id,
      country: countryCode.CHINA,
      duraTime: 1,
      device: deviceType.IPHONE,
      bIndex: 1,
      count: 20,
      score:3
    }
  },

  componentDidMount: function(){
    

    DetailAction.commentDetail({
      id: this.state.id,
      duraTime: this.state.duraTime,
      country: this.state.country,
      device: this.state.device,
      bIndex: this.state.bIndex,
      count: this.state.count,
      score: this.state.score
    });
  },
  render: function(){
    
    return (
      <div className="comment">
        <h5 className="title">
          <p className="fr f-txt f10 c999">所有评级, 7天</p>
          <i></i>
          评论详情
        </h5>

        <table className="border">
          <tr>
            <th>评论内容</th>
          </tr>

          <tr>
            <td>
              <p>
               发撒旦发神经大夫isf打龙卷风离开
               圣诞快乐解放路四大皆空发就是垃圾
               啊放假看i维京人历史地看福建省里卡
               多发觉就就解决了发   辅导书
              </p>
              <div className="c999 f10 mt6">
                <i className="mr6 t-vt">聚灵天下</i>
                <i className="mr6 t-vt">v1.2.0</i>
                <Rank value={2.5} width={14}/>
                <i className="ml6 t-vt">2016-02-29</i>
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
});

export default Comment;