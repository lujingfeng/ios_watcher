/**
  * @require ../detail.less
  */

import React from "react";
import DetailAction from "../action/action";
import DetailStore from "../store/store";
import {countryCode, deviceType} from "constants";

var RRank = React.createClass({ 

  componentDidMount: function(){

    var query = this.props.query;

    require.async("/static/lib/echarts.min", (echarts)=>{
      var rankChart = echarts.init(this.refs.rank);
      // 指定图表的配置项和数据
        var option = {
            title: {
                text: ''
            },
            tooltip: {},
            legend: {
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ["2012","2013","2014"]
            },
            yAxis: {},
            series: [{
              name: 'rank',
              smooth: true,
              type: 'line',
              data: [5, 20, 36]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        rankChart.setOption(option);

        DetailAction.realRank({
          country: query.country,
          device: query.device,
          id: query.id
        });
    });
  },

  componentWillUnmount: function(){
  
  },

  render: function(){
    return (
      <div className="real-rank">

        <h5 className="title">
          <i></i>
          实时排名
        </h5>

        <table border="1" cellSpacing="0">
          <tr>
            <th></th>
            <th>总榜（免费）</th>
            <th>软件（免费）</th>
          </tr>
          <tr>
            <td>实时排名</td>
            <td>
              <p className="m10 f16">1500</p>
              <p className="f12 c999 mb10">2015-01-08前</p>
            </td>
            <td>
              <p className="m10 f16">1200</p>
              <p className="f12 c999 mb10">2015-01-08前</p>
            </td>
          </tr>
        </table>
        <h5 className="title">
          <i></i>
          排名趋势
        </h5>
        <div ref="rank" style={{width:"100%", height: 200}}>

        </div>
      </div>
    );
  }
});

export default RRank;