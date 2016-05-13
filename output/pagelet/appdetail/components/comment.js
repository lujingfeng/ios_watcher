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
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
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
        score: 3,
  
        list: []
      };
    },
  
    componentDidMount: function componentDidMount() {
      var score = "";
  
      for (var i = 1; i <= this.state.score; i++) {
        score = score + "," + i;
      }
  
      score = score.slice(1, score.length);
  
      _actionAction2["default"].commentDetail({
        id: this.state.id, //711可用
        duraTime: this.state.duraTime,
        country: this.state.country,
        device: this.state.device,
        bIndex: this.state.bIndex,
        count: this.state.count,
        score: score
      });
  
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      this.setState(state);
    },
  
    render: function render() {
      var list = this.state.list;
  
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
          list.map(function (item, idx) {
            return _react2["default"].createElement(
              "tr",
              null,
              _react2["default"].createElement(
                "td",
                null,
                _react2["default"].createElement(
                  "p",
                  null,
                  item.content
                ),
                _react2["default"].createElement(
                  "div",
                  { className: "c999 f10 mt6" },
                  _react2["default"].createElement(
                    "i",
                    { className: "mr6 t-vt" },
                    item.authorName
                  ),
                  _react2["default"].createElement(
                    "i",
                    { className: "mr6 t-vt" },
                    item.versionName
                  ),
                  _react2["default"].createElement(_pageletWidgetComponentsRank2["default"], { value: parseInt(item.score), width: 14 }),
                  _react2["default"].createElement(
                    "i",
                    { className: "ml6 t-vt" },
                    item.dateTime
                  )
                )
              )
            );
          })
        ),
        this.state.loading ? _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null) : null
      );
    }
  });
  
  exports["default"] = Comment;
  module.exports = exports["default"];

});
