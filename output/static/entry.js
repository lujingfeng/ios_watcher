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
  
  var _pageletCompproductComponentsIndex = require("pagelet/compproduct/components/index.jsx");
  
  var _pageletCompproductComponentsIndex2 = _interopRequireDefault(_pageletCompproductComponentsIndex);
  
  var _pageletCompproductComponentsCompare = require("pagelet/compproduct/components/compare.jsx");
  
  var _pageletCompproductComponentsCompare2 = _interopRequireDefault(_pageletCompproductComponentsCompare);
  
  var _pageletMyfavComponentsMy_fav_list = require("pagelet/myfav/components/my_fav_list.jsx");
  
  var _pageletMyfavComponentsMy_fav_list2 = _interopRequireDefault(_pageletMyfavComponentsMy_fav_list);
  
  var _pageletWidgetComponentsAso_service = require("pagelet/widget/components/aso_service");
  
  var _pageletWidgetComponentsAso_service2 = _interopRequireDefault(_pageletWidgetComponentsAso_service);
  
  var _pageletWidgetComponentsAbout = require("pagelet/widget/components/about.jsx");
  
  var _pageletWidgetComponentsAbout2 = _interopRequireDefault(_pageletWidgetComponentsAbout);
  
  var _staticMinxinsUtils = require("static/minxins/utils");
  
  //setCookie("uname", "卢景锋", 100000000000000000);
  
  (0, _staticMinxinsUtils.send)({
    type: "entry",
    opra: "pv",
    label: document.referrer
  });
  
  var init = function init() {
    var uname = (0, _staticMinxinsUtils.getCookie)("uname");
    var hash = location.hash;
  
    if (!uname && location.hash.indexOf("myfavlist") > -1) {
      location.href = "/check/login-page?myfav=true";
    }
  };
  init();
  
  window.addEventListener("hashchange", function () {
    init();
  });
  
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
      "//关键词热度排行榜",
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/hotkeywords", component: _pageletHotkeywordComponentsHotkeyword2["default"] }),
      "//竞品分析",
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/comp_analysis", component: _pageletCompproductComponentsIndex2["default"] }),
      "//竞品对比",
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/appcompare", component: _pageletCompproductComponentsCompare2["default"] }),
      "//我的关注",
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/myfavlist", component: _pageletMyfavComponentsMy_fav_list2["default"] }),
      "//ASO优化服务",
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/aso_service", component: _pageletWidgetComponentsAso_service2["default"] }),
      "//关于我们",
      _react2["default"].createElement(_staticLibReactRouter.Route, { path: "/about", component: _pageletWidgetComponentsAbout2["default"] })
    )
  ), document.body);

});
