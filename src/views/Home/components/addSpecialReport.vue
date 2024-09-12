<template>
  <el-dialog
      v-if="dialogVisible"
      :title="titleText"
      :visible="dialogVisible"
      width="1200px"
      @close="closeView"
      :close-on-click-modal="false"
  >
    <el-form :model="form" ref="form" label-width="100px" >
      <el-form-item :label="firstName" :rules="rule.input" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="选择专利" :rules="rule.patentRule" prop="patents">
        <el-button class="add-title-btn" @click="addClass" type="primary" plain>添加标题</el-button>
        <div class="class-item" v-for="(item, index) in form.patents" :key="index">
          <el-input style="min-width: 130px; width: 130px ; margin-bottom: 15px" v-model="item.patentCategory"
                    placeholder="请输入分类名称"/>
          <img class="class-remove" @click="removeOneClass(item, index)" src="./remove.png" alt=""/>
          <el-button
              style="height: 56px; margin-left: 15px"
              icon="el-icon-plus"
              @click="handleAddPatent(index)"
          >添加专利
          </el-button>
          <div class="tips">
            <div class="tips-item" v-for="(item2,index2) in item.patents" :key="item2.id">
              <div class="text one-line-text" v-html="item2.name"></div>
              <img @click="removeOne(item, index,item2, index2)" src="./remove.png" alt=""/>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item v-if="!hidePromptContent" label="提示词选择" :rules="rule.input" prop="promptId">
        <el-select v-model="form.promptId" placeholder="请选择" clearable style="width: 200px" @change="chengePro">
          <el-option
              v-for="dict in promptOption"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
        <el-button style="margin-left: 18px" @click="goPage">提示词管理</el-button>
<!--                <el-input style="margin-top: 16px" :rows="10" type="textarea" v-model="form.promptContent"></el-input>-->
<!--        <div class="editor base-item-box">-->
<!--          <quill-editor-->
<!--              ref="QuillEditor"-->
<!--              v-model="form.promptContent"-->
<!--              v-bind:options="options"-->
<!--          />-->
<!--        </div>-->
      </el-form-item>
      <template>
        <el-form-item v-for="(item) in form.prompts" :key="item.id" :label="item.extractField">
          <el-input style="margin-top: 16px" :rows="10" type="textarea" v-model="item.extractSample"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSave">生成</el-button>
      <el-button type="primary" @click="closeView">关闭</el-button>
    </span>
    <selectPatentsDialog v-if="dialogVisible2" @addData="addData" title-text="选择专利"
                         :dialog-visible.sync="dialogVisible2"/>

  </el-dialog>
</template>

<script>
import rule from "@/mixins/rule";
import {addOne} from "@/api/SpecialReport";
import {getListAll, queryById} from "@/api/CueWord";
import selectPatentsDialog from "@/views/PatentManagement/SpecialReport/selectPatentsDialog.vue";
import {toolbarOptions} from "@/utils/constant";

export default {
  name: "addSpecialReport",
  components: {selectPatentsDialog},
  mixins: [rule],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // 弹窗标题
    titleText: {
      type: String,
      default: "专利情报分析",
    },
    // 第一名称
    firstName: {
      type: String,
      default: "专报名称",
    },
    //  选种项
    selectItems: {
      type: Array,
    },
    //  添加方法
    addMethod: {
      type: Function,
      default: addOne,
    },
    hidePromptContent: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      form: {
        title: '',
        patents: [
          {
            patentCategory: '',
            patents: [],
          }
        ], // 专报
        promptContent: '', // 提示词
        promptId: '', //提示词id
        prompts: [],
      },
      promptOption: [],
      dialogVisible2: false,
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
      option: [
        {
          label: 'a',
          value: 1,
        },
      ],
      addIndex: undefined,
    };
  },
  watch: {
    selectItems(val) {
      if (val.length > 0) {
        this.form.patents[0].patents = val.map(i => {
          return {
            id: i.publicationNo,
            name: i.titleC,
          }
        })
      }

    }
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      getListAll({type: 2, status: 1}).then(res => {
        this.promptOption = res.map(i => {
          return {
            label: i.templateName,
            value: i.id,
            text: i.extractSample,
          }
        })
      })
    },
    // 点击添加专利
    handleAddPatent(index) {
      this.dialogVisible2 = true;
      this.addIndex = index;
      // this.closeView();
    },
    closeView() {
      this.resetForm();
      this.$emit("update:dialogVisible", false);
    },
    // 重置表单
    resetForm() {
      this.$refs.form.resetFields();
    },
    //  添加分类
    addClass() {
      this.form.patents.push({patentCategory: '', patents: []});
    },
    addData(data) {
      const pushData = data.map(i => {
        return {
          name: i.titleC,
          id: i.publicationNo,
        }
      })
      console.log(pushData);
      pushData.forEach(i => {
        const index = this.form.patents[this.addIndex].patents.findIndex(j => j.id === i.id)
        if (index !== -1) {
          this.form.patents[this.addIndex].patents.splice(index, 1);
        }
      })
      this.form.patents[this.addIndex].patents.push(...pushData);
    },
    removeOneClass(item, index,) {
      this.form.patents.splice(index, 1);
    },
    removeOne(item, index, item2, index2) {
      this.form.patents[index].patents.splice(index2, 1);
    },
    //  保存
    onSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // this.$modal.loading('正在后台生成专报，请耐心等待');
          const data = {
            ...this.form,
            promptId: this.form.promptId + '',
            patents: this.form.patents.map(i => {
              return {
                ...i,
                patents: i.patents.map(j => j.id).join(','),
              }
            }),
          }
          this.addMethod(data).then(() => {
            this.$message.info('正在后台生成专报，请耐心等待');
            this.closeView();
          })
        }
      });

    },
    goPage() {
      this.$router.push({
        path: '/PatentManagement/CueWord',
      })
    },

    chengePro(val) {
      if (val) {
        queryById(val).then(res => {
          // console.log(res)
          this.form.prompts = res.extractFields.map(i => {
            return {
              extractSample: i.extractSample,
              extractField: i.extractField,
            }
          });
        })
        // const obj = this.promptOption.filter(i => i.value === val)[0];
        // this.form.promptContent = obj.text;
      }

    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  float: left !important;
}
::v-deep .el-form-item__content {
  position: relative;

  .add-title-btn {
    position: absolute;
    top: 36px;
    left: -106px;
  }
}
.class-item {
  display: flex;
  //align-items: center;
  ::v-deep .el-input__inner {
    height: 56px;
  }
}
.class-remove {
  height: 20px;
  margin-top: 18px;
  margin-left: 10px;
  cursor: pointer;
}

.base-item-box {
  border: 1px solid #DEE0E3;
  border-radius: 4px;
  padding: 19px 20px 15px;
  font-size: 16px;
  line-height: 26px;
  white-space: pre-line;

}

.editor {
  margin-top: 15px;
  width: 100%;

  ::v-deep .ql-editor {
    min-height: 200px;
  }
}

.tips {
  //margin-top: 23px;
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;

  .tips-item {
    margin-right: 18px;
    margin-bottom: 16px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 312px;
    height: 56px;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid #DEE0E3;
    line-height: normal;

    img {
      cursor: pointer;
    }
  }
}
</style>
