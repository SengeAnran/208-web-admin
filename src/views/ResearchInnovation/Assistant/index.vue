<template>
  <div class="assistant container-box">
    <el-button-group>
      <el-button v-for="(item,index) in btnList" :key="index" :class="{ 'el-button--primary':activeIndex === index}"
                 @click="activeIndex = index">{{ item }}
      </el-button>
    </el-button-group>
    <!--  消息问道记录-->
    <div class="chat-list">
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
              <i class="refresh el-icon-refresh-right"></i>
            </div>
          </div>
        </div>
<!--        答-->
        <div class="res-item" v-if="item.type === 'res'">
          <div class="res-top">
            <div class="header-img">
              <img src="./img/res_header.png" alt="">
            </div>
            <div class="res-text">{{item.content}}</div>
          </div>
          <div class="book-list">
            <div class="tip">
              参考资料
              <span @click="item.showReferences = !item.showReferences">收起/展开</span>
            </div>
            <div v-show="item.showReferences" class="book-list-item" v-for="(item2, index2) in item.references" :key="index2">
              <div class="book-title">{{item2.doc_name}}</div>
              <div class="book-text">
                {{item2.chunk_text}}
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
    </div>
    <!--  提问框-->
    <div class="input-section">
      <div class="input-box">
        <div class="clear"><img src="./img/clear.png" alt="">清空</div>
        <el-input v-model="current_user_input" placeholder="请输入内容"></el-input>
      </div>

      <el-button type="primary">发送</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      activeIndex: 0,
      btnList: ['RAG对话', '多功能对话'],
      dialog_type: '', // general： 通用对话 rag：让对话
      current_user_input: '', // 提问
      chatList: [
        {
          type: 'question',
          content: '航天行业有哪些比较热门的专利?',
          time: '2024-7-2 17:26:54',
        },
        {
          type: 'res',
          content: '航天行业最近比较热门的专利包括"特种超五类电缆结构“、”超高精导轨型材生产方法"、”双超卫星平台解耦控制方法”等。"特种超五类电缆结构“由湖南华菱线缆股份有限公司申报，“超高精导轨型材生产方法“由西南铝业集团有限公司申报。”双超卫星平台解耦控制方法“由航天科技集团八院509所申报，获得了中国专利金奖。它的创新之处在于提出了双六自由度全解耦控制方法，显著提升了卫星姿态控制水平，使得遥感卫星的拍照更加稳定、准确。具体来说，这项技术解决了传统遥感卫星上平台和载荷固连导致微振动直接影响载荷姿态控制精度的问题。这项技术的成功应用，不仅提升了遥感卫星的性能，还为其在高分辨率对地遥感、高精度空间探测等领域的应用提供了新的可能性,实现了低成本、高性能、高效能的发展目标。(智能回答示例，列举专利+申报人+专利简要解析)?',
          time: '2024-7-2 17:26:54',
          showReferences: true,
          references: [
            {
              chunk_text: '获得了中国专利金奖。它的创新之处在于提出了双六自由度全解耦控制方法，显著提升了卫星姿态控制水平，使得遥感卫星的拍照更加稳定、准确。具体来说,这项技术解决了传统遥感卫星上平台和载荷固连导致微振动直接影响载荷姿态控制精度的问题。这项技术的成功应用，不仅提升了遥感卫星的性能，还为其在高分辨率对地遥感、高精度空间探测等领域的应用提供了新的可能性，实现了低成本，高性能，高效能的发展目标。',
              doc_name: 'CN00513234234234.txt',
            },
            {
              chunk_text: '获得了中国专利金奖。它的创新之处在于提出了双六自由度全解耦控制方法，显著提升了卫星姿态控制水平，使得遥感卫星的拍照更加稳定、准确。具体来说,这项技术解决了传统遥感卫星上平台和载荷固连导致微振动直接影响载荷姿态控制精度的问题。这项技术的成功应用，不仅提升了遥感卫星的性能，还为其在高分辨率对地遥感、高精度空间探测等领域的应用提供了新的可能性，实现了低成本，高性能，高效能的发展目标。',
              doc_name: 'CN00513234234234.txt',
            }
          ]
        },
        {
          type: 'question',
          content: '航天行业有哪些比较热门的专利?',
          time: '2024-7-2 17:26:54',
        },
        {
          type: 'res',
          content: '航天行业最近比较热门的专利包括"特种超五类电缆结构“、”超高精导轨型材生产方法"、”双超卫星平台解耦控制方法”等。"特种超五类电缆结构“由湖南华菱线缆股份有限公司申报，“超高精导轨型材生产方法“由西南铝业集团有限公司申报。”双超卫星平台解耦控制方法“由航天科技集团八院509所申报，获得了中国专利金奖。它的创新之处在于提出了双六自由度全解耦控制方法，显著提升了卫星姿态控制水平，使得遥感卫星的拍照更加稳定、准确。具体来说，这项技术解决了传统遥感卫星上平台和载荷固连导致微振动直接影响载荷姿态控制精度的问题。这项技术的成功应用，不仅提升了遥感卫星的性能，还为其在高分辨率对地遥感、高精度空间探测等领域的应用提供了新的可能性,实现了低成本、高性能、高效能的发展目标。(智能回答示例，列举专利+申报人+专利简要解析)?',
          time: '2024-7-2 17:26:54',
          showReferences: true,
          references: [
            {
              chunk_text: '获得了中国专利金奖。它的创新之处在于提出了双六自由度全解耦控制方法，显著提升了卫星姿态控制水平，使得遥感卫星的拍照更加稳定、准确。具体来说,这项技术解决了传统遥感卫星上平台和载荷固连导致微振动直接影响载荷姿态控制精度的问题。这项技术的成功应用，不仅提升了遥感卫星的性能，还为其在高分辨率对地遥感、高精度空间探测等领域的应用提供了新的可能性，实现了低成本，高性能，高效能的发展目标。',
              doc_name: 'CN00513234234234.txt',
            },
            {
              chunk_text: '获得了中国专利金奖。它的创新之处在于提出了双六自由度全解耦控制方法，显著提升了卫星姿态控制水平，使得遥感卫星的拍照更加稳定、准确。具体来说,这项技术解决了传统遥感卫星上平台和载荷固连导致微振动直接影响载荷姿态控制精度的问题。这项技术的成功应用，不仅提升了遥感卫星的性能，还为其在高分辨率对地遥感、高精度空间探测等领域的应用提供了新的可能性，实现了低成本，高性能，高效能的发展目标。',
              doc_name: 'CN00513234234234.txt',
            }
          ]
        },
      ]
    }
  },
  methods: {
    copyText(text) {
      console.log(text);
    },
    deleteOne(index) {
      this.chatList.splice(index, 1);
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
  height: 650px;
  overflow-y: auto;
  margin-top: 38px;
  margin-bottom: 30px ;


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
        border-bottom: 1px solid #DDDCE9;
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
        margin-top: 29px;
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
        }

        .copy {
          margin-right: 16px;
          cursor: pointer;
        }

        .delete {
          i{
            margin-right: 4px;
          }
          cursor: pointer;
        }
      }

    }

  }
}

.input-section {
  overflow: hidden;

  .input-box {
    height: 136px;
    padding: 20px 24px;
    border-radius: 12px;
    border: 1px solid #DEE0E3;
    .clear {
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
