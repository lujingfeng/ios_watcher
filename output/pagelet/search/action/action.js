define('pagelet/search/action/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _staticLibJquery = require("jquery");
  
  var _staticLibJquery2 = _interopRequireDefault(_staticLibJquery);
  
  var SearchAction = _reflux2["default"].createActions(["search", "searchCmp", "fetchHotApp", "fetchHotAppCmp", "fetchHistory", "fetchHistoryCmp"]);
  
  SearchAction.search.preEmit = function (serachKey, page, country, device) {
    if (page === undefined) page = 1;
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/iossercher',
      data: {
        param: serachKey,
        pageSize: 20,
        currentPage: page,
        country: country,
        device: device
      },
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      SearchAction.searchCmp(res);
    });
  };
  
  SearchAction.fetchHotApp.preEmit = function () {
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/search/hotApp',
      data: {},
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      SearchAction.fetchHotAppCmp(res);
    });
  };
  
  SearchAction.fetchHistory.preEmit = function () {
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/search/searchHistory',
      data: {},
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      SearchAction.fetchHistoryCmp(res);
    });
  };
  
  exports["default"] = SearchAction;
  module.exports = exports["default"];

});
