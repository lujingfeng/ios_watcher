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
  
  var _calendar = require("pagelet/widget/components/calendar.jsx");
  
  var _calendar2 = _interopRequireDefault(_calendar);
  
  var _loading = require("pagelet/widget/components/loading.jsx");
  
  var _loading2 = _interopRequireDefault(_loading);
  
  var _constants = require("constants");
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _staticLibJquery = require("jquery");
  
  var _staticLibJquery2 = _interopRequireDefault(_staticLibJquery);
  
  var Filterction = _reflux2["default"].createActions(["fetchConfig", "fetchConfigCmp"]);
  
  Filterction.fetchConfig.preEmit = function (query) {
    var params = {
      type: 'GET',
      url: SEARCH_HOST + '/configlist',
      data: query,
      dataType: 'json'
    };
  
    _staticLibJquery2["default"].ajax(params).always(function (res) {
      Filterction.fetchConfigCmp(res);
    });
  };
  
  var FilterStore = _reflux2["default"].createStore({
    init: function init() {
      this.listenTo(Filterction.fetchConfig, this.loading);
      this.listenTo(Filterction.fetchConfigCmp, this.fetchConfigCmp);
    },
  
    loading: function loading() {
      this.trigger({
        loading: true
      });
    },
  
    fetchConfigCmp: function fetchConfigCmp(config) {
      config && (config.loading = false);
      this.trigger(config);
    }
  });
  
  var Filter = _react2["default"].createClass({
    displayName: "Filter",
  
    mixins: [_reactRouter.History],
    getInitialState: function getInitialState() {
      return {
        loading: true,
        showCalendar: false,
        score: [{ name: "1星", value: 1 }, { name: "2星", value: 2 }, { name: "3星", value: 3 }, { name: "4星", value: 4 }, { name: "5星", value: 5 }],
  
        device: [],
        country: [],
        genres: [],
  
        subGenres: [],
  
        curSelected: {
          datetime: this.props.datetimeValue || null,
          days: this.props.daysValue || null,
          country: this.props.countryValue || null,
          device: this.props.deviceValue || null,
          category: this.props.categoryValue || null,
          pay: this.props.payValue || null,
          score: this.props.scoreValue || []
        }
      };
    },
  
    onOk: function onOk() {
      this.props.onOk && this.props.onOk(this.state.curSelected);
      if (this.props.location) {
        var pathname = this.props.location.pathname;
        var query = this.props.location.query;
        delete query.filter;
        query = _staticLibJquery2["default"].extend(query, this.state.curSelected);
  
        this.history.replaceState(null, pathname, query);
      } else {
        this.history.goBack();
      }
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = FilterStore.listen(this.onStateChange.bind(this));
      Filterction.fetchConfig();
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      var _this = this;
  
      var callback = function callback() {
        if (state.device) {
          var root = _this.refs.root;
          var height = (0, _staticLibJquery2["default"])(root).outerHeight();
          if (window.innerHeight < height) {
            _this.setState({
              okStatus: 1
            });
          }
        }
      };
  
      this.setState(state, callback);
    },
  
    onCancel: function onCancel() {
      this.history.goBack();
    },
  
    onOtherDate: function onOtherDate() {
      this.setState({
        showCalendar: true
      });
    },
  
    onCanlendarCancel: function onCanlendarCancel() {
      this.setState({
        showCalendar: false
      });
    },
  
    onCalendarSelect: function onCalendarSelect(datetime) {
      this.setState({
        showCalendar: false
      });
      var curSelected = this.state.curSelected;
      curSelected.datetime = datetime;
  
      if (datetime.year && this.props.datetime) {
        var d = new Date();
        var prevDate = new Date(d.getTime() - 24 * 60 * 60 * 1000);
  
        if (datetime.year == d.getFullYear() && datetime.month == d.getMonth() + 1 && datetime.day == d.getDate()) {
          delete datetime.month;
          delete datetime.day;
          delete datetime.year;
  
          datetime.value = 1;
          datetime.name = _constants.days2Str[datetime.value];
        } else if (datetime.year == prevDate.getFullYear() && datetime.month == prevDate.getMonth() + 1 && datetime.day == prevDate.getDate()) {
          delete datetime.month;
          delete datetime.day;
          delete datetime.year;
          datetime.value = -1;
          datetime.name = _constants.days2Str[datetime.value];
        } else {
          datetime.value = datetime.year + "-" + datetime.month + "-" + datetime.day;
          datetime.name = datetime.value;
        }
      }
  
      this.setState({ curSelected: curSelected });
    },
  
    onDevice: function onDevice(device) {
      var curSelected = this.state.curSelected;
      curSelected.device = device;
      this.setState({ curSelected: curSelected });
    },
  
    onCountry: function onCountry(country) {
      var curSelected = this.state.curSelected;
      curSelected.country = country;
      this.setState({ curSelected: curSelected });
    },
  
    onDatetime: function onDatetime(datetime) {
      var curSelected = this.state.curSelected;
      curSelected.datetime = datetime;
      this.setState({ curSelected: curSelected });
    },
  
    onDays: function onDays(days) {
      var curSelected = this.state.curSelected;
      curSelected.days = days;
      this.setState({ curSelected: curSelected });
    },
  
    onCategory: function onCategory(category) {
      var curSelected = this.state.curSelected;
      curSelected.category = category;
      this.setState({ curSelected: curSelected });
    },
  
    onPay: function onPay(payMethod) {
      var curSelected = this.state.curSelected;
      curSelected.pay = payMethod;
      this.setState({ curSelected: curSelected });
    },
  
    onScore: function onScore(score) {
      var curSelected = this.state.curSelected;
      var existedItem = curSelected.score.filter(function (item) {
        if (score.value == item.value) {
          return item;
        }
      })[0] || null;
  
      if (existedItem) {
        //curSelected.score.splice(curSelected.score.indexOf(existedItem), 1);
      } else {}
      curSelected.score = [score];
      this.setState({ curSelected: curSelected });
    },
  
    clearScore: function clearScore() {
      var curSelected = this.state.curSelected;
      if (curSelected.score.length == 5) {
        curSelected.score = [];
      } else {
        curSelected.score = [];
        this.state.score.forEach(function (item) {
          curSelected.score.push({
            name: item.name,
            value: item.value
          });
        });
      }
      this.setState({
        curSelected: curSelected
      });
    },
  
    render: function render() {
      var _this2 = this;
  
      if (this.state.loading) {
        return _react2["default"].createElement(_loading2["default"], null);
      }
      if (this.state.showCalendar) {
        return _react2["default"].createElement(_calendar2["default"], {
          curDatetime: this.state.curSelected.datetime,
          onSelected: this.onCalendarSelect,
          cancel: this.onCanlendarCancel });
      }
  
      var state = this.state;
      var curSelected = state.curSelected;
  
      var showDevice = !!this.props.device;
      var showCountry = !!this.props.country;
      var showDateTime = !!this.props.datetime;
      var showDays = !!this.props.days;
      var showCategory = !!this.props.category;
      var showPayMethod = !!this.props.showPayMethod;
      var showScore = !!this.props.score;
      var showDateDay = !!this.props.showDateDay;
  
      var otherLabel;
      var datetime = curSelected.datetime;
  
      if (datetime && datetime.value != 1 && datetime.value != -1 && datetime.value != 7 && datetime.value != 15 && datetime.value != 30 && datetime.value != 60) {
        var d = new Date(datetime.year, datetime.month - 1, datetime.day);
        otherLabel = d.format("yyyy-MM-dd");
      }
  
      var okStyle = {
        padding: "0 12px",
        position: "fixed",
        width: "100%",
        bottom: 0,
        background: "#fff"
      };
  
      if (this.state.okStatus == 1) {
        okStyle.position = "relative";
        okStyle.bottom = "auto";
      }
  
      return _react2["default"].createElement(
        "div",
        { className: "c-filter", ref: "root" },
        _react2["default"].createElement(
          "div",
          { className: "hdr" },
          "筛选",
          _react2["default"].createElement(
            "i",
            { onClick: this.onCancel },
            "取消"
          )
        ),
        showDevice && state.device.length ? _react2["default"].createElement(
          "div",
          null,
          _react2["default"].createElement(
            "h5",
            null,
            "设备"
          ),
          _react2["default"].createElement(
            "ul",
            { className: "f-type clearfix" },
            state.device.map(function (item, idx) {
              var props = {};
              props.onClick = function (e) {
                return _this2.onDevice(item);
              };
              if (curSelected.device && curSelected.device.value == item.value) {
                props.className = "selected";
              }
              return _react2["default"].createElement(
                "li",
                props,
                _react2["default"].createElement(
                  "span",
                  null,
                  item.name
                )
              );
            })
          )
        ) : null,
        showScore && state.score.length ? _react2["default"].createElement(
          "div",
          null,
          _react2["default"].createElement(
            "h5",
            null,
            "评级"
          ),
          _react2["default"].createElement(
            "ul",
            { className: "f-type clearfix" },
            _react2["default"].createElement(
              "li",
              {
                onClick: this.clearScore,
                className: curSelected.score.length == 5 ? "selected" : "" },
              _react2["default"].createElement(
                "span",
                null,
                "全部"
              )
            ),
            state.score.map(function (item, idx) {
              var props = {};
              props.onClick = function (e) {
                return _this2.onScore(item);
              };
  
              var existedItem = curSelected.score.filter(function (score) {
                if (score.value == item.value) {
                  return item;
                }
              })[0] || null;
  
              if (existedItem && curSelected.score.length != 5) {
                props.className = "selected";
              }
              return _react2["default"].createElement(
                "li",
                props,
                _react2["default"].createElement(
                  "span",
                  null,
                  item.name
                )
              );
            })
          )
        ) : null,
        showPayMethod ? _react2["default"].createElement(
          "div",
          null,
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
              {
                className: curSelected.pay && curSelected.pay.value == _constants.payType.FREE ? "selected" : null,
                onClick: function (e) {
                  return _this2.onPay({ name: "免费", value: _constants.payType.FREE });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "免费"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.pay && curSelected.pay.value == _constants.payType.FEE ? "selected" : null,
                onClick: function (e) {
                  return _this2.onPay({ name: "付费", value: _constants.payType.FEE });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "付费"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.pay && curSelected.pay.value == _constants.payType.HOT ? "selected" : null,
                onClick: function (e) {
                  return _this2.onPay({ name: "畅销", value: _constants.payType.HOT });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "畅销"
              )
            )
          )
        ) : null,
        showCountry && state.country.length ? _react2["default"].createElement(
          "div",
          null,
          _react2["default"].createElement(
            "h5",
            null,
            "国家"
          ),
          _react2["default"].createElement(
            "ul",
            { className: "f-type clearfix" },
            state.country.map(function (item, idx) {
              var props = {};
              props.onClick = function (e) {
                return _this2.onCountry(item);
              };
              if (curSelected.country && curSelected.country.value == item.value) {
                props.className = "selected";
              }
              return _react2["default"].createElement(
                "li",
                props,
                _react2["default"].createElement(
                  "span",
                  null,
                  item.name
                )
              );
            })
          )
        ) : null,
        showDateTime ? _react2["default"].createElement(
          "div",
          null,
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
              {
                className: curSelected.datetime && curSelected.datetime.value == 1 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDatetime({ name: "今天", value: 1 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "今天"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.datetime && curSelected.datetime.value == -1 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDatetime({ name: "昨天", value: -1 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "昨天"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: otherLabel ? "selected" : "",
                style: { width: "50%" }, onClick: this.onOtherDate },
              _react2["default"].createElement(
                "span",
                null,
                otherLabel || "其他"
              )
            )
          )
        ) : null,
        showDays ? _react2["default"].createElement(
          "div",
          null,
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
              {
                className: curSelected.days && curSelected.days.value == 1 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDays({ name: "今天", value: 1 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "今天"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.days && curSelected.days.value == -1 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDays({ name: "昨天", value: -1 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "昨天"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.days && curSelected.days.value == 7 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDays({ name: "7日", value: 7 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "7日"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.days && curSelected.days.value == 15 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDays({ name: "15日", value: 15 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "15日"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.days && curSelected.days.value == 30 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDays({ name: "30日", value: 30 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "30日"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.days && curSelected.days.value == 60 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDays({ name: "60日", value: 60 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "60日"
              )
            )
          )
        ) : null,
        showDateDay ? _react2["default"].createElement(
          "div",
          null,
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
              {
                className: curSelected.datetime && curSelected.datetime.value == 7 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDatetime({ name: "7日", value: 7 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "7日"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.datetime && curSelected.datetime.value == 15 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDatetime({ name: "15日", value: 15 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "15日"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.datetime && curSelected.datetime.value == 30 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDatetime({ name: "30日", value: 30 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "30日"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: curSelected.datetime && curSelected.datetime.value == 60 ? "selected" : null,
                onClick: function (e) {
                  return _this2.onDatetime({ name: "60日", value: 60 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "60日"
              )
            ),
            _react2["default"].createElement(
              "li",
              {
                className: otherLabel ? "selected" : "",
                style: { width: "50%" }, onClick: this.onOtherDate },
              _react2["default"].createElement(
                "span",
                null,
                otherLabel || "其他"
              )
            )
          )
        ) : null,
        showCategory && state.genres.length ? _react2["default"].createElement(
          "div",
          null,
          _react2["default"].createElement(
            "h5",
            null,
            "分类"
          ),
          _react2["default"].createElement(
            "ul",
            { className: "f-type clearfix" },
            state.genres.map(function (item, idx) {
              var props = { style: {} };
              props.onClick = function (e) {
                return _this2.onCategory(item);
              };
              if (curSelected.category && curSelected.category.value == item.value) {
                props.className = "selected";
              }
              if (item.value == 25 || item.value == 26) {
                return null;
              }
  
              return _react2["default"].createElement(
                "li",
                props,
                _react2["default"].createElement(
                  "span",
                  null,
                  item.name
                ),
                item.value == 25 ? _react2["default"].createElement("i", { className: _this2.state.subGenres == item.data ? "unfolder" : "unfolder fd", style: { right: 50 } }) : null,
                item.value == 26 ? _react2["default"].createElement("i", { className: _this2.state.subGenres == item.data ? "unfolder" : "unfolder fd", style: { right: 39 } }) : null
              );
            })
          )
        ) : null,
        showCategory ? _react2["default"].createElement(
          "ul",
          {
            className: "f-type clearfix" },
          state.genres.map(function (item, idx) {
            var props = { style: {} };
            var name = item.name;
  
            if (curSelected.category && curSelected.category.value == item.value) {
              props.className = "selected";
            }
  
            if (item.value == 25 || item.value == 26) {
  
              props.style.width = "50%";
  
              props.onClick = function () {
                var data = _this2.state.subGenres == item.data ? [] : item.data;
  
                _this2.setState({
                  subGenres: data
                });
              };
  
              item.data.filter(function (subItem, idx) {
                if (_this2.state.subGenres != item.data && curSelected.category && subItem.value == curSelected.category.value) {
                  props.className = "selected";
                  if (curSelected.category.value != "250" && curSelected.category.value != "260") {
                    name = curSelected.category.name;
                  }
                }
              });
            } else {
              return null;
            }
  
            return _react2["default"].createElement(
              "li",
              props,
              _react2["default"].createElement(
                "span",
                null,
                name,
                item.value == 25 ? _react2["default"].createElement("i", { className: _this2.state.subGenres == item.data ? "unfolder" : "unfolder fd", style: { right: 50 } }) : null,
                item.value == 26 ? _react2["default"].createElement("i", { className: _this2.state.subGenres == item.data ? "unfolder" : "unfolder fd", style: { right: 39 } }) : null
              )
            );
          })
        ) : null,
        _react2["default"].createElement(
          "ul",
          {
            style: { marginBottom: this.state.okStatus == 1 ? 0 : 60 },
            className: "f-type clearfix" },
          this.state.subGenres.map(function (item, idx) {
            var props = {};
            props.onClick = function (e) {
              return _this2.onCategory(item);
            };
            console.log(curSelected.category.value, item.value);
            if (curSelected.category && curSelected.category.value == item.value) {
              props.className = "selected";
            }
            return _react2["default"].createElement(
              "li",
              props,
              _react2["default"].createElement(
                "span",
                null,
                item.name
              )
            );
          })
        ),
        _react2["default"].createElement(
          "div",
          { style: okStyle },
          _react2["default"].createElement(
            "button",
            {
              onClick: this.onOk,
              style: { width: "100%" },
              className: "btn main-btn mt12 mb12" },
            "确定"
          )
        )
      );
    }
  });
  
  exports["default"] = Filter;
  module.exports = exports["default"];

});
