
<template>
<div class="analysis">
  <el-form-item v-for="(item, index) in info.analysisResult" :key="index" :label="item.extractField">
    <div class="base-item-box" v-html="item.extractSample"></div>
  </el-form-item>
<!--  <el-form-item label="应用领域">-->
<!--    <div class="base-item-box" v-html="info.applicationArea"></div>-->
<!--  </el-form-item>-->
<!--  <el-form-item label="背景解读">-->
<!--    <div class="base-item-box" v-html="info.bgExplanation"></div>-->
<!--  </el-form-item>-->
<!--  <el-form-item label="创新点">-->
<!--    <div class="base-item-box" v-html="info.innovationPoint"></div>-->
<!--  </el-form-item>-->
<!--&lt;!&ndash;  <el-form-item label="专利主体">&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="base-item-box" v-html="info.applicant"></div>&ndash;&gt;-->
<!--&lt;!&ndash;  </el-form-item>&ndash;&gt;-->
<!--  <el-form-item label="技术方案">-->
<!--    <div class="base-item-box" v-html="info.technicalProposal">-->
<!--    </div>-->
<!--  </el-form-item>-->
<!--  <el-form-item label="技术效果">-->
<!--    <div class="base-item-box" v-html="info.technicalEffect"></div>-->
<!--  </el-form-item>-->
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
