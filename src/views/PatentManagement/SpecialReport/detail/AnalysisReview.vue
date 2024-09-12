<template>
  <div class="analysis-review">
    <el-checkbox class="show-analysis" v-model="showAnalysisRes">显示系统解析结果</el-checkbox>
    <el-row :gutter="20">
      <el-col :span="leftSpan">
        <div class="review-res">
          <div class="review-res-top">
            <span>解析审核结果</span>
            <el-button @click="onReview" type="primary">保存</el-button>
          </div>
          <el-form :model="form">
            <el-form-item v-for="(item, index) in form.contents" :key="index" label="">
              <template v-slot:label>
                {{ item.extractField }}
              </template>
              <el-input type="textarea" :rows="6" v-model="item.auditContent"/>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="rightSpan">
        <div class="analysis-res">
          <div class="analysis-res-top">
            <span>系统解析结果</span>
          </div>
          <div class="res-detail">
            <div class="res-item" v-for="(item, index) in info.contents" :key="index">
              <div class="item-title">{{ item.extractField }}</div>
              <div class="item-content" v-html="item.analysisContent"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {audit, getAuditDetail} from "@/api/SpecialReport";

export default {
  props: {
    info: Object,
  },
  name: "AnalysisReview",
  data() {
    return {
      showAnalysisRes: true,
      leftSpan: 12,
      rightSpan: 12,
      form: {
        // title: '',
      }
    }
  },
  watch: {
    showAnalysisRes(val) {
      if (val) {
        this.leftSpan = 12;
        this.rightSpan = 12;
      } else {
        this.leftSpan = 24;
        this.rightSpan = 0;
      }
    },
  },
  beforeMount() {
    this.getDetail();
  },
  methods: {
    onReview() {
      const data = {
        ...this.form,
      }
      audit(data).then(() => {
        this.$message.success('保存成功！');
      })
    },
    getDetail() {
      const data = {
        id: this.$route.query.id,
      }
      getAuditDetail(data).then(res => {
        console.log(res)
        if (res.length === 0) {
          return this.initAuditData();
        }
        this.form = {
          id: this.$route.query.id,
          contents: res.map(i => {
            return {
              // ...i,
              auditContent: i.auditContent,
              extractField: i.extractField,
            }
          }),
        }
      })
    },
    initAuditData() {
      if (this.info.id) {
        this.form = {
          id: this.$route.query.id,
          contents: this.info.contents.map(i => {
            return {
              extractField: i.extractField,
              auditContent: '',
            }
          }),
        }
      } else {
        window.setTimeout(() => {
          if (this.info.id) {
            this.form = {
              id: this.$route.query.id,
              contents: this.info.contents.map(i => {
                return {
                  extractField: i.extractField,
                  auditContent: '',
                }
              }),
            }
          }
        },200)
      }
    }
  }
}
</script>


<style scoped lang="scss">
.analysis-review {
  position: relative;

  .show-analysis {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.review-res {
  .review-res-top {
    height: 40px;
    align-items: center;
    display: flex;

    span {
      margin-right: 29px;
      color: #1F2329;
      font-family: "PingFang SC";
      font-size: 18px;
      font-weight: bold;
    }
  }

}

.analysis-res {
  .analysis-res-top {
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: space-between;

    span {
      margin-right: 29px;
      color: #1F2329;
      font-family: "PingFang SC";
      font-size: 18px;
      font-weight: bold;
    }

    margin-bottom: 56px;
  }

  .res-detail {
    width: 100%;
    //height: 675px;
    border-radius: 4px;
    background: #F5F6F7;
    padding: 36px 30px;

    .res-item {
      color: #000;

      font-family: "PingFang SC";

      .item-title {
        margin-bottom: 14px;
        font-size: 18px;
        line-height: 22px;
      }

      .item-content {
        white-space: pre-wrap;
        font-size: 16px;
        line-height: normal;
        padding-bottom: 40px;

      }

      &:nth-child(n + 2) {
        border-top: 1px solid #DEE0E3;
        padding-top: 40px;
      }
    }
  }

}

.el-form-item {
  margin-bottom: 38px;

}

</style>
