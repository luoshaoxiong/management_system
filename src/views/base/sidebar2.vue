<template>
  <aside>
    <ul>
      <li
        v-for="(item, index) in navList"
        class="item clearfix"
        :class="{'current': $route.path === item.path}"
        @click="$router.push({path: item.path})"
        :key="index">
        <span class="item-icon fa" :class="[item.icon]"></span>
        <span class="item-name">{{item.name}}</span>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      navList: [
        {
          name: '首页',
          path: '/home',
          icon: 'fa-home'
        },
        {
          name: '商品管理',
          path: '/goods',
          icon: 'fa-list-ul'
        },
        {
          name: '数据统计',
          path: '/statistics',
          icon: 'fa-bar-chart-o'
        },
        {
          name: '权限管理',
          path: '/authority',
          icon: 'fa-users'
        }
      ]
    };
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/variable";

  $item-height: 50px;
  $icon-width: 30px;
  aside {
    float: left;
    width: $sidebar-width;
    height: calc(100% - #{$header-height});
    background-color: #1b2640;

    ul {
      padding: 12px 0;
      font-size: 16px;

      .item {
        height: $item-height;
        line-height: $item-height;
        padding: 0 12px;
        border-left: 3px solid transparent;
        color: #7885af;

        &:hover,
        &.current {
          border-left-color: $main-color;
          background-color: #0a142f;
          color: #fff;
          cursor: pointer;
        }

        .item-icon {
          float: left;
          width: $icon-width;
          height: $item-height;
          line-height: $item-height;
          margin-right: 10px;
          text-align: center;
        }
      }
    }
  }
</style>
