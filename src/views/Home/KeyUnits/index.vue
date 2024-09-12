
<template>
<div class="container-box">
  <div class="icon-number-list">
    <div class="list-item" v-for="(item, index) in numberList" :class="{active: activeIndex === index}" @click="activeIndex = index" :key="index">
      <div class="item-right">
        <div class="name">{{item.name}}</div>
        <div class="number-unit">
          <count-up :num="item.number" fontsize="36px"/>
          <div class="unit">{{item.unit}}</div>
        </div>
      </div>
    </div>
  </div>
  <AllUnits v-show="activeIndex === 0"/>
  <TechnologyList v-show="activeIndex !== 0"/>
</div>
</template>

<script>
import AllUnits from "./components/AllUnits.vue";
import TechnologyList from "./components/TechnologyList.vue";

export default {
  name: "index",
  components: {TechnologyList, AllUnits},
  data() {
    return {
      activeIndex: 0,
      numberList: [
        {
          // imgUrl: require('./img/list_icon_02.svg'),
          // name: '生物技术和医药',
          name: '全部公司',
          number: 5642,
          bgColor: 'rgba(198, 233, 255, 0.5)',
          unit: '个'
        },
        {
          // imgUrl: require('./img/list_icon_03.svg'),
          name: '华为技术有限公司',
          number: 2563,
          bgColor: 'rgba(10, 159, 253, 0.2)',
          unit: '个技术'

        },
        {
          // imgUrl: require('./img/list_icon_04.svg'),
          // name: '化学和材料科学',
          name: '美的科技',
          number: 4568,
          bgColor: 'rgba(235, 196, 253, 0.2)',
          unit: '个技术'
        },
        {
          // imgUrl: require('./img/list_icon_05.svg'),
          // name: '机械工程自动化',
          name: '谷歌',
          number: 4256,
          bgColor: 'rgba(174, 233, 167, 0.2)',
          unit: '个技术',

        },
      ],
    }
  }
}
</script>

<style scoped lang="scss">
.icon-number-list {
  margin-top: 60px;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
  //flex-wrap: wrap;
  .list-item {
    color: #000;
    width: 280px;
    height: 110px;
    padding: 16px 20px;
    //margin-right: 12px;
    //margin-bottom: 28px;
    border-radius: 12px;
    //background: white;
    display: flex;
    align-items: center;
    background: white url("img/mask.png") right top no-repeat;
    &.active {
      //background: #0A9FFD;
      background: #0A9FFD url("img/blue_mask.png") right top no-repeat;
      color: white;
    }
    .item-left {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;

    }
    .name {

      /* 文字/P1.3-Reg */
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
    }
    .number-unit {
      display: flex;
      //align-items: center;
      .unit {
        margin-top: 17px;
        margin-left: 4px;
      }
    }
  }
}
</style>
