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
  
    fetchListCmp: function fetchListCmp(res, flag) {
      var params = { loading: false, flag: flag };
  
      if (res.rank) {
        params.list = res.rank ? res.rank : [];
      }
  
      if (res && res.statusText == "error") {
        params.errorText = res.statusText;
      }
  
      this.trigger(params);
    }
  });
  
  exports["default"] = TopStore;
  module.exports = exports["default"];

});
