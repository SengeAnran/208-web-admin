<template>
  <div class="chart" ref="pieChart"></div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';
import 'echarts-wordcloud'

export default {
  props: {
    list: {
      type: Array,
      default: () => [
        {
          name: "雨伞",
          value: 30
        },
        {
          name: "晴天",
          value: 28
        },
        {
          name: "电话",
          value: 24
        },
        {
          name: "手机",
          value: 23
        },
        {
          name: "下雨",
          value: 22
        },
        {
          name: "暴雨",
          value: 21
        },
        {
          name: "多云",
          value: 20
        },
        {
          name: "雨衣",
          value: 29
        },
        {
          name: "屋檐",
          value: 28
        },
        {
          name: "大风",
          value: 27
        },
        {
          name: "台风",
          value: 26
        },
        {
          name: "下雪",
          value: 25
        },
        {
          name: "打雷",
          value: 24
        },
        {
          name: "小雨",
          value: 30
        },
        {
          name: "中雨",
          value: 18
        },
        {
          name: "大雨",
          value: 14
        },
        {
          name: "雷阵雨",
          value: 13
        },
        {
          name: "下雪",
          value: 12
        },
        {
          name: "小雪",
          value: 11
        },
        {
          name: "中雪",
          value: 10
        },
        {
          name: "大雪",
          value: 9
        },
        {
          name: "暴雪",
          value: 8
        },
        {
          name: "东风",
          value: 7
        },
        {
          name: "南风",
          value: 6
        },
        {
          name: "西北风",
          value: 5
        },
        {
          name: "北风",
          value: 4
        },
        {
          name: "闪电",
          value: 3
        }
      ],
    },
    // color: {
    //   type: Array,
    //   default: () => ['#AEE9A7', '#EBC4FD', '#0A9FFD', '#C6E9FF','#ADC6FF', '#F9FEC5'],
    // },
  },
  watch: {
    list: {
      handler: function (val) {
        if (typeof val === typeof []) {
          this.initChart();
        }
      },
      immediate: false,
      deep: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.pieChart);
      this.chart.setOption(this.getOptions());
    },
    randomColor() {
      // Random color
      return 'rgb(' + [
        Math.round(Math.random() * 200 + 55),
        Math.round(Math.random() * 200 + 55),
        Math.round(Math.random() * 200 + 55)
      ].join(',') + ')';
    },
    getOptions() {
      return  {
        backgroundColor: '',
        tooltip: {
          show: false
        },
        series: [{
          name: '',
          type: 'wordCloud',
          rotationRange: [0, 0],
          sizeRange: [24, 60],
          shape: 'square',
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 6
          },
          textStyle: {
            color: this.randomColor,
            // normal: {
            //
            // },
            // emphasis: {
            //   shadowBlur: 10,
            //   shadowColor: '#333'
            // }
          },
          data: this.list
        }]
      }
    }
  },
};
</script>
<style lang="scss" scoped>
  .chart{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 25px;
  }
</style>
