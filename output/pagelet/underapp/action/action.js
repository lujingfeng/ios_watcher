define('pagelet/underapp/action/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _staticLibJquery = require("jquery");
  
  var _staticLibJquery2 = _interopRequireDefault(_staticLibJquery);
  
  var UnderAppAction = _reflux2["default"].createActions(["fetchUnderAppList", "fetchUnderAppListCmp"]);
  
  UnderAppAction.fetchUnderAppList.preEmit = function (query) {
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/offshelve',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      UnderAppAction.fetchUnderAppListCmp(res);
    });
  };
  
  exports["default"] = UnderAppAction;
  module.exports = exports["default"];

});
