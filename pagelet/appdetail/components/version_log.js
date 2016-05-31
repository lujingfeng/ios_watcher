/**
  * @require ../detail.less
  */

import DetailAction from "../action/action";
import DetailStore from "../store/store";
import React from "react";
import $ from "jquery";
import Loading from "/pagelet/widget/components/loading";


var VersionLog = React.createClass({ 
  getInitialState: function(){
    return {
      loading: true,
      versions: []
    };
  },

  componentDidMount:function(){
    this.unSubscribe = DetailStore.listen(this.onStateChange.bind(this));
    var query = this.props.query;

    DetailAction.detailVersion({
      country: query.country,
      device: query.device,
      appId: query.id
    });
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    this.setState(state);
  },

  render: function(){
    return (
      <div className="version-log">
        <h5 className="title">
          <i></i>
          版本记录
        </h5>

        <table className="border">
          <tr>
            <th style={{width:50}}>版本</th>
            <th style={{width:100}}>更新时间</th>
            <th>更新说明</th>
          </tr>

          {
            this.state.versions.map((item, idx)=>{
              var isFolder = false;
              var updateDesc = "";
              var len = 30;
              var id = "ver_"+idx;

              if(item.updatecontent && item.updatecontent.length>len){
                updateDesc = item.updatecontent.substring(0, len)+"...";
                isFolder = true;
              }else{
                updateDesc = item.updatecontent;
              }
              var onToggle = (e)=>{
                $(e.target.parentNode).find(".f-icon").toggleClass("expand");
                isFolder = !isFolder;
                $("#"+id).text(isFolder?updateDesc:item.updatecontent);
              }
              return (<tr>
                      <td >
                        {item.versionName}
                      </td>
                      <td>
                        {item.begintime}
                      </td>
                      <td onClick={onToggle}>
                        <span id={id}>{updateDesc}</span>
                        {
                          isFolder?<i className="f-icon"></i>:null
                        }
                      </td>
                    </tr>)
            })
          }
        </table>
        {
          this.state.loading?<Loading/>:null
        }
        {
          this.state.errorText?<p className="center c999">暂无数据</p>:null
        }
      </div>
    );
  }
});

export default VersionLog;