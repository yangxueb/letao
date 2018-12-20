/*
 * @Author: yangxb 
 * @Date: 2018-12-20 18:49:02 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-20 21:38:01
 */
$(function () {
  var keywods = getSearch('key');
  $('.search_input').val(keywods);
  // 搜索列表渲染
  render();
  function render () {
    $('.product').html('<div class="loading"></div>');
    var params = {
      proName: $('.search_input').val().trim(),
      page: 1,
      pageSize: 100
    }
    var current = $('.sort a.current');
    if (current.length > 1) {
      var sortName = current.data('type');
      var sortValue = current.children().hasClass('fa-angle-down') ? 2 : 1;
      params[sortName] = sortValue;
    }
    setTimeout(function () {
      $.ajax({
        url: '/product/queryProduct',
        data:params,
        dataType: 'json',
        success: function (info) {
          console.log(info);
          var htmlStr = template('searchTmp', info);
          $('.product').html(htmlStr);
        }
      })
    }, 1000)
  }
  // 搜索按钮搜索功能
  $('.search_btn').on('click', function () {
    var item = $('.search_input').val().trim();
    if (item === '') {
      mui.toast('请输入搜索关键字');
      return;
    }
    var jsonStr = localStorage.getItem('search_list');
    var arr = JSON.parse(jsonStr) || [];
    if (arr.indexOf(item) > -1) {
      arr.splice(arr.indexOf(item), 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(item);
    localStorage.setItem('search_list', JSON.stringify(arr));
    render();
    $('.search_input').val('');
  })
  // 搜索方式特效
  $('.sort a[data-type]').on('click', function () {
    if ($(this).hasClass('current')) {
      $(this).children().toggleClass('fa fa-angle-down').toggleClass('fa fa-angle-up');
    } else {
      $(this).addClass('current').siblings().removeClass('current');
    }
  })
  render();
})