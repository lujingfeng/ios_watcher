/**
  * @require ../detail.less
  */

import React from "react";

var AppInfo = React.createClass({ 

  render: function(){
    var query = this.props.query;
    
    return (
      <div className="app-info">
        <table>
          <tr><td>分类：</td><td>游戏</td></tr>
          <tr><td>设备：</td><td>iPhone</td></tr>
          <tr><td>AppID:</td><td>{query.appId}</td></tr>
          <tr><td>包名：</td><td>{query.packageName}</td></tr>
          <tr><td>当前版本：</td><td>{query.versionname}</td></tr>
          <tr><td>应用大小:</td><td>2M</td></tr>
          <tr><td>最后更新时间:</td><td>2014.01.12</td></tr>
          <tr><td>应用描述:</td><td></td></tr>
        </table>
        <div className="app-description">
          XXXFSDFSAFSDF<br/>
          XXXFSDFSAFSDF<br/>
          XXXFSDFSAFSDF<br/>
          XXXFSDFSAFSDF<br/>
          XXXFSDFSAFSDF<br/>
          XXXFSDFSAFSDF<br/>
          XXXFSDFSAFSDF<br/>
          XXXFSDFSAFSDF<br/>
          XXXFSDFSAFSDF<br/>
          XXXFSDFSAFSDF<br/>
          XXXFSDFSAFSDF<br/>
        </div>
      </div>
    );
  }
});

export default AppInfo;