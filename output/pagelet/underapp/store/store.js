define('pagelet/underapp/store/store', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _actionActionJs = require("pagelet/underapp/action/action");
  
  var _actionActionJs2 = _interopRequireDefault(_actionActionJs);
  
  var UnderAppStore = _reflux2["default"].createStore({
  
    init: function init() {
      this.listenTo(_actionActionJs2["default"].fetchUnderAppList, this.loading);
      this.listenTo(_actionActionJs2["default"].fetchUnderAppListCmp, this.fetchUnderAppListCmp);
    },
  
    loading: function loading() {
      this.trigger({
        loading: true
      });
    },
  
    fetchUnderAppListCmp: function fetchUnderAppListCmp(res) {
      var params = { loading: false };
      var underAppList = res.data || [];
  
      params.underAppList = underAppList.length ? underAppList : [];
      if (res && res.statusText == "error") {
        params.errorText = res.statusText;
      }
      this.trigger(params);
    }
  });
  
  exports["default"] = UnderAppStore;
  module.exports = exports["default"];

});
