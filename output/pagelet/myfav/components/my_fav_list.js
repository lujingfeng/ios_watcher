define('pagelet/myfav/components/my_fav_list.jsx', function(require, exports, module) {

  /**
    * @require pagelet/myfav/my_fav.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _pageletWidgetComponentsHeader = require("pagelet/widget/components/header.jsx");
  
  var _pageletWidgetComponentsHeader2 = _interopRequireDefault(_pageletWidgetComponentsHeader);
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
  var _pageletWidgetComponentsTabs = require("pagelet/widget/components/tabs.jsx");
  
  var _pageletWidgetComponentsTabs2 = _interopRequireDefault(_pageletWidgetComponentsTabs);
  
  var _pageletWidgetComponentsAppItem = require("pagelet/widget/components/appItem.jsx");
  
  var _pageletWidgetComponentsAppItem2 = _interopRequireDefault(_pageletWidgetComponentsAppItem);
  
  var _actionAction = require("pagelet/myfav/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/myfav/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var MyFav = _react2["default"].createClass({
    displayName: "MyFav",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        list: []
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
      _actionAction2["default"].fetFavLsit();
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      this.setState(state);
    },
  
    render: function render() {
      var query = this.props.location.query || {};
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page my-fav-page" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            filterVisible: false,
            showSideNav: this.props.showSideNav },
          "我的关注"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          this.state.list.map(function (item, idx) {
            return _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { key: idx, data: item, type: 6 });
          })
        )
      );
    }
  });
  
  exports["default"] = MyFav;
  module.exports = exports["default"];

});
