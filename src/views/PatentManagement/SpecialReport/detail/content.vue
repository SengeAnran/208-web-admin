

<template>
  <div class="content">
    <el-form-item label="专报名称">
      <div class="base-item-box" v-html="info.title"></div>
    </el-form-item>
    <el-row :gutter="26" v-for="(item, index) in info.contents" :key="index">
      <el-col :span="24">
        <el-form-item label="" >
          <template v-slot:label>
            {{item.extractField}}
          </template>
          <div class="base-item-box" v-html="item.analysisContent +'<br/>'+item.customContent"></div>
        </el-form-item>
      </el-col>
<!--      <el-col :span="12">-->
<!--        <el-form-item label="" >-->
<!--          <template v-slot:label>-->
<!--            自定义内容-->
<!--          </template>-->
<!--          <div class="base-item-box" v-html="item.customContent"></div>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
    </el-row>
<!--    <el-form-item label="基本概况">-->
<!--      <div class="base-item-box" v-html="info.basicOverview"></div>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="技术情况">-->
<!--      <div class="base-item-box" v-html="info.technicalSituation"></div>-->
<!--    </el-form-item>-->
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
  name: "MyContent"
}
</script>
<style scoped lang="scss">
.el-form-item {
  margin-bottom: 38px;
}
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
  white-space: pre-wrap;
}
::v-deep .el-form-item__label {
  height: 48px;
}
</style>
