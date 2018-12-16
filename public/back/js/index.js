/*
 * @Author: yangxb 
 * @Date: 2018-12-15 20:47:11 
 * @Last Modified by: yangxb
 * @Last Modified time: 2018-12-16 11:09:44
 */
$(function () {
  // 柱状图
  // 基于准备好的dom，初始化echarts实例
  var histogram = echarts.init(document.querySelector(".histogram"));

  // 指定图表的配置项和数据
  var option = {
      title: {
          text: '2018年注册人数'
      },
      tooltip: {},
      legend: {
          data:['人数', '销量']
      },
      xAxis: {
          data: ["1月","2月","3月","4月","5月","6月"]
      },
      yAxis: {},
      series: [{
          name: '人数',
          type: 'bar',
          data: [600, 500, 1500, 1800, 900, 800]
      }, {
        name: '销量',
        type: 'bar',
        data: [788, 478, 1200, 1753, 1456, 977]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  histogram.setOption(option);
  // 饼图
  var pie = echarts.init(document.querySelector(".pie"));
  option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年7月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
        {
            name: '品牌',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'李宁'},
                {value:1548, name:'阿迪王'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
  };
  pie.setOption(option2);
})