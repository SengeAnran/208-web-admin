<template>
  <div :id="id" />
</template>

<script>
import * as echarts from "echarts";
import EleResize from "./mixins/resize";

export default {
  props: {
    title: {
      type: String,
      default: "性别系统分析",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    //label 展示
    showLabel: {
      type: Boolean,
      default: true,
    },
    //图层颜色
    color: {
      type: Array,
      default: () => ["#438D52", "#B9D9B9"],
    },
    //图表数据
    // chartData: {
    //   type: Object,
    //   // required: true,
    // },
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
        color: this.color,
        title: {
          text: this.title,
        },
        series: [
          {
            name: "",
            type: "pie",
            avoidLabelOverlap: false,
            roseType: "radius",
            label: {
              show: true,
            },
            center: ["50%", "50%"], // 设置饼图居中
            labelLine: {
              show: true, // 显示标签线
              lineStyle: {
                color: "#1F2329", // 改变标示线的颜色
              },
            },
            data: [
              { value: 70, name: "男70%" },
              { value: 30, name: "女30%" },
            ],
            // animation: true, //动画
          },
        ],
      });
    },
  },
};
</script>
