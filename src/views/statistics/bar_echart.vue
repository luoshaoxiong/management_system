<template>
  <chart
    :data="chartData"
    :options="chartOptions"
    :is-loading="isLoading"
  ></chart>
</template>

<script type="text/ecmascript-6">
import chart from './echart';
import BarEchartOptions from './js/bar_echart_options';

export default {
  name: 'comment_trend',
  components: {chart},
  data () {
    return {
      chartData: {},
      chartOptions: BarEchartOptions(),
      legend: ['活跃用户数', '新增用户数', '聊天总数'],
      isLoading: true
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    loadData () {
      this.isLoading = true;
      const type = 0;
      const data = [
        {date: '2019-02-24', value: 0},
        {date: '2019-02-25', value: 0},
        {date: '2019-02-26', value: 2},
        {date: '2019-02-27', value: 3},
        {date: '2019-02-28', value: 4},
        {date: '2019-03-01', value: 1},
        {date: '2019-03-02', value: 0},
        {date: '2019-03-03', value: 0},
        {date: '2019-03-04', value: 1},
        {date: '2019-03-05', value: 1},
        {date: '2019-03-06', value: 1},
        {date: '2019-03-07', value: 1},
        {date: '2019-03-08', value: 1},
        {date: '2019-03-09', value: 0},
        {date: '2019-03-10', value: 0}
      ];
      const values = data.map(data => data.value);

      setTimeout(() => {
        this.chartData = {
          // color: ['#ACDDFD', '#ACDDFD', '#ACDDFD', '#CA846A'],
          legend: this.legend,
          selected: {'活跃用户数': type === 0, '新增用户数': type === 1, '聊天总数': type === 3},
          xAxis: data.map(data => data.date),
          series: [
            {name: this.legend[0], legendHoverLink: true, type: 'bar', data: values},
            {name: this.legend[1], legendHoverLink: true, type: 'bar', data: values},
            {name: this.legend[2], legendHoverLink: true, type: 'bar', data: values},
            {name: this.legend[type] + '', showAllSymbol: true, legendHoverLink: true, type: 'line', data: values} // 多搞一条折线图默认开启
          ]
        };
        this.isLoading = false;
      }, 1000);
    }
  }
}
</script>

<style scoped>

</style>
