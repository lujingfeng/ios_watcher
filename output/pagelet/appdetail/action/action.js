define('pagelet/appdetail/action/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _staticLibJquery = require("jquery");
  
  var _staticLibJquery2 = _interopRequireDefault(_staticLibJquery);
  
  var DetailAction = _reflux2["default"].createActions(["appInfo", "appInfoCmp", "realRank", "realRankCmp", "commentDetail", "commentDetailCmp", "appLevel", "appLevelCmp"]);
  
  DetailAction.appInfo.preEmit = function (appId, device) {
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/iosdetail',
      data: {
        appId: appId,
        device: device
      },
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      DetailAction.appInfoCmp(res);
    });
  };
  
  DetailAction.realRank.preEmit = function () {
    var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/apprank',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      DetailAction.realRankCmp(res);
    });
  };
  
  DetailAction.commentDetail.preEmit = function () {
    var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/appcomment',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      DetailAction.commentDetailCmp(res);
    });
  };
  
  DetailAction.appLevel.preEmit = function () {
    var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/appscore',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      DetailAction.appLevelCmp(res);
    });
  };
  
  exports["default"] = DetailAction;
  module.exports = exports["default"];

});
