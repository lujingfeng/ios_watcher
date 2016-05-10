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
  
        device: [],
        country: [],
        genres: [],
  
        curSelected: {
          datetime: null,
          days: null,
          country: null,
          device: null,
          category: null
        }
      };
    },
  
    onOk: function onOk() {
      this.props.onOk && this.props.onOk(this.state.curSelected);
      this.history.goBack();
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = FilterStore.listen(this.onStateChange.bind(this));
      Filterction.fetchConfig();
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      this.setState(state);
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
  
    render: function render() {
      var _this = this;
  
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
                return _this.onDevice(item);
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
                return _this.onCountry(item);
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
                  return _this.onDatetime({ name: "今天", value: 1 });
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
                  return _this.onDatetime({ name: "昨天", value: -1 });
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
                style: { width: "50%" }, onClick: this.onOtherDate },
              _react2["default"].createElement(
                "span",
                null,
                "其他"
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
                  return _this.onDays({ name: "今天", value: 1 });
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
                  return _this.onDays({ name: "昨天", value: -1 });
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
                  return _this.onDays({ name: "7日", value: 7 });
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
                  return _this.onDays({ name: "15日", value: 15 });
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
                  return _this.onDays({ name: "30日", value: 30 });
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
                className: curSelected.days && curSelected.days.value == 60 ? "selected" : null,
                onClick: function (e) {
                  return _this.onDays({ name: "60日", value: 60 });
                } },
              _react2["default"].createElement(
                "span",
                null,
                "15日"
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
              var props = {};
              props.onClick = function (e) {
                return _this.onCategory(item);
              };
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
          )
        ) : null,
        _react2["default"].createElement(
          "ul",
          {
            className: "f-type clearfix",
            style: { display: "none" } },
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
          "div",
          { style: { padding: "0 12px" } },
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
