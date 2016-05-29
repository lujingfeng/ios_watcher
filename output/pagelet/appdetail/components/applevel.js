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
  
        history: null,
        cur: null
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
      var cur5 = 0;
      var cur4 = 0;
      var cur3 = 0;
      var cur2 = 0;
      var cur1 = 0;
  
      var history5 = 0;
      var history4 = 0;
      var history3 = 0;
      var history2 = 0;
      var history1 = 0;
  
      if (cur[5]) {
        cur5 = width * cur[5].percentage;
        cur5 = cur5 > 1 ? cur5 : cur5 > 0 ? 1 : 0;
      }
      if (cur[4]) {
        cur4 = width * cur[4].percentage;
        cur4 = cur4 > 1 ? cur4 : cur5 > 0 ? 1 : 0;
      }
      if (cur[3]) {
        cur3 = width * cur[3].percentage;
        cur3 = cur3 > 1 ? cur3 : cur3 > 0 ? 1 : 0;
      }
      if (cur[2]) {
        cur2 = width * cur[2].percentage;
        cur2 = cur2 > 1 ? cur2 : cur2 > 0 ? 1 : 0;
      }
      if (cur[1]) {
        cur1 = width * cur[1].percentage;
        cur1 = cur1 > 1 ? cur1 : cur1 > 0 ? 1 : 0;
      }
  
      if (history[5]) {
        history5 = width * history[5].percentage;
        history5 = history5 > 1 ? history5 : history5 > 0 ? 1 : 0;
      }
      if (history[4]) {
        history4 = width * history[4].percentage;
        history4 = history4 > 1 ? history4 : history4 > 0 ? 1 : 0;
      }
      if (cur[3]) {
        history3 = width * history[3].percentage;
        history3 = history3 > 1 ? history3 : history3 > 0 ? 1 : 0;
      }
      if (history[2]) {
        history2 = width * history[2].percentage;
        history2 = history2 > 1 ? history2 : history2 > 0 ? 1 : 0;
      }
      if (history[1]) {
        history1 = width * history[1].percentage;
        history1 = history1 > 1 ? history1 : history1 > 0 ? 1 : 0;
      }
  
      return _react2["default"].createElement(
        "div",
        { className: "app-detail-level" },
        _react2["default"].createElement(
          "h5",
          { className: "title" },
          _react2["default"].createElement("i", null),
          "应用评级"
        ),
        cur ? _react2["default"].createElement(
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
                { className: "fr mr6" },
                "最后更新时间:",
                cur.updateTime
              ),
              _react2["default"].createElement(
                "p",
                { className: "fl ml6" },
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
                    _react2["default"].createElement("i", {
                      className: "prs",
                      style: { width: cur5 } }),
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
                    _react2["default"].createElement("i", {
                      className: "prs",
                      style: { width: cur4 } }),
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
                    _react2["default"].createElement("i", {
                      className: "prs",
                      style: { width: cur3 } }),
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
                    _react2["default"].createElement("i", {
                      className: "prs",
                      style: { width: cur2 } }),
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
                    _react2["default"].createElement("i", {
                      className: "prs",
                      style: { width: cur1 } }),
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
        ) : _react2["default"].createElement(
          "p",
          { className: "center" },
          "暂无数据"
        ),
        history ? _react2["default"].createElement(
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
                { className: "fr mr6" },
                "最后更新时间:",
                history.updateTime
              ),
              _react2["default"].createElement(
                "p",
                { className: "fl ml6" },
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
                  "评分次数:",
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: history5 } }),
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: history4 } }),
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: history3 } }),
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: history2 } }),
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: history1 } }),
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
        ) : null
      );
    }
  });
  
  exports["default"] = AppLevel;
  module.exports = exports["default"];

});
