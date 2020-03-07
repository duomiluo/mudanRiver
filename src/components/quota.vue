<template>
  <div>
    <vue-alert-loading :title="title" :visible="visible" />
    <!--顶部-->
    <header class="header left">
      <div class="left nav">
        <ul>
          <li>
            <i class="nav_1"></i>
            <a @click="nav('/home')">首页</a>
          </li>
          <li class="nav_active">
            <i class="nav_2"></i>
            <a>指标分析</a>
          </li>
          <li>
            <i class="nav_3"></i>
            <a @click="nav('/trend')">趋势分析</a>
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
              <i class="nav_4"></i>
          <a @click="nav('/drgs')">DRGS首页</a>
         </li>
        </ul>
      </div>
    </header>
    <!--内容部分-->
    <div class="con left">
      <!--数据总概-->
      <div class="con_div">
        <!--全年医疗费用-->
        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <img src="../assets/images/info_7.png" class="left text01_img" />
            <div class="left text01_div">
              <p>全年住院收入(万元)</p>
              <p>{{hospitalizedFee.yearHospitalizedFee}}</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <img src="../assets/images/info_8.png" class="left text01_img" />
            <div class="left text01_div">
              <p>当月住院收入(万元)</p>
              <p>{{hospitalizedFee.monthHospitalizedFee}}</p>
            </div>
          </div>
        </div>
        <!--全年体检人数-->
        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <img src="../assets/images/info_9.png" class="left text01_img" />
            <div class="left text01_div">
              <p>全年门诊收入(万元)</p>
              <p class="sky">{{outpatientFee.yearOutpatientFee}}</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <img src="../assets/images/info_10.png" class="left text01_img" />
            <div class="left text01_div">
              <p>当月门诊收入(万元)</p>
              <p class="sky">{{outpatientFee.monthOutpatientFee}}</p>
            </div>
          </div>
        </div>
        <!--药占比-->
        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <img src="../assets/images/info_11.png" class="left text01_img" />
            <div class="left text01_div">
              <p>门诊药占比</p>
              <p class="org">{{yzbMz}}</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <img src="../assets/images/info_12.png" class="left text01_img" />
            <div class="left text01_div">
              <p>住院药占比</p>
              <p class="org">{{yzbZy}}</p>
            </div>
          </div>
        </div>
      </div>

      <!--统计分析图-->
      <div class="div_any">
        <div class="left div_any01">
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_5.png" />门诊就诊人次(人)
            </div>
            <p id="OutpatientAmountChart" class="p_chart"></p>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_6.png" />住院人次(人)
            </div>
            <p id="HospitalizedAmountChart" class="p_chart"></p>
          </div>
        </div>
        <div class="left div_any01">
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_7.png" />门诊收入排行(万元)
            </div>
            <p id="OutpatientIncomeRankingChart" class="p_chart"></p>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_8.png" />住院收入排行(万元)
            </div>
            <p id="HospitalizedIncomeRankingChart" class="p_chart"></p>
          </div>
        </div>
        <div class="left div_any01">
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_9.png" />药占比(%)
            </div>
            <p id="DepartmentYzbChart" class="p_chart"></p>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_10.png" />平均住院天数(天)
            </div>
            <p id="AverageOfStayChart" class="p_chart"></p>
          </div>
        </div>
        <div class="left div_any01">
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_11.png" />手术工作量(台)
            </div>
            <p id="OperationWorkloadChart" class="p_chart"></p>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_12.png" />床位数量分布(床)
            </div>
            <p id="BedDistributionChart" class="p_chart"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      title: "数据加载中，请稍候...",
      visible: true,
      yzbMz: "0%",
      yzbZy: "0%",
      hospitalizedFee: { yearHospitalizedFee: 0, monthHospitalizedFee: 0 },
      outpatientFee: { yearOutpatientFee: 0, monthOutpatientFee: 0 }
    };
  },
  methods: {
    drawOutpatientAmountChart(reportData) {
      var departments = [];
      var yAxis_data = [];

      for (var i = 0; i < reportData.length; i++) {
        departments.push(reportData[i].department);
        yAxis_data.push(reportData[i].amount);
      }

      var OutpatientAmountChart = echarts.init(
        document.getElementById("OutpatientAmountChart")
      );
      OutpatientAmountChart.setOption({
        title: {
          text: "门诊就诊人次",
          subtext: "（当月就诊人次）",
          textStyle: {
            color: "#87cefa"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value",
            boundaryGap: [0, 0.01],
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40,

              textStyle: {
                color: "#fff",
                fontSize: 13
              }
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            data: departments,
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
              formatter: function(value) {
                return value;
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: yAxis_data
          }
        ]
      });
    },
    drawHospitalizedAmountChart(reportData) {
      var departments = [];
      var yAxis_data = [];

      for (var i = 0; i < reportData.length; i++) {
        departments.push(reportData[i].department);
        yAxis_data.push(reportData[i].amount);
      }

      var HospitalizedAmountChart = echarts.init(
        document.getElementById("HospitalizedAmountChart")
      );
      HospitalizedAmountChart.setOption({
        title: {
          text: "住院人次",
          subtext: "（当月住院人次）",
          textStyle: {
            color: "#87cefa"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value",
            boundaryGap: [0, 0.01],
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40,

              textStyle: {
                color: "#fff",
                fontSize: 13
              }
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            data: departments,
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
              formatter: function(value) {
                return value;
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: yAxis_data
          }
        ]
      });
    },
    drawOperationWorkloadChart(reportData) {
      var legend_data = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        legend_data.push(reportData[i].department);
        series_data.push({
          value: reportData[i].amount,
          name: reportData[i].department
        });
      }

      var OperationWorkloadChart = echarts.init(
        document.getElementById("OperationWorkloadChart")
      );
      OperationWorkloadChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        title: {
          text: "手术工作量排行",
          subtext: "（当月）",
          textStyle: {
            color: "#87cefa"
          }
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: legend_data,
          textStyle: {
            color: "#ffffff"
          }
        },
        series: [
          {
            name: "手术工作量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: series_data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawBedDistributionChart(reportData) {
      var legend_data = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        legend_data.push(reportData[i].department);
        series_data.push({
          value: reportData[i].amount,
          name: reportData[i].department
        });
      }

      var BedDistributionChart = echarts.init(
        document.getElementById("BedDistributionChart")
      );
      BedDistributionChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: legend_data,
          textStyle: {
            color: "#ffffff"
          }
        },
        series: [
          {
            name: "床位数量分布",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: series_data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawAverageOfStayChart(reportData) {
      var xAxis_data = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        xAxis_data.push(reportData[i].department);
        series_data.push(reportData[i].average);
      }

      var AverageOfStayChart = echarts.init(
        document.getElementById("AverageOfStayChart")
      );
      AverageOfStayChart.setOption({
        color: ["#87cefa"],
        title: {
          text: "平均住院天数前4的科室",
          subtext: "（当月）",
          textStyle: {
            color: "#87cefa"
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}天"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: xAxis_data,
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40,

              textStyle: {
                color: "#fff",
                fontSize: 13
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
              formatter: function(value) {
                return value + "天";
              }
            }
          }
        ],
        series: [
          {
            name: "平均住院天数",
            type: "bar",
            barWidth: 30,
            data: series_data
          }
        ]
      });
    },
    drawDepartmentYzbChart(reportData) {
      var xAxis_data = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        xAxis_data.push(reportData[i].department);
        series_data.push(reportData[i].percent);
      }

      var DepartmentYzbChart = echarts.init(
        document.getElementById("DepartmentYzbChart")
      );
      DepartmentYzbChart.setOption({
        color: ["#87cefa"],
        title: {
          text: "药占比前4的科室",
          subtext: "（当月）",
          textStyle: {
            color: "#87cefa"
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}%"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: xAxis_data,
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40,

              textStyle: {
                color: "#fff",
                fontSize: 13
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
              formatter: function(value) {
                return value + "%";
              }
            }
          }
        ],
        series: [
          {
            name: "药占比",
            type: "bar",
            barWidth: 30,
            data: series_data
          }
        ]
      });
    },
    drawOutpatientIncomeRankingChart(reportData) {
      var legend_data = [];
      var years = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        legend_data.push(reportData[i].department);
        if (i == 0) {
          for (var j = 0; j < reportData[i].departmentIncomeList.length; j++) {
            years.push(reportData[i].departmentIncomeList[j].month);
          }
        }

        var series_data_data = [];
        for (var k = 0; k < reportData[i].departmentIncomeList.length; k++) {
          series_data_data.push(reportData[i].departmentIncomeList[k].totalFee);
        }

        series_data.push({
          name: reportData[i].department,
          type: "line",
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: "default" } } },
          data: series_data_data
        });
      }

      var OutpatientIncomeRankingChart = echarts.init(
        document.getElementById("OutpatientIncomeRankingChart")
      );
      OutpatientIncomeRankingChart.setOption({
        color: [
          "#87cefa",
          "#ff7f50",
          "#32cd32",
          "#da70d6",
          "#E82E4D",
          "#86562C"
        ],
        title: {
          text: "门诊收入前6的科室",
          subtext: "（近半年）",
          textStyle: {
            color: "#87cefa"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}万元"
        },
        legend: {
          data: legend_data,
          y: "bottom",
          x: "center",
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          containLabel: true
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: years,
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40,

              textStyle: {
                color: "#fff",
                fontSize: 13
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
              formatter: function(value) {
                return value + "万元";
              }
            }
          }
        ],
        series: series_data
      });
    },
    drawHospitalizedIncomeRankingChart(reportData) {
      var legend_data = [];
      var years = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        legend_data.push(reportData[i].department);
        if (i == 0) {
          for (var j = 0; j < reportData[i].departmentIncomeList.length; j++) {
            years.push(reportData[i].departmentIncomeList[j].month);
          }
        }

        var series_data_data = [];
        for (var k = 0; k < reportData[i].departmentIncomeList.length; k++) {
          series_data_data.push(reportData[i].departmentIncomeList[k].totalFee);
        }

        series_data.push({
          name: reportData[i].department,
          type: "line",
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: "default" } } },
          data: series_data_data
        });
      }

      var HospitalizedIncomeRankingChart = echarts.init(
        document.getElementById("HospitalizedIncomeRankingChart")
      );
      HospitalizedIncomeRankingChart.setOption({
        color: [
          "#87cefa",
          "#ff7f50",
          "#32cd32",
          "#da70d6",
          "#E82E4D",
          "#86562C"
        ],
        title: {
          text: "住院收入前6的科室",
          subtext: "（近半年）",
          textStyle: {
            color: "#87cefa"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}万元"
        },
        legend: {
          data: legend_data,
          y: "bottom",
          x: "center",
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          containLabel: true
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: years,
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40,

              textStyle: {
                color: "#fff",
                fontSize: 13
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#87cefa"
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
              formatter: function(value) {
                return value + "万元";
              }
            }
          }
        ],
        series: series_data
      });
    },
    pageLoad() {
      var api = "/service/quotapageService";

      this.axios
        .post(api)
        .then(response => {
          var code = response.data.code;

          if (code == 0) {
            this.yzbMz = response.data.data.yzbMz.percent;
            this.yzbZy = response.data.data.yzbZy.percent;
            this.hospitalizedFee = response.data.data.hospitalizedFee;
            this.outpatientFee = response.data.data.outpatientFee;

            this.drawOutpatientAmountChart(
              response.data.data.outpatientAmountList
            );
            this.drawHospitalizedAmountChart(
              response.data.data.hospitalizedAmountList
            );
            this.drawOperationWorkloadChart(
              response.data.data.operationWorkloadList
            );
            this.drawBedDistributionChart(
              response.data.data.bedDistributionList
            );
            this.drawAverageOfStayChart(response.data.data.averageOfStayList);
            this.drawDepartmentYzbChart(response.data.data.departmentYzbList);
            this.drawOutpatientIncomeRankingChart(
              response.data.data.outpatientIncomeList
            );
            this.drawHospitalizedIncomeRankingChart(
              response.data.data.hospitalizedIncomeList
            );

            window.setTimeout(this.showLoading(false), 1000);
          }
        })
        .catch(response => {
          this.visible = false;
          console.log(response);
        });
    },
    showLoading(show) {
      this.visible = show;
    },
    nav(url) {
      this.$router.push({ path: url });
    }
  },
  mounted() {
    this.pageLoad();
  }
};
</script>

<style lang="">
</style>