<template>
  <div>
    <vue-alert-loading :title="title" :visible="visible" />
    <!--顶部-->
    <header class="header left">
      <div class="left nav">
        <ul>
          <li class="nav_active">
            <i class="nav_1"></i>
            <a>首页</a>
          </li>
          <li>
            <i class="nav_2"></i>
            <a @click="nav('/quota')">指标分析</a>
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
          <li>
            <i class="nav_5"></i>
            <a @click="nav('/yyqk')">医院运营情况</a>
          </li>
        </ul>
      </div>
    </header>
    <div class="con left">
      <!--数据总概-->
      <div class="con_div">
        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <img src="../assets/images/info_1.png" class="left text01_img" />
            <div class="left text01_div">
              <p>当日挂号量(人)</p>
              <p>{{todayRegisterAmount}}</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <img src="../assets/images/info_2.png" class="left text01_img" />
            <div class="left text01_div">
              <p>当日退号量(人)</p>
              <p>{{todayRefundAmount}}</p>
            </div>
          </div>
        </div>

        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <img src="../assets/images/info_3.png" class="left text01_img" />
            <div class="left text01_div">
              <p>当日门诊数(人)</p>
              <p class="sky">{{todayOutpatientAmount}}</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <img src="../assets/images/info_4.png" class="left text01_img" />
            <div class="left text01_div">
              <p>当月门诊数(人)</p>
              <p class="sky">{{monthOutpatientAmount}}</p>
            </div>
          </div>
        </div>

        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <img src="../assets/images/info_5.png" class="left text01_img" />
            <div class="left text01_div">
              <p>当日住院数(人)</p>
              <p class="org">{{todayHospitalizedAmount}}</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <img src="../assets/images/info_6.png" class="left text01_img" />
            <div class="left text01_div">
              <p>当月住院数(人)</p>
              <p class="org">{{monthHospitalizedAmount}}</p>
            </div>
          </div>
        </div>
      </div>

      <!--统计分析图-->
      <div class="div_any">
        <div class="left div_any01">
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_1.png" />门诊挂号类型分布
            </div>
            <p id="OutpatientTypeChart" class="p_chart"></p>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_2.png" />就诊级别构成
            </div>
            <p id="RegisterTypeChart" class="p_chart"></p>
          </div>
        </div>

        <!---->
        <div class="div_any02 left" style="height:50%;">
          <div class="div_any_child div_height">
            <div class="div_any_title any_title_width">
              <img src="../assets/images/title_0.png" />患者分布
            </div>
            <div id="mainArea">
              <baidu-map
                v-if="getHomeOutpatientMapList.length > 0"
                :center="center"
                :zoom="zoom"
                @ready="handler"
                style="height:600px;width:90%;margin:0 auto;margin-top:33px;"
                :scroll-wheel-zoom="true"
                :map-click="false"
              >
                <bml-marker-clusterer :averageCenter="true">
                  <div v-for="(marker, i) of getHomeOutpatientMapList" :key="i">
                    <bm-marker
                      :dragging="true"
                      animation="BMAP_ANIMATION_BOUNCE"
                      :position="{lng: marker.location.lng, lat: marker.location.lat}"
                      @click="infoWindowOpen(marker)"
                    >
                      <bm-info-window
                        :show="showFlag"
                        title="弹窗信息"
                        @open="infoWindowOpen(marker)"
                        @close="infoWindowClose(marker)"
                        :position="{lng: marker.location.lng, lat: marker.location.lat}"
                      >
                        <p>卡号:{{marker.bkh_zy}}</p>
                        <p>姓名:{{marker.xm}}</p>
                        <p>入院日期:{{marker.ryrq}}</p>
                        <p>临时地址:{{marker.lsdz}}</p>
                      </bm-info-window>
                    </bm-marker>
                  </div>
                </bml-marker-clusterer>
              </baidu-map>
            </div>
          </div>
        </div>
        <div class="right div_any01">
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_3.png" />挂号趋势图
            </div>
            <p id="RegisterTrendChart" class="p_chart"></p>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/images/title_4.png" />门诊科室收入排行
            </div>
            <p id="OutpatientIncomeRankingChart" class="p_chart"></p>
          </div>
        </div>
        <!---->
      </div>

      <!--手术工作量统计（饼图）、材料收入（表格table，外面套个div得有滚动条）、材料收入占比(柱状图)、产妇分娩量统计（饼图）-->
      <div class="div_any div_any_bottom">
        <div class="div_any_child" style="width:25%;float:left;">
          <div class="div_any_title">
            <img src="../assets/images/title_1.png" />手术工作量统计
          </div>
          <p id="operaTypeChart" class="p_chart"></p>
        </div>
        <div class="div_any_child" style="width:25%;float:left;">
          <div class="div_any_title">
            <img src="../assets/images/title_1.png" />材料收入
          </div>
          <el-table
            :data="materialData"
            :header-cell-style="{background:'#030829',color:'#fff'}"
            :cell-style="{background:'#030829',color:'#fff'}"
            style="background:'#030829';width: 80%;margin:0 auto;margin-top:30px;text-align:center"
            size="mini"
            height="85%"
          >
            <el-table-column prop="department" label="科室名"></el-table-column>
            <el-table-column prop="totalFee" label="总收入"></el-table-column>
            <el-table-column prop="clFee" label="材料收入"></el-table-column>
            <el-table-column prop="percent" label="材料占比"></el-table-column>
          </el-table>
        </div>
        <div class="div_any_child" style="width:25%;float:left;">
          <div class="div_any_title">
            <img src="../assets/images/title_1.png" />材料收入占比
          </div>
          <p id="materialRatioTypeChart" class="p_chart"></p>
        </div>
        <div class="div_any_child" style="width:25%;float:left;">
          <div class="div_any_title">
            <img src="../assets/images/title_1.png" />产妇分娩量统计
          </div>
          <p id="parturientVolumeTypeChart" class="p_chart"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { BmlMarkerClusterer } from "vue-baidu-map";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
export default {
  data() {
    return {
      title: "数据加载中，请稍候...",
      visible: true,
      todayRegisterAmount: 0,
      todayRefundAmount: 0,
      todayOutpatientAmount: 0,
      monthOutpatientAmount: 0,
      todayHospitalizedAmount: 0,
      monthHospitalizedAmount: 0,
      materialData: [],
      chartZpf: null,
      chartFmfs: null,
      name: "TestBaiDu",
      center: { lng: 109.45744048529967, lat: 36.49771311230842 },
      zoom: 13,
      showFlag: false,
      getHomeOutpatientMapList: []
    };
  },
  components: {
    BmlMarkerClusterer,
    BmMarker
  },
  methods: {
    nav(url) {
      this.$router.push({ path: url });
    },
    drawOutpatientTypeChart(reportData) {
      var legend_data = [];
      var series_data = [];
      for (var i = 0; i < reportData.length; i++) {
        legend_data.push(reportData[i].outpatientType);
        series_data.push({
          value: reportData[i].amount,
          name: reportData[i].outpatientType
        });
      }

      var OutpatientTypeChart = echarts.init(
        document.getElementById("OutpatientTypeChart")
      );
      OutpatientTypeChart.setOption({
        title: {
          text: "门诊挂号类型分布",
          subtext: "（当日）",
          textStyle: {
            color: "#87cefa"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          textStyle: {
            color: "#ffffff"
          },
          data: legend_data
        },
        series: [
          {
            name: "挂号类型",
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
    drawRegisterTypeChart(reportData) {
      var legend_data = [];
      var series_data = [];
      for (var i = 0; i < reportData.length; i++) {
        legend_data.push(reportData[i].registerType);
        series_data.push({
          value: reportData[i].amount,
          name: reportData[i].registerType
        });
      }

      var RegisterTypeChart = echarts.init(
        document.getElementById("RegisterTypeChart")
      );
      RegisterTypeChart.setOption({
        title: {
          text: "就诊级别构成",
          subtext: "（当日）",
          textStyle: {
            color: "#87cefa"
          }
        },
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
            name: "就诊级别构成",
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
    drawRegisterTrendChart(reportData) {
      var legend_data = [];
      var series_array = [];

      for (var i = 0; i < reportData.length; i++) {
        legend_data.push(reportData[i].registerType);

        var series_data = [];

        for (var j = 0; j < reportData[i].timespanList.length; j++) {
          series_data.push(reportData[i].timespanList[j].amount);
        }

        series_array.push({
          name: reportData[i].registerType,
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                shadowColor: "rgba(0,0,0,0.4)"
              }
            }
          },
          data: series_data
        });
      }

      var RegisterTrendChart = echarts.init(
        document.getElementById("RegisterTrendChart")
      );
      RegisterTrendChart.setOption({
        title: {
          text: "挂号趋势图",
          subtext: "（当日）",
          textStyle: {
            color: "#87cefa"
          }
        },
        legend: {
          y: "260",
          x: "center",
          textStyle: {
            color: "#ffffff"
          },
          data: legend_data
        },
        calculable: false,
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}人次"
        },
        yAxis: [
          {
            type: "value",
            axisLine: { onZero: false },

            axisLabel: {
              textStyle: {
                color: "#fff"
              },
              formatter: function(value) {
                return value + "人次";
              }
            },
            splitLine: {
              lineStyle: {
                width: 0,
                type: "solid"
              }
            }
          }
        ],
        xAxis: [
          {
            type: "category",
            data: ["上午", "下午", "夜间", "中午"],
            axisLine: {
              lineStyle: {
                color: "#034c6a"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                width: 0,
                type: "solid"
              }
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
        grid: {
          left: "5%",
          right: "5%",
          bottom: "20%",
          containLabel: true
        },
        series: series_array
      });
    },
    drawOutpatientIncomeRankingChart(reportData) {
      var yAxis_data = [];
      var series_data = [];

      for (var i = 0; i < reportData.length; i++) {
        yAxis_data.push(reportData[i].departmentName);
        series_data.push(reportData[i].income);
      }

      var OutpatientIncomeRankingChart = echarts.init(
        document.getElementById("OutpatientIncomeRankingChart")
      );
      OutpatientIncomeRankingChart.setOption({
        title: {
          text: "门诊科室收入排行",
          subtext: "（当日）",
          textStyle: {
            color: "#87cefa"
          }
        },
        color: ["#FD6C88"],
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}元"
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
    pageLoad() {
      var api = "/service/homepageService";

      this.axios
        .post(api)
        .then(response => {
          var code = response.data.code;

          if (code == 0) {
            this.todayRegisterAmount =
              response.data.data.homeRegisterAmount.todayRegisterAmount;
            this.todayRefundAmount =
              response.data.data.homeRegisterAmount.todayRefundAmount;
            this.todayOutpatientAmount =
              response.data.data.homeOutpatientAmount.todayOutpatientAmount;
            this.monthOutpatientAmount =
              response.data.data.homeOutpatientAmount.monthOutpatientAmount;
            this.todayHospitalizedAmount =
              response.data.data.homeHospitalizedAmount.todayHospitalizedAmount;
            this.monthHospitalizedAmount =
              response.data.data.homeHospitalizedAmount.monthHospitalizedAmount;

            this.drawOutpatientTypeChart(
              response.data.data.homeOutpatientTypeList
            );
            this.drawRegisterTypeChart(response.data.data.homeRegisterTypeList); //渲染就诊级别构成
            this.drawRegisterTrendChart(
              response.data.data.homeRegisterTrendList
            );
            this.drawOutpatientIncomeRankingChart(
              response.data.data.homeOutpatientIncomeRankingList
            );
            this.drawOperaTypeChart(response.data.data.homeOperationList); //渲染手术工作量饼图
            this.drawMaterialTypeChart(response.data.data.homeClzbList); //渲染材料收入table
            this.drawMaterialPercentChart(
              response.data.data.homeClzbRankingList
            ); //渲染材料收入占比柱状图
            this.drawParturientVolumeTypeChart(response.data.data.homeFmfsList); //渲染产妇分娩量统计
            this.getHomeOutpatientMapList =
              response.data.data.homeOutpatientMapList;

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
    drawOperaTypeChart(reportData) {
      var legend_data = [];
      var series_data = [];
      for (var i = 0; i < reportData.length; i++) {
        legend_data.push(reportData[i].department);
        series_data.push({
          value: reportData[i].amount,
          name: reportData[i].department
        });
      }

      var operaTypeChart = echarts.init(
        document.getElementById("operaTypeChart")
      );
      operaTypeChart.setOption({
        title: {
          text: "手术工作量统计",
          subtext: "（当日）",
          textStyle: {
            color: "#87cefa"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "0",
          top: "50px",
          data: legend_data,
          textStyle: {
            color: "#ffffff"
          }
        },
        series: [
          {
            name: "手术工作量统计",
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
    drawMaterialTypeChart(reportData) {
      for (var i = 0; i < reportData.length; i++) {
        reportData[i].percent = reportData[i].percent + "%";
      }
      this.materialData = reportData;
    },
    drawMaterialPercentChart(reportData) {
      this.chartZpf = echarts.init(
        document.getElementById("materialRatioTypeChart")
      );
      var data = reportData;
      // console.log("材料占比", data);

      var legend_data = [];
      var series_data = [];
      var xAxisData = [];
      var clFeeData = [];
      var percentData = [];
      var totalFeeData = [];
      for (var i = 0; i < reportData.length; i++) {
        xAxisData.push(reportData[i].department);
        clFeeData.push(reportData[i].clFee);
        percentData.push(reportData[i].percent);
        totalFeeData.push(reportData[i].totalFee);
      }

      var option = null;
      option = this.getOption(xAxisData, clFeeData, percentData, totalFeeData);
      this.chartZpf.setOption(option);
      window.addEventListener("resize", () => {
        this.chartZpf.resize();
      });
    },
    getOption(xAxisData, clFeeData, percentData, totalFeeData) {
      var option = {
        title: {
          text: "",
          subtext: "",
          left: "center",
          color: "#fff"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ["总收入", "材料收入", "占比"],
          textStyle: { color: "#fff" }
        },
        xAxis: [
          {
            type: "category",
            data: xAxisData,
            axisPointer: {
              type: "shadow"
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff" //左边线的颜色
              }
            },
            axisLabel: {
              interval: 0
            }
          }
        ],
        grid: {
          x: 0,
          y: 60,
          x2: 0,
          y2: 20,
          left: "0%",
          bottom: "9%",
          show: true,
          containLabel: true
        },
        yAxis: [
          {
            type: "value",
            name: "总收入",
            axisLabel: {
              formatter: "{value} 元"
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff" //左边线的颜色
              }
            }
          },
          {
            type: "value",
            name: "占比",
            axisLabel: {
              formatter: "{value} %"
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff" //左边线的颜色
              }
            }
          }
        ],
        series: [
          {
            name: "材料收入",
            type: "bar",
            data: clFeeData
          },
          {
            name: "总收入",
            type: "bar",
            data: totalFeeData
          },
          {
            name: "占比",
            type: "line",
            yAxisIndex: 1,
            data: percentData
          }
        ]
      };
      return option;
    },
    getParturientVolumeOption(legendData, seriesData) {
      var option = {
        backgroundColor: "rgb(3, 8, 41)",

        title: {
          text: "",
          left: "center",
          top: 20,
          textStyle: {
            color: "#fff"
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: seriesData.sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "#fff"
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      return option;
    },
    drawParturientVolumeTypeChart(reportData) {
      this.chartFmfs = echarts.init(
        document.getElementById("parturientVolumeTypeChart")
      );
      var data = reportData;

      var legendData = [];
      var seriesData = [];
      for (var i = 0; i < reportData.length; i++) {
        legendData.push(reportData[i].fmfs);
        seriesData.push({
          value: reportData[i].amount,
          name: reportData[i].fmfs
        });
      }

      var option = null;
      option = this.getParturientVolumeOption(legendData, seriesData);
      this.chartFmfs.setOption(option);
      window.addEventListener("resize", () => {
        this.chartFmfs.resize();
      });
    },
    handler({ BMap, map }) {
      
      map.enableScrollWheelZoom(true);
      var point = new BMap.Point(129.58, 44.6);
      map.centerAndZoom(point, 13);
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      var circle = new BMap.Circle(point, 6, {
        strokeColor: "Red",
        strokeWeight: 6,
        strokeOpacity: 1,
        Color: "Red",
        fillColor: "#f03"
      });
      map.addOverlay(circle);
    },
    infoWindowOpen(marker) {
      this.showFlag = true;
      console.log(marker);
    },
    infoWindowClose(marker) {
      this.showFlag = false;
      console.log(marker);
    }
  },
  mounted() {},
  created() {
    this.$nextTick(() => {
      this.pageLoad();
    });
  }
};
</script>
<style lang="scss" scoped>
.div_any {
  height: auto;
}
</style>>
