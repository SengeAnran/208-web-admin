<template>
  <div class="assistant container-box">
<!--    <el-button-group>-->
<!--      <el-button v-for="(item,index) in btnList" :key="index" :class="{ 'el-button&#45;&#45;primary':activeIndex === index}"-->
<!--                 @click="changeActive(index)">{{ item }}-->
<!--      </el-button>-->
<!--    </el-button-group>-->
    <!--  消息问道记录-->
    <div class="chat-list" ref="container">
      <div class="chat-list-item" v-for="(item,index) in chatList" :key="index">
        <!--       问  -->
        <div class="question-item" v-if="item.type === 'question'">
          <div class="header-img">
            <img src="./img/question_header.png" alt="">
          </div>
          <div class="question-info">
            <div class="question-text">{{ item.content }}</div>
            <div class="question-base-info">
              <div class="time">{{ item.time }}</div>
              <div class="copy" @click="copyText(item.content)">
                <i class="el-icon-copy-document"></i> 复制
              </div>
              <i class="refresh el-icon-refresh-right" @click="refresh(item)"></i>
            </div>
          </div>
        </div>
        <!--        答-->
        <div class="res-item" v-if="item.type === 'res'">
          <div class="res-top">
            <div class="header-img">
              <img src="./img/res_header.png" alt="">
            </div>
            <div class="res-text">
              <template v-for="(item2, index2) in item.messages" >
                <span  v-if="item2.content" class="recall-text-item"  :key="index2">{{item2.showContent}}</span>
              </template>
            </div>
          </div>
          <div v-if="item.references.length > 0" class="book-list">
            <div class="tip">
              参考资料
              <span @click="item.showReferences = !item.showReferences">收起/展开</span>
            </div>
            <div v-show="item.showReferences" class="book-list-item" v-for="(item2, index2) in item.references"
                 :key="index2">
              <div class="book-title">{{ item2.doc_name }}</div>
              <div class="book-text">
                {{ item2.chunk_text }}
              </div>
            </div>
          </div>
          <div class="res-base-info">
            <div class="time">{{ item.time }}</div>
            <div class="copy" @click="copyText(item.content)">
              <i class="el-icon-copy-document"></i> 复制
            </div>
            <div class="delete" @click="deleteOne(index)">
              <i class="refresh el-icon-delete"></i>删除
            </div>
          </div>
        </div>
      </div>
      <div class="loading" v-loading="loading"></div>
    </div>
    <!--  提问框-->
    <div class="input-section">
      <div class="input-box">
        <div class="clear"><img src="./img/clear.png" alt="" @click="current_input = ''">清空</div>
        <el-input v-model.trim="current_input" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" @click="() => uploadQuery()">发送</el-button>
    </div>
  </div>
</template>
<script>
import {fetchEventSource} from "@microsoft/fetch-event-source";
import moment from 'moment';
export default {
  name: "index",
  data() {
    return {
      container: null,
      loading: false,
      activeIndex: 0,
      btnList: ['RAG对话', '多功能对话'],
      dialog_type: '', // general： 通用对话 rag：让对话
      current_input: '', // 提问
      history: [],
      chatList: [
        // {
        //   type: 'question',
        //   content: '航天行业有哪些比较热门的专利?',
        //   time: '2024-7-2 17:26:54',
        // },
        // {
        //   type: 'res',
        //   content: '航天行业最近比较热门的专利获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖包括"特种超五类电缆结构“、',
        //   messages: [],
        //   time: '2024-7-2 17:26:54',
        //   showReferences: true,
        //   references: [
        //     {
        //       chunk_text: '航天行业最近比较热门的专利获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖包括。',
        //       doc_name: 'CN00513234234234.txt',
        //     },
        //     {
        //       chunk_text: '航天行业最近比较热门的专利获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖获得了中国专利金奖包括',
        //       doc_name: 'CN00513234234234.txt',
        //     }
        //   ]
        // },
      ]
    }
  },
  mounted() {
    this.container = this.$refs.container;
    // console.log(this.container)
  },
  methods: {
    //  切换对话类型
    changeActive(index) {
      if (this.activeIndex === index) {
        return
      }
      this.activeIndex = index;
      this.dialog_type = '';
      // this.dialog_type = index ? 'general' : 'rag';
      this.chatList = [];
      this.history = [];
    },
    //  复制文本
    async copyText(text) {
      await navigator.clipboard.writeText(text);
      this.$message.success('复制成功！');
    },
    // 删除一个聊天项
    deleteOne(index) {
      this.chatList.splice(index, 1);
    },
    // 重新提问
    refresh(item) {
      this.uploadQuery(item.content);
    },
    // 提问
    async uploadQuery(query) {
      // console.log(query, this.current_input)
      if (this.current_input === '' && !query) {
        return this.$message.warning('请输入搜索内容');
      }
      this.loading = true;
      const history = this.history;
      const data = {
        current_input: (query ? query : this.current_input),
        // dialog_type: this.dialog_type, // 对话类型
        dialog_type: '', // 对话类型
        history: history,
      }
      this.chatList.push( {
        type: 'question',
        content:  (query? query : this.current_input),
        history: [],
        time: moment().format('yyyy-MM-DD HH:mm:ss'),
      })
      this.current_input ='';

      this.$nextTick(() => {
        this.scrollToBottom();
      })
      this.connectSse(data);
      // await this.startStreaming(data);
      // await this.getSearchRes(data);
    },
    // 提问发起请求
    connectSse(data) {
      this.loading =true;
      const ctrl = new AbortController();
      const that = this;
      fetchEventSource('/api/generalAbility/smartChat', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(data),
        signal: ctrl.signal,
        onopen() {
          // 成功连接时回调
          that.loading = false;
          that.chatList.push( {
            type: 'res',
            content: '',
            messages: [],
            time: '',
            showReferences: false,
            references: []
          })
        },
        async onmessage(msg) {
          // 服务器返回消息回调 返回{ data,event,id,retry } ，data即服务器返回数据
          if (msg.event === '') {
            // 进行连接正常的操作流程
            const str = msg.data.replace('data:', '');
            let result = JSON.parse(str);
            // console.log(result);
            const currentObj = that.chatList[that.chatList.length -1]; // 当前聊天数组元素对象
            //  返回时间和相关文档
            if ( result.complete_time) {
              currentObj.references = result.references;
              currentObj.time = result.complete_time;
              currentObj.history = result.history;
              that.history = result.history;
              that.scrollToBottom();
            }
            // 将需要展示的数据更新到vue的data中,当然如下this.showData肯定赋值不上，需要将this 指向一个变量，用变量接受数据即可，以下只是展示
            const index = that.chatList[that.chatList.length -1].messages.length; // 将元素长度作为当前id；
            currentObj.messages.push({...result, showContent: '', id: index});
            if (result.content !== undefined) { // 流式展示文字
              currentObj.content = currentObj.content.concat(result.content); // 返回内容连接
              that.scrollToBottom();
              that.showResStr(result.content, index);
            }
          }
          if (msg.event === 'close') {
            ctrl.abort()
          }
        },

        onclose() {
          // that['home/SET_QUESTION_RES'](that.messages);
        },
        onerror(err) {
          throw new err(err)
        }
      })
    },
    showResStr(resStr, index) {
      const showObj = this.chatList[this.chatList.length -1]; // 对话最后一个元素
      if (showObj.messages[index].showContent.length >= resStr.length) {
        return
      }
      setTimeout(() => {
        showObj.messages[index].showContent += resStr.charAt(showObj.messages[index].showContent.length);
        this.showResStr(resStr, index);
      },50)
    },
    // 滚动到底部
    scrollToBottom() {
      this.container.scrollTo(0,this.container.scrollHeight);
    }
  },
}
</script>


<style scoped lang="scss">
.el-button-group {
  .el-button {
    background: #F5F6F7;
    border: none;
  }

  .el-button--primary {
    background-color: #409EFF;
  }
}

.assistant {
  margin-top: 48px;
  padding: 42px;
  border-radius: 12px;
  background: #FFF;
}

.chat-list {
  height: 496px;
  overflow-y: auto;
  //will-change: scroll-position;
  margin-top: 38px;
  margin-bottom: 30px;
  padding-right: 3px;
  ///*  */
  .loading {
    height: 100px;
  }
  .chat-list-item {
    // 提问
    .question-item {
      display: flex;
      align-items: center;
      margin-bottom: 38px;

      .header-img {
        height: 76px;
        width: 76px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 14px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .question-info {
        .question-text {
          color: #1F2329;
          font-family: "PingFang SC";
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 122.222% */
          margin-bottom: 6px;
        }

        .question-base-info {
          display: flex;
          align-items: center;
          font-size: 16px;
          line-height: 22px;
          color: #808080;

          i {
            font-size: 18px;
          }

          .time {
            margin-right: 21px;
          }

          .copy {
            margin-right: 16px;
            cursor: pointer;
          }

          .refresh {
            cursor: pointer;
          }
        }
      }
    }

    //   回答
    .res-item {
      padding: 42px 43px;
      margin-bottom: 30px;
      border-radius: 12px;
      border: 1px solid #DEE0E3;

      .res-top {
        display: flex;
        //border-bottom: 1px solid #DDDCE9;
        padding-bottom: 15px;

        .header-img {
          height: 58px;
          width: 58px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 24px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .res-text {
          white-space: pre-wrap;
          width: 949px;
          color: #000;
          font-family: "PingFang SC";
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 26px; /* 162.5% */
        }
      }

      .book-list {
        border-top: 1px solid #DDDCE9;
        padding-top: 29px;

        .tip {
          font-size: 14px;

          span {
            margin-left: 8px;
            color: #0A9FFD;
            cursor: pointer;
          }
        }

        .book-list-item {
          &:nth-child(n + 3) {
            margin-top: 30px;
          }

          .book-title {
            margin-top: 8px;
            margin-bottom: 9px;
            color: #0A9FFD;
            font-size: 18px;
            line-height: 22px; /* 122.222% */
          }

          .book-text {
            color: #7D7D7D;
            font-size: 16px;
            line-height: 26px; /* 162.5% */
          }
        }
      }

      .res-base-info {
        margin-top: 17px;
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height: 22px;
        color: #808080;

        i {
          font-size: 18px;
        }

        .time {
          margin-right: 21px;
          width: 158px;
        }

        .copy {
          margin-right: 16px;
          cursor: pointer;
        }

        .delete {
          i {
            margin-right: 4px;
          }

          cursor: pointer;
        }
      }

    }

  }
}
/* 自定义滚动条整体样式 */
.chat-list::-webkit-scrollbar {
  width: 6px; /* 滚动条宽度 */
}

/* 定义滚动条轨道 */
.chat-list::-webkit-scrollbar-track {
  background: #f1f1f1; /* 轨道背景颜色 */
}

/* 定义滑块手柄 */
.chat-list::-webkit-scrollbar-thumb {
  background: #888; /* 滑块颜色 */
}

/* 滑块手柄hover状态 */
.chat-list::-webkit-scrollbar-thumb:hover {
  background: #555; /* hover时滑块颜色 */
}
.input-section {
  overflow: hidden;

  .input-box {
    height: 136px;
    padding: 20px 24px;
    border-radius: 12px;
    border: 1px solid #DEE0E3;

    .clear {
      cursor: pointer;
      width: 67px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      border-radius: 12.5px;
      background: #F5F6F7;

      img {
        margin-right: 4px;
      }
    }

    .el-input {
      ::v-deep input {
        margin-top: 12px;
        border: none;
        font-size: 18px;
      }

      ::v-deep.el-input__inner {
        padding: 0;
      }
    }
  }

  .el-button {
    margin-top: 20px;
    float: right;
    width: 120px;

  }
}
</style>
