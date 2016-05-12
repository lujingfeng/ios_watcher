/**
  * @require ../about.less
  */
import React from "react";
import Header from "/pagelet/widget/components/header";

var About = React.createClass({ 

  render: function(){

    return (
      <div className="c-page c-about">
        <Header 
          filterVisible={false}
          showSideNav={this.props.showSideNav}>
          关于我们
        </Header>

        <div className="c-body">
          <h5>酷传是国内最大的App发布与监控平台， 致力于为广大开发者提供一站式发布与监控服务。</h5>
          <p>1、酷传网站（www.kuchuan.com）提供iOS快速审核、ASO优化、App推广等服务。</p>
          <p>2、查看iOS榜单排名、七日排名上升/下降榜、关键词热度排行榜、以及应用详情信息。</p>
          <p>3、关注酷传推广手册订阅号（tuiguangshouce）及酷传监控服务号（coolchuanhjk）、了解移动互联网行业动态、洞察APP推广方法。</p>

          <div>
            <img src=""></img>
            <img src=""></img>
          </div>
        </div>
      </div>
    );
  }
});

export default About;