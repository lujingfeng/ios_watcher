import React from "react";

var MyFavItem = React.createClass({

  getInitialState: function(){
    return {
      data: this.props.data
    }
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.data != this.props.data){
      this.setState({
        data: nextProps.data
      });
    }
  },

  render: function(){
    var data = this.props.data || {};
    var type = this.props.type || "fav";

    return (
      <li className="my-fav-item" onClick={this.props.onClick}>
        <img src={data.icon}/>
        <p className="ellipsis mt6">
          {data.title}
        </p>
        <p className="ellipsis f12 c999">
          {data.developer}
        </p>
        {
          type=="fav" ? (
          <div className="f10 center mt6">
            <i className="icon-vs"></i>
            <p>排名对比</p>
          </div>):null
        }
        {
          type == "fav" ? (
          <i className="icon-myfav">
            <p>已关注</p>
          </i>): null
        }
      </li>
    );
  }
});

export default MyFavItem;