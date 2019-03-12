<template>
  <form-dialog
    :title="isEdit ? '编辑项目' : '创建项目'"
    :certain-btn-text="isEdit ? '保存' : '创建'"
    :is-submitting="isSubmitting"
    @close="beforeClose()"
    @submit="beforeSubmit()"
  >
    <div class="form-line">
      <label>项目名称：</label>
      <v-input ref="nameInput" v-model="projectName.value" placeholder="请输入项目名称"></v-input>
      <p class="error-tip" v-if="projectName.isOverCharLimit">项目名称不可超过 {{projectName.charLimit}} 个字符</p>
      <p class="error-tip" v-if="projectName.verificationTip">{{projectName.verificationTip}}</p>
    </div>
    <div class="form-line">
      <label>项目代号：</label>
      <v-input ref="codeInput" v-model="projectCode.value" placeholder="请输入项目代号"></v-input>
      <p class="error-tip" v-if="projectCode.isOverCharLimit">项目代号不可超过 {{projectCode.charLimit}} 个字符</p>
      <p class="error-tip" v-if="projectCode.verificationTip">{{projectCode.verificationTip}}</p>
    </div>
  </form-dialog>
</template>

<script type="text/ecmascript-6">
import url from '@/services/api';
import vInput from '@/components/input';
import formDialog from '@/components/form_dialog';

export default {
  components: {vInput, formDialog},
  props: {
    project: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data () {
    return {
      projectName: {
        value: this.project.name || '',
        charLimit: 20,
        verificationTip: '',
        isOverCharLimit: false
      },
      projectCode: {
        value: this.project.code || '',
        charLimit: 20,
        verificationTip: '',
        isOverCharLimit: false
      },
      isSubmitting: false
    };
  },
  watch: {
    'projectName.value' (val) {
      this.projectName.isOverCharLimit = val.length > this.projectName.charLimit;
      if (this.projectName.isOverCharLimit) {
        this.projectName.verificationTip = '';
      }
    },
    'projectCode.value' (val) {
      this.projectCode.isOverCharLimit = val.length > this.projectCode.charLimit;
      if (this.projectCode.isOverCharLimit) {
        this.projectCode.verificationTip = '';
      }
    }
  },
  computed: {
    isEdit () {
      return this.project.name;
    }
  },
  mounted () {
    setTimeout(() => this.$refs.nameInput.$children[0].focus(), 0);
  },
  methods: {
    beforeClose () {
      setTimeout(() => this.$emit('close'), 0); // 此处延迟是为了不触发项目列表隐藏
    },
    beforeSubmit () {
      if (this.project.name && this.projectName === this.project.name) {
        this.beforeClose();
      } else if (!this.projectName.isOverCharLimit && !this.projectCode.isOverCharLimit) {
        if (this.projectName.value.trim() === '') {
          this.projectName.verificationTip = '项目名称不能为空或连续空格';
          this.$refs.nameInput.$children[0].focus();
        } else if (this.isValueExisting(this.projectName.value, 'name')) {
          this.projectName.verificationTip = '项目名称已存在';
          this.$refs.nameInput.$children[0].focus();
        } else if (this.projectCode.value.trim() === '') {
          this.projectCode.verificationTip = '项目代号不能为空或连续空格';
          this.$refs.codeInput.$children[0].focus();
        } else if (this.isValueExisting(this.projectCode.value, 'code')) {
          this.projectCode.verificationTip = '项目代号已存在';
          this.$refs.codeInput.$children[0].focus();
        } else {
          if (this.isEdit) {
            this.update(
              this.project.pj_id,
              this.projectName.value,
              this.projectCode.value
            );
          } else {
            this.create(this.projectName.value, this.projectCode.value);
          }
        }
      }
    },
    isValueExisting (value, key) {
      if (this.isEdit && value === this.project[key]) {
        return false;
      } else {
        return this.$store.state.projectList.some(item => item[key] === value);
      }
    },
    create (name, code) {
      this.isSubmitting = true;
      const params = {
        name: name,
        code: code
      };
      this.$http.post(url.createProject, params)
        .then(res => {
          this.$message.success('创建成功');
          const newProject = {pj_id: res.body.result.pj_id, name: name, code: code};
          this.$http.post(url.getProjectList, {})
            .then(res => {
              // 创建完成，切换到新的项目页面
              let result = res.body.result;
              this.$store.dispatch('setProjectList', result);
              this.$store.dispatch('switchProject', newProject);
              this.isSubmitting = false;
              this.beforeClose();
            })
            .catch(() => {
              this.$message.error('获取项目信息失败');
            })
        })
        .catch(() => {
          this.$message.error('创建项目失败');
          this.isSubmitting = false;
        })
    },
    update (id, name, code) {
      this.isSubmitting = true;
      const params = {
        pj_id: id,
        name: name,
        code: code
      };
      this.$http.post(url.updateProject, params)
        .then(res => {
          this.$message.success('编辑成功');
          // 刷新项目列表
          this.$http.post(url.getProjectList, {})
            .then(res => {
              let result = res.body.result;
              this.$store.dispatch('setProjectList', result);
              this.$store.dispatch('switchProject', result.filter(item => item.pj_id === id)[0]);
              this.isSubmitting = false;
              this.beforeClose();
            })
            .catch(() => {
              this.$message.error('获取项目信息失败');
            })
        })
        .catch(() => {
          this.$message.error('编辑项目失败');
          this.isSubmitting = false;
        })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/variable";

  $label-width: 100px;
  $label-right: 10px;
  main {
    padding-right: 40px;

    label {
      float: left;
      width: $label-width;
      margin-right: $label-right;
      height: $main-height;
      line-height: $main-height;
      text-align: right;
    }

    .el-input {
      width: calc(100% - #{$label-width + $label-right});
    }

    .error-tip {
      margin: 10px 0 -10px 0;
      padding-left: (#{$label-width + $label-right});
      color: $error-color;
    }
  }

  footer {
    margin: 30px 0 0 0;
    padding-left: (#{$label-width + $label-right});

    button:nth-of-type(1) {
      margin-right: 20px;
    }
  }
</style>
