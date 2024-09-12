
<template>
<div class="analysis">
  <el-form-item  v-for="(item, index) in info.analysisResult" :key="index" :label="item.extractField">
<!--    <el-input v-model="info.titleC"/>-->
    <el-input type="textarea" :rows="15" v-model="item.extractSample"/>
  </el-form-item>
<!--  <el-form-item label="应用领域">-->
<!--    <el-input type="textarea" :rows="15" v-model="info.applicationArea"/>-->

<!--&lt;!&ndash;    <div class="editor base-item-box">&ndash;&gt;-->
<!--&lt;!&ndash;      &ndash;&gt;-->
<!--&lt;!&ndash;      <quill-editor&ndash;&gt;-->
<!--&lt;!&ndash;          ref="QuillEditor"&ndash;&gt;-->
<!--&lt;!&ndash;          v-model="info.applicationArea"&ndash;&gt;-->
<!--&lt;!&ndash;          v-bind:options="options"&ndash;&gt;-->
<!--&lt;!&ndash;      />&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;  <el-form-item label="专利主体">&ndash;&gt;-->
<!--&lt;!&ndash;    <el-input v-model="info.applicant"/>&ndash;&gt;-->
<!--  </el-form-item>-->

<!--  <el-form-item label="背景解读">-->
<!--    <el-input type="textarea" :rows="15" v-model="info.bgExplanation"/>-->
<!--&lt;!&ndash;    <div class="editor base-item-box">&ndash;&gt;-->
<!--&lt;!&ndash;      <quill-editor&ndash;&gt;-->
<!--&lt;!&ndash;          ref="QuillEditor"&ndash;&gt;-->
<!--&lt;!&ndash;          v-model="info.bgExplanation"&ndash;&gt;-->
<!--&lt;!&ndash;          v-bind:options="options"&ndash;&gt;-->
<!--&lt;!&ndash;      />&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--  </el-form-item>-->

<!--  <el-form-item label="创新点">-->
<!--    <el-input type="textarea" :rows="15" v-model="info.innovationPoint"/>-->
<!--&lt;!&ndash;    <div class="editor base-item-box">&ndash;&gt;-->
<!--&lt;!&ndash;      <quill-editor&ndash;&gt;-->
<!--&lt;!&ndash;          ref="QuillEditor"&ndash;&gt;-->
<!--&lt;!&ndash;          v-model="info.innovationPoint"&ndash;&gt;-->
<!--&lt;!&ndash;          v-bind:options="options"&ndash;&gt;-->
<!--&lt;!&ndash;      />&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--  </el-form-item>-->

<!--  <el-form-item label="技术方案">-->
<!--    <el-input type="textarea" :rows="15" v-model="info.technicalProposal"/>-->
<!--&lt;!&ndash;    <div class="editor base-item-box">&ndash;&gt;-->
<!--&lt;!&ndash;      <quill-editor&ndash;&gt;-->
<!--&lt;!&ndash;          ref="QuillEditor"&ndash;&gt;-->
<!--&lt;!&ndash;          v-model="info.technicalProposal"&ndash;&gt;-->
<!--&lt;!&ndash;          v-bind:options="options"&ndash;&gt;-->
<!--&lt;!&ndash;      />&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--  </el-form-item>-->

<!--  <el-form-item label="技术效果">-->
<!--    <el-input type="textarea" :rows="15" v-model="info.technicalEffect"/>-->
<!--&lt;!&ndash;    <div class="editor base-item-box">&ndash;&gt;-->
<!--&lt;!&ndash;      <quill-editor&ndash;&gt;-->
<!--&lt;!&ndash;          ref="QuillEditor"&ndash;&gt;-->
<!--&lt;!&ndash;          v-model="info.technicalEffect"&ndash;&gt;-->
<!--&lt;!&ndash;          v-bind:options="options"&ndash;&gt;-->
<!--&lt;!&ndash;      />&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--  </el-form-item>-->
</div>
</template>
<script>
import {toolbarOptions} from "@/utils/constant";

export default {
  name: "Analysis",
  props: {
    info: Object,
  },
  data() {
    return {
      options: {
        placeholder: "请输入",
        theme: "bubble",
        contentType: 'html',
        modules: {
          toolbar: {
            show: false,
            container: toolbarOptions, // 显示配置
            handlers: {                // 逻辑配置
              // "image": this.handleImageButton, // 自定义 image 按钮的处理函数
              // "clean": this.handleCleanButton, // 自定义 clean 按钮的处理函数
              // ...
            }
          }
        }
      }, // 配置
    }
  }
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

}
.editor {
  width: 100%;
  padding: 0;
  ::v-deep .ql-editor {
    min-height: 200px;
  }
}
</style>
