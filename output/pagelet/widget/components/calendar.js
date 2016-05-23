define('pagelet/widget/components/calendar.jsx', function(require, exports, module) {

  /**
    * @require pagelet/widget/calendar.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRouter = require("reactRouter");
  
  var Month = _react2["default"].createClass({
    displayName: "Month",
  
    getInitialState: function getInitialState() {
      return {};
    },
  
    daysOfMonth: function daysOfMonth(year, month) {
      var d = new Date(year, month, 0);
      return d.getDate();
    },
  
    onSelect: function onSelect(date) {
      this.props.onSelected(date);
    },
  
    render: function render() {
      var _this = this;
  
      var array = [];
      var days = this.daysOfMonth(this.props.year, this.props.month);
      var date = new Date(this.props.year, this.props.month - 1, 1);
      var week = date.getDay();
      var initialArray = [];
  
      for (var w = 0; w < week; w++) {
        initialArray.push("");
      }
  
      for (var d = 1; d <= days; d++) {
        var time = +new Date(this.props.year, this.props.month - 1, d);
        initialArray.push({
          year: this.props.year,
          month: this.props.month,
          day: d,
          time: time
        });
      }
  
      var row1 = initialArray.slice(0, 7);
      var row2 = initialArray.slice(7, 14);
      var row3 = initialArray.slice(14, 21);
      var row4 = initialArray.slice(21, 28);
      var row5 = initialArray.slice(28, 35);
      var row6 = initialArray.slice(35, initialArray.length);
  
      var curDatetime = this.props.curDatetime;
      var now = Date.now();
  
      if (curDatetime && curDatetime.value == 1) {
        var curDate = new Date();
        curDatetime.year = curDate.getFullYear();
        curDatetime.month = curDate.getMonth() + 1;
        curDatetime.day = curDate.getDate();
      }
  
      if (curDatetime && curDatetime.value == -1) {
        var curDate = new Date();
        curDate.setTime(curDate.getTime() - 24 * 60 * 60 * 1000);
        curDatetime.year = curDate.getFullYear();
        curDatetime.month = curDate.getMonth() + 1;
        curDatetime.day = curDate.getDate();
      }
  
      var thisMonth = new Date(this.props.year, this.props.month - 1);
  
      return _react2["default"].createElement(
        "div",
        { className: "c-month" },
        _react2["default"].createElement(
          "h5",
          null,
          thisMonth.format("yyyy年MM月")
        ),
        _react2["default"].createElement(
          "table",
          null,
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "th",
              null,
              "周日"
            ),
            _react2["default"].createElement(
              "th",
              null,
              "周一"
            ),
            _react2["default"].createElement(
              "th",
              null,
              "周二"
            ),
            _react2["default"].createElement(
              "th",
              null,
              "周三"
            ),
            _react2["default"].createElement(
              "th",
              null,
              "周四"
            ),
            _react2["default"].createElement(
              "th",
              null,
              "周五"
            ),
            _react2["default"].createElement(
              "th",
              null,
              "周六"
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            row1.map(function (item, idx) {
              var props = {};
  
              if (curDatetime && typeof curDatetime.year != "undefined" && curDatetime.year == item.year && curDatetime.month == item.month && curDatetime.day == item.day) {
                props.className = "selected";
                props.id = "curDatetime";
              }
  
              if (item.time > now) {
                props.className = " disabled";
              } else {
                props.onClick = function (e) {
                  _this.onSelect(item);
                };
              }
              return _react2["default"].createElement(
                "td",
                props,
                item.day || ""
              );
            })
          ),
          _react2["default"].createElement(
            "tr",
            null,
            row2.map(function (item, idx) {
              var props = {};
  
              if (curDatetime && typeof curDatetime.year != "undefined" && curDatetime.year == item.year && curDatetime.month == item.month && curDatetime.day == item.day) {
                props.className = "selected";
                props.id = "curDatetime";
              }
  
              if (item.time > now) {
                props.className = " disabled";
              } else {
                props.onClick = function (e) {
                  _this.onSelect(item);
                };
              }
              return _react2["default"].createElement(
                "td",
                props,
                item.day || ""
              );
            })
          ),
          _react2["default"].createElement(
            "tr",
            null,
            row3.map(function (item, idx) {
              var props = {};
  
              if (curDatetime && typeof curDatetime.year != "undefined" && curDatetime.year == item.year && curDatetime.month == item.month && curDatetime.day == item.day) {
                props.className = "selected";
                props.id = "curDatetime";
              }
  
              if (item.time > now) {
                props.className = " disabled";
              } else {
                props.onClick = function (e) {
                  _this.onSelect(item);
                };
              }
  
              return _react2["default"].createElement(
                "td",
                props,
                item.day || ""
              );
            })
          ),
          _react2["default"].createElement(
            "tr",
            null,
            row4.map(function (item, idx) {
              var props = {};
  
              if (curDatetime && typeof curDatetime.year != "undefined" && curDatetime.year == item.year && curDatetime.month == item.month && curDatetime.day == item.day) {
                props.className = "selected";
                props.id = "curDatetime";
              }
  
              if (item.time > now) {
                props.className = " disabled";
              } else {
                props.onClick = function (e) {
                  _this.onSelect(item);
                };
              }
  
              return _react2["default"].createElement(
                "td",
                props,
                item.day || ""
              );
            })
          ),
          _react2["default"].createElement(
            "tr",
            null,
            row5.map(function (item, idx) {
              var props = {};
  
              if (curDatetime && typeof curDatetime.year != "undefined" && curDatetime.year == item.year && curDatetime.month == item.month && curDatetime.day == item.day) {
                props.className = "selected";
                props.id = "curDatetime";
              }
  
              if (item.time > now) {
                props.className = " disabled";
              } else {
                props.onClick = function (e) {
                  _this.onSelect(item);
                };
              }
  
              return _react2["default"].createElement(
                "td",
                props,
                item.day || ""
              );
            })
          ),
          _react2["default"].createElement(
            "tr",
            null,
            row6.map(function (item, idx) {
              var props = {};
  
              if (curDatetime && typeof curDatetime.year != "undefined" && curDatetime.year == item.year && curDatetime.month == item.month && curDatetime.day == item.day) {
                props.className = "selected";
                props.id = "curDatetime";
              }
  
              if (item.time > now) {
                props.className = " disabled";
              } else {
                props.onClick = function (e) {
                  _this.onSelect(item);
                };
              }
              return _react2["default"].createElement(
                "td",
                props,
                item.day || ""
              );
            })
          )
        )
      );
    }
  });
  
  var Calendar = _react2["default"].createClass({
    displayName: "Calendar",
  
    mixins: [_reactRouter.History],
  
    getInitialState: function getInitialState() {
      return {};
    },
  
    componentDidMount: function componentDidMount() {
      var month = document.querySelector("#curDatetime");
      month && month.scrollIntoView();
    },
  
    onCancel: function onCancel() {
      this.props.cancel && this.props.cancel();
    },
  
    render: function render() {
      var today = new Date();
      var thisYear = today.getFullYear();
      var months = [];
  
      for (var startYear = 2014; startYear < thisYear; startYear++) {
        for (var m = 1; m <= 12; m++) {
          months.push(_react2["default"].createElement(Month, {
            year: startYear,
            month: m,
            curDatetime: this.props.curDatetime,
            onSelected: this.props.onSelected }));
        }
      }
  
      var curMonth = today.getMonth() + 1;
      for (var i = 1; i <= curMonth; i++) {
        months.push(_react2["default"].createElement(Month, {
          year: thisYear,
          month: i,
          curDatetime: this.props.curDatetime,
          onSelected: this.props.onSelected }));
      }
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page c-calendar" },
        _react2["default"].createElement(
          "div",
          { className: "hdr" },
          "选择时间",
          _react2["default"].createElement(
            "i",
            { onClick: this.onCancel },
            "取消"
          )
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body", ref: "list" },
          months
        )
      );
    }
  });
  
  exports["default"] = Calendar;
  module.exports = exports["default"];

});
