import React from "react";
import Header from "/pagelet/widget/components/header";

var ASOService = React.createClass({ 

  render: function(){
    var sbg = __uri("/static/image/service_bg.jpg");
    var bottom_bg = __uri("/static/image/service_bottom.jpg");

    return (
      <div className="c-page aso-service">
        <Header 
          filterVisible={false}
          showSideNav={this.props.showSideNav}>
          ASO优化服务
        </Header>
        <div className="c-body center">
          <img src={sbg} style={{width:"100%"}}></img>
          <img src={bottom_bg} style={{width:"100%"}}></img>
          <button className="btn main-btn top">
            获取ASO优化方案
          </button>
          <button className="btn main-btn" style={{marginBottom: 20}}>
            获取ASO优化方案
          </button>
        </div>
      </div>
    );
  }
});

export default ASOService;