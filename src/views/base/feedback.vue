<template>
  <form-dialog
    class="feedback"
    title="意见反馈"
    width="560px"
    certain-btn-text="提交"
    :is-submitting="isSubmitting"
    @close="beforeClose()"
    @submit="beforeSubmit()"
  >
    <rich-text
      ref="richText"
      :value="feedback"
      placeholder="支持纯文本和截图粘贴，不支持格式粘贴将被过滤"
      @change-value="changeValue">
    </rich-text>
  </form-dialog>
</template>

<script type="text/ecmascript-6">
  import richText from '@/components/rich_text';
  import formDialog from '@/components/form_dialog';

  export default {
    components: {richText, formDialog},
    data () {
      return {
        feedback: '',
        isSubmitting: false
      };
    },
    mounted () {
      setTimeout(() => this.$refs.richText.focus(), 0);
    },
    methods: {
      changeValue (content) {
        this.feedback = content;
      },
      beforeClose () {
        this.$refs.richText.setContent('');
        this.$emit('close');
      },
      beforeSubmit () {
        this.$message.success('反馈已提交');
        this.$refs.richText.setContent('');
        this.$refs.richText.focus()
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/variable";

  .feedback {
    .el-dialog__body {
      padding: 10px 24px 30px 24px;

      main {
        padding-right: 0;
      }

      footer {
        margin: 20px 0 0 0;
        text-align: right;
      }
    }
  }
</style>
