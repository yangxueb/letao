/*
 * @Author: yangxb 
 * @Date: 2018-12-20 15:09:49 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-20 18:32:51
 */
$(function () {
  // 历史记录列表渲染
  render();
  function render () {
    var jsonStr = localStorage.getItem('search_list');
    var arr = JSON.parse(jsonStr) || [];
    var htmlStr = template('historyTmp', {arr: arr});
    $('.history').html(htmlStr);
  }
  // 清空记录功能
  $('.history').on('click', '.btn_empty', function () {
    mui.confirm('你确定要清空历史记录吗', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index == 1) {
        localStorage.removeItem('search_list');
        render();
      }
    })
  })
  // 单个删除历史记录
  $('.history').on('click', '.btn_delete', function () {
    var that = this;
    mui.confirm('你确定要删除该条记录吗', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index == 1) {
        var index = $(that).data('index');
        var jsonStr = localStorage.getItem('search_list');
        var arr = JSON.parse(jsonStr) || [];
        arr.splice(index, 1);
        localStorage.setItem('search_list', JSON.stringify(arr));
        render();
      }
    })
  })
  // 点击搜索添加历史记录
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
    location.assign('searchList.html?key=' + item);
  })
})