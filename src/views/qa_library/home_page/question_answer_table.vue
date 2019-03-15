
<template>
  <div class="clearfix">
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 25px"
      @sort-change="sortChange"
    >
      <el-table-column
        prop="time"
        label="更新时间"
        sortable="custom"
        :sort-orders="['descending', 'ascending']"
        :resizable="false"
        align="center"
        width="150">
        <template scope="scope">
          {{scope.row.time | formatTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="问题"
        :resizable="false"
        align="center">
        <template scope="scope">
          <span class="link ellipsis" :title="scope.row.question" @click="openDialog(scope.row)">{{scope.row.question}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="答案"
        :resizable="false"
        align="center">
        <template scope="scope">
          <span class="ellipsis" :title="scope.row.answer">{{scope.row.answer}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        :resizable="false"
        align="center"
        width="100">
        <template scope="scope">
          <span>{{classifications[scope.row.cls]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="favorite_num"
        label="收藏数"
        sortable="custom"
        :sort-orders="['descending', 'ascending']"
        :resizable="false"
        align="center"
        width="90">
      </el-table-column>
      <el-table-column
        prop="upvoted_num"
        label="点赞数"
        sortable="custom"
        :sort-orders="['descending', 'ascending']"
        :resizable="false"
        align="center"
        width="90">
      </el-table-column>
      <el-table-column
        label="状态"
        :resizable="false"
        align="center"
        width="80">
        <template scope="scope">
          <span v-show="scope.row.status === false" style="color: #F00;">未生效</span>
          <span v-show="scope.row.status === true">生效中</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="110"
        :resizable="false"
        align="center">
        <template slot-scope="scope">
          <span class="link edit-btn" @click="openDialog(scope.row, 'edit')">编辑</span>
          <span class="link delete-btn" @click="deleteData(scope.row.qid)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="tableData.length">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.pageIndex"
        :page-sizes="pageData.pageSizes"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import formatTime from '@/utils/filters/format_time';
import {deleteQuestion} from "@/utils/data/library";

export default{
  props: {
    total: {
      type: Number,
      required: true
    },
    pageData: {
      type: Object,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      classifications: this.$store.state.currentProject.cls
    };
  },
  methods: {
    handleCurrentChange (page) {
      this.pageData.pageIndex = page;
      this.$emit('get-data');
    },
    handleSizeChange (size) {
      this.pageData.pageSize = size;
      this.$emit('get-data');
    },
    sortChange (arg) {
      // {column: {}, prop: "time", order: "ascending/descending"}
      this.pageData.sortType = arg.prop;
      this.pageData.reverse = arg.order === 'descending';
      this.$emit('get-data');
    },
    openDialog (data) {
      this.$emit('open-dg', data);
    },
    deleteData (qid) {
      this.$confirm('删除数据后将不可恢复，确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        deleteQuestion(qid)
          .then(res => {
            this.$message.success('删除成功');
            this.$emit('update-list');
          })
          .catch(err => {
            this.$message.error('删除失败');
          })
      }).catch(() => {})
    }
  },
  filters: {
    formatTime
  }
}
</script>
