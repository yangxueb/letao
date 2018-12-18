/*
 * @Author: yangxb 
 * @Date: 2018-12-17 21:31:40 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-18 16:34:19
 */
$(function () {
  // 商品列表渲染
  var currentPage = 1;
  var pageSize = 2;
  var picArr = [];
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
    $.ajax({
      url: '/category/querySecondCategoryPaging',
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
  // 下拉按钮同步功能
  $('.dropdown-menu').on('click', 'a', function () {
    $('#selectBtn').text($(this).text());
    var id = $(this).data('id');
    $('[name=brandId]').val(id);
    $('#addForm').data("bootstrapValidator").updateStatus("brandId", "VALID");
  })
  // 图片上传功能
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      picArr.unshift(data.result);
      $('#imgBox').prepend('<img src=" ' + data.result.picAddr + ' " alt="" height="100" style="width: auto;display: inline-block">');
      // 判断上传图片大于3张时删除最后一张
      if (picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      // 当图片个数等于3张时,表单校验恢复成功状态
      if (picArr.length == 3) {
        $('#addForm').data("bootstrapValidator").updateStatus("productPic", "VALID");
      }
    }
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
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          },
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式必须是xx-xx,xx为数字'
          },
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      productPic: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  })
  // 上传商品功能
  $('#addForm').on('success.form.bv', function (e) {
    e.preventDefault();
    var data = $('#addForm').serialize();
    data += '&picArr=' + JSON.stringify(picArr);
    $.ajax({
      url: '/product/addProduct',
      type: 'post',
      data: data,
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          $('#addForm').data("bootstrapValidator").resetForm(true);
          $('#selectBtn').text('请选择二级分类');
          $('#imgBox img').remove();
          picArr = [];
        }
      } 
    })
  })
})