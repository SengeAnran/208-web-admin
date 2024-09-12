
<template>
<div class="analysis">
  <el-form-item label="专利名称">
    <el-input v-model="info.title"/>
  </el-form-item>
  <el-form-item label="专利主体">
    <el-input v-model="info.titleEnglish"/>
  </el-form-item>
  <el-form-item label="应用领域">
    <el-input type="textarea" v-model="info.text"/>
  </el-form-item>
  <el-form-item label="技术方案">
    <div class="base-item-box">  {{info.text}}

      <img src="./img.png" alt="">
    </div>
  </el-form-item>

  <el-form-item label="技术效果">
    <el-input type="textarea" v-model="info.text"/>
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
