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
  
  var AppLevel = _react2["default"].createClass({
    displayName: "AppLevel",
  
    render: function render() {
  
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
                "最后更新时间：2016-10-10"
              ),
              _react2["default"].createElement(
                "p",
                null,
                "当前版本评分（3.2.4）"
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
                  "4.2"
                ),
                _react2["default"].createElement(
                  "p",
                  null,
                  _react2["default"].createElement(_pageletWidgetComponentsRank2["default"], { value: 4.2, width: 14 })
                ),
                _react2["default"].createElement(
                  "p",
                  { className: "f10" },
                  "评分次数:10240"
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: 80 } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      "12321"
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: 50 } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      "12321"
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: 40 } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      "12321"
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: 20 } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      "12321"
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: 10 } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      "12321"
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
                "最后更新时间:2016-10-10"
              ),
              _react2["default"].createElement(
                "p",
                null,
                "历史版本评分（3.2.4）"
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
                  "4.2"
                ),
                _react2["default"].createElement(
                  "p",
                  null,
                  _react2["default"].createElement(_pageletWidgetComponentsRank2["default"], { value: 4.2, width: 14 })
                ),
                _react2["default"].createElement(
                  "p",
                  { className: "f10" },
                  "评分次数：10240"
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: 80 } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      "12321"
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: 50 } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      "12321"
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: 40 } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      "12321"
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: 20 } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      "12321"
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
                    _react2["default"].createElement("i", { className: "prs", style: { width: 10 } }),
                    _react2["default"].createElement(
                      "span",
                      { className: "fr" },
                      "12321"
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
