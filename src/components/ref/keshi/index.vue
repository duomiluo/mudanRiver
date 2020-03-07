<template>
  <div>
    <el-dialog title="科室" :visible.sync="keshirefVisible" width="50%">
      <el-form ref="ruleForm" :inline="true" :model="searchData" style="margin-top:20px">
        <el-form-item label="机构" prop="jigou">
          <el-select v-model="searchData.jigou" placeholder="机构">
            <el-option
              v-for="option in payTypeOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科室分组" prop="fenzu">
          <el-select v-model="searchData.fenzu" placeholder="科室分组">
            <el-option
              v-for="option in keshifenzuOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拼音码" prop="pinyin">
          <el-input v-model="searchData.pinyin" placeholder="拼音码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
          <el-button type="primary" @click="formSubmit('ruleForm')">确定</el-button>
          <el-button type="primary" @click="keshirefVisible = false">取消</el-button>
        </el-form-item>
      </el-form>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loadDataV"
      >
        <el-table-column prop="id" type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="科室名称" align="center"></el-table-column>
        <el-table-column prop="jgName" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="ksFz" label="科室分组" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
      </el-table>

      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </el-dialog>
  </div>
</template>
<script>
const payTypeOptions = [
  { type: "1", name: "全部" },
  { type: "2", name: "北京京煤集团总医院" }
];
const keshifenzuOptions = [
  { type: "1", name: "全部" },
  { type: "2", name: "内科组" },
  { type: "3", name: "外科组" }
];
export default {
  data() {
    return {
      loadDataV: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      keshirefVisible: false,
      tableData: [],
      payTypeOptions,
      keshifenzuOptions,
      multipleSelection: [],
      searchData: {
        jigou: "",
        fenzu: "",
        pinyin: ""
      }
    };
  },
  methods: {
    init() {
      this.keshirefVisible = true;
      this.getKeshiData(this.searchData);
    },
    getKeshiData(searchData) {
      this.loadDataV = true;
      this.axios({
        url: `/drg/getkeshiData/${this.currentPage}/${this.pageSize}`,
        method: "post",
        data: searchData
      }).then(response => {
        if (response.data.code == 2000) {
          this.tableData = response.data.data.rows;
          this.total = response.data.data.total;
          console.log("获取数据", response.data.data.rows);
        } else {
        }
        this.loadDataV = false;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("选中数据", this.multipleSelection);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    fetchData() {
      this.getKeshiData(this.searchData);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    formSubmit() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择一行",
          type: "error"
        });
        return false;
      }
      this.$emit("getData", this.multipleSelection);
      this.keshirefVisible = false;
      //   console.log(this.multipleSelection);
    }
  }
};
</script>
<style scoped>
.el-input {
  width: 150px;
}
.el-select {
  width: 150px;
}
</style>