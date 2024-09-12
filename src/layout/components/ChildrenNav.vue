
<template>
<div class="children-nav">
  <div class="nav-item" @click="toPage(item)" v-for="(item, index) in navList" :key="index">
    {{item.label}}
  </div>
</div>
</template>
<script>
export default {
  name: "ChildrenNav",
  props: {
    navList: Array,
  },
  methods: {
    // 跳转页面
    toPage(item) {
      this.$emit('goPage', item)
    },
  }
}
</script>


<style scoped lang="scss">
.children-nav {
  z-index: 10;
  display: none;
  position: absolute;
  top: 36px;
  left: 50%;
  transform: translateX(-50%);
  //display: flex;
  flex-direction: column;
  background-color: #0A9FFD;
  .nav-item {
    white-space: nowrap;
    text-align: center;
    padding: 10px;
  }
  .nav-item:hover {
    background-color: #2d7ee7;
  }

}
</style>
