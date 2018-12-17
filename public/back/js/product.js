/*
 * @Author: yangxb 
 * @Date: 2018-12-17 21:31:40 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-17 21:57:12
 */
$(function () {
  // 商品列表渲染
  var currentPage = 1;
  var pageSize = 2;
  render();
  function render () {
    $.ajax({
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        var htmlStr = template('productTmp', info);
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
        })
      }
    })
  }
  // 商品状态修改功能
  $('tbody').on('click', '.btn', function () {
    var id = $(this).parent().data('id');
    console.log(id);
  })
  // 添加商品功能
  $('#addBtn').on('click', function () {
    $('#addModal').modal('show');
  })
})