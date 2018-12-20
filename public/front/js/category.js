/*
 * @Author: yangxb 
 * @Date: 2018-12-18 20:14:27 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-20 15:08:00
 */
$(function () {
  // 一级分类渲染功能
  $.ajax({
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function (info) {
      var thmlStr = template('firstTmp', info);
      $('#firstList').html(thmlStr);
      $('#firstList a').eq(0).trigger('click');
    }
  })
  // 一级分类列表点击切换背景   
  $('#firstList').on('click', 'a', function () {
    $('#firstList a').removeClass('current')
    $(this).addClass('current');
    // 二级分类渲染功能
    var id = $(this).data('id');
    $.ajax({
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      success: function (info) {
        var htmlStr = template('secondTmp', info);
        $('#secondList').html(htmlStr);
        if (info.total == 0) {
          $('#secondList').html('<p class="tips">没有更多分类信息了</p>');
        }
      }
    })
  })
})