<template>
  <div class="chat-dialog" v-show="show">
    <header>聊天</header>
    <chat-area :send-contents="sendContents"></chat-area>
    <div class="input-area clearfix">
      <chat-input v-model="userInput" @send-message="sendMessage" ref="input"></chat-input>
      <span class="iconfont icon-fasong send-btn" :class="{'disabled': !userInput}" @click="sendMessage(userInput)"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import url from '@/services/api';
import chatArea from './chat_area';
import chatInput from './chat_area';

export default{
  components: {chatArea, chatInput},
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      userInput: '',
      sendContents: [
        {from: 'user', content: '请问有人在吗'},
        {from: 'robot', content: '你好，很高兴为你服务'},
      ]
    };
  },
  watch: {
    show (val) {
      if (val) {
        setTimeout(() => {
          this.$refs.input.$el.focus();
        }, 0);
      }
    }
  },
  methods: {
    pushMessage (type, content) {
      const record = {from: type, content: content};
      this.sendContents.push(record);
      this.scrollToBottom();
    },
    sendMessage (input) {
      if (input) {
        this.pushMessage('user', input);
        this.userInput = '';
        this.getReply(input);
      }
      this.$refs.input.$el.focus();
    },
    getReply (input) {
      const params = {
        category: this.$store.state.currentProject.id,
        text: input
      };
      this.$http.post(url.chat, params)
        .then(res => {
          this.pushMessage('robot', res.body.result.response);
        })
        .catch(() => {
          this.$message.error('获取聊天数据失败');
        })
    },
    scrollToBottom () {
      this.$nextTick(() => {
        const node = document.querySelector('.chat-area');
        node.scrollTop = 99999999999;
        // 如果最后一条里面包含图片，等图片加载完了再次滚动到底部
        const imgNode = document.querySelector('.chat-area>div:last-child img');
        if (imgNode) {
          imgNode.onload = function() {
            node.scrollTop = 99999999999;
          };
        }
      });
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/variable";

  .chat-dialog {
    position: relative;
    top: -$chat-dialog-height - 30px;
    left: -$chat-dialog-width - 10px;
    width: $chat-dialog-width;
    height: $chat-dialog-height;
    border: 1px solid $gray;
    border-radius: $chat-dialog-border-radius;
    background-color: #FFF;
    text-align: left;

    header {
      height: $chat-header-height;
      line-height: $chat-header-height;
      padding-left: 12px;
      border-radius: $chat-dialog-border-radius $chat-dialog-border-radius 0 0;
      background-color: $sidebar-bg-color;
      font-size: 16px;
      color: #FFF;
    }

    .input-area {
      .send-btn {
        display: inline-block;
        width: $send-btn-width;
        height: $chat-input-init-height;
        line-height: $chat-input-init-height;
        text-align: left;

        &:hover {
          cursor: pointer;
          color: #5E5E5E;
        }

        &.disabled {
          color: #CCC;
          cursor: not-allowed;
        }
      }
    }
  }
</style>
