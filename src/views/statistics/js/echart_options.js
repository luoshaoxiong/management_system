const EchartOptions = () => ({
  // 悬浮显示横轴
  tooltip: {
    trigger: 'axis',
    formatter: function (data) {
      let res = data[0].name;
      for (let i = 0; i < data.length; i++) {
        res = res + '<br/><span style="color:' + data[i].color + ';font-size: 20px;">● </span>' +
          data[i].seriesName + ':' + (data[i].value * 100).toFixed(2) + '%';
      }
      return res;
    }
  },
  // 可选折线图选项
  legend: {
    selectedMode: 'multiple',
    selected: {},
    data: []
  },
  color: ['#669cd8', '#fdd900', '#e9a280', '#a1ca8c', '#b35750', '#9c8ff3'],
  // x轴显示的东西
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    axisLabel: {
      formatter: function (val) {
        return (val * 100).toFixed(2) + '%';
      }
    }
  },
  // 每条折线的数据，格式{name: '好评率', type: 'line', data: []}
  series: [],
  animationDuration: 500 // 加载曲线动画快慢
});

export default EchartOptions;
