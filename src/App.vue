<template>
  <div id="app" class="clearfix" v-loading="isLoading">
    <template v-if="!isLoading && hasAccess">
      <sidebar :username="username" :avatar="avatar"></sidebar>
      <main>
        <router-view></router-view>
      </main>
    </template>
    <no-access v-if="!isLoading && !hasAccess"></no-access>
  </div>
</template>

<script type="text/ecmascript-6">
import sidebar from '@/views/base/sidebar';
import noAccess from '@/views/base/no_access';
// import url from '@/services/api';
import {isAttrExisting, findAttrObjects} from '@/utils/common';
import {mapState} from 'vuex';

export default {
  name: 'app',
  components: {sidebar, noAccess},
  data () {
    return {
      avatar: '',
      username: '',
      isLoading: false,
      hasAccess: false
    };
  },
  watch: {
    currentProject (val) {
      localStorage.currentProjectId = val && val.pj_id;
      if (val) {
        this.$router.push({path: '/qalibrary', query: {page: 'home', pid: val.pj_id}});
      } else {
        this.$router.push('/welcome');
      }
    }
  },
  computed: mapState(['currentProject']),
  created () {
    this.getUserData();
  },
  methods: {
    getUserData () {
      this.isLoading = true;
      // this.$http.post(url.getInfo, {})
      //   .then(res => {
      //     const result = res.body.result;
      //     window.$avatar = result.picture;
      //     this.avatar = window.$avatar;
      //     window.$username = result.user_name;
      //     this.username = window.$username;
      //     window.$userEmail = result.user_email;
      //     this.getProjectData(); // 要先有用户信息才能获取对应的项目信息
      //   })
      //   .catch(() => {
      //     this.$message.error('获取用户信息失败');
      //   })
      window.$avatar = '../assets/img/avatar.png';
      this.avatar = window.$avatar;
      window.$username = '罗大雄';
      this.username = window.$username;
      window.$userEmail = 'sx.Luo@foxmail.com';
      this.getProjectData(); // 要先有用户信息才能获取对应的项目信息
    },
    getProjectData () {
      // this.$http.get(url.getProjectList, {})
      //   .then(res => {
      //     // 进入系统如果无项目直接跳转到welcome（设置为空项目即可）
      //     // 否则跳转到地址栏id，地址栏项目不存在则跳转到缓存，缓存不存在就默认第一个
      //     const projectList = res.body.result;
      //     this.$store.dispatch('setProjectList', projectList);
      //     if (!projectList.length) {
      //       if (window.$userEmail === 'admin@henhaoji.com') { // 无项目的情况只有admin能访问页面进行创建
      //         this.hasAccess = true;
      //         this.$store.dispatch('switchProject', undefined);
      //       }
      //     } else {
      //       this.hasAccess = true;
      //       let currentProjectId = this.$route.query.pid;
      //       if (!currentProjectId || !isAttrExisting(projectList, 'pj_id', currentProjectId)) {
      //         currentProjectId = localStorage.currentProjectId;
      //         if (!currentProjectId || !isAttrExisting(projectList, 'pj_id', currentProjectId)) {
      //           currentProjectId = projectList[0].pj_id;
      //         }
      //       }
      //       this.$store.dispatch('switchProject', findAttrObjects(projectList, 'pj_id', currentProjectId)[0]);
      //     }
      //     this.isLoading = false;
      //   })
      //   .catch(() => {
      //     this.$message.error('获取项目信息失败');
      //   })
      const projectList =
        [
          {pj_id: '5a4d58b6fea7434fbba2c9cc8a7844b7', code: '1231', cls: ['分类一', '分类二', '分类三'], name: '默认项目'},
          {pj_id: 'e38c677126734886878ec766cf64a291', code: '1232', cls: ['分类一', '分类二', '分类三'], name: 'default'},
          {pj_id: '7b963a867a4a40dc8ff792a13dc8d715', code: '1233', cls: ['分类一', '分类二', '分类三'], name: '测试项目'},
          {pj_id: '42ef5914bbb34c45bced8a3c6147bef5', code: '1234', cls: ['分类一', '分类二', '分类三'], name: '大雄项目'},
          {pj_id: 'd521547e1a5a411fb70926c0c8df36d2', code: '1235', cls: ['分类一', '分类二', '分类三'], name: 'test'}
        ];
      this.$store.dispatch('setProjectList', projectList);
      if (!projectList.length) {
        if (window.$userEmail === 'admin@henhaoji.com') { // 无项目的情况只有admin能访问页面进行创建
          this.hasAccess = true;
          this.$store.dispatch('switchProject', undefined);
        }
      } else {
        this.hasAccess = true;
        let currentProjectId = this.$route.query.pid;
        if (!currentProjectId || !isAttrExisting(projectList, 'pj_id', currentProjectId)) {
          currentProjectId = localStorage.currentProjectId;
          if (!currentProjectId || !isAttrExisting(projectList, 'pj_id', currentProjectId)) {
            currentProjectId = projectList[0].pj_id;
          }
        }
        this.$store.dispatch('switchProject', findAttrObjects(projectList, 'pj_id', currentProjectId)[0]);
      }
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './assets/font/font-awesome-4.7.0/css/font-awesome.min.css';
  @import './assets/font/iconfont/iconfont.css';
  @import "./assets/css/common";
  @import "./assets/css/variable";

  html, body, #app {
    height: 100%;
    min-width: $body-max-width;
    background-color: $body-bg-color;
    overflow: auto;
  }

  #app > main {
    float: left;
    width: calc(100% - #{$sidebar-width});
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-left: $body-padding-left;
  }

  .body-container {
    width: $body-max-width - $sidebar-width - $body-padding-left;
    height: 100%;
    padding-top: $body-padding-top;
    padding-bottom: $body-padding-bottom;
  }

  .el-message-box {
    margin-top: 200px;
    vertical-align: top !important;
  }

  .el-table__header thead th,
  .el-table__header thead th div {
    padding: 2px 5px!important;
    background-color: $main-color;
    color: #FFF;
    font-weight: normal;
  }

  .el-table .el-table__header .ascending .sort-caret.ascending {
    border-bottom-color: #FFF;
  }

  .el-table .el-table__header .descending .sort-caret.descending {
    border-top-color: #FFF;
  }

  .el-table {
    .edit-btn {
      margin-right: 4px;
    }

    .delete-btn {
      color: $error-color;
    }
  }

  .pagination {
    float: right;
    margin: 20px 0;
  }
</style>
