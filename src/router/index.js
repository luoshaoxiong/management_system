import Vue from 'vue';
import Router from 'vue-router';
import GoodsManagement from '@/views/goods_management/index';
import Statistics from '@/views/statistics/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: GoodsManagement
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    }
  ]
});
