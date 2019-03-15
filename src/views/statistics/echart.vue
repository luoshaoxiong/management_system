<template>
  <div ref="echart" style="height: 300px;padding: 20px 0 0 16px;"></div>
</template>

<script type="text/ecmascript-6">
import echarts from 'echarts';

export default {
  name: 'comment_trend',
  props: {
    options: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean
    }
  },
  data () {
    return {
      myChart: null,
      hasChoose: true // 是否有option选择，没有则显示提示语
    };
  },
  mounted () {
    this.initGraph();
  },
  watch: {
    data () {
      this.setOption(this.myChart);
    },
    isLoading () {
      this.isLoading ? this.myChart.showLoading() : this.myChart.hideLoading();
    }
  },
  methods: {
    initGraph () {
      const myChart = echarts.init(this.$refs.echart);
      this.myChart = myChart;
      myChart.showLoading();
      myChart.setOption(this.options);

      // 判断多项选择事件
      myChart.on('legendselectchanged', (obj) => {
        this.$emit('change-legend', obj.name);
        const selected = obj.selected;
        for (let index in selected) {
          if (selected[index]) {
            this.hasChoose = true;
            return;
          }
        }
        // 如果执行到这代表都没选择
        this.hasChoose = false;
      });

      this.setOption(myChart);
    },
    // 设置echarts的基本配置包括横轴名字类型等，多条可选折线图时的配置
    setOption (myChart) {
      myChart.setOption({
        color: this.data.color,
        legend: {
          data: this.data.legend || [],
          selected: this.data.selected || []
        },
        xAxis: [{
          data: this.data.xAxis
        }],
        series: this.data.series
      });
    }
  }
}
</script>

<style scoped>

</style>
