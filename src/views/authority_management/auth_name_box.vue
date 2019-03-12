<template>
  <div class="user-box clearfix">
    <div class="user" v-for="(user, index) in users" :key="index">
      {{user.name}}
      <span class="delete-btn el-icon-close" @click="deleteUser(index)"></span>
      <div class="user-detail" :class="{'no-code': !user.imcode}">
        <span>{{user.name}}</span>
        <span>{{user.imcode | html}}</span>
      </div>
    </div>
    <div class="searchbar">
      <input type="text" class="search-input" placeholder="请点击添加管理员..."
             ref="input"
             @blur="clearMatch"
             @keyup.enter="addFirstUser"
             v-model="search"
             debounce="100">
      <ul class="match-users-list list-unstyled" v-if="matchUsers.length">
        <li class="match-user" v-for="(user, index) in matchUsers" @mousedown="addUser(user)" :key="index">
          {{user.imnick || user.name}}{{user.imcode | html}}{{user.deptname | attr}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    users: {
      type: Array,
      required: true
    },
    allUsers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      search: '',
      matchUsers: []
    };
  },
  watch: {
    // 检测输入的字符，如果输入不为空则搜索匹配的成员
    search (keyword) {
      keyword.trim() ? this.searchUser(keyword) : (this.matchUsers = []);
    }
  },
  methods: {
    // 输入的时候请求用户列表
    searchUser (name) {
      // var nickSort = function(name) {
      //   // escape将名字转为计算机通用编码，再将其替换成js识别的unicode编码，如 罗 -> %u7F57 -> \\u7F57
      //   var reg = new RegExp(escape(name).replace(/%u/g, '\\u'));
      //   return function(user) {
      //     return user.imnick.match(reg) || user.name.match(reg) ? -1 : 1;
      //   };
      // };
      // ajaxOrignal.getMatchUserList(name)
      //   .done(data => {
      //       this.matchUsers = data.users.sort(nickSort(name)).slice(0,10);
      //   })
      //   .fail(error => {
      //       console.log(error);
      //   })
    },
    deleteUser (index) {
      this.users.splice(index, 1);
      this.$emit('change-user');
    },
    addUser (user) {
      var isExist = this.allUsers.some(u => u.email === user.email);
      if (isExist) {
        this.$message.warning('每位成员只能拥有一个角色，请重新设置');
      } else {
        this.users.push({email: user.email, imcode: user.imcode || '', name: user.imnick || user.name});
        this.$emit('change-user');
      }

      this.clearMatch();

      setTimeout(() => {
        this.$refs.input.focus();
      }, 0);
    },
    clearMatch () {
      this.search = '';
      this.matchUsers = [];
    },
    addFirstUser () {
      this.matchUsers.length && this.addUser(this.matchUsers[0]);
    }
  },
  filters: {
    html (str) {
      return str ? '<' + str + '>' : '';
    },
    attr (str) {
      return str ? '[' + str + ']' : '';
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/variable";

  .user-box {
    border: solid 1px $light-gray;
    border-radius: 3px;

    .user {
      position: relative;
      float: left;
      padding: 5px 18px;
      border-radius: 3px;
      background-color: $main-color;
      color: #FFF;
      margin: 3px;
      min-width: 52px;

      &:hover {
        .delete-btn {
          opacity: 1;
        }

        .user-detail {
          display: block;
          opacity: .8;
        }
      }

      .delete-btn {
        opacity: 0;
        font-size: 14px;
        cursor: pointer;
        transition: opacity .2s ease;
      }

      .user-detail {
        display: none;
        position: absolute;
        top: 110%;
        left: 0;
        z-index: 2;
        width: 120%;
        padding: 10px;
        border-radius: 4px;
        background-color: #000;
        font-size: 8px;
        color: #FFF;

        &.no-code{
          width: 100%;
          text-align: center;
        }
      }
    }
    .searchbar {
      position: relative;
      float: left;
      padding: 6px;
      margin: 3px;

      .search-input {
        border: none;
        outline: none;
      }

      .match-users-list {
        position: absolute;
        top: 102%;
        z-index: 1;
        width: 240px;
        padding: 2px;
        border: solid 1px $gray;
        border-radius: 4px;
        background-color: #FFF;

        .match-user {
          padding: .3em;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background-color: $main-color;
            color: #FFF;
          }
        }
      }
    }
  }
</style>
