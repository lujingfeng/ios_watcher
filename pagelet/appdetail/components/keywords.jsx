/**
  * @require ../detail.less
  */

import React from "react";

var Keywords = React.createClass({ 

  render: function(){
    
    return (
      <div className="keywords-overide">
        <h5 className="title">
          <i></i>
          关键词覆盖数（共覆盖<a>1286</a>个词）
        </h5>

        <table className="border">
          <tr>
            <th>关键词</th>
            <th style={{width:50}}>排名</th>
            <th>搜索指数</th>
            <th>搜索结果数</th>
          </tr>

          <tr>
            <td>
              微信
            </td>
            <td>
              1
            </td>
            <td>
              10500
            </td>
            <td>
              100
            </td>
          </tr>
        </table>
      </div>
    );
  }
});

export default Keywords;