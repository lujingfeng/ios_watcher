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
                <p className="fr">最后更新时间：{cur.updateTime}</p>

                <p>当前版本评分（{cur.versionName}）</p>
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
                      <i className="prs" style={{width: width * cur[5].percentage }}></i>
                      <span className="fr">{cur[5].count}</span>
                    </li>
                    <li>
                      <span>4星</span>
                      <i className="prs" style={{width: width*cur[4].percentage}}></i>
                      <span className="fr">{cur[4].count}</span>
                    </li>
                    <li>
                      <span>3星</span>
                      <i className="prs" style={{width: width*cur[3].percentage}}></i>
                      <span className="fr">{cur[3].count}</span>
                    </li>
                    <li>
                      <span>2星</span>
                      <i className="prs" style={{width: width*cur[2].percentage}}></i>
                      <span className="fr">{cur[2].count}</span>
                    </li>
                    <li>
                      <span>1星</span>
                      <i className="prs" style={{width: width*cur[1].percentage}}></i>
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
                <p className="fr">最后更新时间:{history.updateTime}</p>
                <p>历史版本评分</p>
              </th>
            </tr>

            <tr>
              <td className="clearfix">
                <div className="left fl">
                  <p className="f24 score">{history.averageScore}</p>
                  <p><Rank value={parseInt(history.averageScore)} width={14}/></p>
                  <p className="f10">评分次数：{history.totalCount}</p>
                </div>
                <div className="right fl">
                  <ul>
                    <li>
                      <span>5星</span>
                      <i className="prs" style={{width: width * history[5].percentage}}></i>
                      <span className="fr">{history[5].count}</span>
                    </li>
                    <li>
                      <span>4星</span>
                      <i className="prs" style={{width: width * history[4].percentage }}></i>
                      <span className="fr">{history[4].count}</span>
                    </li>
                    <li>
                      <span>3星</span>
                      <i className="prs" style={{width: width * history[3].percentage }}></i>
                      <span className="fr">{history[3].count}</span>
                    </li>
                    <li>
                      <span>2星</span>
                      <i className="prs" style={{width: width * history[2].percentage }}></i>
                      <span className="fr">{history[2].count}</span>
                    </li>
                    <li>
                      <span>1星</span>
                      <i className="prs" style={{width: width * history[1].percentage }}></i>
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