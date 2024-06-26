
<template>
  <div class="page">
    <div class="personnel">
      <Person/>
      <Education/>
    </div>
    <div class="time-range">
      <div class="time-top">
        <div class="title">考核场次</div>
        <el-select size="mini" value="1">
          <el-option value="1" label="202210体能考"></el-option>
        </el-select>
      </div>
      <div class="time-content">
        <Sort :list-data="listData1" :titles="titles1" title="3000米排行榜"/>
        <Sort  :list-data="listData2" :titles="titles2" title="仰卧起坐排行榜"/>
        <Sort  :list-data="listData3" :titles="titles3" title="蛇形跑排行榜"/>
      </div>
    </div>
    <div class="all-sort">
      <Sort :list-data="listData4"  width="653px" height="852px" head-height="94px" title="体能训练总分排行榜"/>
    </div>
  </div>
</template>
<script>

import Sort from "@/views/StatisticalAnalysis/components/sort.vue";
import Person from "@/views/StatisticalAnalysis/components/Person.vue";
import Education from "@/views/StatisticalAnalysis/components/Education.vue";

export default {
  name: "index",
  components: {Person, Sort,Education},
  data() {
    return {
      titles1: ['姓名','分数',	'时间'],
      titles2: ['姓名','分数',	'个数'],
      titles3: ['姓名','分数',	'时间'],
      listData1: [
        { name: '郑宇', time: '11:25', value: '30.00 '},
        { name: '李晓华', time: '11:32', value: '28.5'},
        { name: '林栋梁', time: '11:33', value: '28.5'},
        { name: '张宇翔', time: '11:37', value: '24'},
        { name: '王光雷', time: '11:41', value: '22.5'},
      ],
      listData2: [
        { name: '王光雷', time: '88', value: '15'},
        { name: '李晓华', time: '82', value: '14.3'},
        { name: '张春阳', time: '73', value: '12.8'},
        { name: '郑宇', time: '69', value: '12'},
        { name: '铁键平', time: '68', value: '12'},
      ],
      listData3: [
        { name: '铁键平', time: '18.7', value: '14.3'},
        { name: '郑宇', time: '19.1', value: '12.8'},
        { name: '张宇翔', time: '19.3', value: '12'},
        { name: '钱典兵', time: '19.5', value: '12'},
        { name: '杨威', time: '19.6', value: '11.3'},
      ],
      listData4: [
        { name: '郑宇', time: '', value: '54.8'},
        { name: '李晓华', time: '', value: '51.8'},
        { name: '王光雷', time: '', value: '47.3'},
        { name: '林栋梁', time: '', value: '46.5'},
        { name: '张宇翔', time: '', value: '45'},
        { name: '铁键平', time: '', value: '44.3'},
        { name: '张春阳', time: '', value: '39.8'},
      ],
    }
  }
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
        width: 150px;
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
