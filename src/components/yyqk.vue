<template>
  <div class="yyqk_box">
    <header class="header left">
      <div class="left nav">
        <ul>
          <li>
            <i class="nav_1"></i>

            <router-link :to="{path:'/home'}">首页</router-link>
          </li>
          <li>
            <i class="nav_2"></i>

            <router-link :to="{path:'/quota'}">指标分析</router-link>
          </li>
          <li>
            <i class="nav_3"></i>

            <router-link :to="{path:'/trend'}">趋势分析</router-link>
          </li>
        </ul>
      </div>
      <div class="header_center left" style="position:relative">
        <h2>
          <strong>牡丹江市妇幼保健院 - 院长数据查询</strong>
        </h2>
      </div>
      <div class="right nav text_right" style="text-align:left">
        <ul>
          <li>
            <i class="nav_3"></i>
            <router-link :to="{path:'/drgs'}">DRGS首页</router-link>
          </li>
          <li class="nav_active">
            <i class="nav_5"></i>
            <router-link :to="{path:'/yyqk'}">医院运营情况</router-link>
          </li>
        </ul>
      </div>
    </header>
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left" @click.native="day()">日报表</el-radio-button>
      <el-radio-button label="middle" @click.native="month()">月报表</el-radio-button>
      <el-radio-button label="right" @click.native="year()">年报表</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <h1>医院运营情况</h1>
    <!--<p class="border">日期表</p>-->
    <el-form :label-position="labelPosition" label-width="110px" :model="formLabelAlign">
      <el-form-item label="门诊医疗收入:">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="门诊药品收入:">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="住院医疗收入:">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="入院人数:">
        <el-input v-model="formLabelAlign.Number"></el-input>
      </el-form-item>
      <el-form-item label="出院人数:">
        <el-input v-model="formLabelAlign.hospita"></el-input>
      </el-form-item>
      <el-form-item label="住院医疗收入:">
        <el-input v-model="formLabelAlign.lization"></el-input>
      </el-form-item>
      <el-form-item label="在院人数:">
        <el-input v-model="formLabelAlign.Inhospital"></el-input>
      </el-form-item>
      <el-form-item label="床位使用率:">
        <el-input v-model="formLabelAlign.Bed"></el-input>
      </el-form-item>
      <el-form-item label="手术量:">
        <el-input v-model="formLabelAlign.Operativevolume"></el-input>
      </el-form-item>
      <el-form-item label="门诊人次:">
        <el-input v-model="formLabelAlign.Outpatientvisits"></el-input>
      </el-form-item>
      <el-form-item class="red_color" label="医疗收入合计:">
        <el-input v-model="formLabelAlign.type1"></el-input>
      </el-form-item>
      <el-form-item class="red_color" label="药品收入合计:">
        <el-input v-model="formLabelAlign.Medicalincome"></el-input>
      </el-form-item>
      <el-form-item class="red_color" label="药占比:">
        <el-input v-model="formLabelAlign.drug"></el-input>
      </el-form-item>
      <el-form-item class="red_color" label="收入合计:">
        <el-input v-model="formLabelAlign.type2"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
var api = "/service/dailyReportService";

export default {
  data() {
    return {
      getlist:{},
      labelPosition: "left",
      formLabelAlign: {
        name: "ddd",
        region: "",
        type: "",
        Number: "",
        hospita: "",
        lization: "",
        Inhospital: "",
        Bed: "",
        Operativevolume: "",
        Outpatientvisits: "",
        Medicalincome: "",
        drug: "",
        income: ""
      }
    };
  },
  methods: {
    nav(url) {
      this.$router.push({ path: url });
    },
    fetchData() {
      var api = "/service/dailyReportService";
      this.axios.post(api).then(response => {
        if (response.data.code === 0) {
          const resp = response.data.data;
          console.log('11',resp);
          this.getlist = resp;
          this.formLabelAlign.name = resp.dayCyrs;

        }
      });
    },
    day() {
      this.formLabelAlign.name = this.getlist.dayCyrs;
    },
    month() {
      this.formLabelAlign.name = this.getlist.dayCyrs;
    },
    year() {
       this.formLabelAlign.name = this.getlist.dayCyrs;
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style>
.yyqk_box .el-radio-group {
  width: 100%;
  margin: 16px auto;
  text-align: center;
}
.yyqk_box .el-form {
  text-align: center;
  width: 500px;
  margin: 0 auto;
}
.yyqk_box p {
  width: 72%;
  text-align: center;
  height: 47px;
  color: #606266;
}
.yyqk_box h1 {
  font-weight: bold;
  text-align: center;
  height: 50px;
}
.yyqk_box .el-form--label-left .el-form-item__label {
  text-align: right;
}
.red_color .el-form-item__label {
  color: red;
}
</style>