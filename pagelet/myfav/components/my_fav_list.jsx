/**
  * @require ../my_fav.less
  */

import React from "react";
import {History} from "/static/lib/reactRouter";
import $ from "jquery";

import Header from "/pagelet/widget/components/header";
import Loading from "/pagelet/widget/components/loading";
import Tabs from "/pagelet/widget/components/tabs";
import AppItem from "/pagelet/widget/components/appItem";
import Popup from "./pagelet/widget/components/popup";
import {getCookie} from "/static/minxins/utils";
import {countryCode, deviceStrToint, countryToCode} from "constants";

import DetailAction from "/pagelet/appdetail/action/action";
import DetailStore from "/pagelet/appdetail/store/store";

import FavAction from "../action/action";
import FavStore from "../store/store";

var MyFav = React.createClass({ 
  mixins: [History],

  getInitialState: function(){
    return {
      loading: true,
      confirmVisible: false,
      list:[]
    }
  },

  componentDidMount: function(){
    this.unSubscribe = FavStore.listen(this.onStateChange.bind(this));
    FavAction.fetFavLsit();
  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    this.setState(state);
  },

  onDelete: function(data){
    data.id = data.infoId||data.id;
    var id = data.id || data.appId;

    DetailAction.addFav(id, "cancel");
    var app = this.state.list.filter((item, idx)=>{
      item.id = item.id || item.appId;
      if(item.id == id){
        return item;
      }
    })[0]|| null;
    if(app){
      this.state.list.splice(this.state.list.indexOf(app), 1);
      this.setState({list: this.state.list});
    }
  },

  onItemClick: function(item){
    item.id = item.infoId||item.id;
    
    var query = this.props.location.query || {};
    var params = $.extend({}, item);
    var pathName = "/detail/1";

    params.id = params.id || params.appId;
    params.device = deviceStrToint[params.device];
    params.country = countryToCode[params.country];

    this.history.pushState(null, pathName, params);
  },

  onTapMasker: function(){
    this.setState({
      confirmVisible: false
    });
  },

  onDeleteHandler: function(item){
    this.setState({
      confirmVisible: true,
      selectedItem: item
    });
  },

  detete: function(){
    this.onDelete(this.state.selectedItem);
    this.setState({
      confirmVisible:false
    });
  },

  render: function(){
    let query = this.props.location.query || {};
    let state = this.state;

    //用户名不存在
    if(!getCookie("uname")){
      return null;
    }

    return (
      <div className="c-page my-fav-page">
        <Header 
          filterVisible={false}
          showSideNav={this.props.showSideNav}>
          我的关注
        </Header>
        
        <div className="c-body">
          {
            this.state.list.map((item, idx)=>{
              return <AppItem 
                       onItemClick={this.onItemClick}
                       key={idx} 
                       data={item} 
                       type={6} 
                       isShowDelete={true}
                       onDelete={this.onDeleteHandler}/>
            })
          }
          {
            state.loading?<Loading/>:null
          }

          {
            state.errorText?<p className="center c999">暂无数据</p>:null
          }
          {!state.loading && !state.list.length && !state.errorText ?<p className="center mt6 c999">您还未关注应用</p>:null}
        </div>

        {
          this.state.confirmVisible?
          <Popup ref="confirm" onTapMasker={this.onTapMasker}>
            <div className="c-confirm">
              <p>您确定要删除应用关注吗？</p>
              <div>
                <button className="btn normal" onClick={e=>this.detete()}>删除</button>
                <button className="btn main-btn" onClick={this.onTapMasker}>取消</button>
              </div>
            </div>
          </Popup>: null
        }
      </div>
    );
  }
});

export default MyFav;