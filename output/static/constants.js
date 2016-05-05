define('constants', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _deviceTypes;
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var deviceTypes = (_deviceTypes = {}, _defineProperty(_deviceTypes, 0, "iPhone"), _defineProperty(_deviceTypes, 1, "iPad"), _deviceTypes);
  exports.deviceTypes = deviceTypes;

});
