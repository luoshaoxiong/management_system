const BarEchartOptions = () => ({
  // 悬浮显示横轴
  tooltip: {
    trigger: 'axis',
    formatter: function (data) {
      let res = data[0].name;
      for (let i = 0; i < data.length - 1; i++) {
        res = res + '<br/><span style="color:' + data[i].color + ';font-size: 20px;">● </span>' +
          data[i].seriesName + ':' + (data[i].value * 100).toFixed(2) + '%';
      }
      return res;
    }
  },
  // 可选折线图选项
  legend: {
    selectedMode: 'multiple',
    data: []
  },
  color: ['#669cd8', '#fdd900', '#e9a280', '#a1ca8c', '#b35750', '#9c8ff3'],
  // x轴显示的东西
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisTick: {alignWithLabel: true},
    data: []
  },
  yAxis: [{type: 'value'}],
  series: [],
  animationDuration: 500 // 加载曲线动画快慢
});

export default BarEchartOptions;
