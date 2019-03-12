<template>
  <div class="no-access">
    <div class="clearfix">
      <span class="fa fa-info-circle warning-icon"></span>
      <p class="warning-title">你当前未拥有项目</p>
    </div>
    <p class="concats-tip">申请项目权限或接入项目，可联系
      <span class="link" @click="openConcatDialog">系统管理员</span>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  data () {
    return {};
  },
  methods: {
    openConcatDialog () {
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .no-access {
    position: absolute;
    left: 50%;
    width: 500px;
    height: 280px;
    margin-top: 230px;
    margin-left: -250px;
    padding: 90px 60px;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, .5);

    .warning-icon {
      float: left;
      font-size: 40px;
      color: #78C9F3;
    }

    .warning-title {
      float: left;
      margin-left: 20px;
      font-size: 28px;
      color: #CC3300;
    }

    .concats-tip {
      margin-top: 25px;
      padding-left: 2px;
      font-size: 14px;

      .link {
        color: #0099E8;

        .im-icon {
          width: 15px;
          vertical-align: text-bottom;
        }
      }
    }
  }
</style>
