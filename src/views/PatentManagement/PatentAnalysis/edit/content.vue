

<template>
  <div class="content">
    <el-form-item label="专利名称">
      <div class="base-item-box" v-html="info.titleC"></div>
    </el-form-item>
    <el-form-item label="英文标题">
      <div class="base-item-box">  {{info.titleE}}</div>
    </el-form-item>
    <el-form-item label="摘要">
      <div class="base-item-box" v-html="info.abstractC"> </div>
    </el-form-item>
    <el-row :gutter="60">
      <el-col :span="12">
        <el-form-item label="申请人">
          <div class="base-item-box" v-html="info.applicant"> </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="公开号">
          <div class="base-item-box" v-html="info.publicationNo"></div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="60">
      <el-col :span="12">
        <el-form-item label="申请号">
          <div class="base-item-box">  {{info.applicationNo}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="公开类型">
          <div class="base-item-box">  {{info.publicationType}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="技术功效">
      <div class="base-item-box" v-html="info.technicalEffectSentence"></div>
    </el-form-item>
    <el-form-item label="权利要求">
      <div class="base-item-box" v-html="info.claim"></div>
    </el-form-item>
    <el-form-item label="附图">
      <el-image
          style="width: 186px; height: 150px;margin-right: 10px; margin-bottom: 10px; cursor: pointer"
          v-for="(item, index) in info.patentFigure"
          fit="fill"
          :key="index"
          :src="item"
          :preview-src-list="info.patentFigure">
      </el-image>
    </el-form-item>
    <el-form-item v-if="info.instruction" label="说明书内容">
      <div class="base-item-box" v-html="info.instruction"></div>
    </el-form-item>
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
