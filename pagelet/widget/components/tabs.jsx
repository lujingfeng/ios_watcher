/**
  * @require ../tabs.less
  */

import React from "react";

var Tabs = React.createClass({

  getInitialState: function(){
    return {
      index: this.props.tabIndex||0
    }
  },

  componentWillReceiveProps: function(nextProps){
    var state = {};

    if(nextProps.tabIndex != this.props.tabIndex){
      state.index = nextProps.tabIndex;
    }
    this.setState(state);
  },

  onSelect: function(tab, idx){
    this.setState({
      index: idx
    });
    this.props.onSelect && this.props.onSelect(tab, idx);
  },

  render: function(){
    var tabs = this.props.tabs||[];
    var curIndex = this.state.index;
    var width = (100/tabs.length)+"%";

    return (
      <ul className="c-tabs clearfix">
        {
          tabs.map((tab, idx)=>{
            return (
              <li 
                onClick={e=>this.onSelect(tab, idx)} 
                style={{width: width}}
                className={idx===curIndex ? "cur":null}>
                {tab.name}
              </li>)
          })
        }
      </ul>
    );
  }
});

export default Tabs