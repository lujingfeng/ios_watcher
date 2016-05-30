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
      params.list = res.data || [];

      if(res && res.statusText == "error"){
        params.errorText = res.statusText;
      }
      this.trigger(params);
    }
});

export default FavStore;