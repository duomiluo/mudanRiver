<template>
  <div>
    <el-dialog title="险种" :visible.sync="xianzhongrefVisible" width="50%">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="array"
        ref="tree"
        highlight-current
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xianzhongrefVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      xianzhongrefVisible: false,
      array: [],
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    init(data) {
      this.xianzhongrefVisible = true;
      this.getDrgData(data);
    },
    getDrgData(data) {
      const api = "/drg/drg";
      this.axios({
        method: "get",
        url: api
      }).then(response => {
        const code = response.data.code;
        if (response.data.code == 0) {
          this.data = response.data.list;
          this.array = [];
          for (var i = 0; i < this.data.length + 1; i++) {
            this.array.push(i);
          }
          console.log(this.array);
        }
      });
    },
    getCheckedKeys() {
        this.$emit("getData",this.$refs.tree.getCheckedNodes());
         this.xianzhongrefVisible = false;
    },
  }
};
</script>
<style scoped>
</style>