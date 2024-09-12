
<template>
<div class="bar-list">
  <div class="list-item" v-for="(item, index) in dataList" :key="index">
    <div class="label one-line-text">{{item.name}}</div>
    <div class="bar-box">
      <div class="bar" :style="{width: item.widthValue, background: item.color}"></div>
      <div class="number">{{item.value}}</div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: "barList",
  data() {
    return {
      dataList: [
        {
          name: '提高稳定性',
          value: 110,
          color: '#3370FF'
        },
        {
          name: '避免重复计算',
          value: 217,
          color: '#5C8DFF'
        },
        {
          name: '提高抗压能力',
          value: 96,
          color: '#85A9FF'
        },
        {
          name: '提高导热性能',
          value: 134,
          color: '#A7C1FF'
        },
        {
          name: '提高计算效率',
          value: 108,
          color: '#A7C1FF'
        },
        {
          name: '基他功效',
          value: 250,
          color: '#A7C1FF'
        },
      ],
    }
  },
  beforeMount() {
    this.initData();
  },
  methods: {
    initData() {
      const valueArr =  this.dataList.map(i => i.value);
      valueArr.sort((a, b) => (b - a));
      const maxValue = valueArr[0];
      this.dataList = this.dataList.map( i => {
        return {
          ...i,
          widthValue: i.value/ maxValue * 100 + '%',
        }
      })
      console.log(this.dataList)
      // this.dataList.map()
    },
    getWidth(value) {
      console.log(value)
    }
  }
}
</script>


<style scoped lang="scss">
.bar-list {
  padding: 48px 35px;
}
.list-item {
  display: flex;
  margin-bottom: 24px;
  .label {
    width: 110px;
    color: #000;
    font-family: "PingFang SC";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
  }
  .bar-box {
    position: relative;
    width: 360px;
    height: 24px;
    .bar {
      height: 100%;
      border-radius: 4px;

    }
    .number {
      position: absolute;
      left: 3px;
      top: 1px;
      color: white;
    }
  }
}
</style>
