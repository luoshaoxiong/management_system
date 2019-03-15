<template>
  <div class="authority-management body-container">
    <div class="description">
      <p>说明：</p>
      <p>1.普通管理员可管理项目，亦可查看相关统计数据</p>
      <p>2.高级管理员除拥有普通管理员权限外，还可以进行权限管理</p>
      <p>3.权限系统目前只是交互演示，如有疑问请联系 <em>系统管理员&lt;sx.luo@foxmail.com&gt;</em></p>
    </div>
    <dl class="manager-box">
      <dt>高级管理员：</dt>
      <dd>
        <auth-name-box
          ref="authBox"
          :users="users.senior"
          :all-users="allUsers"
          @change-user="changeSeniorUser"
        >
        </auth-name-box>
      </dd>
      <dt>普通管理员：</dt>
      <dd>
        <auth-name-box
          :users="users.ordinary"
          :all-users="allUsers"
          @change-user="changeOrdinaryUser"
        >
        </auth-name-box>
      </dd>
    </dl>
    <footer><el-button type="primary" :loading="isSubmitting" :disabled="!hasChanged" @click="save">保存</el-button></footer>
  </div>
</template>

<script type="text/ecmascript-6">
import authNameBox from './auth_name_box';
import {users, saveUsers} from './data';

export default{
  components: {authNameBox},
  data () {
    return {
      users: {
        senior: [],
        ordinary: []
      },
      originalUsers: {},
      isLoading: true,
      isSubmitting: false,
      addedUsers: {
        senior: [],
        ordinary: []
      },
      deletedUsers: {
        senior: [],
        ordinary: []
      }
    };
  },
  computed: {
    hasChanged () {
      return JSON.stringify(this.users) !== JSON.stringify(this.originalUsers);
    },
    allUsers () {
      return [...this.users.senior, ...this.users.ordinary];
    }
  },
  created () {
    this.getData();
  },
  mounted () {
    setTimeout(() => {
      this.focusInput();
    }, 0);
  },
  beforeRouteLeave (to, from, next) {
    if (this.hasChanged) {
      this.$confirm('此页面有编辑内容未保存，是否离开该页面', '提示', {
        confirmButtonText: '离开',
        cancelButtonText: '取消',
        closeOnClickModal: false
      })
        .then(() => { next(); })
        .catch(() => {
          next(false);
          this.focusInput();
        })
    } else {
      next();
    }
  },
  methods: {
    getData () {
      this.isLoading = true;
      try {
        this.users = users;
        this.isLoading = false;
      } catch (err) {
        this.$message.error('获取管理员数据失败');
      }
    },
    changeSeniorUser () {
      this.filterChangedUsers(this.users.senior, this.originalUsers.senior, 'senior');
    },
    changeOrdinaryUser () {
      this.filterChangedUsers(this.users.ordinary, this.originalUsers.ordinary, 'ordinary');
    },
    filterChangedUsers (users, origin, type) {
      this.addedUsers[type] = users.filter(
        user => !origin.some(ori => ori.email === user.email)
      );
      this.deletedUsers[type] = origin.filter(
        ori => !users.some(user => user.email === ori.email)
      )
    },
    save () {
      if (this.hasChanged) {
        this.isSubmitting = true;
        const params = {
          senior: {
            addedUsers: this.addedUsers.senior,
            deletedUsers: this.deletedUsers.senior
          },
          ordinary: {
            addedUsers: this.addedUsers.ordinary,
            deletedUsers: this.deletedUsers.ordinary
          }
        };
        try {
          saveUsers(params.senior, params.ordinary);
          this.users = users;
          this.isSubmitting = false;
          this.$message.success('编辑成功');
          this.originalUsers = JSON.parse(JSON.stringify(this.users));
        } catch (err) {
          this.$message.error('编辑失败');
          this.isSubmitting = false;
        }
      }
    },
    focusInput () {
      this.$refs.authBox.$refs.input.focus();
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/variable";

  .authority-management {
    $margin: 16px;

    .description {
      padding: $margin;
      background: #FFF;
      box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.25);

      p {
        margin-bottom: $margin;

        &:last-child {
          margin-bottom: 0;
        }

        em {
          font-style: normal;
          color: $main-color;
        }
      }
    }

    .manager-box {
      margin: 40px 8px 0;

      dt {
        margin: 12px 0;
        font-weight: bold;
      }

      dd {
        margin-bottom: 24px;
      }
    }

    footer {
      padding: 0 8px;
      text-align: right;
    }
  }
</style>
