/**
  * @require ../detail.less
  */

import React from "react";
import Rank from "/pagelet/widget/components/rank";
import Loading from "/pagelet/widget/components/loading";

import DetailAction from "../action/action";
import DetailStore from "../store/store";
import {countryCode, deviceType} from "constants";

var AppLevel = React.createClass({ 
  getInitialState: function(){
    var query = this.props.query;

    return {
      loading: true,

      id: query.id,
      country: countryCode.CHINA,
      device: deviceType.IPHONE,

      history: null,
      cur: null
    }
  },

  componentDidMount: function(){
    DetailAction.appLevel({
      id: this.state.id,
      country: this.state.country,
      device: this.state.device
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
    var cur = this.state.cur;
    var history = this.state.history;
    console.log(cur, history);

    if(this.state.loading){
      return <Loading/>;
    }

    var width = 100;
    var cur5 = 0;
    var cur4 = 0;
    var cur3 = 0;
    var cur2 = 0;
    var cur1 = 0;

    var history5 = 0;
    var history4 = 0;
    var history3 = 0;
    var history2 = 0;
    var history1 = 0;


    if(cur[5]){
      cur5 = width * cur[5].percentage;
      cur5 = cur5 > 1? cur5:(cur5>0?1:0);
    }
    if(cur[4]){
      cur4 = width * cur[4].percentage;
      cur4 = cur4 > 1? cur4:(cur5>0?1:0);
    }
    if(cur[3]){
      cur3 = width * cur[3].percentage;
      cur3 = cur3 > 1? cur3:(cur3>0?1:0);
    }
    if(cur[2]){
      cur2 = width * cur[2].percentage;
      cur2 = cur2 > 1? cur2:(cur2>0?1:0);
    }
    if(cur[1]){
      cur1 = width * cur[1].percentage;
      cur1 = cur1 > 1? cur1:(cur1>0?1:0);
    }

    if(history[5]){
      history5 = width * history[5].percentage;
      history5 = history5 > 1? history5:(history5>0?1:0);
    }
    if(history[4]){
      history4 = width * history[4].percentage;
      history4 = history4 > 1? history4:(history4>0?1:0);
    }
    if(cur[3]){
      history3 = width * history[3].percentage;
      history3 = history3 > 1? history3:(history3>0?1:0);
    }
    if(history[2]){
      history2 = width * history[2].percentage;
      history2 = history2 > 1? history2:(history2>0?1:0);
    }
    if(history[1]){
      history1 = width * history[1].percentage;
      history1 = history1 > 1? history1:(history1>0?1:0);
    }


    return (
      <div className="app-detail-level">
        <h5 className="title">
          <i></i>
          应用评级
        </h5>

        {cur?
          <table className="border">
            <tr>
              <th>
                <p className="fr mr6">最后更新时间:{cur.updateTime}</p>

                <p className="fl ml6">当前版本评分（{cur.versionName}）</p>
              </th>
            </tr>

            <tr>
              <td className="clearfix">
                <div className="left fl">
                  <p className="f24 score">{cur.averageScore}</p>
                  <p><Rank value={parseInt(cur.averageScore)} width={14}/></p>
                  <p className="f10">评分次数:{cur.totalCount}</p>
                </div>
                <div className="right fl">
                  <ul>
                    <li>
                      <span>5星</span>
                      <i 
                        className="prs" 
                        style={{width: cur5 }}></i>
                      <span className="fr">{cur[5].count}</span>
                    </li>
                    <li>
                      <span>4星</span>
                      <i 
                        className="prs" 
                        style={{width: cur4}}></i>
                      <span className="fr">{cur[4].count}</span>
                    </li>
                    <li>
                      <span>3星</span>
                      <i 
                        className="prs" 
                        style={{width: cur3}}></i>
                      <span className="fr">{cur[3].count}</span>
                    </li>
                    <li>
                      <span>2星</span>
                      <i 
                        className="prs" 
                        style={{width: cur2}}></i>
                      <span className="fr">{cur[2].count}</span>
                    </li>
                    <li>
                      <span>1星</span>
                      <i 
                        className="prs" 
                        style={{width: cur1}}></i>
                      <span className="fr">{cur[1].count}</span>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </table>:<p className="center">暂无数据</p>
        }
        {
          history?
          <table className="border">
            <tr>
              <th>
                <p className="fr mr6">最后更新时间:{history.updateTime}</p>
                <p className="fl ml6">历史版本评分</p>
              </th>
            </tr>

            <tr>
              <td className="clearfix">

                <div className="left fl">
                  <p className="f24 score">{history.averageScore}</p>
                  <p><Rank value={parseInt(history.averageScore)} width={14}/></p>
                  <p className="f10">评分次数:{history.totalCount}</p>
                </div>

                <div className="right fl">
                  <ul>
                    <li>
                      <span>5星</span>
                      <i className="prs" style={{width: history5}}></i>
                      <span className="fr">{history[5].count}</span>
                    </li>
                    <li>
                      <span>4星</span>
                      <i className="prs" style={{width: history4 }}></i>
                      <span className="fr">{history[4].count}</span>
                    </li>
                    <li>
                      <span>3星</span>
                      <i className="prs" style={{width: history3 }}></i>
                      <span className="fr">{history[3].count}</span>
                    </li>
                    <li>
                      <span>2星</span>
                      <i className="prs" style={{width: history2 }}></i>
                      <span className="fr">{history[2].count}</span>
                    </li>
                    <li>
                      <span>1星</span>
                      <i className="prs" style={{width: history1 }}></i>
                      <span className="fr">{history[1].count}</span>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </table>:null
        }
      </div>
    );
  }
});

export default AppLevel;