<template>
  <div class="contain">
    <div class="left">
      <div class="left-s1 box">
        <BarChart id="peopleChart" :chartData="peopleChartData"></BarChart>
      </div>
      <div class="left-s2 box">
        <DoubleBar id="joinChart"></DoubleBar>
      </div>
      <div class="left-s3 box">
        <!--TODO 暂时用图片代替  -->
        <img src="@/assets/people.png" alt="" />
      </div>
      <div class="left-s4 box">
        <BarChart id="ageChart" :chartData="ageChartData"></BarChart>
      </div>
    </div>
    <div class="right">
      <BarChart id="trainChart" :chartData="trainChartData"></BarChart>
      <div class="right-s1">
        <PieChart id="sexChart"></PieChart>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/myCharts/BarChart.vue";
import DoubleBar from "@/components/myCharts/DoubleBar.vue";
import PieChart from "@/components/myCharts/PieChart.vue";
export default {
  components: {
    BarChart,
    DoubleBar,
    PieChart,
  },
  data() {
    return {
      peopleChartData: {
        title: "人数统计",
        xData: ["单位1", "单位2", "单位3", "单位4", "单位5"],
      },

      ageChartData: {
        title: "年龄训练分析",
        xData: ["20-25", "25-30", "30-35", "35-40", "40-45"],
      },
      trainChartData: {
        title: "训练内容分析",
        xData: ["蛇形跑", "3000米", "仰卧起坐"],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: calc(100vh - 432px);
  background: #144c14;
  display: flex;
  padding: 20px 30px;
  box-sizing: border-box;
  .left {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;
    .box {
      width: 48.5%;
      height: 49%;
      background: #fff;
      border-radius: 6px;
      padding: 15px;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .right {
    width: 40%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    background: #fff;
    &-s1 {
      height: 50%;
      width: 100%;
      padding-top: 20px;
    }
  }

  #peopleChart,
  #joinChart,
  #ageChart {
    width: 100%;
    height: 100%;
  }
  #trainChart {
    width: 100%;
    height: 50%;
  }
  #sexChart {
    width: 100%;
    height: 100%;
  }
}
</style>
