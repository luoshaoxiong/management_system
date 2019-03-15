<template>
  <div class="filter-bar">
    <div class="radio-group">
      <div class="form-line clearfix">
        <label class="label">分类：</label>
        <el-radio-group v-model="data.classification" size="small" @change="changeFilter">
          <el-radio-button :label="-1">全部</el-radio-button>
          <template v-for="(item, index) in classifications">
            <el-radio-button :label="index" :key="index">{{item}}</el-radio-button>
          </template>
        </el-radio-group>
      </div>
      <div class="form-line clearfix">
        <label class="label">状态：</label>
        <el-radio-group v-model="data.status" size="small" @change="changeFilter">
          <el-radio-button :label="-1">全部</el-radio-button>
          <template v-for="(item, index) in statusOptions">
            <el-radio-button :label="1 - index" :key="index">{{item}}</el-radio-button>
          </template>
        </el-radio-group>
      </div>
    </div>
    <div class="search-input">
      <el-input :placeholder="placeholders[data.searchType]" v-model="data.searchWord" class="input-with-select" @keyup.enter.native="search">
        <el-select v-model="data.searchType" slot="prepend" placeholder="请选择">
          <template v-for="(item, index) in type">
            <el-option :label="item" :value="index" :key="index"></el-option>
          </template>
        </el-select>
        <span slot="suffix" class="search-icon el-input__icon el-icon-search" @click="search"></span>
      </el-input>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      classifications: this.$store.state.currentProject.cls,
      statusOptions: ['生效中', '未生效'],
      type: {question: '问题', answer: '答案', all: '不限'},
      placeholders: {question: '请输入问题', answer: '请输入答案', all: '请输入问题或答案'}
    };
  },
  methods: {
    changeFilter () {
      this.$emit('get-data');
    },
    search () {
      this.$message.warning('搜索功能暂不可用');
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/css/variable";

  .filter-bar {
    .radio-group {
      padding: 20px;
      background-color: #F2F2F2;
      margin-bottom: 24px;

      .form-line {
        height: $main-height;
        line-height: $main-height;
        margin-bottom: 10px;

        &:last-of-type {
          margin-bottom: 0;
        }

        $label-width: 56px;
        .label {
          float: left;;
          width: $label-width;
          text-align: right;
          margin-right: 16px;
        }
      }
    }

    .search-input {
      width: 480px;

      .search-icon {
        cursor: pointer;

        &:hover {
          color: $main-color;
        }
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .filter-bar {
    .search-input {
      .el-select {
        .el-input {
          width: 80px;
        }
      }
    }
  }
</style>
