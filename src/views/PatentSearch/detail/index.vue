
<template>
  <div class="container-box">
    <back-btn/>
    <div class="detail" v-loading="loading">
      <el-form :model="info" label-position="top">
        <div class="file-tip">文件名称</div>
        <div class="title" v-html="info.titleC"></div>
        <el-row :gutter="105">
          <el-col :span="8">
            <div class="base-item">
              类型：{{info.publicationType}}
            </div>
          </el-col>
          <el-col :span="8"> <div class="base-item">修改时间：{{info.updateTime}}</div></el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <el-row :gutter="105">
          <el-col :span="8"> <div class="base-item">解析时间：{{info.analysisTime}}</div></el-col>
<!--          <el-col :span="8"> <div class="base-item">提示词：<span style="display: inline-block"  v-html="info.promptContent"></span></div></el-col>-->
          <el-col :span="8"> <div class="base-item">标签：<el-tag v-for="(item, index) in info.tips" :key="index">{{item}}</el-tag></div></el-col>
        </el-row>
        <el-row>
          <el-button-group style="margin-top: 31px; margin-bottom: 41px">
            <el-button :type="isContent? 'primary': ''" @click="isContent= true" >专利申请文本</el-button>
            <el-button :type="isContent? '':'primary'" @click="isContent= false">解析结果</el-button>
          </el-button-group>
        </el-row>
        <PatentContent v-show="isContent" :info="info"></PatentContent>
        <Analysis v-show="!isContent" :info="info"></Analysis>
      </el-form>

    </div>
  </div>

</template>
<script>
// import Content from "./content.vue";
import Analysis from "./Analysis.vue";
import {patentSearchDetail, queryByApplicationNo} from "@/api/PatentSearch";
export default {
  components: { Analysis},
  name: "index",
  data() {
    return {
      isContent: true,
      info: {},
      loading: false,
    }
  },
  beforeMount() {
    this.initData();
  },
  // mounted() {
  //   this.$router.afterEach(() => {
  //
  //   })
  // },
  methods: {
    async initData() {
      this.loading = true;
      const data = {
        applicationNo: this.$route.query.applicationNo,
        publicationNo: this.$route.query.publicationNo,
        query: this.$route.query.query,
      }
      const data2 = {
        publicationNo: this.$route.query.publicationNo,
        // applicationNo: this.$route.query.applicationNo,
        // applicationNo: 'CN202311550167.0',
      }
     const res = await patentSearchDetail(data);
     const res2 = await queryByApplicationNo(data2);

      this.info = {
        analysisResult: res.analysisResult,
        ...res.fileContent,
        // titleC: res.fileContent.titleC.replace(/em/gi, 'mark' ),
        // abstractC: res.fileContent.abstractC.replace(/em/gi, 'mark' ),
        // technicalEffectSentence: res.fileContent.technicalEffectSentence.replace(/em/gi, 'mark' ),
        // claim: res.fileContent.claim.replace(/em/gi, 'mark' ),
        ...res2,
        patentFigure: res.patentFigure,
        // patentFigure: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //   'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
        analysisTitleC: res.analysisResult.titleC,
        tips: res2.label ? res2.label.split(',') : [],
      };
      this.loading = false;
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
</style>
