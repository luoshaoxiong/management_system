<template>
  <div class="statistics clearfix">
    <div class="card">
      <comment-trend></comment-trend>
    </div>
    <div class="card">
      <bar-echart></bar-echart>
    </div>
  </div>
</template>

<script>
import commentTrend from './comment_trend';
import barEchart from './bar_echart';

export default {
  name: 'index',
  components: {commentTrend, barEchart}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  $margin: 30px;
  .statistics {
    padding: $margin 0;

    .card {
      float: left;
      width: 90%;
      margin: 0 0 $margin 5%;
      min-height: 300px;
      background-color: #fff;
      box-shadow: 0 0 8px 2px rgba(225, 225, 225, .6);
    }
  }
</style>
