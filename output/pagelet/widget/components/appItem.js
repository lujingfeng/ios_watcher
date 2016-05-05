define('pagelet/widget/components/appItem.jsx', function(require, exports, module) {

  /**
    * @require pagelet/widget/app_item.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _pageletWidgetComponentsRank = require("pagelet/widget/components/rank.jsx");
  
  var _pageletWidgetComponentsRank2 = _interopRequireDefault(_pageletWidgetComponentsRank);
  
  var AppItem = _react2["default"].createClass({
    displayName: "AppItem",
  
    getInitialState: function getInitialState() {
      return {
        type: this.props.type || 1 //1: 搜索Item 2:
      };
    },
  
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (nextProps.type != this.props.type) {
        this.setState({
          type: nextProps.type
        });
      }
    },
  
    onClickItem: function onClickItem() {
      this.props.onItemClick && this.props.onItemClick(this.props.data);
    },
  
    render: function render() {
      var data = this.props.data || {};
      var type = this.state.type;
  
      var column2, column3;
  
      //搜索Item app关键字覆盖item
      if (type == 1 || type == 3) {
  
        //返回的是字符串
        var score = parseFloat(data.score || 0);
  
        column2 = _react2["default"].createElement(
          "td",
          null,
          _react2["default"].createElement(
            "p",
            {
              style: { width: 200 },
              className: "title ellipsis" },
            this.props.index + 1,
            "、",
            data.title
          ),
          _react2["default"].createElement(
            "p",
            { className: "f12 c666 m5 mb5" },
            data.developer
          ),
          _react2["default"].createElement(
            "div",
            null,
            _react2["default"].createElement(
              "span",
              { className: "t-vt c666 f12 mr6" },
              "应用"
            ),
            _react2["default"].createElement(_pageletWidgetComponentsRank2["default"], { value: score, width: 14 }),
            _react2["default"].createElement(
              "span",
              { className: "c666 f12 ml6 t-vt" },
              data.score
            )
          )
        );
  
        if (type == 3) {
          column3 = _react2["default"].createElement(
            "td",
            null,
            _react2["default"].createElement(
              "div",
              { className: "f10 center" },
              _react2["default"].createElement("i", { className: "icon-q" }),
              "查看"
            )
          );
        }
        //排名item
      } else if (type == 2) {
          column2 = _react2["default"].createElement(
            "td",
            null,
            _react2["default"].createElement(
              "p",
              {
                style: { width: 170 },
                className: "title ellipsis" },
              this.props.index + 1,
              "、",
              data.title
            ),
            _react2["default"].createElement(
              "p",
              { className: "f12 c666 m5 mb5" },
              data.developer
            ),
            _react2["default"].createElement(
              "div",
              null,
              _react2["default"].createElement(
                "span",
                { className: "c666 f12 mr6" },
                "游戏"
              ),
              _react2["default"].createElement(
                "span",
                { className: "c666 f12 ml6 t-vt" },
                "第",
                3,
                "名"
              )
            )
          );
          column3 = _react2["default"].createElement(
            "td",
            null,
            _react2["default"].createElement("i", { className: "up down" }),
            _react2["default"].createElement(
              "i",
              { className: "f12" },
              "01"
            )
          );
        }
  
      return _react2["default"].createElement(
        "li",
        { className: "app-item", onClick: this.onClickItem },
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
                className: "app-icon",
                src: data.icon })
            ),
            column2,
            column3
          )
        )
      );
    }
  });
  
  exports["default"] = AppItem;
  module.exports = exports["default"];

});
