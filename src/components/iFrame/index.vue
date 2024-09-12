<template>
  <div class="if-box" v-loading="loading"  :style="{height: height}">
    <iframe
      :src="src"
      frameborder="no"
      style="width: 100%; height: 100%"
      scrolling="auto"
    />
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      height: 'calc(100vh - 60px)',
      loading: true,
    };
  },
  mounted() {
    this.height = document.documentElement.clientHeight - 56 + "px;"
    setTimeout(() => {
      this.loading = false;
    }, 300);
    const that = this;
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 56 + "px;";
    };
  }
};
</script>
<style scoped lang="scss">
.if-box {
  height: 100%;
  background: white;
}
</style>
