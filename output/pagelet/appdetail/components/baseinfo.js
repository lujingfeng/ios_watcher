define('pagelet/appdetail/components/baseinfo.jsx', function(require, exports, module) {

  /**
    * @require pagelet/appdetail/detail.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _actionAction = require("pagelet/appdetail/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/appdetail/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var BaseInfo = _react2["default"].createClass({
    displayName: "BaseInfo",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        isFav: false
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {},
  
    toCompare: function toCompare() {
      this.history.pushState(null, "/comp_analysis", this.props.query);
    },
  
    onFav: function onFav() {
      var query = this.props.query;
      var isFav = !this.state.isFav;
  
      this.setState({
        isFav: isFav
      });
      _actionAction2["default"].addFav(query.appId, isFav ? "attention" : "cancel");
    },
  
    render: function render() {
      var query = this.props.query;
      var titleWidth = window.innerWidth - 180;
  
      return _react2["default"].createElement(
        "div",
        { className: "c-app-base-info" },
        _react2["default"].createElement(
          "table",
          null,
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement("img", {
                src: query.icon,
                className: "app-icon" })
            ),
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "p",
                { className: "title ellipsis", style: { width: titleWidth } },
                query.title
              ),
              _react2["default"].createElement(
                "p",
                { className: "f12 c666" },
                query.developer
              )
            ),
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "div",
                { className: "vs", onClick: this.toCompare },
                _react2["default"].createElement("div", { className: "icon-vs" }),
                _react2["default"].createElement(
                  "p",
                  { className: "f12" },
                  "排名对比"
                )
              )
            ),
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "div",
                { className: "fav", onClick: this.onFav },
                _react2["default"].createElement("div", { className: "icon-fav " + (this.state.isFav == 0 ? "fav-un" : "fav-added") }),
                _react2["default"].createElement(
                  "p",
                  { className: "f12" },
                  this.state.isFav ? "取消关注" : "添加关注"
                )
              )
            )
          )
        )
      );
    }
  });
  
  exports["default"] = BaseInfo;
  module.exports = exports["default"];

});
