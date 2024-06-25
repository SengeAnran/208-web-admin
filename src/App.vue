<template>
  <div id="app">
    <Layout/>
    <fit-screen />
  </div>
</template>

<script>
// import AppTitle from "./components/AppTitle";
import Layout from "./layout/index.vue";
import FitScreen from "./components/FitScreen";
import("./scss/common.scss");
export default {
  name: "App",
  components: {
    // AppTitle,
    Layout,
    FitScreen,
  },
  data() {
    return {
      pageSize: {
        width: 1920,
        height: 1080,
      },
    };
  },
  comments: {
    // AppTitle,
    FitScreen,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  background: rgb(61,83,61);
  height: 100vh;

  border-radius: 6px 6px 0 0;
}
</style>
