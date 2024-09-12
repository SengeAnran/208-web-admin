<template>
  <div class="container-box">
    <back-btn/>
    <div class="edit">
      <el-form :model="info" label-position="top">
        <div class="file-tip">文件名称</div>
        <div class="title">{{ info.title }}</div>
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
<!--            <div class="base-item">提示词：<span style="display: inline-block" v-html="info.prompt"></span></div>-->
<!--          </el-col>-->
          <el-col :span="8">
            <div class="base-item">标签：
              <el-tag v-for="(item, index) in info.tips" :key="index">{{ item }}</el-tag>
            </div>
          </el-col>
        </el-row>
        <div class="flex" style="margin-bottom: 45px">
          <div class="base-item">相关专利：</div>
          <div class="patent">
            <div class="patent-item" v-for="(item, index) in info.patentNames" @click="goDetailPage(item)" :key="index">{{item.name}}</div>
          </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="解析结果" name="first">
            <MyContent :info="info"></MyContent>
          </el-tab-pane>
          <el-tab-pane label="解析审核" name="second">
            <AnalysisReview :info="info"/>
          </el-tab-pane>
        </el-tabs>
        <!--      <el-row>-->
        <!--        <el-button-group style="margin-top: 31px; margin-bottom: 41px">-->
        <!--          <el-button :type="isContent? 'primary': ''" @click="isContent= true">解析结果</el-button>-->
        <!--          <el-button :type="isContent? '':'primary'" @click="isContent= false">专利列表</el-button>-->

        <!--        </el-button-group>-->
        <!--      </el-row>-->

        <!--      <Analysis :info="info"></Analysis>-->
        <!--      <div class="btns">-->
        <!--        <el-button type="primary">重新解析</el-button>-->
        <!--        <el-button >保存</el-button>-->
        <!--        <el-button >导出</el-button>-->
        <!--      </div>-->
      </el-form>

    </div>

  </div>
</template>
<script>
import MyContent from "./content.vue";
import {getDetail} from "@/api/SpecialReport";
import AnalysisReview from "./AnalysisReview.vue";

export default {
  components: {
    AnalysisReview,
    MyContent},
  name: "index",
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      info: {
      },
      activeName: 'first'
    }
  },
  beforeMount() {
    if (this.$route.query.type === 'audit') {
      this.activeName = 'second';
    }
    this.getDetailInfo()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose(tag) {
      this.info.tips.splice(this.info.tips.indexOf(tag), 1);
      // getDetail
    },
    async getDetailInfo() {
      const data = {
        id: this.$route.query.id,
      }
      const res =await getDetail(data);
      this.info = {
        ...res,
        patentNames: res.patentNames? this.getPatentS(res) : [],
        tips: res.label ? res.label.split(',') : [],
      };
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      })
    },
    /**
     *  获得专利列表
     * @param res
     * @returns {*}
     */
    getPatentS(res) {
      const patentNames = res.patentNames.split(',');
      const patentNamesId = res.patents.split(',');
      const patentArr = patentNames.map((i,index) => {
        return {
          name: i,
          id: patentNamesId[index],
        }
      })
      return patentArr;
    },
    goDetailPage(item) {
      this.$router.push({
        path: '/PatentSearch/detail',
        query: {
          publicationNo: item.id,
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
  cursor: pointer;
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
