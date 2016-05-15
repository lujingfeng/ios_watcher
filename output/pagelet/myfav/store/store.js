define('pagelet/myfav/store/store', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _actionAction = require("pagelet/myfav/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var FavStore = _reflux2["default"].createStore({
  
    init: function init() {
      this.listenTo(_actionAction2["default"].fetFavLsit, this.loading);
      this.listenTo(_actionAction2["default"].fetFavLsitCmp, this.fetFavLsitCmp);
    },
  
    loading: function loading() {
      this.trigger({
        loading: true
      });
    },
  
    fetFavLsitCmp: function fetFavLsitCmp(res) {
      var params = { loading: false };
      params.list = res.data || [];
      this.trigger(params);
    }
  });
  
  exports["default"] = FavStore;
  module.exports = exports["default"];

});
