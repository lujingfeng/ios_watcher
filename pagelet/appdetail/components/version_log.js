/**
  * @require ../detail.less
  */

import DetailAction from "../action/action";
import DetailStore from "../store/store";
import React from "react";
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
            <th>版本</th>
            <th style={{width:100}}>更新时间</th>
            <th>更新说明</th>
          </tr>

          {
            this.state.versions.map((item, idx)=>{
              return (<tr>
                      <td>
                        {item.version}
                      </td>
                      <td>
                        {item.date}
                      </td>
                      <td>
                      </td>
                    </tr>)
            })
          }
        </table>
        {
          this.state.loading?<Loading/>:null
        }
      </div>
    );
  }
});

export default VersionLog;