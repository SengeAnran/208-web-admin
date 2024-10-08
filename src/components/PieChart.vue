<template>
  <div class="chart" ref="pieChart"></div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';

export default {
  props: {
    list: {
      type: Array,
      default: () => [
        { name: '5A', value: 259 },
        { name: '4A', value: 131 },
        { name: '3A', value: 131 },
        { name: '其他', value: 100 },
      ],
    },
    color: {
      type: Array,
      default: () => ['#AEE9A7', '#EBC4FD', '#0A9FFD', '#C6E9FF','#ADC6FF', '#F9FEC5'],
    },
    total: {
      type: Number,
    },
    title: {
      type: String,
      default: '',
    },
    showMinTitle: {
      type: Boolean,
      default: false,
    },
    minTitle: {
      type: String,
      default: '',
    },
    center: {
      type: Array,
      default: () => ['50%', 'center'],
    },
    isPercent: {
      type: Boolean,
      default: true,
    },
    hideLegend: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: String,
      default: '',
    },
    itemGap: {
      type: Number,
      default: 20,
    },
    legendLeft: {
      type: String,
      default: '54%'
    }
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
    getOptions() {
      return {
        color: this.color,
        legend: {
          show: !this.hideLegend,
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          itemStyle: {
            borderWidth: 4,
            borderColor: 'rgba(91, 157, 254, 0.1)',
            // shadowBlur: 4,
          },
          // itemGap: this.itemGap,
          left: this.legendLeft,
          top: 'center',
          orient: 'vertical',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.65)',
            padding: [0, 0, 0, 8],
            rich: {
              name: {
                fontSize: 16,
                fontFamily: 'Source Han Sans CN',
                color: 'rgba(255, 255, 255, 0.65)',
                width: 20,
              },
              value: {
                fontSize: 16,
                fontFamily: 'Source Han Sans CN',
                color: '#FFFEFE',
                width: 30,
                align: 'right',
              },
              percent: {
                fontSize: 16,
                fontFamily: 'DINPro',
                fontWeight: 400,
                color: '#fff',
                width: 30,
                align: 'right',
              },
            },
          },
          formatter: (name) => {
            const item = this.list.find((d) => d.name === name);
            if (this.isPercent) {
              return [`{name|${name}}`, `         {percent|${item.percent}}`].join('');
            } else {
              return [`{name|${name}}`, `         {percent|${item.value}${this.unit}}`].join('');
            }
          },
        },
        title: {
          show: this.showMinTitle,
          text: `{a|${this.minTitle}}\n {b|${this.total}}`,
          top: '40%',
          textAlign: 'center',
          left: '49%',
          textStyle: {
            color: '#3370FF',
            rich: {
              a: {
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'Microsoft YaHei',
                padding: [0, 0, 10, 5],
              },
              b: {
                fontSize: 36,
                fontFamily: 'Bebas Neue',
                // padding: [0, 0, 0, 10],
              },
            },
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['44%', '78%'],
            center: this.center,
            label: {
              position: 'outside',
              formatter: `{b} {d}%`,
              color: 'rgba(0, 0, 0, 1)',
              fontSize: 14,
              lineHeight: 20,
              verticalAlign: 'bottom',
              fontFamily: 'Microsoft YaHei',
              fontWeight: 'bold',
            },
            data: this.list,
          },
          // {
          //   type: 'pie',
          //   center: this.center,
          //   radius: ['39%', '64%'],
          //   itemStyle: {
          //     color: {
          //       type: 'linear',
          //       x: 0,
          //       y: 0,
          //       x2: 0,
          //       y2: 1,
          //       colorStops: [
          //         {
          //           offset: 0,
          //           color: '#3551A45c',
          //         },
          //         {
          //           offset: 0.5,
          //           color: '#3D8EC45c',
          //         },
          //         {
          //           offset: 1,
          //           color: '#5ECDB05c',
          //         },
          //       ],
          //       global: false,
          //     },
          //   },
          //   scale: false,
          //   label: {
          //     show: false,
          //   },
          //   data: [1],
          //   z: -1,
          // },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
  .chart{
    width: 100%;
    height: 100%;
    ::v-deep div {
      width: 100% !important;
      height: 100% !important;
    }
    //::v-deep canvas {
    //  width: 100% !important;
    //  height: 100% !important;
    //}
  }
</style>
