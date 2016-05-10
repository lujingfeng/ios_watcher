define('pagelet/compproduct/action/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _staticLibJquery = require("jquery");
  
  var _staticLibJquery2 = _interopRequireDefault(_staticLibJquery);
  
  var CompareAction = _reflux2["default"].createActions(["getCompare", "getCompareCmp"]);
  
  CompareAction.getCompare.preEmit = function () {
      var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
      var params = {
          type: 'GET',
          url: SEARCH_HOST + '/ioscompare',
          data: query,
          dataType: 'json'
      };
  
      _staticLibJquery2["default"].ajax(params).always(function (res) {
          CompareAction.getCompareCmp(res);
      });
  };
  
  exports["default"] = CompareAction;
  module.exports = exports["default"];

});
