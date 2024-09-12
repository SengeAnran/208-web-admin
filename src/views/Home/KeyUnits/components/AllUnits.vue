
<template>
<div class="all-unit">
  <div class="theme-able">
    <div class="theme">
      <div class="base-mini-title">技术主题</div>
      <div class="content">
        <keyWordChart />
      </div>
    </div>
    <div class="able">
      <div class="base-mini-title">技术功效</div>
      <div class="content">
        <bar-list/>
      </div>
    </div>
  </div>
  <PublicTechnologyList/>
</div>
</template>
<script>
import PublicTechnologyList from "./PublicTechnologyList.vue"
import keyWordChart from "./keyWordChart.vue"
import BarList from "./barList.vue";

export default {
  name: "AllUnits",
  components: {BarList, PublicTechnologyList, keyWordChart}
}
</script>

<style scoped lang="scss">
.theme-able {
  display: flex;
  justify-content: space-between;
  .theme+.able {
    width: 580px;
  }
  .content {
    width: 580px;
    height: 368px;
    border-radius: 12px;
    background: #FFF;
  }
}
</style>
