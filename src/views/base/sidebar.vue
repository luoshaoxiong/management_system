<template>
  <aside class="sidebar">
    <header>
      <div class="logo"><span class="icon iconfont icon-wenda"></span>问答管理系统</div>
      <project-select></project-select>
    </header>
    <hr>
    <nav>
      <ul v-if="projectList.length">
        <li v-for="(item, index) in navList"
            :key="index"
            class="sidebar-item"
            :class="{'current': $route.path === item.path}"
            @click="$router.push({path: item.path, query: {pid: $store.state.currentProject.pj_id}})">
          <span class="icon iconfont" :class="[item.icon]"></span>
          <span class="text ellipsis">{{item.name}}</span>
        </li>
      </ul>
    </nav>
    <footer class="clearfix">
      <div class="user-msg-container clearfix">
        <el-popover trigger="hover" ref="logout" width="60">
          <span @click="logout()">退出</span>
        </el-popover>
        <div class="user-msg">
          <div class="avatar"><img src="../../assets/img/avatar.png"></div>
          <span class="username ellipsis">{{username}}</span>
        </div>
        <span class="split">|</span>
        <span class="feedback" @click="isFeedbackShow = true">意见反馈</span>
      </div>
    </footer>
    <feedback v-if="isFeedbackShow" @close="isFeedbackShow = false"></feedback>
  </aside>
</template>
<script type="text/ecmascript-6">
import url from '@/services/api';
import {mapState} from 'vuex';
import projectSelect from './project_select';
import feedback from "./feedback";

export default{
  components: {
    feedback,
    projectSelect
  },
  props: {
    username: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isFeedbackShow: false,
      navList: [
        {
          name: '问答库',
          path: '/qalibrary',
          icon: 'icon-xinxiguanli'
        },
        // {
        //   name: '词典',
        //   path: '/dictionary',
        //   icon: 'icon-minganciku'
        // },
        // {
        //   name: '用户管理',
        //   path: '/management',
        //   icon: 'icon-yonghuguanli1'
        // },
        {
          name: '数据统计',
          path: '/statistics',
          icon: 'icon-barchart'
        },
        {
          name: '权限系统',
          path: '/authority',
          icon: 'icon-idcard'
        }
      ]
    };
  },
  computed: mapState(['projectList']),
  methods: {
    logout () {
      location.href = url.logout;
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/variable";
  @import "../../assets/css/ui";

  .sidebar {
    float: left;
    width: $sidebar-width;
    height: 100%;
    background-color: $sidebar-bg-color;
    color: #fff;
    overflow: auto;

    .logo {
      height: $logo-height;
      line-height: $logo-height;
      padding: 0 20px;
      font-family: "Segoe Script";
      font-size: 22px;
      color: #FFF;

      .icon {
        margin-right: 14px;
        font-size: 28px;
      }
    }

    hr {
      width: 86%;
      margin: 4px auto;
      border-color: #A1A1A1;
    }

    $nav-height: calc(100% - #{$logo-height + $item-height + 10px + $user-msg-height});
    nav {
      height: $nav-height;
      min-height: $item-height * 5;

      .current {
        background-color: $main-color;
      }
    }

    $padding-bottom: 20px;
    footer {
      height: $user-msg-height;
      padding: 0 20px;

      .user-msg-container {
        height: $user-msg-height;
        line-height: $user-msg-height - $padding-bottom;

        .user-msg {
          float: left;

          $avatar-height: 30px;
          .avatar {
            float: left;
            height: $avatar-height;
            line-height: $avatar-height;
            padding: #{($user-msg-height - $padding-bottom - $avatar-height)/2} 0;
            margin: 0 12px;

            img {
              height: $avatar-height;
              border-radius: 50%;
            }
          }
        }

        span {
          float: left;

          &.username {
            max-width: 60px;
          }

          &.split {
            margin: 0 6px;
          }
        }

        .feedback:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
</style>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/variable";

  .el-popover {
    min-width: 70px !important;
    padding: 4px 0 !important;

    span {
      display: inline-block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;

      &:hover {
        background-color: rgb(234, 249, 243);
        color: $main-color;
        cursor: pointer;
      }
    }
  }
</style>
