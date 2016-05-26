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
      var filter = this.props.filter || {};
      var scores = filter.score || [];
  
      scores = scores.map(function (s) {
        return s.value;
      });
  
      scores = scores.join(",");
  
      if (filter.datetime && filter.datetime.year) {
        var date = new Date(filter.datetime.year, filter.datetime.month - 1, filter.datetime.day);
        filter.datetime.value = date.format("yyyy-MM-dd");
        filter.datetime.name = date.format("yyyy-MM-dd");
      }
  
      return {
        loading: true,
  
        id: query.id,
        country: filter.country ? filter.country.value : _constants.countryCode.CHINA,
        duraTime: filter.datetime,
        device: filter.device ? filter.device.value : _constants.deviceType.IPHONE,
        bIndex: 1,
        count: 50,
        score: scores,
  
        list: []
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.fetchList();
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
    },
  
    fetchList: function fetchList() {
      _actionAction2["default"].commentDetail({
        id: this.state.id, //711可用
        duraTime: this.state.duraTime.value,
        country: this.state.country,
        device: this.state.device,
        bIndex: this.state.bIndex,
        count: this.state.count,
        score: this.state.score
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      if (state.list) {
        state.list = this.state.list.concat(state.list);
      }
      this.setState(state);
    },
  
    loadMore: function loadMore() {
      this.setState({
        bIndex: ++this.state.bIndex
      });
    },
  
    render: function render() {
      var list = this.state.list;
      var state = this.state;
      var filter = this.props.filter || {};
      var scores = filter.score || [];
      var name;
  
      var scoreLabel = scores.map(function (s) {
        return s.name;
      });
  
      scoreLabel = scoreLabel.join(",");
  
      return _react2["default"].createElement(
        "div",
        { className: "comment" },
        _react2["default"].createElement(
          "h5",
          { className: "title" },
          _react2["default"].createElement(
            "p",
            { className: "fr f-txt f10" },
            scoreLabel && scores.length == 5 ? "所有评级" : scoreLabel,
            " ",
            this.state.duraTime.name
          ),
          _react2["default"].createElement("i", null),
          "评论详情"
        ),
        list.length ? _react2["default"].createElement(
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
        ) : null,
        !this.state.loading && !list.length ? _react2["default"].createElement(
          "p",
          { className: "center" },
          "暂无数据"
        ) : null,
        this.state.loading ? _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null) : null
      );
    }
  });
  
  exports["default"] = Comment;
  module.exports = exports["default"];

});
