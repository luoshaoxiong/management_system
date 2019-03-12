<template>
  <textarea tabindex="1" v-model="input" class="chat-input" placeholder="请输入文字，按 enter 键发送..." @keydown.enter.prevent="sendMessage()" id="chatInput"></textarea>
</template>

<script type="text/ecmascript-6">
import autoTextarea from './js/auto_textarea_height';

export default{
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      input: this.value
    };
  },
  watch: {
    input (val) {
      this.$emit('input', val);
    },
    value (val) {
      this.input = val;
    }
  },
  mounted () {
    let autoHeightCallback = function () {
      let chatAreaEle = document.querySelector('.chat-area');
      let textareaEle = document.querySelector('textarea');
      chatAreaEle.style.height = 500 - 50 - 2 - textareaEle.offsetHeight + 'px';
      chatAreaEle.scrollTop = 99999999999;
    };
    autoTextarea(document.querySelector('textarea'), 16, 55, autoHeightCallback);
  },
  methods: {
    sendMessage () {
      this.$emit('send-message', this.input);
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/variable";

  .chat-input {
    float: left;
    width: calc(100% - #{$send-btn-width});
    height: $chat-input-init-height;
    border: none;
    padding: 8px;
    resize: none;
    line-height: 20px;
    overflow: hidden;
    font-size: 14px;
    border-radius: 0 0 $chat-dialog-border-radius $chat-dialog-border-radius;
  }
</style>
