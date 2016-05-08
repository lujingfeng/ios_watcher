define('pagelet/top/action/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _staticLibJquery = require("jquery");
  
  var _staticLibJquery2 = _interopRequireDefault(_staticLibJquery);
  
  var TopAction = _reflux2["default"].createActions(["fetchList", "fetchListCmp", "fetUpTopList", "fetUpTopListCmp", "fetDownTopList", "fetDownTopListCmp"]);
  
  TopAction.fetchList.preEmit = function (query) {
    //timetype - 查询时间类型（0 - 查询每天榜单 / 1 - 查询小时榜单， 可以不设置，此时默认按小时查询）
  
    //date - 查询榜单的时间日期 (格式为:yyyy-MM-dd)
  
    //hour - 查询榜单的时间小时 (0 - 23)
  
    //country - 榜单所在区域(1 - 中国;2 - 美国)
  
    //device - 设备类型（0 - iphone; 1 - ipad）
  
    //typeid - 榜单类别id
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/ranklist',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      TopAction.fetchListCmp(res);
    });
  };
  
  TopAction.fetUpTopList = function (query) {
    query.flag = 1;
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/iosupdown',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      TopAction.fetUpTopListCmp(res);
    });
  };
  
  TopAction.fetDownTopList = function () {
    var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
    query.flag = 2;
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/iosupdown',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      TopAction.fetDownTopListCmp(res);
    });
  };
  
  exports["default"] = TopAction;
  module.exports = exports["default"];

});
