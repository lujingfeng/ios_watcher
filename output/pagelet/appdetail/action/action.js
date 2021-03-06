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
  
  var DetailAction = _reflux2["default"].createActions(["appInfo", "appInfoCmp", "realRank", "realRankCmp", "ranklatest", "ranklatestCmp", "commentDetail", "commentDetailCmp", "appLevel", "appLevelCmp", "detailVersion", "detailVersionCmp", "keywordCover", "keywordCoverCmp", "addFav", "addFavCmp", "isFav", "isFavCmp"]);
  
  DetailAction.appInfo.preEmit = function (id, device, country) {
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/iosdetail',
      data: {
        appId: id,
        device: device,
        country: country
      },
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      DetailAction.appInfoCmp(res);
    });
  };
  
  DetailAction.ranklatest.preEmit = function () {
    var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/ranklatest',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      DetailAction.ranklatestCmp(res);
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
  
  DetailAction.detailVersion.preEmit = function () {
    var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/iosversiondetail',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      DetailAction.detailVersionCmp(res);
    });
  };
  
  DetailAction.keywordCover.preEmit = function (id) {
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/keywordCover',
      data: {
        appId: id
      },
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      DetailAction.keywordCoverCmp(res);
    });
  };
  
  DetailAction.addFav.preEmit = function (appId, attention) {
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/attention/attention-app',
      data: {
        appId: appId,
        type: attention
      },
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      DetailAction.addFavCmp(res);
    });
  };
  
  DetailAction.isFav.preEmit = function (id) {
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/attention/is-attention',
      data: {
        appId: id
      },
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      DetailAction.isFavCmp(res);
    });
  };
  
  exports["default"] = DetailAction;
  module.exports = exports["default"];

});
