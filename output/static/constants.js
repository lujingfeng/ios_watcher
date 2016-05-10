define('constants', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _deviceTypeStr;
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var deviceTypeStr = (_deviceTypeStr = {}, _defineProperty(_deviceTypeStr, 0, "iPhone"), _defineProperty(_deviceTypeStr, 1, "iPad"), _deviceTypeStr);
  
  exports.deviceTypeStr = deviceTypeStr;
  var countryCode = {
    CHINA: 1,
    AMERICAN: 2
  };
  
  exports.countryCode = countryCode;
  var deviceType = {
    IPHONE: 0,
    IPAD: 1
  };
  
  exports.deviceType = deviceType;
  var deviceStrToint = {
    "iphone": 0,
    "ipad": 1
  };
  
  exports.deviceStrToint = deviceStrToint;
  var payType = {
    FREE: "free",
    FEE: "fee",
    HOT: "hot"
  };
  exports.payType = payType;

});
