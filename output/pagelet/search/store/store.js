define('pagelet/search/store/store', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _actionActionJs = require("pagelet/search/action/action");
  
  var _actionActionJs2 = _interopRequireDefault(_actionActionJs);
  
  var SearchStore = _reflux2["default"].createStore({
  
    init: function init() {
      this.listenTo(_actionActionJs2["default"].search, this.loading);
      this.listenTo(_actionActionJs2["default"].searchCmp, this.searchCmp);
  
      this.listenTo(_actionActionJs2["default"].fetchHotApp, this.loading);
      this.listenTo(_actionActionJs2["default"].fetchHotAppCmp, this.fetchHotAppCmp);
  
      this.listenTo(_actionActionJs2["default"].fetchHistory, this.loading);
      this.listenTo(_actionActionJs2["default"].fetchHistoryCmp, this.fetchHistoryCmp);
  
      this.listenTo(_actionActionJs2["default"].searchWordHot, function () {});
      this.listenTo(_actionActionJs2["default"].searchWordHotCmp, this.searchWordHotCmp);
  
      this.listenTo(_actionActionJs2["default"].addHistory, this.addHistory);
    },
  
    loading: function loading() {
      this.trigger({
        loading: true
      });
    },
  
    searchCmp: function searchCmp(list) {
      var total = 0;
      var searchResultList = list && list.length ? list.splice(0, list.length - 1) : [];
      var params = { loading: false };
  
      if (list && list.length) {
        total = parseInt(list[list.length - 1].hitscount);
        params.total = total;
      }
  
      params.searchResultList = searchResultList;
      this.trigger(params);
    },
  
    fetchHotAppCmp: function fetchHotAppCmp(res) {
      var params = { loading: false };
      if (res && res.hotWords) {
        params.hotWords = res.hotWords || [];
      }
      if (res && res.statusText == "error") {
        params.errorText = res.statusText;
      }
      this.trigger(params);
    },
  
    fetchHistoryCmp: function fetchHistoryCmp(res) {
      var params = { loading: false };
      if (res && res.records) {
        params.records = res.records || [];
      }
      if (res && res.statusText == "error") {
        params.errorText = res.statusText;
      }
      this.trigger(params);
    },
    searchWordHotCmp: function searchWordHotCmp(res) {
      var params = {};
  
      if (res.hot) {
        params.hot = res.hot;
      }
      this.trigger(params);
    }
  });
  
  exports["default"] = SearchStore;
  module.exports = exports["default"];

});
