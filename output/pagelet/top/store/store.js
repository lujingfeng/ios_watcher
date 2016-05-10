define('pagelet/top/store/store', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _actionActionJs = require("pagelet/top/action/action");
  
  var _actionActionJs2 = _interopRequireDefault(_actionActionJs);
  
  var TopStore = _reflux2["default"].createStore({
  
    init: function init() {
      this.listenTo(_actionActionJs2["default"].fetchList, this.loading);
      this.listenTo(_actionActionJs2["default"].fetchListCmp, this.fetchListCmp);
  
      this.listenTo(_actionActionJs2["default"].fetUpTopList, this.loading);
      this.listenTo(_actionActionJs2["default"].fetDownTopList, this.loading);
    },
  
    loading: function loading() {
      this.trigger({
        loading: true
      });
    },
  
    fetchListCmp: function fetchListCmp(res) {
      var params = { loading: false };
  
      if (res.fee) {
        params.list = res.fee.rank ? res.fee.rank : [];
      }
  
      if (res.free) {
        params.list = res.free.rank ? res.free.rank : [];
      }
  
      if (res.hot) {
        params.list = res.hot.rank ? res.hot.rank : [];
      }
  
      this.trigger(params);
    }
  });
  
  exports["default"] = TopStore;
  module.exports = exports["default"];

});
