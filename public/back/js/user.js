/*
 * @Author: yangxb 
 * @Date: 2018-12-17 15:19:34 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-17 16:19:51
 */
$(function () {
  // 用户列表渲染
  var currentPage = 1;
  var pageSize = 5;
  var userId;
  var isDelete;
  render();
  function render () {
    $.ajax({
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        var htmlStr = template('userTmp', info);
        $('tbody').html(htmlStr);
        // 分页效果
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  }
  // 用户状态修改
  $('tbody').on('click', '.btn', function () {
    userId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    $('#userModal').modal('show');
  })
  $('#confirm').on('click', function () {
    $.ajax({
      url: '/user/updateUser',
      type: 'post',
      data: {
        id: userId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#userModal').modal('hide');
          render();
        }
      }
    })
  })
})