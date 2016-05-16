/**
 * @require ../dialog.less
 */

var React = require("react");
var $ = require("jquery");
var Popup = require("./popup.jsx");

var buttonKeys = {
    OK: "ok",
    CANCEL_OK: "cancel_ok",
    EDIT_CANCEL: "edit_cancel"
};

var Dialog  = React.createClass({
    getInitialState: function(){
        return {
            buttonkey : this.props.buttonkey || buttonKeys.OK,
            visible : false,
            height: "auto"
        };
    },

    show: function(){
        this.setState({visible: true});
    },

    hide: function(){
        this.setState({visible: false});
    },

    onTapMasker: function(){
        this.hide();
    },

    onOk: function(){
        this.hide();
        this.props.onOk && this.props.onOk();
    },

    onCancel: function(){
        this.hide();
        this.props.cancel && this.props.cancel();
    },

    render: function(){
        var footer;

        if(!this.state.visible){
            return null;
        }

        if(this.state.buttonkey == buttonKeys.OK){
          footer = <div className="footer">
                       <button style={{width: "100%"}} onClick={this.onOk}>确定</button>
                     </div>
        }else if(this.state.buttonkey == buttonKeys.CANCEL_OK){
          footer = <div className="footer">
                       <button style={{width: "50%"}} onClick={this.onCancel}>取消</button>
                       <i className="line"></i>
                       <button style={{width: "50%"}} onClick={this.onOk}>{this.props.okText||"确定"}</button>
                     </div>
        }else if(this.state.buttonkey == buttonKeys.EDIT_CANCEL){
          footer = <div className="footer">
                     <button style={{width: "50%"}} onClick={this.onOk}>舍弃</button>
                     <i className="line"></i>
                     <button style={{width: "50%"}} onClick={this.onCancel}>继续填写</button>
                   </div>
        }

        return (
            <Popup onTapMasker={this.onTapMasker} width={280} height={this.state.height} >
               <div className="m-dialog">
                  <div className="title">
                    {this.props.title}
                  </div>
                  <div className="body">
                    {this.props.children}
                  </div>
                  {footer}
               </div>
            </Popup>
        );
    }
});

Dialog.buttonKeys = buttonKeys;

export default Dialog;
