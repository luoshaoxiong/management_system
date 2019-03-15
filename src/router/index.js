import Vue from 'vue';
import Router from 'vue-router';
import Statistics from '@/views/statistics/index';
import QaLibrary from '@/views/qa_library/index';
import Authority from '@/views/authority_management/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'qalibrary',
      component: QaLibrary
    },
    {
      path: '/qalibrary',
      name: 'qalibrary',
      component: QaLibrary
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    },
    {
      path: '/authority',
      name: 'authority',
      component: Authority
    }
  ]
});
