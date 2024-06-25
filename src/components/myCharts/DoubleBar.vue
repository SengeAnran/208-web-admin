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
        title: {
          text: "合作率分析",
        },
        tooltip: {
          trigger: "axis", //item默认为图形触发 还有axis坐标轴触发
          axisPointer: {
            type: "shadow",
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
            data: [],
            axisTick: {
              show: false,
            },
            show: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "等级+",
            type: "bar",
            barWidth: "20%",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "#1F4F1F",
            },
            data: [3, 8, 9, 9],
          },

          {
            name: "等级-",
            type: "bar",
            barWidth: "20%",
            data: [4, 13, 6, 5],
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "#709870",
            },
          },
        ],
      });
    },
  },
};
</script>
