/**
  * @require ../detail.less
  */
  
import DetailAction from "../action/action";
import DetailStore from "../store/store";
import React from "react";

var VersionLog = React.createClass({ 
  componentDidMount:function(){
    var query = this.props.query;

    DetailAction.detailVersion({
      country: query.country,
      device: query.device,
      id: query.id
    });
  },
  render: function(){
    return (
      <div className="version-log">
        <h5 className="title">
          <i></i>
          版本记录
        </h5>

        <table>
          <tr>
            <th>版本</th>
            <th style={{width:100}}>更新时间</th>
            <th>更新说明</th>
          </tr>

          <tr>
            <td>
              6.2.2.1
            </td>
            <td>
              2016-04-25
            </td>
            <td>
              sdfsdaf福建省嫡福晋阿发就看见发了多少，疯狂的撒分流k1辅导书开房间离开
              sdfsdaf福建省嫡福晋阿发就看见发了多少，疯狂的撒分流k1辅导书开房间离开
              sdfsdaf福建省嫡福晋阿发就看见发了多少，疯狂的撒分流k1辅导书开房间离开
              sdfsdaf福建省嫡福晋阿发就看见发了多少，疯狂的撒分流k1辅导书开房间离开
            </td>
          </tr>
        </table>
      </div>
    );
  }
});

export default VersionLog;