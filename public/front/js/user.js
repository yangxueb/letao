/*
 * @Author: yangxb 
 * @Date: 2018-12-19 15:56:57 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-19 17:58:08
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
  // 用户列表渲染
  $.ajax({
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      if (info.error == 400) {
        location.assign('login.html');
        return;
      }
      var htmlStr = template('userTmp', info);
      $('.mui-media-body').html(htmlStr);
    }
  })
  // 用户退出功能
  $('#logout').on('click', function () {
    $.ajax({
      url: '/user/logout',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          location.assign('login.html');
        }
      }
    })
  })
})