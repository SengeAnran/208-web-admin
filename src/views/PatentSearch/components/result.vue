<template>
  <div class="result">
    <div v-if="!hideBtn" class="create-report">
      <el-button type="primary" @click="createSpecial" :disabled="selectItems.length === 0">专利情报分析</el-button>
      <el-button type="primary" @click="createDeep" :disabled="selectItems.length === 0">深度解析</el-button>
    </div>
    <el-row :gutter="33">
      <el-col :span="5">
        <div class="query-box">
          <el-checkbox-group v-model="form.checkList">
            <div class="query-item" v-for="(item, index) in queryList" :key="index">
              <div class="query-title" @click="item.show = !item.show">
                <div>{{ item.name }}</div>
                <i v-show="!item.show" class="el-icon-arrow-up"></i>
                <i v-show="item.show" class="el-icon-arrow-down"></i>
              </div>
              <div v-show="item.show" class="query-list">
                <el-checkbox :checked="isChecked(item2)" v-for="(item2, index2) in item.children" :key="index2" :label="item2" :value="item2">{{item2.data}}</el-checkbox>
              </div>
            </div>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col :span="19">
        <Empty v-if="this.dataList.length === 0 "/>
        <div v-else class="result-list">
          <div class="result-box">
            <div class="result-item" v-for="(item,index) in dataList" :key="item.publicationNo">
              <div class="item-content"  @click="goDetail(item)">
                <div class="img"><img :src="item.imgUrl" alt=""></div>
                <div class="item-detail">
                  <div class="cn " v-html="item.publicationNo"></div>
                  <div class="title" v-html="item.titleC"></div>
                  <div class="english" v-html="item.titleE"></div>
                  <div class="line"></div>
                  <div class="items-detail">
                    <div class="item-value">·公开(公告)日：<span v-html="item.publicationDate"></span></div>
                    <div class="item-value">·申请号：<span v-html="item.applicationNo"></span></div>
                    <div class="item-value">·申请日：<span v-html="item.applicationDate"></span></div>
                    <div class="item-value one-line-text max-width-300">·申请人：<span v-html="item.applicant"></span></div>
                    <div class="item-value">·IPC分类号：<span v-html="item.ipcMainClass"></span></div>
                  </div>
                </div>
              </div>
              <div class="check">
                {{ (page - 1) * size + index + 1 }}
                <el-checkbox v-model="item.isCheck" @click.prevent></el-checkbox>
              </div>
            </div>
          </div>
        <!--分页-->
          <div style="text-align: right">
            <slot></slot>
          </div>
        </div>

      </el-col>
    </el-row>
    <add-special-report :dialog-visible.sync="dialogVisible" :select-items="selectItems"/>
    <add-deep-special-report :add-method="addMethod" titleText="深度解析" first-name="深度解析名称" hidePromptContent :dialog-visible.sync="deepDialogVisible" :select-items="selectItems"/>
  </div>
</template>
<script>

import {mapMutations} from "vuex";
import _ from 'lodash'
import AddSpecialReport from "@/views/Home/components/addSpecialReport.vue";
import addDeepSpecialReport from "@/views/Home/components/addDeepSpecialReport.vue";
import {addOne} from "@/api/DeepAnalysis";
export default {
  components: {AddSpecialReport, addDeepSpecialReport},
  props: {
    hideBtn: {
      type: Boolean,
      default: false,
    },
    hideCheck: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
    },
    page: {
      type: Number,
    },
    size: {
      type: Number,
    },
    dataList: {
      type: Array,
    },
    queryList: {
      type: Array,
    }
  },
  name: "result",
  data() {
    return {
      dialogVisible: false,
      deepDialogVisible: false,
      addMethod: addOne,

    }
  },
  computed: {
    selectItems() {
      return this.dataList.filter(i => i.isCheck);
    },
  },
  methods: {
    ...mapMutations(['patentSearch/SET_SEARCH_DATA']),
    isChecked(item) {
      return this.form.checkList.some(i => {
        return i.data === item.data && i.fatherKey === item.fatherKey
      })
    },
    goDetail(item) {
      const data = _.cloneDeep(this.form);
      this['patentSearch/SET_SEARCH_DATA'](data);
      this.$router.push({
        path: '/PatentSearch/detail',
        query: {
          applicationNo: item.applicationNo,
          publicationNo: item.publicationNo,
          query: this.form.searchValue,
        }
      })
    },
    // 生成专报
    createSpecial() {
      this.dialogVisible = true;
    },
    // 深度解析
    createDeep() {

      this.deepDialogVisible = true;
    }
  },

}
</script>

<style scoped lang="scss">
.result {
  position: relative;
  margin-top: 20px;

}
.create-report {
  position: absolute;
  right: 0;
  top: -52px;
}
.query-box {
  padding: 32px 22px;
  width: 100%;
  min-height: 714px;
  //height: 714px;
  //overflow: auto;
  border-radius: 12px;
  background: #FFF;

  .query-item {
    .query-title {
      //background-color: yellow;
      font-size: 14px;
      height: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      margin-bottom: 10px;
      border-bottom: 1px solid #EBEDED;

      div {
        color: #545B64;
        font-family: "Microsoft YaHei";
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 171.429% */
      }

      .el-icon-arrow-up, .el-icon-arrow-down {
        color: rgba(143, 149, 158, 1);
        font-size: 20px;
        display: inline-block;
      }
    }

    .query-list {
      margin-bottom: 23px;
      display: flex;
      flex-direction: column;
      ::v-deep .el-checkbox__label {
        max-width: 200px;
        white-space: break-spaces;
      }
    }
  }
}

.result-list {
  padding: 40px 0;
  //height: 714px;

  border-radius: 12px;
  background: #FFF;
   display: flex;
  flex-direction: column;
  align-items: center;

  .result-box {
    //max-height: 620px;
    //overflow: auto;
  }
  .result-item {
    position: relative;
    width: 824px;
    height: 192px;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid #DEE0E3;
    margin-bottom: 20px;
    .item-content {
      height: 100%;
      display: flex;
      align-items: center;
      .img {
        width: 150px;
        height: 108px;
        margin-right: 85px;
        margin-left: 39px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .item-detail {
        width: 790px;
        .cn {
          color: #0A9FFD;
          font-size: 12px;
          margin-bottom: 3px;
        }
        .title {
          color: #000;
          font-size: 16px;
        margin-bottom: 3px;
        }
        .english {
          color: #73798C;
          font-size: 12px;
        }
        .line {
          margin: 10px 0;
          height: 1px;
          width: 414px;
          background-color: rgba(221, 220, 233, 1);
        }
        .items-detail {
          display: flex;
          flex-wrap: wrap;
          .item-value {
            width: 50%;
            color: #3A3F4D;
            font-size: 14px;
            line-height: 20px; /* 142.857% */
          }
        }
      }
    }
    .check {
      position: absolute;
      top: 20px;
      left: 16px;
      display: flex;
      align-items: center;
      color: #000;
      font-family: "PingFang SC";
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      .el-checkbox {
        margin-left: 5px;
      }
    }
  }
}
</style>
