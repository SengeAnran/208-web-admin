
<template>
  <div class="search">
    <div class="base-title flex">
      <span>科研创新助理</span>
    </div>
    <div class="search-input">
      <el-input type="textarea" v-model="query" rows="2" placeholder="请输入你的问题"  maxlength="100" show-word-limit/>
      <el-button  type="primary" @click="uploadQuery">提问</el-button>
    </div>
    <div class="recall" v-show="showResBox" >
      <div class="box-top">
        <div class="base-title flex">
          <span>智能回答</span>
          <img src="./title_icon_01.png" alt="">
        </div>
        <div class="top-right">
          <div class="tip-text">
            回答不够精准？试试进入科研创新助理上下文连续发问？
          </div>
          <el-button round @click="goPage">科研创新助理</el-button>
        </div>
      </div>
      <div class="recall-text" v-loading="loading">
        <template v-for="(item, index) in messages" >
          <span  v-if="item.content" class="recall-text-item"  :key="index">{{item.showContent}}</span>
        </template>
      </div>
    </div>
<!--    参考资料-->
    <div class="reference-material"  v-show="showResBox">
      <div class="box-top">
        <div class="base-title">
          <span>参考资料</span>
        </div>
        <div class="top-right">
          <div class="tip-text">
            没找到想要的资料？ 试试专利检索进行精确查找
          </div>
          <el-button @click="goQueryPage" round>专利检索</el-button>
        </div>
      </div>
      <div class="list">
        <el-button type="primary" @click="createSpecial" :disabled="selectItems.length === 0">专利情报分析</el-button>
        <el-button type="primary" @click="createDeep" :disabled="selectItems.length === 0">深度解析</el-button>
        <list :data-list="dataList"  v-loading="loading2"/>
      </div>
    </div>
    <add-special-report :dialog-visible.sync="dialogVisible" :select-items="selectItems"/>
    <add-deep-special-report :add-method="addMethod" titleText="深度解析" first-name="深度解析名称" hidePromptContent :dialog-visible.sync="deepDialogVisible" :select-items="selectItems"/>
  </div>
</template>
<script>
import list from './components/list.vue'
import { searchDocs} from "@/api/home";
// import {postChat} from "@/api/fatch";
import AddSpecialReport from "@/views/Home/components/addSpecialReport.vue";
import addDeepSpecialReport from "@/views/Home/components/addDeepSpecialReport.vue";
import { fetchEventSource } from "@microsoft/fetch-event-source";
// import store from "@/store";
import {mapGetters, mapMutations} from "vuex";
import {addOne} from "@/api/DeepAnalysis";
export default {
  name: "Search",
  components: {
    AddSpecialReport,
    addDeepSpecialReport,
    list,
  },
  data() {
    return {
      dialogVisible: false,
      deepDialogVisible: false,
      showResBox: false,
      loading: false,
      loading2: false,
      query: '',
      queryList: [],
      dataList: [],
      // selectItems: [],
      resStr: '航天行业最近比较热门的专利包括“特种超五类电缆结构“、“超高精导轨型材生产方法"、”双超卫星平台解耦控制方法”等。"特种超五类电缆结构“由湖南华菱线缆股份有限公司申报，”超高精导轨型材生产方法“由西南铝业集团有限公司申报。"双超卫星平台解耦控制方法“由航天科技集团八院509所申报，获得了中国专利金奖。它的创新之处在于提出了双六自由度全解耦控制方法，显著提升了卫星姿态控制水平，使得遥感卫星的拍照更加稳定、准确。具体来说，这项技术解决了传统遥感卫星上平台和载荷固连导致微振动直接影响载荷姿态控制精度的问题，这项技术的成功应用，不仅提升了遥感卫星的性能，还为其在高分辨率对地遥感、高精度空间探测等领域的应用提供了新的可能性,实现了低成本、高性能、高效能的发展目标。(智能回答示例，列举专利+申报人+专利简要解析)',
      showStr:'',
      messages: [
        // {
        //   content: '最',
        //   showContent: '最',
        // },
        // {
        //   content: '航天',
        //   showContent: '航天',
        // },
        // {
        //   content: '行业',
        //   showContent: '行业',
        // },
        // {
        //   content: '最近',
        //   showContent: '最近',
        // },
        // {
        //   content: '比较热门',
        //   showContent: '比较\n热门',
        // },
      ],
      addMethod: addOne,
      evtSource: null,
    }
  },
  computed: {
    ...mapGetters(['homeSearchData', 'homeUseSearchData', "questionRes", 'questionResList']),
    selectItems() {
      return this.dataList.filter(i => i.isCheck);
    },
  },
  beforeMount() {
    if (this.homeUseSearchData) {
      this.query = this.homeSearchData;
      this['home/SET_USER_SEARCH_DATA'](false);
      this.showResBox = true;
      this.messages = this.questionRes;
      this.dataList = this.questionResList;
    }
  },
  mounted() {
  },
  beforeDestroy() {
    // this.stopStreaming();
  },
  methods: {
    ...mapMutations(['home/SET_USER_SEARCH_DATA', 'home/SET_QUESTION_RES','home/SET_SEARCH_DATA', 'home/SET_QUESTION_RES_LIST']),
    async uploadQuery() {
      if (this.query === '') {
        return this.$message.warning('请输入搜索内容');
      }
      this.showResBox = true;
      this.loading = true;
      this.messages = []; // 新问题重置结果
      this.dataList= [];
      const  data = {
        query: this.query,
      }
      this['home/SET_SEARCH_DATA'](this.query);
      this.connectSse(data);
      // await this.startStreaming(data);
     // await this.getSearchRes(data);
    },
    connectSse(data){
      const ctrl = new AbortController();
      const that = this;
      fetchEventSource('/api/knowledgeBase/chat',{
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(data),
        signal: ctrl.signal,
        onopen(){
          // 成功连接时回调
          that.loading = false;
        },
        async onmessage(msg) {
          // 服务器返回消息回调 返回{ data,event,id,retry } ，data即服务器返回数据
          if (msg.event === '') {
            // 进行连接正常的操作流程
            let result = JSON.parse(msg.data);
            if (result.docs !== null && result.docs.length > 0) {
              await that.getSearchRes(result.docs)
            }
            // 将需要展示的数据更新到vue的data中,当然如下this.showData肯定赋值不上，需要将this 指向一个变量，用变量接受数据即可，以下只是展示
            that.messages.push({...result, showContent: '', id: that.messages.length});
            if (result.content !== null) {
              that.showResStr( that.messages[that.messages.length -1].content, that.messages[that.messages.length -1].id);
            }
          }
          if (msg.event === 'close') {
            ctrl.abort()
          }
        },

        onclose() {
          that['home/SET_QUESTION_RES'](that.messages);
        },
        onerror(err) {
          throw new err(err)
        }
      })
    },
    async getSearchRes(docs) {
      this.loading2 = true;
      const data = {
        docs: docs,
      }
      const res = await searchDocs(data);
      this.loading2 = false;
      this.dataList = res.map(i => {
        return {
          ...i,
          imgUrl: i.abstractImg ? i.abstractImg : require('./components/result-img.png'),
        }
      });
      this['home/SET_QUESTION_RES_LIST'](this.dataList);
    },
    goPage() {
      // this.$message.info('当前版本暂不支持，已自动跳转第三方')
      this.$router.push({
        path: '/ResearchInnovation'
      })
    },
    // 专利检索页面
    goQueryPage() {
      this.$router.push({
        path: '/PatentSearch'
      })
    },
    showResStr(resStr, index) {
      if (this.messages[index].showContent.length >= resStr.length) {
        return
      }
      setTimeout(() => {
        this.messages[index].showContent += resStr.charAt(this.messages[index].showContent.length);
        this.showResStr(resStr, index);
      },80)
    },
    // 生成专报
    createSpecial() {
      this.dialogVisible = true;
    },
    // 生成深度解析
    createDeep() {
      this.deepDialogVisible = true;
    }
  }
}
</script>


<style scoped lang="scss">
.base-title {
  margin-bottom: 25px;
  color: #1F2329;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: 22px; /* 110% */
  align-items: center;
  span {
    margin-right: 3px;
  }
}
.search-input {
  display: flex;
  align-items: center;
  ::v-deep .el-textarea__inner {
    border-radius: 12px;
    padding: 20px 25px;
    border: 1px solid white;
  }
  ::v-deep .el-button {
    width: 120px;
    //margin-top: 30px;
    margin-left: 20px;
  }
}
.recall {
  margin-top: 69px;
  .recall-text {
    margin-top: 20px;
    min-height: 135px;
    border-radius: 12px;
    background: #FFF;
    padding: 50px;
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px; /* 200% */
    .recall-text-item {
      //display: inline-block;
      white-space: pre-wrap;
    }
  }
}
.reference-material {
  margin-top: 69px;
}
.box-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .base-title {
    margin-bottom: 0;
  }
  .top-right {
    display: flex;
    align-items: center;
    .el-button {
      border: 1px solid #0A9FFD;
      color:  #0A9FFD;
    }
  }
}
.tip-text {
  color: #757882;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 122.222% */
  margin-right: 20px;
}
.list {
  margin-top: 20px;
  border-radius: 12px;
  background: #FFF;
  padding: 36px 52px  54px;
}
</style>
