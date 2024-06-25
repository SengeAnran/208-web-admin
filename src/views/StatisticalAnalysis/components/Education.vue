
<template>
<div class="education">
  <div class="title">
    学历结构
  </div>
  <div class="pie-box">
    <PieChart  title="" class="pie"/>
  </div>

</div>
</template>

<script>
// import PieChart from "@/components/PieChart.vue";
import PieChart from "@/components/myCharts/PieChart.vue";

export default {
  name: "Education",
  components: {PieChart}
}
</script>

<style scoped lang="scss">
.education {
  width: 360px;
  .title {
    font-family: PingFang SC;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;

  }
  .pie-box {
    width: 100%;
    height: 250px;
    .pie {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
