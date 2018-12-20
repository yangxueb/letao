/*
 * @Author: yangxb 
 * @Date: 2018-12-19 11:14:05 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-20 15:08:29
 */
$(function () {
  // 头部页面后退功能
  $('.back').on('click', function () {
    history.back();
  })
  // 购物车列表渲染
  render();
  function render () {
    $.ajax({
      url: '/cart/queryCart',
      dataType: 'json',
      success: function (info) {
        var obj = {
          items: info
        };
        if (info.error == 400) {
          location.assign('login.html?retUrl=' + location.href);
          return;
        }
        var htmlStr = template('cartTmp', obj);
        $('.mui-table-view').html(htmlStr);
      }
    })
  }
  // 购物车商品删除功能
  $('.mui-table-view').on('click', '.btn_delete', function () {
    var id = $(this).data('id');
    $.ajax({
      url: '/cart/deleteCart',
      data: {
        id: [id]
      },
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          render();
        }
      }
    })
  })
})