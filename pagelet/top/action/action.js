import Reflux from "reflux";
import $ from "/static/lib/jquery";

var TopAction = Reflux.createActions([
  "fetchList",
  "fetchListCmp"
]);

TopAction.fetchList.preEmit = function(params) {
  //timetype - 查询时间类型（0 - 查询每天榜单 / 1 - 查询小时榜单， 可以不设置，此时默认按小时查询）

  //date - 查询榜单的时间日期 (格式为:yyyy-MM-dd)

  //hour - 查询榜单的时间小时 (0 - 23)

  //country - 榜单所在区域(1 - 中国;2 - 美国)

  //device - 设备类型（0 - iphone; 1 - ipad）

  //typeid - 榜单类别id


  var params = {
    type: 'GET',
    url: SEARCH_HOST + '/ranklist',
    data: JSON.stringify(params),
    dataType: 'json'
  }

  $.ajax(params).always(function( res ){
    TopAction.fetchListCmp(res);
  });
};

export default TopAction;
