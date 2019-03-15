<template>
  <div class="home">
    <div class="header-box relative">
      <filter-bar :data="pageData"></filter-bar>
      <el-button type="primary" @click="openAddQueDg('add')">添加问答</el-button>
    </div>
    <qa-table :page-data="pageData" :table-data="tableData" :total="total" @open-dg="viewDetails"></qa-table>
    <add-question-dg v-if="isAddQueDgShow" :current-data="currentDetails" :type="queDgType" @close="closeAddQueDg"></add-question-dg>
  </div>
</template>

<script type="text/ecmascript-6">
import url from '@/services/api';
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
      this.tableData = [
        {
          qid: '1',
          time: +new Date(),
          question: '测试',
          answer: '答案',
          cls: 2,
          favorite_num: 100,
          upvoted_num: 100,
          status: 0,
          start: +new Date(),
          end: +new Date()
        },
        {
          qid: '2',
          time: +new Date(),
          question: '这是一个问题',
          answer: '这是一个答案',
          cls: 1,
          favorite_num: 100,
          upvoted_num: 100,
          status: 1,
          start: +new Date(),
          end: +new Date()
        }
      ];
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
