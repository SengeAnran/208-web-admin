<template>
  <div class=" container-box">
    <back-btn/>
    <div class="page-title">制导系统相关重点专利</div>
    <div class="result" v-loading="loading">
      <div class="result-list">
        <div class="result-box">
          <div class="result-item" @click="goDetail(item)"  v-for="(item,index) in dataList" :key="index">
            <div class="item-content">
              <div class="img"><img :src="item.imgUrl" alt=""></div>
              <div class="item-detail">
                <div class="cn">{{ item.publicationNo }}</div>
                <div class="title" v-html="item.titleC"></div>
                <div class="english">{{ item.titleE }}</div>
                <div class="line"></div>
                <div class="items-detail">
                  <div class="item-value">·公开(公告)日：{{ item.publicationDate }}</div>
                  <div class="item-value">·申请号：{{ item.applicationNo }}</div>
                  <div class="item-value">·申请日：{{ item.applicationDate }}</div>
                  <div class="item-value one-line-text max-width-300">·申请人：{{ item.applicant }}</div>
                  <div class="item-value">·IPC分类号：{{ item.ipcMainClass }}</div>
                </div>
              </div>
            </div>
                      <div class="check">
                        {{ index + 1 }}
<!--                        <el-checkbox v-model="item.isCheck"></el-checkbox>-->
                      </div>
          </div>

        </div>
        <!--分页-->
        <div style="text-align: right">
          <slot></slot>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import {getImportant} from "@/api/PatentSearch";

export default {
  name: "index",
  data() {
    return {
      dataList: [],
      loading: false,

    }
  },
  beforeMount() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      const data = {
        key: this.$route.query.key,
      }
      getImportant(data).then(res => {
        this.dataList = res.map(i => {
          return {
            ...i,
            // titleC: i.titleC,
            imgUrl: i.abstractImg ? i.abstractImg : require('./result-img.png'),
          }
        })
        this.loading = false;
      })
    },
    goDetail(item) {
      this.$router.push({
        path: '/PatentSearch/detail',
        query: {
          applicationNo: item.applicationNo,
          publicationNo: item.publicationNo,
        }
      })
    }
  },

}
</script>

<style scoped lang="scss">
.result {
  margin-top: 19px;
}

.page-title {
  margin-top: 44px;
  color: #000;
  font-family: "PingFang SC";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 133.333% */
}

.result-list {
  padding: 40px 40px;
  min-height: 714px;

  border-radius: 12px;
  background: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;

  .result-box {
    width: 100%;
    //max-height: 620px;
    //overflow: auto;
  }

  .result-item {
    position: relative;
    padding: 16px 20px;
    //width: 824px;
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
        width: 150px !important;
        height: 108px !important;
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
          width: 100%;
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
