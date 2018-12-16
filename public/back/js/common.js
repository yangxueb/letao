/*
 * @Author: yangxb 
 * @Date: 2018-12-15 16:26:43 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-15 20:09:25
 */
// 进度条特效
$(document).ajaxStart(function () {
  NProgress.start();
})
$(document).ajaxStop(function () {
  NProgress.done();
})
$(function () {
  // 侧边栏二级导航切换功能
  $('#category').on('click', function () {
    $('.child').stop().slideToggle();
  })
  // 头部菜单栏特效
  $('.icon_menu').on('click', function () {
    $('.aside').toggleClass('hidemenu');
    $('.main').toggleClass('hidemenu');
    $('.header').toggleClass('hidemenu');
  })
  // 退出登录弹出层特效
  $('.icon_logout').on('click', function () {
    $('#myModal').modal('toggle');
  })
  $('.quit').on('click', function () {
    $.ajax({
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          location.assign('login.html');
        }
      }
    })
  })
})