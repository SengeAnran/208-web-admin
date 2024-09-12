<template>
  <div class="layout">
    <HeaderBar/>
    <router-view/>
  </div>
</template>
<script>
import HeaderBar from "./components/headerBar.vue";

export default {
  name: "Layout",
  components: {HeaderBar}
}
</script>

<style scoped lang="scss">
.layout {
  //margin-top: 71px;
  //background-color: #F5F6F7;
  padding-top: 56px;
  height: 100%;
}
</style>
