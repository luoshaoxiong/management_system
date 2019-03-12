<template>
  <form-dialog
    class="add-question-dg"
    :title="isEdit ? '编辑问答' : '添加问答'"
    :certain-btn-text="isEdit ? '保存' : '添加'"
    :is-submitting="isSubmitting"
    width="720px"
    @close="beforeClose()"
    @submit="beforeSubmit()"
  >
    <div class="form-line clearfix">
      <label class="label">分类：</label>
      <el-radio-group v-model="data.cls" size="small">
        <template v-for="(item, index) in classifications">
          <el-radio-button :label="index">{{item}}</el-radio-button>
        </template>
      </el-radio-group>
    </div>
    <div class="form-line clearfix">
      <label class="label">问题：</label>
      <v-input ref="input" v-model="data.question" placeholder="请输入问题"></v-input>
      <p class="error-tip" v-show="isQueOverCharLimit">问题不可超过 {{queCharLimit}} 个字符</p>
      <p class="error-tip" v-show="!isQueOverCharLimit && queVerificationTip">{{queVerificationTip}}</p>
    </div>
    <div class="form-line clearfix">
      <label class="label">答案：</label>
      <v-input type="textarea" :rows="8.5" v-model="data.answer" placeholder="请输入答案"></v-input>
      <p class="error-tip" v-show="isAnsOverCharLimit">答案不可超过 {{ansCharLimit}} 个字符</p>
      <p class="error-tip" v-show="!isAnsOverCharLimit && ansVerificationTip">{{ansVerificationTip}}</p>
    </div>
    <div class="form-line clearfix">
      <label class="label">有效期：</label>
      <div class="start-time">
        <el-date-picker
          v-model="data.start"
          type="datetime"
          :editable="false"
          placeholder="生效时间，为空表示即时生效">
        </el-date-picker>
      </div>
      <span class="joiner">-</span>
      <div class="end-time">
        <el-date-picker
          v-model="data.end"
          type="datetime"
          :editable="false"
          placeholder="失效时间，为空表示生效后永不失效">
        </el-date-picker>
      </div>
      <p class="error-tip" v-show="isTimeError">生效时间不可大于失效时间</p>
    </div>
  </form-dialog>
</template>

<script type="text/ecmascript-6">
import formDialog from '@/components/form_dialog';
import vInput from '@/components/input';
import url from '@/services/api';

export default{
  components: {formDialog, vInput},
  props: {
    type: {
      type: String
    },
    currentData: {
      type: Object
    }
  },
  data () {
    return {
      queCharLimit: 50,
      isQueOverCharLimit: false,
      queVerificationTip: '',
      ansCharLimit: 5000,
      isAnsOverCharLimit: false,
      ansVerificationTip: '',
      isSubmitting: false,
      data: this.type === 'edit'
        ? this.currentData
        : {
          cls: 0,
          question: '',
          answer: '',
          start: '',
          end: ''
        },
      originalJSON: '',
      classifications: ['分类一', '分类二', '分类三']
    };
  },
  watch: {
    'data.question' (val) {
      this.isQueOverCharLimit = val.length > this.queCharLimit;
      if (this.isQueOverCharLimit) {
        this.queVerificationTip = '';
      }
    },
    'data.answer' (val) {
      this.isAnsOverCharLimit = val.length > this.ansCharLimit;
      if (this.isAnsOverCharLimit) {
        this.ansVerificationTip = '';
      }
    }
  },
  computed: {
    isEdit () {
      return this.type === 'edit';
    },
    isTimeError () {
      return this.data.start && this.data.end && this.data.start > this.data.end;
    }
  },
  created () {
    this.init();
  },
  mounted () {
    setTimeout(() => this.$refs.input.$children[0].focus(), 0);
  },
  methods: {
    init () {
      this.originalJSON = JSON.stringify(this.data); // 用于判断内容是否变更
    },
    beforeClose () {
      if (JSON.stringify(this.data) === this.originalJSON) {
        this.close();
      } else {
        this.$confirm('此弹窗有编辑内容未保存，是否关闭该弹窗', '提示', {
          confirmButtonText: '关闭',
          cancelButtonText: '取消',
          closeOnClickModal: false
        }).then(() => {
          this.close();
        }).catch(() => {})
      }
    },
    close () {
      this.$emit('close');
    },
    beforeSubmit () {
      if (!this.isQueOverCharLimit && !this.data.question) {
        this.queVerificationTip = '问题不能为空';
      } else if (!this.isAnsOverCharLimit && !this.data.answer) {
        this.ansVerificationTip = '答案不能为空';
      } else if (!this.isTimeError) {
        if (JSON.stringify(this.data) === this.originalJSON) {
          this.close();
        } else {
          if (this.isEdit) {
            this.update();
          } else {
            this.create();
          }
        }
      }
    },
    create (name) {
      this.isSubmitting = true;
      const params = {
        pj_id: this.$store.state.currentProject.pj_id,
        cls: this.data.cls,
        question: this.data.question,
        answer: this.data.answer,
        start: this.getTimestamp(this.data.start),
        end: this.getTimestamp(this.data.end)
      };
      this.$http.post(url.addQuestion, params)
        .then(res => {
          this.originalJSON = JSON.stringify(this.data);
          this.$message.success('添加成功');
          this.$emit('update-list');
          this.isSubmitting = false;
          this.beforeClose();
        })
        .catch(() => {
          this.$message.error('添加失败');
          this.isSubmitting = false;
        })
    },
    update (id, name) {
      this.isSubmitting = true;
      const params = {
        pj_id: this.$store.state.currentProject.pj_id,
        cls: this.data.cls,
        question: this.data.question,
        answer: this.data.answer,
        start: this.getTimestamp(this.data.start),
        end: this.getTimestamp(this.data.end)
      };
      this.$http.post(url.updateQuestion, params)
        .then(res => {
          this.originalJSON = JSON.stringify(this.data);
          this.$message.success('编辑成功');
          this.$emit('update-list');
          this.isSubmitting = false;
          this.beforeClose();
        })
        .catch(() => {
          this.$message.error('编辑失败');
          this.isSubmitting = false;
        })
    },
    getTimestamp (timeStr) {
      return +new Date(timeStr);
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .label {
    width: 70px!important;
  }

  .error-tip {
    text-align: right;
  }

  .start-time,
  .end-time {
    float: left;
  }

  .end-time + .error-tip {
    float: right;
  }

  .start-time > div,
  .end-time > div {
    width: 270px!important;
  }

  .joiner {
    width: 20px;
    display: inline-block;
    text-align: center;
    float: left;
    height: 35px;
    line-height: 35px;
    font-size: 28px;
    color: #CCC;
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .add-question-dg {
    main.form-dialog-content {
      .el-input,
      .el-textarea {
        width: calc(100% - 80px);
      }

      .el-input--prefix .el-input__inner {
        padding-right: 0;
      }
    }

    footer.form-dialog-footer {
      text-align: right;
      padding-right: 40px;
    }
  }
</style>
