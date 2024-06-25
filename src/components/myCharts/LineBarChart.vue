<template>
  <div :id="id" />
</template>

<script>
import * as echarts from "echarts";
import EleResize from "./mixins/resize";
export default {
  props: {
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },
    //图标数据
    chartData: {
      type: Object,
      // required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },

  // 监听表数据变化，重新初始化图表
  chartData: {
    handler(val) {
      if (this.chart) {
        this.$nextTick(() => {
          this.initChart();
        });
      }
    },
    deep: true,
  },

  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      const chartDiv = document.getElementById(this.id);
      this.chart = echarts.init(chartDiv);
      EleResize.on(chartDiv, () => {
        this.chart.resize();
      });

      this.chart.setOption({
        // backgroundColor: "#344b58",
        // title: {
        //   text: "习作达标率65%",
        //   x: "20",
        //   top: "20",
        //   textStyle: {
        //     color: "#000D3E",
        //     fontSize: "22",
        //     fontWeight: "400",
        //   },
        //   // subtextStyle: {
        //   //   color: "#90979c",
        //   //   fontSize: "16",
        //   // },
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        // grid: {
        //   left: "5%",
        //   right: "5%",
        //   borderWidth: 0,
        //   top: 150,
        //   bottom: 95,
        //   textStyle: {
        //     color: "#fff",
        //   },
        // },

        grid: {
          left: "1%",
          right: "1%",
          bottom: "1%",
          top: "4%",
          containLabel: true,
          textStyle: {
            color: "#fff",
          },
        },

        // legend: {
        //   x: "5%",
        //   top: "10%",
        //   textStyle: {
        //     color: "#90979c",
        //   },
        //   data: ["female", "male", "average"],
        // },
        calculable: true,
        xAxis: [
          {
            type: "category",

            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            // data: xData,
            data: ["皇冠", "七星", "六星", "五星", "四星", "三星", "二星", "一星"],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: "dashed", //虚线
              },
            },
          },
        ],

        series: [
          {
            name: "female",
            type: "bar",
            stack: "total",
            barMaxWidth: 30,
            barGap: "10%",
            itemStyle: {
              // normal: {
              color: "#C2D5FF",
              label: {
                // show: true,
                textStyle: {
                  color: "#fff",
                },
                position: "insideTop",
                formatter(p) {
                  return p.value > 0 ? p.value : "";
                },
              },
              // },
            },
            data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285],
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true,
            //     },
            //     color: function (params) {
            //       console.log("params", params);
            //     },
            //   },
            // },
          },

          // {
          //   name: "male",
          //   type: "bar",
          //   stack: "total",
          //   itemStyle: {
          //     normal: {
          //       color: "rgba(0,191,183,1)",
          //       barBorderRadius: 0,
          //       label: {
          //         show: true,
          //         position: "top",
          //         formatter(p) {
          //           return p.value > 0 ? p.value : "";
          //         },
          //       },
          //     },
          //   },
          //   data: [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220],
          // },
          {
            name: "average",
            type: "line",
            stack: "total",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              // normal: {
              color: "#34C724",
              barBorderRadius: 0,
              label: {
                show: true,
                position: "top",
                formatter(p) {
                  return p.value > 0 ? p.value : "";
                },
              },
              // },
            },
            data: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298],
          },
        ],
      });

      this.chart.on("click", (params) => {
        console.log(11, params.data);
        this.$emit("itemClick", params.data);
      });
    },
  },
};
</script>
