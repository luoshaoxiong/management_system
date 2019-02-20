<template>
  <header class="clearfix">
    <img class="logo" src="../../assets/logo.png">
    <h2>统一认证管理系统</h2>
    <div class="user-box clearfix">
      <img class="avatar" src="../../assets/img/avatar.png">
      <span class="username">{{username}}</span>
      <span class="login">登录</span>
      <span class="logout">退出</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'main_header',
  data () {
    return {
      username: '大雄'
    };
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/variable.scss";

  $margin: 8px;
  header {
    height: $header-height;
    line-height: $header-height;
    padding: 0 20px;
    background-color: #121d37;
    color: #fff;

    .logo {
      float: left;
      height: $header-height - $margin * 2;
      margin-top: $margin;
      margin-right: $margin * 2;
    }

    h2 {
      float: left;
    }

    .user-box {
      float: right;

      .avatar {
        float: left;
        height: $header-height - $margin * 2;
        margin-top: $margin;
        margin-right: $margin * 2;
        border: 4px solid #2c334e;
        border-radius: 50%;
      }

      .username,
      .login,
      .logout {
        float: left;
        margin-right: $margin * 2;
      }
    }
  }
</style>
