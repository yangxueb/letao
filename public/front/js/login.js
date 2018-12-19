/*
 * @Author: yangxb 
 * @Date: 2018-12-19 16:38:30 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-19 17:18:51
 */
$(function () {
  $('#btn_login').on('click', function () {
    var username = $('#username').val();
    var password = $('#password').val();
    if (username.trim() === '') {
      mui.toast('请输入用户名');
      return;
    }
    if (password.trim() === '') {
      mui.toast('请输入密码');
      return;
    }
    $.ajax({
      url: '/user/login',
      type: 'post',
      data: {
        username: username,
        password: password
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.error == 403) {
          mui.toast(info.message);
          return;
        }
        if (info.success) {
          if (location.search.indexOf('retUrl') > -1) {
            var retUrl = location.search.replace('?retUrl=', '');
            location.assign(retUrl);
          } else {
            location.assign('user.html');
          }
        }
      }
    })
  })
})