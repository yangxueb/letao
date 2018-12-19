/*
 * @Author: yangxb 
 * @Date: 2018-12-19 11:14:05 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-19 11:49:06
 */
$(function () {
  // 头部页面后退功能
  $('.back').on('click', function () {
    history.back();
  })
  // 初始化scroll控件
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否显示滚动条
  });
  // 购物车列表渲染
  $.ajax({
    url: '/cart/queryCart',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var obj = {
        items: info
      };
      var htmlStr = template('cartTmp', obj);
      $('.mui-table-view').html(htmlStr);
    }
  })
})