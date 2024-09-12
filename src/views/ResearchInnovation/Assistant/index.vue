
<template>
<div class="assistant container-box">
  <el-button-group>
    <el-button v-for="(item,index) in btnList" :key="index" :class="{ 'el-button--primary':activeIndex === index}" @click="activeIndex = index">{{item}}</el-button>
  </el-button-group>
<!--  消息问道记录-->
  <div class="chat-list">
      <div class="chat-list-item" v-for="(item,index) in chatList" :key="index">

      </div>
  </div>
<!--  提问框-->
<div class="input-section">
  <div class="input-box">
    <div class="clear"></div>
    <el-input v-model="current_user_input" ></el-input>
  </div>

  <el-button type="primary">提交</el-button>
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
          references: [
            {
              chunk_text: '获得了中国专利金奖。它的创新之处在于提出了双六自由度全解耦控制方法，显著提升了卫星姿态控制水平，使得遥感卫星的拍照更加稳定、准确。具体来说,这项技术解决了传统遥感卫星上平台和载荷固连导致微振动直接影响载荷姿态控制精度的问题。这项技术的成功应用，不仅提升了遥感卫星的性能，还为其在高分辨率对地遥感、高精度空间探测等领域的应用提供了新的可能性，实现了低成本，高性能，高效能的发展目标。',
              doc_name: 'CN00513234234234.txt',
            }
          ]
        },
      ]
    }
  }
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
.input-section {
  overflow: hidden;
  .input-box {

  }
  .el-button {
    margin-top: 20px;
    float: right;
    width: 120px;
  }
}
</style>
