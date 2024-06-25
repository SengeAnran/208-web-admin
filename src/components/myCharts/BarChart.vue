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
    //图表数据
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
  // watch: {
  //   chartData: {
  //     handler(val) {
  //       if (val && this.chart) {
  //         this.setData(val);
  //       }
  //     },
  //     deep: true,
  //   },
  // },

  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      const chartDiv = document.getElementById(this.id);
      if (!chartDiv) return;
      this.chart = echarts.init(chartDiv);
      EleResize.on(chartDiv, () => {
        this.chart.resize();
      });
      this.$nextTick(() => {
        this.setData();
      });
    },
    setData() {
      this.chart.setOption({
        title: {
          text: this.chartData.title,
        },

        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "",
          },
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "3%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            // data: ["单位1", "单位2", "单位3", "单位4", "单位5"],
            data: this.chartData.xData,

            axisTick: {
              alignWithLabel: true,
            },
            // axisTick: {
            //   show: false,
            // },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "荣获人数",
            type: "bar",
            barWidth: "40",
            data: [10, 15, 39, 12, 8],
            itemStyle: {
              color: "#144C14",
            },
          },
        ],
      });
    },
  },
};
</script>
