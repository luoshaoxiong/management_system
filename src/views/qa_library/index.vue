<template>
  <div class="body-container">
    <home-page :page-data="homePageData"></home-page>
    <!--<question-page v-if="$route.query.page === 'question'" :show="true" :page-data="quePageData"></question-page>-->
    <!--<answer-page v-if="$route.query.page === 'answer'" :show="true" :page-data="ansPageData"></answer-page>-->
    <!--<comment-page v-if="$route.query.page === 'comment'" :show="true" :page-data="commentPageData"></comment-page>-->
  </div>
</template>

<script type="text/ecmascript-6">
import homePage from './home_page/index';
// import questionPage from './question_page/index';
// import answerPage from './answer_page/index';
// import commentPage from './comment_page/index'giu;
import {DefaultPage} from './config';

export default{
  components: {homePage},
  data () {
    return {
      homePageData: {
        classification: -1,
        status: -1,
        searchType: 'question', // 'question/answer/all'
        searchWord: '',
        sortType: 'time',
        reverse: true,
        pageIndex: 1,
        pageSize: DefaultPage.pageSize,
        pageSizes: DefaultPage.pageOptions
      },
      quePageData: {
        searchWord: '',
        sortType: 0,
        pageIndex: 1,
        pageSize: DefaultPage.pageSize,
        pageSizes: DefaultPage.pageOptions
      },
      ansPageData: {
        searchWord: '',
        sortType: 0,
        pageIndex: 1,
        pageSize: DefaultPage.pageSize,
        pageSizes: DefaultPage.pageOptions
      },
      commentPageData: {
        searchWord: '',
        sortType: 0,
        pageIndex: 1,
        pageSize: DefaultPage.pageSize,
        pageSizes: DefaultPage.pageOptions
      }
    };
  },
  methods: {
  }
}
</script>
