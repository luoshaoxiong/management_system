<template>
  <div class="home">
    <div class="header-box relative">
      <filter-bar :data="pageData" @get-data="getData"></filter-bar>
      <el-button type="primary" @click="openAddQueDg('add')">添加问答</el-button>
    </div>
    <qa-table :page-data="pageData" :table-data="tableData" :total="total" @open-dg="viewDetails" @update-list="getData"></qa-table>
    <add-question-dg v-if="isAddQueDgShow" :current-data="currentDetails" :type="queDgType" @close="closeAddQueDg" @update-list="getData"></add-question-dg>
  </div>
</template>

<script type="text/ecmascript-6">
//import url from '@/services/api';
import {getQuestionList} from '@/utils/data/library';
import filterBar from './filter_bar';
import qaTable from './question_answer_table';
import addQuestionDg from './add_question_dialog';

export default{
  components: {filterBar, qaTable, addQuestionDg},
  props: {
    pageData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      total: 10,
      isAddQueDgShow: false,
      queDgType: 'add',
      currentDetails: {},
      tableData: []
    };
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      // const params = {
      //   pj_id: this.$store.state.currentProject.pj_id,
      //   cls: this.pageData.cls,
      //   status: this.pageData.status,
      //   search_type: this.pageData.searchType,
      //   search_word: this.pageData.searchWord,
      //   sort_type: this.pageData.sortType,
      //   reverse: this.pageData.reverse,
      //   page_number: this.pageData.pageIndex,
      //   per_page: this.pageData.pageSize
      // };
      // this.$http.post(url.getQuestionList, params)
      //   .then(res => {
      //     const result = res.body.result;
      //     this.tableData = result;
      //   })
      //   .catch(() => {
      //     this.$message.error('获取列表数据失败');
      //   })
      getQuestionList(this.pageData.classification, this.pageData.status)
        .then(res => {
          this.tableData = res;
        })
        .catch(() => {
          this.$message.error('获取列表数据失败');
        })
    },
    openAddQueDg (type) {
      this.queDgType = type;
      this.isAddQueDgShow = true;
    },
    viewDetails (data) {
      this.currentDetails = data;
      this.openAddQueDg('edit');
    },
    closeAddQueDg () {
      this.isAddQueDgShow = false;
      this.currentDetails = {};
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .home {
    .header-box {
      margin-bottom: 24px;

      button {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
</style>
