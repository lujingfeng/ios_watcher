define('pagelet/appdetail/components/comment.jsx', function(require, exports, module) {

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
  
  var _pageletWidgetComponentsRank = require("pagelet/widget/components/rank.jsx");
  
  var _pageletWidgetComponentsRank2 = _interopRequireDefault(_pageletWidgetComponentsRank);
  
  var _actionAction = require("pagelet/appdetail/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/appdetail/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var _constants = require("constants");
  
  var Comment = _react2["default"].createClass({
    displayName: "Comment",
  
    getInitialState: function getInitialState() {
      var query = this.props.query;
  
      return {
        id: query.id,
        country: _constants.countryCode.CHINA,
        duraTime: 1,
        device: _constants.deviceType.IPHONE,
        bIndex: 1,
        count: 20,
        score: 3
      };
    },
  
    componentDidMount: function componentDidMount() {
  
      _actionAction2["default"].commentDetail({
        id: this.state.id,
        duraTime: this.state.duraTime,
        country: this.state.country,
        device: this.state.device,
        bIndex: this.state.bIndex,
        count: this.state.count,
        score: this.state.score
      });
    },
    render: function render() {
  
      return _react2["default"].createElement(
        "div",
        { className: "comment" },
        _react2["default"].createElement(
          "h5",
          { className: "title" },
          _react2["default"].createElement(
            "p",
            { className: "fr f-txt f10 c999" },
            "所有评级, 7天"
          ),
          _react2["default"].createElement("i", null),
          "评论详情"
        ),
        _react2["default"].createElement(
          "table",
          { className: "border" },
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "th",
              null,
              "评论内容"
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "p",
                null,
                "发撒旦发神经大夫isf打龙卷风离开 圣诞快乐解放路四大皆空发就是垃圾 啊放假看i维京人历史地看福建省里卡 多发觉就就解决了发   辅导书"
              ),
              _react2["default"].createElement(
                "div",
                { className: "c999 f10 mt6" },
                _react2["default"].createElement(
                  "i",
                  { className: "mr6 t-vt" },
                  "聚灵天下"
                ),
                _react2["default"].createElement(
                  "i",
                  { className: "mr6 t-vt" },
                  "v1.2.0"
                ),
                _react2["default"].createElement(_pageletWidgetComponentsRank2["default"], { value: 2.5, width: 14 }),
                _react2["default"].createElement(
                  "i",
                  { className: "ml6 t-vt" },
                  "2016-02-29"
                )
              )
            )
          )
        )
      );
    }
  });
  
  exports["default"] = Comment;
  module.exports = exports["default"];

});
