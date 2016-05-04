define('static/entry.jsx', function(require, exports, module) {

  "use strict";
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _staticLibJquery = require("jquery");
  
  var _staticLibJquery2 = _interopRequireDefault(_staticLibJquery);
  
  var _pageletMainComponentsMain = require("pagelet/main/components/main.jsx");
  
  var _pageletMainComponentsMain2 = _interopRequireDefault(_pageletMainComponentsMain);
  
  var _pageletSearchComponentsIndex = require("pagelet/search/components/index.jsx");
  
  var _pageletSearchComponentsIndex2 = _interopRequireDefault(_pageletSearchComponentsIndex);
  
  var _pageletSearchComponentsSearch_input = require("pagelet/search/components/search_input.jsx");
  
  var _pageletSearchComponentsSearch_input2 = _interopRequireDefault(_pageletSearchComponentsSearch_input);
  
  var _pageletAppdetailComponentsDetail = require("pagelet/appdetail/components/detail.jsx");
  
  var _pageletAppdetailComponentsDetail2 = _interopRequireDefault(_pageletAppdetailComponentsDetail);
  
  var _pageletTopComponentsTopList = require("pagelet/top/components/topList.jsx");
  
  var _pageletTopComponentsTopList2 = _interopRequireDefault(_pageletTopComponentsTopList);
  
  var _pageletTopComponentsTop7UpList = require("pagelet/top/components/top7UpList.jsx");
  
  var _pageletTopComponentsTop7UpList2 = _interopRequireDefault(_pageletTopComponentsTop7UpList);
  
  var _pageletTopComponentsTop7DownList = require("pagelet/top/components/top7DownList.jsx");
  
  var _pageletTopComponentsTop7DownList2 = _interopRequireDefault(_pageletTopComponentsTop7DownList);
  
  var _pageletUnderappComponentsUnderapp = require("pagelet/underapp/components/underapp.jsx");
  
  var _pageletUnderappComponentsUnderapp2 = _interopRequireDefault(_pageletUnderappComponentsUnderapp);
  
  var _pageletHotkeywordComponentsHotkeyword = require("pagelet/hotkeyword/components/hotkeyword.jsx");
  
  var _pageletHotkeywordComponentsHotkeyword2 = _interopRequireDefault(_pageletHotkeywordComponentsHotkeyword);
  
  _staticLibJquery2["default"].ajaxSetup({
    cache: false //关闭AJAX缓存
  });
  
  _react2["default"].initTapEventPlugin();
  
  _react2["default"].render(_react2["default"].createElement(
    _staticLibReactRouter.Router,
    null,
    _react2["default"].createElement(
      _staticLibReactRouter.Route,
      { path: "/", component: _pageletMainComponentsMain2["default"] },
      _react2["default"].createElement(_staticLibReactRouter.Route, { name: "defaultSearch", path: "/search", component: _pageletSearchComponentsIndex2["default"] }),
      _react2["default"].createElement(_staticLibReactRouter.Route, { name: "inputSearch", path: "/search/input", component: _pageletSearchComponentsSearch_input2["default"] }),
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/detail/:module", component: _pageletAppdetailComponentsDetail2["default"] }),
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/toplist", component: _pageletTopComponentsTopList2["default"] }),
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/top7uplist", component: _pageletTopComponentsTop7UpList2["default"] }),
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/top7Downlist", component: _pageletTopComponentsTop7DownList2["default"] }),
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/under_app_monitor", component: _pageletUnderappComponentsUnderapp2["default"] }),
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/hotkeywords", component: _pageletHotkeywordComponentsHotkeyword2["default"] })
    )
  ), document.body);

});
