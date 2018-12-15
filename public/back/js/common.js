/*
 * @Author: yangxb 
 * @Date: 2018-12-15 16:26:43 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-15 16:41:27
 */
// 进度条特效
$(document).ajaxStart(function () {
  NProgress.start();
})
$(document).ajaxStop(function () {
  NProgress.done();
})
