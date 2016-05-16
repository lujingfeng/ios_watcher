/**
 * @require ../popup.less
 */

var React = require("react");
var $ = require("jquery");

var Popup  = React.createClass({
    getInitialState: function(){
        return {};
    },

    componentDidMount: function(){

    },

    onTapMasker: function(e){
        if(this.getDOMNode() == e.target){
            this.props.onTapMasker && this.props.onTapMasker();
        }
    },

    render: function(){
        var w = this.props.width || 250;
        var h = this.props.height || 100;

        var popupStyle = {
            width: w,
            height: h
        };

        return (
            <div className="m-mask m-popup-mask" onClick={this.onTapMasker}>
              <div className="m-pupop" style={popupStyle}>
                 {this.props.children}
              </div>
            </div>
        );
    }
});

export default Popup;