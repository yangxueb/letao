/*
 * @Author: yangxb 
 * @Date: 2018-12-14 19:01:44 
 * @Last Modified by: yangxb
<<<<<<< HEAD
 * @Last Modified time: 2018-12-15 16:45:48
=======
 * @Last Modified time: 2018-12-15 17:20:19
>>>>>>> index
 */
$(function () {
  // 表单校验功能
  $('.form-horizontal').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6到12之间'
          },
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          },
          callback: {
            message: '密码不正确'
          }
        }
      },
    }
  })
  // 表单重置功能
  var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例
  $('[type="reset"]').on('click', function () {
    validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
  });
  // 登录功能
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/employee/employeeLogin',
      type: 'post',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          location.assign('index.html');
        }
        if (info.error == 1000) {
          validator.updateStatus('username', 'INVALID', 'callback');
        }
        if (info.error == 1001) {
          validator.updateStatus('password', 'INVALID', 'callback');
        }
      }
    })
  })
})