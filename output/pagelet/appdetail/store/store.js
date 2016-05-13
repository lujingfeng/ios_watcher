define('pagelet/appdetail/store/store', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _actionActionJs = require("pagelet/appdetail/action/action");
  
  var _actionActionJs2 = _interopRequireDefault(_actionActionJs);
  
  var DetailStore = _reflux2["default"].createStore({
  
    init: function init() {
      this.listenTo(_actionActionJs2["default"].appInfo, this.loading);
      this.listenTo(_actionActionJs2["default"].appInfoCmp, this.appInfoCmp);
  
      this.listenTo(_actionActionJs2["default"].commentDetail, this.loading);
      this.listenTo(_actionActionJs2["default"].commentDetailCmp, this.commentDetailCmp);
  
      this.listenTo(_actionActionJs2["default"].appLevel, this.loading);
      this.listenTo(_actionActionJs2["default"].appLevelCmp, this.appLevelCmp);
  
      this.listenTo(_actionActionJs2["default"].detailVersion, this.loading);
      this.listenTo(_actionActionJs2["default"].detailVersionCmp, this.detailVersionCmp);
    },
  
    loading: function loading() {
      this.trigger({
        loading: true
      });
    },
  
    appInfoCmp: function appInfoCmp(info) {
      var params = { loading: false };
  
      if (info) {
        params.detailInfo = info;
      }
      this.trigger(params);
    },
  
    detailVersionCmp: function detailVersionCmp(res) {
      var params = { loading: false };
      var versions = [];
  
      if (res) {
        var keys = Object.keys(res) || [];
        keys.forEach(function (item, idx) {
          versions.push({
            version: item,
            date: res[item]
          });
        });
        params.versions = versions;
      }
      this.trigger(params);
    },
  
    appLevelCmp: function appLevelCmp(res) {},
  
    commentDetailCmp: function commentDetailCmp(res) {
      console.log(res);
      var array = [];
      var comment;
  
      if (comment = res.comment) {
        for (var i in comment) {
          array.push(comment[i]);
        }
      }
  
      var params = { loading: false };
      params.list = array;
      this.trigger(params);
    }
  
  });
  
  exports["default"] = DetailStore;
  module.exports = exports["default"];

});
