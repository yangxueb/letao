/*
 * @Author: yangxb 
 * @Date: 2018-12-17 18:27:29 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-18 16:32:31
 */
$(function () {
  // 二级分类列表渲染
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render () {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        var htmlStr = template('secondTmp', info);
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
    // 一级分类下拉列表渲染
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        var htmlStr = template('selectTmp', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })
  // 表单校验
  $('#addForm').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      },
    }
  })
  var validator = $('#addForm').data("bootstrapValidator");
  // 图片上传功能
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      $('#imgBox img').attr('src', data.result.picAddr);
      // 图片上传时，把img的地址存到brandLogo中的value值
      $('#brandLogo').val(data.result.picAddr);
      validator.updateStatus("brandLogo", "VALID");
    }
  })
  // 选择下拉框时，把选中a的id存到categoryId中的value值
  $('.dropdown-menu').on('click', 'li', function () {
    var id = $(this).children().data('id');
    $('#categoryId').val(id);
    $('#selectBtn').text($(this).children().text());
    validator.updateStatus("categoryId", "VALID");
  })
  // 添加二级分类功能
  $('#addForm').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/category/addSecondCategory',
      type: 'post',
      data: $('#addForm').serialize(),
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('hide');
          render();
          validator.resetForm(true);
          $('#selectBtn').text('请选择一级分类');
          $('#imgBox img').attr('src', 'images/none.png');
        }
      }
    })
  })
})