
<template>
  <div class="page">
    <div class="personnel">
      <Person/>
      <Education/>
    </div>
    <div class="time-range">
      <div class="time-top">
        <div class="title">时间范围</div>
        <el-select size="mini" value="1">
          <el-option value="1" label="本月"></el-option>
        </el-select>
      </div>
      <div class="time-content">
        <Sort title="3000米排行榜"/>
        <Sort title="仰卧起坐排行榜"/>
        <Sort title="蛇形跑排行榜"/>
      </div>
    </div>
    <div class="all-sort">
      <Sort width="653px" height="852px" head-height="94px" title="总分排行榜"/>
    </div>
  </div>
</template>
<script>

import Sort from "@/views/StatisticalAnalysis/components/sort.vue";
import Person from "@/views/StatisticalAnalysis/components/Person.vue";
import Education from "@/views/StatisticalAnalysis/components/Education.vue";

export default {
  name: "index",
  components: {Person, Sort,Education}
}
</script>


<style scoped lang="scss">
.page {
  position: relative;
  .personnel {
    display: flex;
    padding: 30px 20px 0;
    justify-content: space-around;
    position: absolute;
    width: 1061px;
    height: 415px;
    top: 89px;
    left: 85px;
    border-radius: 6px;
    background: white;

  }
  .time-range {
    position: absolute;
    width: 1061px;
    height: 342px;
    top: 550px;
    left: 85px;
    //background: white;
    .time-top {
      display: flex;
      margin-bottom: 10px;
      .title {
        font-size: 24px;
        color: rgba(255, 255, 255, 1);
        margin-right: 20px;
      }
      .el-select {
        width: 100px;
      }
    }
    .time-content {
      display: flex;
      justify-content: space-between;
    }
  }
  .all-sort {
    position: absolute;
    width: 653px;
    height: 852px;
    top: 89px;
    left: 1182px;
    border-radius: 6px;
    background: white

  }
}
</style>
