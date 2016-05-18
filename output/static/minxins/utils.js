define('static/minxins/utils', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _jquery = require("jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var request = _jquery2["default"].ajax;
  
  _jquery2["default"].ajax = function (params) {
      var _fail = [];
      var _done = [];
      var _always = [];
      var req = request.apply(_jquery2["default"], arguments);
  
      var start = Date.now();
  
      req.fail(function (res) {
          var _this = this;
  
          var args = arguments;
  
          send({
              type: "request",
              opra: params.url,
              label: "失败"
          });
  
          _fail.forEach(function (func) {
              func.apply(_this, args);
          });
      });
  
      req.done(function (res) {
          var _this2 = this;
  
          var args = arguments;
          var end = Date.now();
  
          send({
              type: "request",
              opra: params.url,
              label: "成功-" + (end - start)
          });
  
          _done.forEach(function (func) {
              func.apply(_this2, args);
          });
      });
  
      req.always(function (res) {
          var _this3 = this;
  
          var args = arguments;
  
          _always.forEach(function (func) {
              func.apply(_this3, args);
          });
      });
  
      return {
          always: function always(func) {
              _always.push(func);
              return this;
          },
          done: function done(func) {
              _done.push(func);
              return this;
          },
          fail: function fail(func) {
              _fail.push(func);
              return this;
          }
      };
  };
  
  var URL = {
      getParameters: function getParameters() {
          var search = location.search || "";
          var params = {};
  
          if (search) {
              search = search.slice(1);
              var split = search.split("&");
              split.forEach(function (item) {
                  var m = item.match(/(\w+)=(\w+)/);
                  if (m) {
                      params[m[1]] = m[2];
                  }
              });
          }
          return params;
      }
  };
  
  var bytesToSize = function bytesToSize(bytes) {
      if (bytes === 0) return '0 B';
      var k = 1000,
          // or 1024
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  };
  
  var getCookie = function getCookie(name) {
      var arr,
          reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
  };
  
  function setCookie(cookiename, cookievalue, hours) {
      var date = new Date();
      date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
      document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
  };
  
  function send(params) {
      request.apply(_jquery2["default"], [{
          url: "/other/write-log",
          type: "get",
          data: params
      }]);
  }
  
  exports["default"] = { URL: URL, bytesToSize: bytesToSize, getCookie: getCookie, setCookie: setCookie, send: send };
  module.exports = exports["default"];

});
