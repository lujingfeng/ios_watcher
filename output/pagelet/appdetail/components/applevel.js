define('pagelet/appdetail/components/applevel.jsx', function(require, exports, module) {

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
  
  var AppLevel = _react2["default"].createClass({
    displayName: "AppLevel",
  
    getInitialState: function getInitialState() {
      var query = this.props.query;
  
      return {
        loading: true,
  
        id: query.id,
        country: _constants.countryCode.CHINA,
        device: _constants.deviceType.IPHONE,
  
        history: {},
        cur: {}
      };
    },
  
    componentDidMount: function componentDidMount() {
      _actionAction2["default"].appLevel({
        id: this.state.id,
        country: this.state.country,
        device: this.state.device
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
      var cur = this.state.cur;
      var history = this.state.history;
      console.log(cur, history);
  
      if (this.state.loading) {
        return _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null);
      }
  
      var width = 100;
  
      return _react2["default"].createElement(
        "div",
        { className: "app-detail-level" },
        _react2["default"].createElement(
          "h5",
          { className: "title" },
          _react2["default"].createElement("i", null),
          "应用评级"
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
              _react2["default"].createElement(
                "p",
                { className: "fr" },
                "最后更新时间：",
                cur.updateTime
              ),
              _react2["default"].createElement(
                "p",
                null,
                "当前版本评分（",
                cur.versionName,
                "）"
              )
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              { className: "clearfix" },
              _react2["default"].createElement(
                "div",
                { className: "left fl" },
                _react2["default"].createElement(
                  "p",
                  { className: "f24 score" },
                  cur.averageScore
                ),
                _react2["default"].createElement(
                  "p",
                  null,
                  _react2["default"].createElement(_pageletWidgetComponentsRank2["default"], { value: parseInt(cur.averageScore), width: 14 })
                ),
                _react2["default"].createElement(
                  "p",
                  { className: "f10" },
                  "评分次数:",
                  cur.totalCount
                )
              ),
              _react2["default"].createElement(
                "div",
                { className: "right fl" },
                _react2["default"].createElement(
                  "ul",
                  null,
                  _react2["default"].createElement(
                    "li",
                    null,
                    _react2["default"].createElement(
                      "span",
                      null,
                      "5星"
                    ),
                    _react2["default"].createElement("i", { className: "prs", style: { width: width * cur[5].percentage } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      cur[5].count
                    )
                  ),
                  _react2["default"].createElement(
                    "li",
                    null,
                    _react2["default"].createElement(
                      "span",
                      null,
                      "4星"
                    ),
                    _react2["default"].createElement("i", { className: "prs", style: { width: width * cur[4].percentage } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      cur[4].count
                    )
                  ),
                  _react2["default"].createElement(
                    "li",
                    null,
                    _react2["default"].createElement(
                      "span",
                      null,
                      "3星"
                    ),
                    _react2["default"].createElement("i", { className: "prs", style: { width: width * cur[3].percentage } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      cur[3].count
                    )
                  ),
                  _react2["default"].createElement(
                    "li",
                    null,
                    _react2["default"].createElement(
                      "span",
                      null,
                      "2星"
                    ),
                    _react2["default"].createElement("i", { className: "prs", style: { width: width * cur[2].percentage } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      cur[2].count
                    )
                  ),
                  _react2["default"].createElement(
                    "li",
                    null,
                    _react2["default"].createElement(
                      "span",
                      null,
                      "1星"
                    ),
                    _react2["default"].createElement("i", { className: "prs", style: { width: width * cur[1].percentage } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      cur[1].count
                    )
                  )
                )
              )
            )
          )
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
              _react2["default"].createElement(
                "p",
                { className: "fr" },
                "最后更新时间:",
                history.updateTime
              ),
              _react2["default"].createElement(
                "p",
                null,
                "历史版本评分"
              )
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              { className: "clearfix" },
              _react2["default"].createElement(
                "div",
                { className: "left fl" },
                _react2["default"].createElement(
                  "p",
                  { className: "f24 score" },
                  history.averageScore
                ),
                _react2["default"].createElement(
                  "p",
                  null,
                  _react2["default"].createElement(_pageletWidgetComponentsRank2["default"], { value: parseInt(history.averageScore), width: 14 })
                ),
                _react2["default"].createElement(
                  "p",
                  { className: "f10" },
                  "评分次数：",
                  history.totalCount
                )
              ),
              _react2["default"].createElement(
                "div",
                { className: "right fl" },
                _react2["default"].createElement(
                  "ul",
                  null,
                  _react2["default"].createElement(
                    "li",
                    null,
                    _react2["default"].createElement(
                      "span",
                      null,
                      "5星"
                    ),
                    _react2["default"].createElement("i", { className: "prs", style: { width: width * history[5].percentage } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      history[5].count
                    )
                  ),
                  _react2["default"].createElement(
                    "li",
                    null,
                    _react2["default"].createElement(
                      "span",
                      null,
                      "4星"
                    ),
                    _react2["default"].createElement("i", { className: "prs", style: { width: width * history[4].percentage } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      history[4].count
                    )
                  ),
                  _react2["default"].createElement(
                    "li",
                    null,
                    _react2["default"].createElement(
                      "span",
                      null,
                      "3星"
                    ),
                    _react2["default"].createElement("i", { className: "prs", style: { width: width * history[3].percentage } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      history[3].count
                    )
                  ),
                  _react2["default"].createElement(
                    "li",
                    null,
                    _react2["default"].createElement(
                      "span",
                      null,
                      "2星"
                    ),
                    _react2["default"].createElement("i", { className: "prs", style: { width: width * history[2].percentage } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      history[2].count
                    )
                  ),
                  _react2["default"].createElement(
                    "li",
                    null,
                    _react2["default"].createElement(
                      "span",
                      null,
                      "1星"
                    ),
                    _react2["default"].createElement("i", { className: "prs", style: { width: width * history[1].percentage } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      history[1].count
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  });
  
  exports["default"] = AppLevel;
  module.exports = exports["default"];

});
