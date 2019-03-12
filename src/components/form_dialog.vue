<template>
  <el-dialog
    :title="title"
    :width="width"
    :visible="true"
    :before-close="beforeClose"
    :close-on-click-modal="false"
  >
    <main class="form-dialog-content clearfix">
      <slot></slot>
    </main>
    <footer class="form-dialog-footer">
      <el-button @click="beforeClose()">{{cancelBtnText}}</el-button>
      <el-button type="primary" @click="beforeSubmit()" :loading="isSubmitting">{{certainBtnText}}</el-button>
    </footer>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
export default{
  props: {
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '500px'
    },
    certainBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    isSubmitting: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    };
  },
  methods: {
    beforeClose () {
      this.$emit('close');
    },
    beforeSubmit () {
      this.$emit('submit');
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable";

  $label-width: 100px;
  $label-right: 10px;
  main.form-dialog-content {
    padding-right: 40px;

    .form-line {
      margin-bottom: 20px;
    }

    .label {
      float: left;
      width: $label-width;
      margin-right: $label-right;
      height: $main-height;
      line-height: $main-height;
      text-align: right;
    }

    .el-input,
    .el-textarea {
      width: calc(100% - #{$label-width + $label-right});
    }

    .error-tip {
      margin: 10px 0 -10px 0;
      padding-left: (#{$label-width + $label-right});
      color: $error-color;
    }

    .tip {
      margin: 10px 0 -10px 0;
      padding-left: (#{$label-width + $label-right});
      color: $gray;
    }
  }

  footer.form-dialog-footer {
    margin: 30px 0 0 0;
    padding-left: (#{$label-width + $label-right});

    button:nth-of-type(1) {
      margin-right: 20px;
    }
  }
</style>
