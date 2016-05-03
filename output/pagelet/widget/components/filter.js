define('pagelet/widget/components/filter.jsx', function(require, exports, module) {

  /**
    * @require pagelet/widget/filter.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRouter = require("reactRouter");
  
  var Filter = _react2["default"].createClass({
    displayName: "Filter",
  
    mixins: [_reactRouter.History],
    getInitialState: function getInitialState() {
      return {};
    },
  
    onCancel: function onCancel() {
      this.history.goBack();
    },
  
    render: function render() {
  
      return _react2["default"].createElement(
        "div",
        { className: "c-filter" },
        _react2["default"].createElement(
          "div",
          { className: "hdr" },
          "筛选",
          _react2["default"].createElement(
            "i",
            { className: "c999", onClick: this.onCancel },
            "取消"
          )
        ),
        _react2["default"].createElement(
          "h5",
          null,
          "设备"
        ),
        _react2["default"].createElement(
          "ul",
          { className: "f-type clearfix" },
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "iPhone"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "iPad"
            )
          )
        ),
        _react2["default"].createElement(
          "h5",
          null,
          "国家"
        ),
        _react2["default"].createElement(
          "ul",
          { className: "f-type clearfix" },
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "中国"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "香港"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "台湾"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "美国"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "日本"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "韩国"
            )
          )
        ),
        _react2["default"].createElement(
          "h5",
          null,
          "时间"
        ),
        _react2["default"].createElement(
          "ul",
          { className: "f-type clearfix" },
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "今天"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "昨天"
            )
          ),
          _react2["default"].createElement(
            "li",
            { style: { width: "50%" } },
            _react2["default"].createElement(
              "span",
              null,
              "其他"
            )
          )
        ),
        _react2["default"].createElement(
          "h5",
          null,
          "分类"
        ),
        _react2["default"].createElement(
          "ul",
          { className: "f-type clearfix" },
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "全部分类"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "图书"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "商业"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "商品指南"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "教育"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "娱乐"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "财务"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "美食佳饮"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "健康健美"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "儿童"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "生活"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "医疗"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "音乐"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "导航"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "新闻"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "效率"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "参考"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "购物"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "社交"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "体育"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "旅行"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "工作"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "天气"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "摄影录像"
            )
          ),
          _react2["default"].createElement(
            "li",
            { style: { width: "50%" } },
            _react2["default"].createElement(
              "span",
              null,
              "娱乐场游戏"
            ),
            _react2["default"].createElement("i", { className: "unfolder" })
          ),
          _react2["default"].createElement(
            "li",
            { style: { width: "50%" } },
            _react2["default"].createElement(
              "span",
              null,
              "报刊杂志"
            ),
            _react2["default"].createElement("i", { className: "unfolder" })
          )
        ),
        _react2["default"].createElement(
          "ul",
          { className: "f-type clearfix" },
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "全部"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "流行时尚"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "家居园艺"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "span",
              null,
              "户外自然"
            )
          )
        )
      );
    }
  });
  
  exports["default"] = Filter;
  module.exports = exports["default"];

});
