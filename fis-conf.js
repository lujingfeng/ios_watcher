/**
 *FIS3 config
 *@Author: jingfeng.lu
 */

var PROJECT_NAME = "IOS-watcher";
var LOCAL_HOST_DOMAIN = "";
var PRODUCTION_DOMAIN = "";

var JQUERY = 'jquery';
var REACT = 'react';
var REFLUX = 'reflux';
var REACT_ROUTER = 'reactRouter';
var ISCROLL_LITE = 'iscrollLite';

var OUTPUT_DIR = "./output";

fis.config.set("project.watch.usePolling", true)
fis.set('project.charset', 'utf-8');
fis.set('project.md5Length', 8);
fis.set('project.md5Connector ', '_');
fis.set('project.ignore', [
  'node_modules/**', 
  'output/**', 
  'fis-conf.js',
  'package.json'
]);

//fis.hook('npm');
//模块化钩子 commonjs规则
fis.hook('commonjs', {});

fis.match("/static/lib/(react).js", {id: "$1",moduleId: "$1"});
fis.match("/static/lib/(reflux).js", {id: "$1",moduleId: "$1"});
fis.match("/static/lib/(reactRouter).js", {id: "$1",moduleId: "$1"});
fis.match("/static/lib/(lodash).js", {id: "$1",moduleId: "$1"});
fis.match("/static/lib/(jquery).js", {id: "$1",moduleId: "$1"});
fis.match("/static/(constants).js", {id: "$1",moduleId: "$1"});

//全局规则匹配
fis.match('*.less', {
  parser: fis.plugin('less'),
  postprocessor: fis.plugin('autoprefixer', {
      browsers: ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4", "Firefox >= 20", "last 2 versions"],
      cascade: true
    }),
  rExt: '.css'
}).match("*.{js,jsx}", {
  isMod: true,
  parser: ['babel'],
  rExt: 'js'
}).match("**/mod.js", {
  isMod: false
}).match("/pages/(*.html)", {
  domain: LOCAL_HOST_DOMAIN,
  release: "/$1",
  deploy: fis.plugin('local-deliver', {
    to: OUTPUT_DIR
  })
});


//开发环境规则
var development = fis.media("debug");

//react .jsx 文件transfrom
development.match('::package', {
  postpackager: [fis.plugin('loader', {})]
});

development.match('*.{jsx,js,less,css,png,jpg,jpeg,svg,eot,ttf,woff}', {
  domain: LOCAL_HOST_DOMAIN,
  deploy: fis.plugin('local-deliver', {
    to: OUTPUT_DIR
  })
});


//生产环境编译规则
var packToJs = "/pkg/pack.js";
var packToCss = "/pkg/style.css";
var production = fis.media("prod");

production.match('**/mod.js', {
  packOrder: -100
}).match("*.{js,jsx}",{
  optimizer: fis.plugin('uglify-js', {}),
  packTo: packToJs
}).match('::package', {
  postpackager: fis.plugin('loader', {
    allInOne: false
  }),
  spriter: fis.plugin('csssprites')
}).match("/static/lib/echarts.min.js", {
  packTo: "/pkg/echart.js"
});

production.match('*.less', {
  useSprite: true, 
  packTo: packToCss,
  optimizer: fis.plugin('clean-css',{})
});

production.match('*.{jsx,js,less,css,png,jpg,jpeg,svg,eot,ttf,woff}', {
  domain: PRODUCTION_DOMAIN,
  useHash: true,
  deploy: fis.plugin('local-deliver', {
    to: OUTPUT_DIR
  })
});

