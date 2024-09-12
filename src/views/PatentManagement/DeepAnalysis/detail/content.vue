

<template>
  <div class="content ql-editor">
    <el-form-item label="深度解析名称">
      <div class="base-item-box" v-html="info.title"></div>
    </el-form-item>
    <el-form-item label="相关专利概述">
      <div class="base-item-box" v-html="info.basicOverview"></div>
    </el-form-item>
    <el-form-item label="深度解读">
      <div class="base-item-box" v-html="info.technicalSituation"></div>
    </el-form-item>
<!--    <el-form-item label="启示与建议">-->
<!--      <div class="base-item-box" v-html="info.inspirationAndSuggestion"></div>-->
<!--    </el-form-item>-->
  </div>
</template>
<script>
export default {
  props: {
    info: Object,
  },
  name: "content"
}
</script>
<style scoped lang="scss">

.content {
  padding: 0;
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

}
</style>
