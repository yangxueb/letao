/*
 * @Author: yangxb 
 * @Date: 2018-12-15 20:10:33 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-17 15:03:58
 */
// 判断用户是否登录
$.ajax({
  url: '/employee/checkRootLogin',
  dataType: 'json',
  success: function (info) {
    if (info.error == 400) {
      location.assign('login.html');
    }
  }
})