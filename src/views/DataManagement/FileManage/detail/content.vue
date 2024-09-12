

<template>
  <div class="content">
    <el-form-item label="专利名称">
      <el-input type="textarea" v-model="info.text"/>
    </el-form-item>
    <el-form-item label="专利主体">
      <el-input type="textarea" v-model="info.text"/>
    </el-form-item>
    <el-form-item label="应用领域">
      <el-input type="textarea" v-model="info.text"/>
    </el-form-item>
    <el-form-item label="技术方案">
    <div class="base-item-box">  {{info.text}}

      <img src="./img.png" alt="">
    </div>
  </el-form-item>

<!--    <el-row :gutter="60">-->
<!--      <el-col :span="12">-->
<!--        <el-form-item label="申请人">-->
<!--          <el-input v-model="info.applyName"/>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <el-form-item label="公开号">-->
<!--          <el-input v-model="info.number"/>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="60">-->
<!--      <el-col :span="12">-->
<!--        <el-form-item label="申请号">-->
<!--          <el-input v-model="info.number"/>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <el-form-item label="公开类型">-->
<!--          <el-input v-model="info.type"/>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-form-item label="技术功效">-->
<!--      <el-input v-model="info.number"/>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="权利要求">-->
<!--      <el-input v-model="info.number"/>-->
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
