/**
  * @require ../detail.less
  */

import React from "react";
import Rank from "/pagelet/widget/components/rank";

var AppLevel = React.createClass({ 

  render: function(){
    
    return (
      <div className="app-detail-level">
        <h5 className="title">
          <i></i>
          应用评级
        </h5>

        <table className="border">
          <tr>
            <th>
              <p className="fr">最后更新时间：2016-10-10</p>
              <p>当前版本评分（3.2.4）</p>
            </th>
          </tr>

          <tr>
            <td className="clearfix">
              <div className="left fl">
                <p className="f24 score">4.2</p>
                <p><Rank value={4.2} width={14}/></p>
                <p className="f10">评分次数:10240</p>
              </div>
              <div className="right fl">
                <ul>
                  <li>
                    <span>5星</span>
                    <i className="prs" style={{width: 80}}></i>
                    <span className="fr">12321</span>
                  </li>
                  <li>
                    <span>4星</span>
                    <i className="prs" style={{width: 50}}></i>
                    <span className="fr">12321</span>
                  </li>
                  <li>
                    <span>3星</span>
                    <i className="prs" style={{width: 40}}></i>
                    <span className="fr">12321</span>
                  </li>
                  <li>
                    <span>2星</span>
                    <i className="prs" style={{width: 20}}></i>
                    <span className="fr">12321</span>
                  </li>
                  <li>
                    <span>1星</span>
                    <i className="prs" style={{width: 10}}></i>
                    <span className="fr">12321</span>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </table>

        <table className="border">
          <tr>
            <th>
              <p className="fr">最后更新时间:2016-10-10</p>
              <p>历史版本评分（3.2.4）</p>
            </th>
          </tr>

          <tr>
            <td className="clearfix">
              <div className="left fl">
                <p className="f24 score">4.2</p>
                <p><Rank value={4.2} width={14}/></p>
                <p className="f10">评分次数：10240</p>
              </div>
              <div className="right fl">
                <ul>
                  <li>
                    <span>5星</span>
                    <i className="prs" style={{width: 80}}></i>
                    <span className="fr">12321</span>
                  </li>
                  <li>
                    <span>4星</span>
                    <i className="prs" style={{width: 50}}></i>
                    <span className="fr">12321</span>
                  </li>
                  <li>
                    <span>3星</span>
                    <i className="prs" style={{width: 40}}></i>
                    <span className="fr">12321</span>
                  </li>
                  <li>
                    <span>2星</span>
                    <i className="prs" style={{width: 20}}></i>
                    <span className="fr">12321</span>
                  </li>
                  <li>
                    <span>1星</span>
                    <i className="prs" style={{width: 10}}></i>
                    <span className="fr">12321</span>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
});

export default AppLevel;