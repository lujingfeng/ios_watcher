define('static/minxins/utils', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
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
  
  exports["default"] = { URL: URL };
  module.exports = exports["default"];

});
