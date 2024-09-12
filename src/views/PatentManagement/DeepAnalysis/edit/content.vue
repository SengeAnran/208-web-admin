<template>
  <div class="content">
    <el-form-item label="深度解析名称">
      <el-input v-model="info.title"/>
    </el-form-item>
    <el-form-item label="相关专利概述">
            <el-input type="textarea" :rows="15" v-model="info.basicOverview"/>
<!--      <div class="editor base-item-box">-->
<!--        <quill-editor-->
<!--            ref="QuillEditor"-->
<!--            theme="snow "-->
<!--            v-model="info.basicOverview"-->
<!--            v-bind:options="options"-->
<!--        />-->
<!--      </div>-->

    </el-form-item>
    <el-form-item label="深度解读">
      <el-input type="textarea" :rows="15" v-model="info.technicalSituation"/>
<!--      <div class="editor base-item-box">-->
<!--        <quill-editor-->
<!--            ref="QuillEditor"-->
<!--            v-model="info.technicalSituation"-->
<!--            v-bind:options="options"-->
<!--        />-->
<!--      </div>-->
    </el-form-item>
<!--    <el-form-item label="启示与建议">-->
<!--      <el-input type="textarea" :rows="15" v-model="info.inspirationAndSuggestion"/>-->
<!--&lt;!&ndash;      <div class="editor base-item-box">&ndash;&gt;-->
<!--&lt;!&ndash;        <quill-editor&ndash;&gt;-->
<!--&lt;!&ndash;            ref="QuillEditor"&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="info.inspirationAndSuggestion"&ndash;&gt;-->
<!--&lt;!&ndash;            v-bind:options="options"&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </el-form-item>-->
  </div>
</template>
<script>

import {toolbarOptions} from "@/utils/constant";

export default {
  props: {
    info: Object,
  },
  name: "content",
  data() {
    return {
      options: {
        placeholder: "请输入",
        theme: "bubble",
        contentType: 'html',
        modules: {
          toolbar: {
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
  padding: 0;

}

.editor {
  width: 100%;

  ::v-deep .ql-editor {
    min-height: 200px;
  }
}
</style>
