import Reflux from "reflux";
import CompareAction from "../action/action";

var CompareStore = Reflux.createStore({

    init: function(){
      this.listenTo(CompareAction.getCompare, this.loading);
      this.listenTo(CompareAction.getCompareCmp, this.getCompareCmp);
    },
    
    loading: function() {
      this.trigger({ 
        loading: true
      });
    },

    getCompareCmp: function(res){
      var params = {loading: false};

      console.log(res);

      if(info){
        params.detailInfo = info;
      }
      this.trigger(params);
    }
});

export default CompareStore;