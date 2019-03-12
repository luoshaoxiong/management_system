<template>
  <div id="app" class="clearfix">
    <main-header></main-header>
    <sidebar></sidebar>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import mainHeader from '@/views/base/main_header';
import sidebar from '@/views/base/sidebar';

export default {
  name: 'App',
  components: {
    mainHeader,
    sidebar
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import 'assets/css/normalize';
  @import 'assets/css/common';
  @import 'assets/font/font-awesome-4.7.0/css/font-awesome.min.css';

  html,
  body {
    height: 100%;
  }
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import 'assets/css/variable';

  #app {
    height: 100%;

    main {
      float: left;
      width: calc(100% - #{$sidebar-width});
      height: calc(100% - #{$header-height});
      background-color: #f4f8fe;
      overflow: auto;
    }
  }
</style>
