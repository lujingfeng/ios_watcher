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
    },
  
    loading: function loading() {
      this.trigger({
        loading: true
      });
    },
  
    searchCmp: function searchCmp(list) {
      var total = 0;
      var searchResultList = list && list.length ? list.splice(0, list.length - 1) : [];
  
      if (list && list.length) {
        total = parseInt(list[list.length - 1].hitscount);
      }
      this.trigger({
        loading: false,
        searchResultList: searchResultList,
        total: total
      });
    }
  });
  
  exports["default"] = SearchStore;
  module.exports = exports["default"];

});
