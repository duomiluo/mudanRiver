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
          <li>
            <i class="nav_2"></i>
            <a @click="nav('/quota')">指标分析</a>
          </li>
          <li class="nav_active">
            <i class="nav_3"></i>
            <a>趋势分析</a>
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
    <div class="con left" style="width:50%;">
      <!--统计分析图-->
      <div class="div_any">
        <div class="left div_any01" style="width:100%;">
          <div class="div_any_child" style="width:98%;position:relative;height: 420px;">
            <div class="div_any_title">
              <img src="../assets/images/title_13.png" />主要传染病(demo)
            </div>
            <div
              id="MajorInfectiousDiseasesChart"
              style="width: 45%;display: inline-block;height: 400px;margin-top: 15px;"
            ></div>
            <div
              id="MajorInfectiousTrendChart"
              style="width: 52%;height: 90%;display: inline-block;"
            ></div>
          </div>
        </div>
        <div class="left div_any01" style="width:48%;">
          <div class="div_any_child" style="height: 420px;">
            <div class="div_any_title">
              <img src="../assets/images/title_14.png" />主要症状
            </div>
            <p id="SymptomChart" class="p_chart" style="height: 400px;"></p>
          </div>
        </div>
        <div class="left div_table_box" style="width: 48%;">
          <div class="div_any_child" style="height: 420px;">
            <div class="div_any_title">
              <img src="../assets/images/title_16.png" />预警信息(demo)
            </div>
            <div class="table_p">
              <table>
                <thead>
                  <tr>
                    <th>内容</th>
                    <th>发布时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>9月21日感染性腹泻发病：123人次</td>
                    <td>2018-11-05</td>
                  </tr>
                  <tr>
                    <td>9月20日流行性感冒：57人次</td>
                    <td>2018-11-03</td>
                  </tr>
                  <tr>
                    <td>9月19日:手足口病发病同比增长220%</td>
                    <td>2018-11-01</td>
                  </tr>
                  <tr>
                    <td>9月18日登革热死亡:2人</td>
                    <td>2018-10-29</td>
                  </tr>
                  <tr>
                    <td>9月17日流行性感冒：157人次</td>
                    <td>2018-10-27</td>
                  </tr>
                  <tr>
                    <td>9月15日全区传染病发病人数较低</td>
                    <td>2018-10-25</td>
                  </tr>
                  <tr>
                    <td>9月14日流行性感冒：157人次</td>
                    <td>2018-10-23</td>
                  </tr>
                  <tr>
                    <td>9月13日全区传染病发病人数较低</td>
                    <td>2018-10-21</td>
                  </tr>
                  <tr>
                    <td>9月12日流行性感冒：157人次</td>
                    <td>2018-10-20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="con right" style="width:50%;">
      <div class="div_any">
        <div class="left div_any01" style="width:100%;">
          <div class="div_any_child" style="width:98%;position:relative;height: 420px;">
            <div class="div_any_title">
              <img src="../assets/images/title_17.png" />主要疾病排行
            </div>
            <div
              id="MajorDiseasesChart"
              style="width: 55%;display: inline-block;height: 400px;margin-top: 15px;"
            >左</div>
            <div
              id="DiseaseIncidenceTrendChart"
              style="width: 45%;height: 90%;display: inline-block;"
            ></div>
          </div>
        </div>
        <div class="left div_any01" style="width:48%;">
          <div class="div_any_child" style="height: 420px;">
            <div class="div_any_title">
              <img src="../assets/images/title_18.png" />年龄分布
            </div>
            <p id="AgeDistributionChart" class="p_chart" style="height: 400px;"></p>
          </div>
        </div>
        <div class="right div_any01" style="width:48%;">
          <div class="div_any_child" style="height: 420px;">
            <div class="div_any_title">
              <img src="../assets/images/title_19.png" />性别分布
            </div>
            <p id="SexDistributionChart" class="p_chart" style="height: 400px;"></p>
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
      visible: true
    };
  },
  methods: {
    nav(url) {
      this.$router.push({ path: url });
    },
    drawSexDistributionChart(reportData) {
      var legend_data = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        legend_data.push(reportData[i].sexGroup);
        series_data.push({
          value: reportData[i].amount,
          name: reportData[i].sexGroup
        });
      }

      var SexDistributionChart = echarts.init(
        document.getElementById("SexDistributionChart")
      );
      SexDistributionChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: legend_data,
          textStyle: {
            color: "#ffffff"
          }
        },
        series: [
          {
            name: "性别分布",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: series_data
          }
        ]
      });
    },
    drawAgeDistributionChart(reportData) {
      var legend_data = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        legend_data.push(reportData[i].ageGroup);
        series_data.push({
          name: reportData[i].ageGroup,
          value: reportData[i].amount
        });
      }

      var AgeDistributionChart = echarts.init(
        document.getElementById("AgeDistributionChart")
      );
      AgeDistributionChart.setOption({
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
            name: "年龄分布",
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
    drawSymptomChart(reportData) {
      var yAxis_data = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        yAxis_data.push(reportData[i].symptom);
        series_data.push(reportData[i].amount);
      }

      var SymptomChart = echarts.init(document.getElementById("SymptomChart"));
      SymptomChart.setOption({
        color: ["#FD6C88"],
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}人"
        },
        calculable: true,
        yAxis: [
          {
            type: "category",
            data: yAxis_data,
            axisLine: {
              lineStyle: {
                color: "#FD6C88"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            }
          }
        ],
        xAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#FD6C88"
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
                return value + "";
              }
            }
          }
        ],
        series: [
          {
            name: "主要症状",
            type: "bar",
            barWidth: 20,
            data: series_data
          }
        ]
      });
    },
    drawMajorDiseasesChart(reportData) {
      var yAxis_data = [];
      var amount = [];
      var percent = [];

      for (var i = 0; i < reportData.length; i++) {
        yAxis_data.push(reportData[i].zyzd_mc);
        amount.push(reportData[i].amount);
        percent.push(reportData[i].percent);
      }

      var MajorDiseasesChart = echarts.init(
        document.getElementById("MajorDiseasesChart")
      );
      MajorDiseasesChart.setOption({
        grid: {
          top: "12%",
          left: "30%"
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            show: true,
            data: yAxis_data,
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#fff",
              formatter: (value, index) => {
                return [`{lg|${index + 1}}  ` + "{title|" + value + "} "].join(
                  "\n"
                );
              },
              rich: {
                lg: {
                  backgroundColor: "#339911",
                  color: "#fff",
                  borderRadius: 15,
                  align: "center",
                  width: 15,
                  height: 15
                }
              }
            }
          },
          {
            show: true,
            inverse: true,
            data: amount,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: percent,
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: function(params) {
                  var myColor = [
                    "#1089E7",
                    "#F57474",
                    "#56D0E3",
                    "#F8B448",
                    "#8B78F6"
                  ];
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}%"
              }
            }
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [100, 100, 100, 100, 100, 100, 100, 100],
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "none",
                borderColor: "#00c1de",
                borderWidth: 1,
                barBorderRadius: 15
              }
            }
          }
        ]
      });
    },
    drawDiseaseIncidenceTrendChart(reportData) {
      var xAxis_data = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        xAxis_data.push(reportData[i].year);
        series_data.push(reportData[i].amount);
      }

      var DiseaseIncidenceTrendChart = echarts.init(
        document.getElementById("DiseaseIncidenceTrendChart")
      );
      DiseaseIncidenceTrendChart.setOption({
        title: {
          text: "住院人数趋势",
          textStyle: {
            fontSize: 16,
            color: "#32cd32"
          },
          x: "center"
        },
        color: ["#32cd32"],
        grid: {
          left: "15%",
          right: "5%",
          bottom: "25%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}人"
        },

        calculable: true,
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#32cd32"
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
                return value + "";
              }
            }
          }
        ],
        xAxis: [
          {
            type: "category",
            data: xAxis_data,
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#32cd32"
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
                return value + "";
              }
            }
          }
        ],
        series: [
          {
            name: "住院人数",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: series_data
          }
        ]
      });
    },
    drawMajorInfectiousDiseasesChart() {
      var MajorInfectiousDiseasesChart = echarts.init(
        document.getElementById("MajorInfectiousDiseasesChart")
      );
      MajorInfectiousDiseasesChart.setOption({
        color: ["#5bc0de"],
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}人"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "感染性腹泻",
              "流行性感冒",
              "登革热",
              "手足口病",
              "水痘",
              "流行性眼腺炎",
              "猩红热",
              "甲型病毒性肝炎",
              "疟疾"
            ],
            axisLine: {
              lineStyle: {
                color: "#5bc0de"
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40,
              textStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#5bc0de"
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
                return value + "";
              }
            }
          }
        ],
        series: [
          {
            name: "主要传染病",
            type: "bar",
            barWidth: 20,
            data: [2210, 1085, 926, 669, 634, 452, 412, 312, 156]
          }
        ]
      });
    },
    drawMajorInfectiousTrendChart() {
      var MajorInfectiousTrendChart = echarts.init(
        document.getElementById("MajorInfectiousTrendChart")
      );
      MajorInfectiousTrendChart.setOption({
        title: {
          text: "传染病趋势",
          textStyle: {
            fontSize: 16,
            color: "#ff7f50"
          }
        },
        color: ["#ff7f50"],
        grid: {
          left: "15%",
          right: "5%",
          bottom: "15%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}人"
        },

        calculable: true,
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#ff7f50"
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
                return value + "";
              }
            }
          }
        ],
        xAxis: [
          {
            type: "category",
            data: ["2017", "2018", "2019", "2020"],
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#ff7f50"
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              // interval:0,
              // rotate:40,
              textStyle: {
                color: "#fff"
              },
              formatter: function(value) {
                return value + "";
              }
            }
          }
        ],
        series: [
          {
            name: "传染病人数",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
          }
        ]
      });
    },
    showLoading(show) {
      this.visible = show;
    },
    pageLoad() {
      var api = "/service/trendpageService";

      this.axios
        .post(api)
        .then(response => {
          var code = response.data.code;

          if (code == 0) {
            console.log(response.data.data);
            this.drawAgeDistributionChart(
              response.data.data.trendAgeDistributionList
            );
            this.drawSexDistributionChart(
              response.data.data.trendSexDistributionList
            );
            this.drawSymptomChart(response.data.data.trendSymptomList);
            this.drawMajorDiseasesChart(
              response.data.data.trendMajorDiseasesList
            );
            this.drawDiseaseIncidenceTrendChart(
              response.data.data.trendDiseaseIncidenceList
            );
            this.drawMajorInfectiousDiseasesChart();
            this.drawMajorInfectiousTrendChart();

            window.setTimeout(this.showLoading(false), 1000);
          }
        })
        .catch(response => {
          this.visible = false;
          console.log(response);
        });
    }
  },
  mounted() {
    this.pageLoad();
  }
};
</script>

<style lang="">
</style>