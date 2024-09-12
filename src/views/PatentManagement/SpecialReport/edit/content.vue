<template>
  <div class="content">
    <el-form-item label="专报名称">
      <el-input v-model="info.title"/>
    </el-form-item>
   <el-row :gutter="26" v-for="(item, index) in info.contents" :key="index">
     <el-col :span="12">
       <el-form-item label="" >
         <template v-slot:label>
           {{item.extractField}} <el-button type="primary" size="mini" @click="reCreateBaseInfo(item,index)" plain >重新生成</el-button>
         </template>
         <el-input type="textarea" :rows="15" v-model="item.analysisContent"/>
       </el-form-item>
     </el-col>
     <el-col :span="12">
       <el-form-item label="" >
         <template v-slot:label>
          自定义内容
         </template>
         <el-input type="textarea" :rows="15" v-model="item.customContent"/>
       </el-form-item>
     </el-col>
   </el-row>
    <ReferenceInformationDialog :dialog-visible.sync="dialogVisible" @getDetail="$emit('getDetail')" :content-id="contentId"/>
  </div>
</template>
<script>

import {toolbarOptions} from "@/utils/constant";
import ReferenceInformationDialog from "./referenceInformationDialog.vue";
import {reCreate} from "@/api/SpecialReport";

export default {
  props: {
    info: Object,
  },
  components: {ReferenceInformationDialog},
  name: "content",
  data() {
    return {
      dialogVisible: false,
      contentId: undefined,
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
  },
  methods: {
    reCreateBaseInfo(item, index) {
      this.contentId = item.id;
      if (index === 0) {
        this.dialogVisible = true;
      } else  {
        const data = {
          contentId: this.contentId,
          inputData: '',
        }
        reCreate(data).then(((res) => {
          if ( res ) {
            this.$message.success(res);
            // this.$message.success('提交成功');
            this.$emit('getDetail');
          }


          // this.getDetailInfo();
        }))
      }

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
::v-deep .el-form-item__label {
  height: 48px;
}
</style>
