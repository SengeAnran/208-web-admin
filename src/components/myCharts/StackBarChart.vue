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
  },
  data() {
    return {
      chart: null,
    };
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
        color: ["#AEFBFF", "#70ECEE", "#4BDBDD", "#009999"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "3%",
          top: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["生活中", "文学作品中", "想象空间中", "环境生活中"],
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Email",
            type: "bar",
            barWidth: "40%",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      });
    },
  },
};
</script>
