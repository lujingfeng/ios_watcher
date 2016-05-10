define('pagelet/compproduct/store/store', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _actionAction = require("pagelet/compproduct/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var CompareStore = _reflux2["default"].createStore({
  
    init: function init() {
      this.listenTo(_actionAction2["default"].getCompare, this.loading);
      this.listenTo(_actionAction2["default"].getCompareCmp, this.getCompareCmp);
    },
  
    loading: function loading() {
      this.trigger({
        loading: true
      });
    },
  
    getCompareCmp: function getCompareCmp(res) {
      var params = { loading: false };
  
      console.log(res);
  
      if (info) {
        params.detailInfo = info;
      }
      this.trigger(params);
    }
  });
  
  exports["default"] = CompareStore;
  module.exports = exports["default"];

});
