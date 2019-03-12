<template>
  <div class="select-container">
    <div class="sidebar-item clearfix" v-if="!projectList.length" @click="isCreateDgShow = true">
      <span class="icon el-icon-plus"></span>
      <span class="text ellipsis">添加项目</span>
    </div>
    <div v-else class="sidebar-item clearfix" :class="{'current': isOtherListShow}"
         @click="handleOtherListClick()" v-click-outside="hideOtherList">
      <span class="icon iconfont icon-xiangmu"></span>
      <span class="text ellipsis">{{currentProject.name}}</span>
      <span class="unfold-icon el-icon-caret-bottom"></span>
      <el-popover trigger="manual" v-model="isHover[currentProject.pj_id]" ref="more" width="60">
        <span @click="editProject(currentProject)">编辑</span>
        <span @click="deleteProject(currentProject)">删除</span>
      </el-popover>
      <span class="more-icon" @click.stop="handleMoreClick(currentProject)">
    <span class="fa fa-ellipsis-v" v-popover:more></span>
</span>
    </div>
    <div class="project-list" v-show="isOtherListShow">
      <ul>
        <li v-for="(item, index) in otherProject" class="sidebar-item clearfix" @click="switchProject(item)" :key="index">
          <span class="icon el-icon-arrow-right"></span>
          <span class="text ellipsis">{{item.name}}</span>
          <span class="unfold-icon"><!--占位符--></span>
          <el-popover trigger="manual" v-model="isHover[item.pj_id]" :ref="'more' + item.pj_id" width="60">
            <span @click="editProject(item)">编辑</span>
            <span @click="deleteProject(item)">删除</span>
          </el-popover>
          <span class="more-icon" :class="{'current-more-icon': isHover[item.pj_id]}" @click.stop="handleMoreClick(item)">
    <span class="fa fa-ellipsis-v" v-popover="'more' + item.pj_id"></span>
    </span>
        </li>
      </ul>
      <hr>
      <div class="sidebar-item clearfix" @click="isCreateDgShow = true">
        <span class="icon el-icon-plus"></span>
        <span class="text ellipsis">添加项目</span>
      </div>
    </div>
    <create-dialog v-if="isCreateDgShow" :project="projectBeingProcessed" @close="closeCreateDg()"></create-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import url from '@/services/api';
import {mapState} from 'vuex';
import pinyin from 'pinyin';
import createDialog from './create_project_dialog';

export default{
  components: {createDialog},
  data () {
    return {
      isCreateDgShow: false,
      isOtherListShow: false,
      projectBeingProcessed: {},
      isDeleting: false,
      isDeleteDgShow: false
    };
  },
  computed: {
    ...mapState(['currentProject', 'projectList']),
    otherProject () {
      return this.sortByName(this.projectList.filter(
        item => item.pj_id !== this.currentProject.pj_id
      ));
    },
    isHover () {
      return this.projectBeingProcessed.pj_id
        ? {[this.projectBeingProcessed.pj_id]: true}
        : {};
    }
  },
  methods: {
    switchProject (project) {
      this.$store.dispatch('switchProject', project);
    },
    hideOtherList () {
      // 如果是编辑操作，则不执行隐藏
      if (!this.isCreateDgShow && !this.isDeleteDgShow) {
        this.isOtherListShow = false;
        this.projectBeingProcessed = {};
      }
    },
    closeCreateDg () {
      this.isCreateDgShow = false;
      this.projectBeingProcessed = {};
    },
    editProject (item) {
    // this.projectBeingProcessed = item;
      this.isCreateDgShow = true;
    },
    deleteProject (item) {
      this.projectBeingProcessed = {}; // 清空当前操作信息
      this.isDeleteDgShow = true;
      this.$confirm('删除“' + item.name + '”项目，将同时删除该项目下所有数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        const params = {
          pj_id: item.pj_id
        };
        this.$http.post(url.deleteProject, params)
          .then(() => {
            this.$message.success('删除成功');
            // 更新列表，如果是当前项目，删除了跳到下一个
            this.$http.post(url.getProjectList, {})
              .then(res => {
                let result = res.body.result;
                this.$store.dispatch('setProjectList', result);
                if (item.pj_id === this.$store.state.currentProject.pj_id) {
                  this.$store.dispatch('switchProject', this.$store.state.projectList[0]);
                }
              })
              .catch(() => {
                this.$message.error('获取项目信息失败');
              })
            this.isDeleteDgShow = false;
          })
          .catch(() => {
            this.$message.error('删除项目失败');
          })
      }).catch(() => {
        this.isDeleteDgShow = false;
      })
    },
    sortByName (projectList) {
      // # TODO: pinyin需要转成低版本浏览器支持的代码
      // 按数字排序，然后按字母（中文取拼音首字母）排序，其他标点符号等直接放最后
      const getFirstLetterChar = (word) => pinyin(word)[0][0].toLowerCase().charCodeAt(0);
      const isBeginWithLowerLetter = (word) => {
        let asciiValue = getFirstLetterChar(word);
        return asciiValue >= 97 && asciiValue <= 122;
      };
      const isBeginWithNum = (word) => !isNaN(parseInt(word, 10));
      const numProjects = projectList.filter(project => isBeginWithNum(project.name));
      const caseProjects = projectList.filter(project => !isBeginWithNum(project.name) &&
          isBeginWithLowerLetter(project.name));
      const otherProjects = projectList.filter(project => !isBeginWithNum(project.name) &&
          !isBeginWithLowerLetter(project.name));
      const sortedNumProjects = numProjects.sort(
        (a, b) => a.name.slice(0, 1) - b.name.slice(0, 1)
      );
      const sortedCaseProjects = caseProjects.sort((a, b) =>
        getFirstLetterChar(a.name) - getFirstLetterChar(b.name)
      );
      return sortedNumProjects.concat(sortedCaseProjects).concat(otherProjects);
    },
    handleMoreClick (item) {
      this.projectBeingProcessed = this.projectBeingProcessed === item ? {} : item;
    },
    handleOtherListClick () {
      this.projectBeingProcessed = {}; // 关闭popover
      this.isOtherListShow = !this.isOtherListShow;
    }
  },
  directives: {
    'click-outside': {
      inserted: (el, binding, vnode) => {
        this.documentHandler = (e) => {
          if (!el.contains(e.target)) {
            if (binding.expression) {
              vnode.context[binding.expression]();
            }
          }
        };
        document.addEventListener('click', this.documentHandler);
      },
      unbind: () => {
        document.removeEventListener('click', this.documentHandler);
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/ui";
  @import "../../assets/css/variable";

  $list-height: #{$item-height * 5.5};
  .select-container {
    .current {
      background-color: $main-color;

      .more-icon:hover {
        color: $sidebar-bg-color;
      }
    }
    .project-list {
      position: absolute;
      z-index: 1;
      width: $sidebar-width;
      background-color: #F8F8F8;
      color: #333;
      //box-shadow: 2px 6px 11px rgba(0, 0, 0, .4);
      box-shadow: 0 1px 20px $main-color;

      ul {
        max-height: $list-height;
        overflow: auto;

        li {
          width: 100%;
        }
      }

      hr {
        width: 86%;
        margin: 6px auto;
        border: 1px solid #E7E7E7;
      }

      .sidebar-item:hover {
        background-color: #EEE;
      }
    }

    .el-icon-plus {
      font-weight: bold;
    }

    .fa-home {
      font-size: 18px;
    }
  }
</style>
