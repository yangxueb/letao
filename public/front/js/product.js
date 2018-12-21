/*
 * @Author: yangxb 
 * @Date: 2018-12-21 16:02:39 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-21 17:09:48
 */
$(function () {
  // 商品详情页面渲染
  var id = getSearch('productId');
  $.ajax({
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var htmlStr = template('productTmp', info);
      $('.lt_main .mui-scroll').html(htmlStr);
      // 轮播图功能
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      // 初始化数字输入框
      mui('.mui-numbox').numbox();
    }
  })
  // 选择尺码效果
  $('.lt_main').on('click', '.lt_size span', function () {
    $(this).addClass('current').siblings().removeClass('current');
  })
  // 加入购物车功能
  $('#addCart').on('click', function () {
    var num = $('#proNum').val();
    var size = $('.lt_size span.current').text();
    if (!size) {
      mui.toast('请选择尺码');
      return;
    }
    $.ajax({
      url: '/cart/addCart',
      type: 'post',
      data: {
        productId: id,
        num: num,
        size: size
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.error == 400) {
          location.assign('login.html?retUrl=' + location.href);
        }
        if (info.success) {
          mui.confirm('添加成功', '温馨提示', ['去购物车', '继续浏览'], function (e) {
            if (e.index == 0) {
              location.assign('cart.html');
            }
          })
        }
      } 
    })
  })
})