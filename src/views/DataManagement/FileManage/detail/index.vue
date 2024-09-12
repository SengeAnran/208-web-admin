<template>
  <div class="container-box">
    <el-form :model="info" label-position="top">
      <div class="file-tip">文件名称</div>
      <div class="title">{{ info.title }}</div>
      <el-row :gutter="105">
        <el-col :span="8">
          <div class="base-item">
            类型：{{ info.type }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="base-item">修改时间：{{ info.time }}</div>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row :gutter="105">
        <el-col :span="8">
          <div class="base-item">解析时间：{{ info.time2 }}</div>
        </el-col>
<!--        <el-col :span="8">-->
<!--          <div class="base-item">提示词：<span style="display: inline-block"  v-html="info.key"></span></div>-->
<!--        </el-col>-->
        <el-col :span="8">
          <div class="base-item">标签：
            <el-tag v-for="(item, index) in info.tips" :key="index" closable  @close="handleClose(item)">{{ item }}</el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else type="primary" class="button-new-tag" size="small" @click="showInput" icon="el-icon-edit"></el-button>
          </div>
        </el-col>
      </el-row>
<!--      <div class="flex">-->
<!--        <div class="base-item">相关专利：</div>-->
<!--        <div class="patent">-->
<!--          <div class="patent-item" v-for="(item, index) in info.patents" :key="index">{{item}}</div>-->
<!--        </div>-->
<!--      </div>-->
      <el-row>
        <el-button-group style="margin-top: 31px; margin-bottom: 41px">
          <el-button :type="isContent? '':'primary'" @click="isContent= false">专利申请文本</el-button>
          <el-button :type="isContent? 'primary': ''" @click="isContent= true">解析结果</el-button>


        </el-button-group>
      </el-row>
      <Content v-show="isContent" :info="info"></Content>
      <Analysis v-show="!isContent" :info="info"></Analysis>
      <div class="btns">
        <el-button type="primary">重新解析</el-button>
        <el-button >保存</el-button>
        <el-button >导出</el-button>
      </div>
    </el-form>

  </div>
</template>
<script>
import Content from "./content.vue";
import Analysis from "./Analysis.vue";

export default {
  components: {Content, Analysis},
  name: "index",
  data() {
    return {
      isContent: true,
      inputVisible: false,
      inputValue: '',
      info: {
        type: '已解析',
        time: '2024-7-2',
        time2: '2024-7-2 17:26',
        key: '专利解析提示词模板一 详情',
        tips: ['结构装置', '新型', '架构'],
        patents: ['新型发明专利2401', '一种新型结构装置1', '测试专利解析报告-发明类', '测试专利解析报告-新型发明类'],
        cn: 'CN118221491A',
        title: '一种金属燃料推进剂及其制备方法',
        titleEnglish: 'A metal fuel propellant and its preparation method',
        date: '20240709',
        number: 'CN201810135985.7',
        applyDate: '20180209',
        applyName: '哈尔滨工程大学',
        classNumber: 'B28B21/82',
        isCheck: false,
        text: '本发明公开了一种远程巡航导弹涡扇发动机与一体式舱体卧式装配装置，适用于采用涡扇发动机作为动力输出的远程巡航导弹在总装时将涡扇发动机平移送入一体式舱体内。该装配装置包括升降车、固定底板、直线导轨，防脱条、重载滑块和支撑板，各部件之间均采用螺钉/螺栓连接。',
        id: 2,
      },
    }
  },
  methods: {
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

.container-box {
  margin-top: 54px;
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
</style>
