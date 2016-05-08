/**
  * @require ../detail.less
  */

import React from "react";
import {deviceTypeStr} from "constants";
import Loading from "/pagelet/widget/components/loading";

import DetailAction from "../action/action";
import DetailStore from "../store/store";

var AppInfo = React.createClass({ 
  getInitialState: function(){
    return {
      loading: true,
      detailInfo: {}
    }
  },

  componentDidMount: function(){
    var query = this.props.query;

    this.unSubscribe = DetailStore.listen(this.onStateChange.bind(this));
    DetailAction.appInfo(query.appId, query.equipment);
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    if(state.detailInfo){
      this.setState(state);
    }
  },

  render: function(){
    var query = this.props.query;
    var detail = this.state.detailInfo;

    if(this.state.loading){
      return <Loading/>
    }

    return (
      <div className="app-info">
        <table>
          <tr><td>分类：</td><td>{detail.genres}</td></tr>
          <tr><td>设备：</td><td>{detail.device}</td></tr>
          <tr><td>AppID:</td><td>{detail.app_id}</td></tr>
          <tr><td>包名：</td><td>{detail.packageName}</td></tr>
          <tr><td>当前版本：</td><td>{detail.versionname}</td></tr>
          <tr><td>应用大小:</td><td>{detail.filesize}</td></tr>
          <tr><td>最后更新时间:</td><td>后端暂没定这个字段</td></tr>
          <tr><td>应用描述:</td><td></td></tr>
        </table>

        <div className="app-description">
          后端暂没定这个字段
        </div>
      </div>
    );
  }
});

export default AppInfo;