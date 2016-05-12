import Reflux from "reflux";
import FavAction from "../action/action";

var FavStore = Reflux.createStore({

    init: function(){
      this.listenTo(FavAction.fetFavLsit, this.loading);
      this.listenTo(FavAction.fetFavLsitCmp, this.fetFavLsitCmp);
    },
    
    loading: function() {
      this.trigger({ 
        loading: true
      });
    },

    fetFavLsitCmp: function(res){
      var params = {loading: false};
      params.list = res.data || [{
        id: 4,
        user_id: 5000139,
        app_id: 2,
        used: 1,
        created_at: 1463052455000
      },{
        id: 4,
        user_id: 5000139,
        app_id: 2,
        used: 1,
        created_at: 1463052455000
      }];
      this.trigger(params);
    }
});

export default FavStore;