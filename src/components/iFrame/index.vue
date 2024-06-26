<template>
  <div class="if-box" v-loading="loading" >
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
      height: document.documentElement.clientHeight - 94.5 + "px;",
      loading: true,
    };
  },
  mounted: function () {
    setTimeout(() => {
      this.loading = false;
    }, 300);
    const that = this;
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 94.5 + "px;";
    };
  }
};
</script>
<style scoped lang="scss">
.if-box {
  height: 100%;
}
</style>
