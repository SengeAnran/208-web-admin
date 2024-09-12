<template>
  <div class="container-box">
    <back-btn/>
    <div class="edit">
      <el-form :model="info" label-position="top">
        <div class="file-tip">文件名称</div>
        <div class="title">{{ info.titleC }}</div>
        <el-row :gutter="105">
          <el-col :span="8">
            <div class="base-item">
              类型：{{info.source === 1? '文件上传' :( info.source === 2? '引用文件': '引用数据源')}}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="base-item">修改时间：{{ info.updateTime }}</div>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <el-row :gutter="105">
          <el-col :span="8">
            <div class="base-item">解析时间：{{ info.analysisTime }}</div>
          </el-col>
<!--          <el-col :span="8">-->
<!--            <div class="base-item">提示词：<span style="display: inline-block"  v-html="info.prompt"></span></div>-->
<!--          </el-col>-->
          <el-col :span="8">
            <div class="base-item">标签：
              <el-tag v-for="(item, index) in info.tips" :key="index" closable  @close="handleClose(item)">{{ item }}</el-tag>
              <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else type="primary" class="button-new-tag" size="small" @click="showInput" icon="el-icon-edit"></el-button>
            </div>
          </el-col>
        </el-row>
        <!--      <div class="flex">-->
        <!--        <div class="base-item">相关专利：</div>-->
        <!--        <div class="patent">-->
        <!--          <div class="patent-item" v-for="(item, index) in info.patents" :key="index">{{item}}</div>-->
        <!--        </div>-->
        <!--      </div>-->
        <el-row>
          <el-button-group style="margin-top: 31px; margin-bottom: 41px">
            <el-button :type="isContent? '':'primary'" @click="isContent= false">专利申请文本</el-button>
            <el-button :type="isContent? 'primary': ''" @click="isContent= true">解析结果</el-button>

          </el-button-group>
        </el-row>
        <PatentContent v-show="!isContent" :info="info"></PatentContent>
        <Analysis v-show="isContent" :info="info"></Analysis>
        <div class="btns">
          <el-button type="primary" @click="reAnalysis">重新解析</el-button>
          <el-button  @click="handleSave">保存</el-button>
          <el-button @click="expertData" >导出</el-button>
        </div>
      </el-form>
    </div>


  </div>
</template>
<script>
// import Content from "./content.vue";
import Analysis from "./Analysis.vue";
import {editOne, exportExcelSingle, getDetail, reAnalysis} from "@/api/PatentAnalysis";
import {downloadWordFile} from "@/utils/data";

export default {
  components: { Analysis},
  name: "index",
  data() {
    return {
      isContent: false,
      inputVisible: false,
      inputValue: '',
      info: {
      },
    }
  },
  beforeMount() {
    this.getDetailInfo()
  },
  methods: {
    handleClose(tag) {
      this.info.tips.splice(this.info.tips.indexOf(tag), 1);
      // getDetail
    },
    async getDetailInfo() {
      const data = {
        id: this.$route.query.id,
      }
      const res =await getDetail(data);
      const {analysisResult, fileContent} = res.detail;
      this.info = {
        // ...res.analysisResult,
        // ...res.fileContent,
        // titleC: res.fileContent.titleC.replace(/em/gi, 'mark' ),
        // abstractC: res.fileContent.abstractC.replace(/em/gi, 'mark' ),
        // technicalEffectSentence: res.fileContent.technicalEffectSentence.replace(/em/gi, 'mark' ),
        // claim: res.fileContent.claim.replace(/em/gi, 'mark' ),
        ...res,
        detail: undefined,
        analysisResult,
        ...fileContent,
        tips: res.label ? res.label.split(',') : [],
      };
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      })
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.info.tips.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 重新解析
    reAnalysis() {
      const data = {
        id: this.info.id,
      }
      reAnalysis(data).then((res = '解析中，请耐心等待') => {
        this.$message.success(res);
        this.getDetailInfo();
      })
    },
    // 保存
    handleSave() {
      const {id,  tips,analysisResult} = this.info;
      const data = {
        id, analysisResult,
        label: tips.length > 0 ? tips.join(','): '',
      }
      editOne(data).then(() => {
        this.$message.success('保存成功！');
        this.getDetailInfo();
      })
    },
    //  导出
    expertData() {
      exportExcelSingle({ publicationNo: this.info.publicationNo}).then(res => {
        downloadWordFile(res, this.info.titleC);
      })
    },

  },
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-bottom: 38px;
}
.el-tag + .el-tag {
  //margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.edit {
  margin-top: 40px;
  padding: 46px 42px 36px;
  //width: 1200px;
  //height: 1577px;
  border-radius: 12px;
  background: #FFF;
  font-size: 18px;
  color: #1F2329;
}

.base-item {
  margin: 11px 0;
}

.el-tag {
  margin-right: 10px;
}

.file-tip {
  margin-bottom: 15px;
  color: #73798C;
  font-size: 16px;
  line-height: 22px; /* 137.5% */
}

.title {
  color: #1F2329;
  font-size: 24px;
  //line-height: 22px; /* 91.667% */
  padding-bottom: 28px;
  border-bottom: 1px solid #DDDCE9;
}
.patent {
  margin-top: 11px;
}
.patent-item {
  color: #0A9FFD;
  font-family: "PingFang SC";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 155.556% */
}
</style>
