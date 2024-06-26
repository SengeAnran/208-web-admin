
<template>
<div class="sort-box" :style="{width: width, height: height}">
  <div class="sort-header" :style="{height: headHeight, lineHeight: headHeight}">
    {{title}}
  </div>
  <div class="sort-content" :style="{height: contentH}">
    <div v-if="titles" class="sort-item"   >

      <div class="name">{{titles[0]}}</div>
      <div v-if="titles.length === 3" class="time">{{titles[2]}}</div>
      <div class="value">{{titles[1]}}</div>
    </div>
    <div class="sort-item" v-for="(item, index) in listData" :key="index" >

      <div class="name">
        <span class="index">{{index + 1}}</span>
        {{item.name}}</div>
      <div v-if="item.time" class="time">{{item.time}}</div>
      <div class="value">{{item.value}}</div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '328px'
    },
    height: {
      type: String,
      default: '351px'
    },
    headHeight: {
      type: String,
      default: '65px'
    },
    title: String,
    titles: Array,
    listData: {
      type: Array,
      default: () => {
        return [
          {
            name: '张爱',
            value: '290'
          },
          {
            name: '王雷',
            value: '290'
          },
        ]
      }
    },
  },
  name: "sort",
  data() {
    return {
    }
  },
  computed: {
    contentH() {
      return( this.height.slice(0, -2) *1 - this.headHeight.slice(0, -2) *1) + 'px'
    }
  }
}
</script>


<style scoped lang="scss">
.sort-box {
  background: white;
  border-radius: 6px;
  .sort-header {
    color: white;
    font-size: 24px;
    text-align: center;
    background: rgba(65, 110, 65, 1);
    border-radius: 6px 6px 0 0;
  }
  .sort-content {
    padding: 20px 20px ;
    overflow: auto;
    .sort-item {
      margin-bottom: 15px;
      padding: 0 30px 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 48px;

      border-radius: 8px;
      background: rgba(248, 249, 250, 1);
      .name {
        min-width: 90px;
      }
      .index {
        display: inline-block;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        width: 20px;
        height: 20px;
        background: rgba(65, 110, 65, 1);
        border-radius: 50%;
        color: white;
        margin-right: 10px;
      }
    }
  }
}
</style>
