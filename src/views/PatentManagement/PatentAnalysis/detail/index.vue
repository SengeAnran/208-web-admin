<template>
  <div class="container-box">
    <back-btn/>
    <div class="detail">
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
<!--            <div class="base-item">提示词：<span style="display: inline-block"  v-html="info.promptContent"></span></div>-->
<!--          </el-col>-->
          <el-col :span="8">
            <div class="base-item">标签：
              <el-tag v-for="(item, index) in info.tips" :key="index">{{ item }}</el-tag>
            </div>
          </el-col>
        </el-row>
        <!--      <div class="flex">-->
        <!--        <div class="base-item">相关专利：</div>-->
        <!--        <div class="patent">-->
        <!--          <div class="patent-item" v-for="(item, index) in info.patents" :key="index">{{item}}</div>-->
        <!--        </div>-->
        <!--      </div>-->
<!--        <el-row>-->
<!--          <el-button-group style="margin-top: 31px; margin-bottom: 41px">-->
<!--            <el-button :type="isContent? '':'primary'" @click="isContent= false">专利申请文本</el-button>-->
<!--            <el-button :type="isContent? 'primary': ''" @click="isContent= true">解析结果</el-button>-->
<!--          </el-button-group>-->

<!--        </el-row>-->
        <el-tabs v-model="activeName">
          <el-tab-pane label="专利申请文本" name="first">
            <PatentContent :info="info"></PatentContent>
          </el-tab-pane>
          <el-tab-pane label="解析结果" name="second">
            <Analysis :info="info"></Analysis>
          </el-tab-pane>
          <el-tab-pane label="解析审核" name="three">
            <AnalysisReview :info="info"/>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>
<script>
import Analysis from "./Analysis.vue";
import {getDetail} from "@/api/PatentAnalysis";
import AnalysisReview from "./AnalysisReview.vue";

export default {
  components: {AnalysisReview, Analysis},
  name: "index",
  data() {
    return {
      activeName: 'first',
      inputVisible: false,
      inputValue: '',
      info: {
        // technicalEffect: '发顺丰 \n发射点发生'
      },
    }
  },
  beforeMount() {
    if (this.$route.query.type === 'audit') {
      this.activeName = 'three';
    }
    this.getDetailInfo()
  },
  methods: {
    async getDetailInfo() {
      const data = {
        id: this.$route.query.id,
      }
      const res =await getDetail(data);
      const {analysisResult, fileContent} = res.detail;
      this.info = {
        // ...res.analysisResult,
        // claim: res.fileContent.claim.replace(/em/gi, 'mark' ),
        ...res,
        detail: undefined,
        analysisResult,
        ...fileContent,
        tips: res.label ? res.label.split(',') : [],
        // patentName: analysisResult.titleC,
      };
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      })
    },
    handleClose(tag) {
      this.info.tips.splice(this.info.tips.indexOf(tag), 1);
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
    }
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

.detail {
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
::v-deep .el-tabs__header {
  margin-bottom: 36px;
}
</style>
