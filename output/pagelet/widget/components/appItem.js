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
  
  var getTouch = function getTouch(e) {
    return e.touches.length ? e.touches[0] : e.targetTouches.length ? e.targetTouches[0] : e.changedTouches[0];
  };
  
  var AppItem = _react2["default"].createClass({
    displayName: "AppItem",
  
    getInitialState: function getInitialState() {
      return {
        type: this.props.type || 1 };
    },
  
    //1: 搜索Item 2:
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (nextProps.type != this.props.type) {
        this.setState({
          type: nextProps.type
        });
      }
      this.setState({ isShowDelete: false });
    },
  
    onClickItem: function onClickItem() {
      this.props.onItemClick && this.props.onItemClick(this.props.data);
    },
  
    onTouchStart: function onTouchStart(e) {
      return false;
      var touch = getTouch(e.nativeEvent);
      this.startX = touch.pageX;
    },
  
    onTouchEnd: function onTouchEnd(e) {
      return;
      var touch = getTouch(e.nativeEvent);
      if (touch.pageX - this.startX > 10) {
        this.setState({
          isShowDelete: true
        });
      } else if (touch.pageX - this.startX < -10) {
        this.setState({
          isShowDelete: false
        });
      }
    },
  
    onDelete: function onDelete(e) {
      e.stopPropagation();
      this.props.onDelete && this.props.onDelete(this.props.data);
    },
  
    render: function render() {
      var data = this.props.data || {};
      var type = this.state.type;
      var state = this.state;
  
      var column2, column3;
      var trProps = {};
  
      //1:搜索Item  3:app关键字覆盖item 5: 对比搜索结果item
      if (type == 1 || type == 3 || type == 5) {
  
        //返回的是字符串
        var score = parseFloat(data.score || 0);
        var _width = 200;
  
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
        } else if (type == 5) {
          column3 = _react2["default"].createElement(
            "td",
            null,
            _react2["default"].createElement(
              "div",
              { className: "f10 center" },
              _react2["default"].createElement("i", { className: "icon-vs" }),
              _react2["default"].createElement(
                "p",
                null,
                "排名对比"
              )
            )
          );
          _width = 160;
        }
  
        column2 = _react2["default"].createElement(
          "td",
          null,
          _react2["default"].createElement(
            "p",
            {
              style: { width: _width },
              className: "title ellipsis" },
            this.props.index + 1,
            "、",
            data.title
          ),
          _react2["default"].createElement(
            "p",
            {
              style: { width: _width },
              className: "f12 c666 m5 mb5 ellipsis" },
            data.developer
          ),
          !this.props.isCompare ? _react2["default"].createElement(
            "div",
            null,
            _react2["default"].createElement(
              "span",
              { className: "t-vt c666 f12 mr6" },
              data.genres
            ),
            _react2["default"].createElement(_pageletWidgetComponentsRank2["default"], { value: score, width: 14 }),
            _react2["default"].createElement(
              "span",
              { className: "c666 f12 ml6 t-vt" },
              data.score
            )
          ) : null
        );
  
        //排名item
      } else if (type == 2) {
          var _width2 = window.innerWidth - 150;
          var topType;
          var rank = data.rank;
  
          if (data.other) {
            var other = data.other.split("|");
            topType = other[0];
            rank = other[1];
          }
  
          column2 = _react2["default"].createElement(
            "td",
            null,
            _react2["default"].createElement(
              "p",
              {
                style: { width: _width2 },
                className: "title ellipsis" },
              this.props.index + 1,
              "、",
              data.title
            ),
            _react2["default"].createElement(
              "p",
              {
                style: { width: _width2 },
                className: "f12 c666 m5 mb5 ellipsis" },
              data.developer
            ),
            _react2["default"].createElement(
              "div",
              null,
              _react2["default"].createElement(
                "span",
                { className: "c666 f12 mr6" },
                data.other ? topType : "当前"
              ),
              _react2["default"].createElement(
                "span",
                { className: "c666 f12 ml6 t-vm" },
                rank == "落榜" ? "落榜" : "第" + rank + "名"
              )
            )
          );
  
          var rankFloat = data.rankfloat;
          var icon = "";
          if (this.props.flag == 1) {
            icon = rankFloat != 0 ? "up" : "";
          } else if (this.props.flag == 2) {
            icon = rankFloat != 0 ? "down" : "";
          } else {
            if (rankFloat > 0) {
              icon = "up";
            } else if (rankFloat < 0) {
              icon = "down";
            }
          }
  
          column3 = _react2["default"].createElement(
            "td",
            { className: "center" },
            _react2["default"].createElement("i", { className: icon }),
            _react2["default"].createElement(
              "i",
              { className: "f12 t-vm" },
              Math.abs(rankFloat) != 0 ? Math.abs(rankFloat) : ""
            )
          );
          //竞品对比参考Item
        } else if (type == 4) {
            var width = 170;
  
            column2 = _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "p",
                {
                  style: { width: width },
                  className: "title ellipsis" },
                data.title
              ),
              _react2["default"].createElement(
                "p",
                {
                  style: { width: width },
                  className: "f12 c666 m5 mb5 ellipsis" },
                data.developer
              )
            );
            column3 = _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "a",
                { className: "f12 c-main s-txt" },
                "已选中"
              )
            );
            //我的关注Item
          } else if (type == 6) {
              //返回的是字符串
              var score = parseFloat(data.score || 0);
              var _width3 = window.innerWidth - 120;
  
              column2 = _react2["default"].createElement(
                "td",
                null,
                _react2["default"].createElement(
                  "p",
                  {
                    style: { width: _width3 },
                    className: "title ellipsis" },
                  data.title
                ),
                _react2["default"].createElement(
                  "p",
                  {
                    style: { width: _width3 },
                    className: "f12 c666 m5 mb5 ellipsis" },
                  data.developer
                ),
                _react2["default"].createElement(
                  "div",
                  { className: "ellipsis", style: { width: _width3 } },
                  _react2["default"].createElement(
                    "span",
                    { className: "t-vt c666 f12 mr6" },
                    data.genres
                  ),
                  _react2["default"].createElement(_pageletWidgetComponentsRank2["default"], { value: score, width: 14 }),
                  _react2["default"].createElement(
                    "span",
                    { className: "c666 f12 ml6 t-vt" },
                    data.score
                  )
                )
              );
  
              trProps.onTouchStart = this.onTouchStart.bind(this);
              trProps.onTouchEnd = this.onTouchEnd.bind(this);
              //app下架列表item
            } else if (type == 7) {
                column2 = _react2["default"].createElement(
                  "td",
                  null,
                  _react2["default"].createElement(
                    "p",
                    {
                      style: { width: 200 },
                      className: "title ellipsis" },
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
                      data.genres
                    ),
                    _react2["default"].createElement(
                      "span",
                      { className: "c666 f12 ml6 t-vt" },
                      data.score
                    )
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
            trProps,
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
        ),
        this.props.isShowDelete ? _react2["default"].createElement("div", { className: "del", onClick: this.onDelete }) : null
      );
    }
  });
  
  exports["default"] = AppItem;
  module.exports = exports["default"];

});
