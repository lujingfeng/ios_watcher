define('pagelet/widget/components/rank.jsx', function(require, exports, module) {

  /**
   * @require pagelet/widget/rank.less
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var Rank = (function (_React$Component) {
    _inherits(Rank, _React$Component);
  
    function Rank(props) {
      _classCallCheck(this, Rank);
  
      _get(Object.getPrototypeOf(Rank.prototype), 'constructor', this).call(this, props);
      this.state = {
        value: this.props.value,
        val: 5
      };
      this.style = {
        rank: {
          display: 'inline-block'
        },
        star: {
          width: this.props.width || '35px'
        }
      };
    }
  
    _createClass(Rank, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.state.value) {
          this.setState({ value: nextProps.value });
        }
      }
    }, {
      key: 'onClickable',
      value: function onClickable(k, e) {
        if (!this.props.onClickable) return false;
  
        this.setState({
          value: k + 1
        }, function () {
          this.props.onCheckStar && this.props.onCheckStar(this.state.value);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this = this;
  
        var _state = this.state;
        var value = _state.value;
        var val = _state.val;
  
        console.log(this.state.value, this.props.width);
  
        return _react2['default'].createElement(
          'div',
          { className: 'rank', style: this.style.rank },
          _react2['default'].createElement(
            'div',
            {
              className: 'already',
              style: { width: this.state.value * this.props.width, height: this.props.width } },
            val ? Array(val).join(',').split(',').map(function (v, k) {
              return _react2['default'].createElement('img', { key: k, style: _this.style.star, onClick: _this.onClickable.bind(_this, k), src: "/static/image/star.png" });
            }) : ''
          ),
          _react2['default'].createElement(
            'div',
            {
              style: { height: this.props.width },
              className: 'notYet' },
            val ? Array(val).join(',').split(',').map(function (v, k) {
              return _react2['default'].createElement('img', { key: k, style: _this.style.star, onClick: _this.onClickable.bind(_this, k), src: "/static/image/star_o.png" });
            }) : ''
          )
        );
      }
    }]);
  
    return Rank;
  })(_react2['default'].Component);
  
  Rank.defaultProps = {
    value: 0
  };
  
  exports['default'] = Rank;
  module.exports = exports['default'];

});
