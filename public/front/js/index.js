/*
 * @Author: yangxb 
 * @Date: 2018-12-18 18:30:09 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-18 19:14:32
 */
$(function () {
  // 初始化scroll控件
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否显示滚动条
  });
  // 轮播图功能
  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
  });
})