/*
 * @Author: yangxb 
 * @Date: 2018-12-17 16:42:24 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-17 17:36:53
 */
$(function () {
  // 一级分类列表渲染
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render () {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        var htmlStr = template('firstTmp', info);
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
  // 添加分类功能
  $('#addBtn').on('click', function () {
    $('#addModal').modal('show');
  })
  // 表单校验
  $('#addForm').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }
  })
  $('#addForm').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/category/addTopCategory',
      type: 'post',
      data: $('#addForm').serialize(),
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          $('#addForm').data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })
})