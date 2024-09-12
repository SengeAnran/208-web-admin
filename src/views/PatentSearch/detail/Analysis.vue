
<template>
<div class="analysis">
  <el-form-item v-for="(item, index) in info.analysisResult" :key="index" :label="item.extractField">
    <div class="base-item-box" v-html="item.extractSample"></div>
  </el-form-item>
</div>
</template>
<script>
export default {
  name: "Analysis",
  props: {
    info: Object,
  },
}
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 38px;
}
::v-deep .el-form-item__label {
  color: #000;
  font-size: 18px;
  line-height: 22px; /* 122.222% */
  padding-bottom: 20px;
}
.base-item-box {
  border: 1px solid #DEE0E3;
  border-radius: 4px;
  padding: 19px 20px 15px;
  font-size: 16px;
  line-height: 26px;
  white-space: pre-wrap;
}
</style>
