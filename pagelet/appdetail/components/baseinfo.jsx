/**
  * @require ../detail.less
  */

import React from "react";

var BaseInfo = React.createClass({ 

  render: function(){
    var query = this.props.query;
    var titleWidth = window.innerWidth - 180;
    
    return (
      <div className="c-app-base-info">
        <table>
          <tr>
            <td>
              <img 
                src={query.icon}
                className="app-icon"></img>
            </td>
            <td>
              <p className="title ellipsis" style={{width: titleWidth}}>{query.title}</p>
              <p className="f12 c666">{query.developer}</p>
            </td>
            <td>
              <div className="vs">
                <div className="icon-vs"></div>
                <p className="f12">排名对比</p>
              </div>
            </td>
            <td>
              <div className="fav">
                <div className="icon-fav fav-un"></div>
                <p className="f12">添加关注</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
});

export default BaseInfo;