<template>
  <div class="authority-management body-container">
    <div class="description">
      <p>说明：</p>
      <p>1.普通管理员可管理项目，亦可查看相关统计数据</p>
      <p>2.高级管理员除拥有普通管理员权限外，还可以进行权限管理</p>
    </div>
    <dl class="manager-box">
      <dt>高级管理员：</dt>
      <dd>
        <auth-name-box
          :users="users.senior"
          :all-users="allUsers"
          @change-user="changeUser"
        >
        </auth-name-box>
      </dd>
      <dt>普通管理员：</dt>
      <dd>
        <auth-name-box
          :users="users.ordinary"
          :all-users="allUsers"
          @change-user="changeUser"
        >
        </auth-name-box>
      </dd>
    </dl>
    <footer><el-button type="primary">保存</el-button></footer>
  </div>
</template>

<script type="text/ecmascript-6">
import authNameBox from './auth_name_box';

export default{
  components: {authNameBox},
  data () {
    return {
      users: {
        senior: [
          {email: 'suwenhui@henhaoji.com', imcode: 3890, name: '\u82cf\u6587\u8f89'},
          {email: 'panjinsong@henhaoji.com', imcode: 7830, name: '\u6f58\u52b2\u677e'}
        ],
        ordinary: []
      },
      allUsers: [
        {email: 'suwenhui@henhaoji.com', imcode: 3890, name: '\u82cf\u6587\u8f89'},
        {email: 'panjinsong@henhaoji.com', imcode: 7830, name: '\u6f58\u52b2\u677e'}
      ]
    };
  },
  methods: {
    changeUser () {
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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
