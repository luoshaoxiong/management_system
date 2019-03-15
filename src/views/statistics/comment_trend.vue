<template>
  <chart
    :data="chartData"
    :options="chartOptions"
    :is-loading="isLoading"
  ></chart>
</template>

<script type="text/ecmascript-6">
import chart from './echart';
import EchartOptions from './js/echart_options';

export default {
  name: 'comment_trend',
  components: {chart},
  data () {
    return {
      chartData: {},
      chartOptions: EchartOptions(),
      isLoading: true
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    loadData () {
      this.isLoading = true;
      const data = {
        praise: [0.12300, 0.66323, 0.03234, 0.00165, 0.80000, 0, 0, 0, 0.34540, 0.22222, 0.55555, 0],
        bad_review: [0.76300, 0.26323, 0, 0, 0.43234, 0.22165, 0.60000, 0, 0.34540, 0.44444, 0.11115, 0],
        general_review: [0.42300, 0.16323, 0.13234, 0.33165, 0.10000, 0, 0.345400, 0, 0, 0.64222, 0.00005, 0]
      };

      setTimeout(() => {
        this.chartData = {
          legend: ['好评率', '差评率', '中评率'],
          selected: {'好评率': true, '差评率': true, '中评率': true},
          xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          series: [
            {name: '好评率', legendHoverLink: true, type: 'line', data: data.praise},
            {name: '差评率', legendHoverLink: true, type: 'line', data: data.bad_review},
            {name: '中评率', legendHoverLink: true, type: 'line', data: data.general_review}
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
