define('constants', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _deviceTypeStr, _countryToCode, _countryCode2Str, _days2Str;
  
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
  var payTypeToStr = {
    free: "免费",
    fee: "付费",
    hot: "畅销"
  };
  
  exports.payTypeToStr = payTypeToStr;
  var countryToCode = (_countryToCode = {}, _defineProperty(_countryToCode, "中国", 1), _defineProperty(_countryToCode, "美国", 2), _defineProperty(_countryToCode, "香港", 3), _defineProperty(_countryToCode, "台湾", 4), _defineProperty(_countryToCode, "日本", 5), _defineProperty(_countryToCode, "韩国", 6), _countryToCode);
  
  exports.countryToCode = countryToCode;
  var countryCode2Str = (_countryCode2Str = {}, _defineProperty(_countryCode2Str, "1", "中国"), _defineProperty(_countryCode2Str, "2", "美国"), _defineProperty(_countryCode2Str, "3", "香港"), _defineProperty(_countryCode2Str, "4", "台湾"), _defineProperty(_countryCode2Str, "5", "日本"), _defineProperty(_countryCode2Str, "6", "韩国"), _countryCode2Str);
  
  exports.countryCode2Str = countryCode2Str;
  var days2Str = (_days2Str = {}, _defineProperty(_days2Str, "1", "今天"), _defineProperty(_days2Str, "-1", "昨天"), _defineProperty(_days2Str, "7", "7日"), _defineProperty(_days2Str, "15", "15日"), _defineProperty(_days2Str, "30", "30日"), _defineProperty(_days2Str, "60", "60日"), _days2Str);
  exports.days2Str = days2Str;

});
