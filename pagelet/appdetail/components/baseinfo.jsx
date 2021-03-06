/**
  * @require ../detail.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";
import {getCookie} from "/static/minxins/utils";

import DetailAction from "../action/action";
import DetailStore from "../store/store";

var BaseInfo = React.createClass({ 
  mixins: [History], 

  getInitialState: function(){
    return {
      isFav: false
    }
  },

  componentDidMount: function(){
    this.unSubscribe = DetailStore.listen(this.onStateChange.bind(this));
    DetailAction.isFav(this.props.query.id);
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    if(state.isEight){
      state.isFav = false;
    }
    this.setState(state);
  },
   
  toCompare: function(){
    this.history.pushState(null, "/comp_analysis", this.props.query);
  },

  onFav: function(){
    if(!getCookie("uname")){
      location.replace("/check/login-page?myfav=true");
      return null;
    }
    var query = this.props.query;
    var isFav = !this.state.isFav;

    this.setState({
      isFav: isFav
    });
    DetailAction.addFav(query.id, isFav?"attention":"cancel");
  },

  render: function(){
    var query = this.props.query;
    var titleWidth = window.innerWidth - 190;

    var favStyle={};
    if(!getCookie("uname")){
      //favStyle.opacity = "0.5";
    }

    return (
      <div className="c-app-base-info">
        <table>
          <tr>
            <td>
              <img 
                src={query.icon}
                className="app-icon"></img>
            </td>
            <td>
              <p className="title ellipsis" style={{width: titleWidth}}>{query.title}</p>
              <p className="f12 c666 ellipsis" style={{width: titleWidth}}>{query.developer}</p>
            </td>
            <td>
              <div className="vs" onClick={this.toCompare}>
                <div className="icon-vs"></div>
                <p className="f12">排名对比</p>
              </div>
            </td>
            <td>
              <div className="fav" onClick={this.onFav} style={favStyle}>
                <div className={"icon-fav " + (this.state.isFav==0?"fav-un":"fav-added")}></div>
                <p className="f12">{this.state.isFav?"取消关注":"添加关注"}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
});

export default BaseInfo;