<template>
  <div class="chat-area">
    <div v-for="(item, index) in sendContents" class="clearfix dialog-container" :key="index">
      <div class="avatar" :class="[item.from === 'user' ? 'user-avatar' : 'robot-avatar']" :style="item.from === 'user' ? userAvatar : ''"></div>
      <div class="content-dialog user-dialog" v-if="item.from === 'user'">{{item.content}}</div>
      <div v-if="item.from === 'robot'" class="robot-container">
        <div class="content-dialog robot-dialog chat-container" v-html="translate(item.content)"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import toHtml from '@/utils/rule_transform/to_editor_type';

const handleAnswer = function (str) {
  // 先做表情处理，再做图片大小限制
  return str.replace(/#(\d+)(\.gif|\.png)/g, '%23$1$2')
    .replace(/<img/g, '<img style="max-width:100%"');
};
export default{
  props: {
    sendContents: {
      type: Array,
      required: true
    }
  },
  data () {
    return {};
  },
  computed: {
    userAvatar () {
      let avatarUrl = window.$avatar || '../../assets/image/user.jpg';
      let style = 'background: url("' + avatarUrl + '") center center / cover;';
      return style;
    }
  },
  methods: {
    translate (answer) {
      // 先做表情处理，再做图片大小限制
      return handleAnswer(toHtml.toEditorType(answer));
      // return answer;
    },
    getAvatar (type) {
      let avatarUrl = window.$avatar || '../../assets/image/user.jpg';
      let style = 'background: url("' + avatarUrl + '") center center / cover;'
      return type === 'user' ? style : '';
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/variable";

  .chat-area {
    width: 100%;
    height: $chat-dialog-height - $chat-header-height - $chat-input-init-height - 2px;
    padding: 10px 15px 15px;
    border-bottom: 1px solid $gray;
    overflow-y: auto;
    user-select: text;

    .dialog-container {
      margin-top: 10px;

      .avatar {
        border-radius: 6px;
        height: 36px;
        width: 36px;

        &.user-avatar {
          background: url("../../assets/img/user.jpg") center center / cover;
          float: right;
        }

        &.robot-avatar {
          background: url("../../assets/img/robot.jpg") center center / cover;
          float: left;
        }
      }

      .content-dialog {
        position: relative;
        display: inline-block;
        max-width: 300px;
        min-height: 30px;
        border-radius: 3px;
        margin-top: 2px;
        padding: 6px 12px;
        font-size: 14px;
        word-break: break-all;
      }

      .user-dialog {
        float: right;
        background-color: #97E44A;
        margin-right: 10px;

        &::before {
          content: '';
          position: absolute;
          right: -5px;
          top: 10px;
          background-color: #97E44A;
          width: 10px;
          height: 10px;
          transform: rotate(-45deg);
        }
      }

      .robot-dialog {
        float: left;
        border: 1px solid #ccc;
        background-color: #f9f9f9;
        margin-left: 10px;

        &::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 10px;
          background-color: #f9f9f9;
          width: 10px;
          height: 10px;
          border-left: 1px solid #ccc;
          border-top: 1px solid #ccc;
          transform: rotate(-45deg);
        }
      }

      .robot-container {
        position: relative;
        top: 0;
        left: 0;
        display: inline-block;
      }
    }
  }
</style>
<style>
  // 解析富文本
  .chat-container .user-card,
  .chat-container .group-card {
    background-color: white;
    vertical-align: bottom;
    margin: 0 2px;
    display: inline-block;
    line-height: 20px;
    border: 1px solid rgb(192,204,218);
    border-radius: 3px;
    box-sizing: border-box;
    padding: 4px 10px;
    color: rgb(50,64,87);
    font-size: 12px;
    text-decoration: none;
  }

  .chat-container .card-split {
    display: inline-block;
    margin: 0 4px;
    color: #ccc;
  }

  .chat-container .card-name {
    color: #0050e6;
    text-decoration: underline;
  }

  .chat-container .auto-ask {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }

  .chat-container label{
    margin-bottom: 0;
    font-weight: normal;
  }

  .chat-container img{
    max-width: 100%;
    vertical-align: baseline;
  }

  .chat-container p{
    margin: 0;
  }

  .chat-container ul,
  .chat-container ol{
    padding-left: 30px;
  }
</style>
