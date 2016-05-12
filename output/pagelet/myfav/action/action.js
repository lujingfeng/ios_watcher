define('pagelet/myfav/action/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _staticLibJquery = require("jquery");
  
  var _staticLibJquery2 = _interopRequireDefault(_staticLibJquery);
  
  var FavAction = _reflux2["default"].createActions(["fetFavLsit", "fetFavLsitCmp"]);
  
  FavAction.fetFavLsit.preEmit = function () {
    var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/attention/attention-list',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      FavAction.fetFavLsitCmp(res);
    });
  };
  
  exports["default"] = FavAction;
  module.exports = exports["default"];

});
