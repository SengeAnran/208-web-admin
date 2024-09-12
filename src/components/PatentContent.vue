<template>
  <div class="content">
    <div class="content-left">
      <base-can-hide-item label="标题" id="contentTitle">
        <div class="item-box">
          <div class="item-box-line">标题(中文): {{ info.titleC }}</div>
          <div class="item-box-line">标题(英文): {{ info.titleE }}</div>
          <div class="item-box-line">标题(小语种): {{ info.titleElse }}</div>
        </div>
      </base-can-hide-item>
      <base-can-hide-item label="基本信息" id="contentTitle">
        <div class="base-info-box">
          <div class="item-box">
            <div class="item-box-line" v-show="info.applicant">
              <div class="name">申请人：</div>
              <div class="value">{{ info.applicant }}</div>
            </div>
            <div class="item-box-line" v-show="info.publicationNo">
              <div class="name">公开号：</div>
              <div class="value">{{ info.publicationNo }}</div>
            </div>
            <div class="item-box-line" v-show="info.publicationDate">
              <div class="name">公开日：</div>
              <div class="value">{{ info.publicationDate }}</div>
            </div>
            <div class="item-box-line" v-show="info.applicationNo">
              <div class="name">申请号：</div>
              <div class="value">{{ info.applicationNo }}</div>
            </div>
            <div class="item-box-line" v-show="info.applicationDate">
              <div class="name">申请日：</div>
              <div class="value">{{ info.applicationDate }}</div>
            </div>
            <div class="item-box-line" v-show="info.publicationType">
              <div class="name">公开类型：</div>
              <div class="value">{{ info.publicationType }}</div>
            </div>
            <div class="item-box-line" v-show="info.publicationCountry">
              <div class="name">公开国别：</div>
              <div class="value">{{ info.publicationCountry }}</div>
            </div>
          </div>
          <div class="item-box">
            <div class="item-box-line" v-show="info.legalStatus">
              <div class="name">当前法律状态：</div>
              <div class="value">{{ info.legalStatus }}</div>
            </div>
            <div class="item-box-line" v-show="info.titleCvalidity">
              <div class="name">专利有效性：</div>
              <div class="value">{{ info.titleCvalidity }}</div>
            </div>
            <div class="item-box-line" v-show="info.authPublicationNo">
              <div class="name">授权公告号：</div>
              <div class="value">{{ info.authPublicationNo }}</div>
            </div>
            <div class="item-box-line" v-show="info.authPublicationDate">
              <div class="name">授权公告日：</div>
              <div class="value">{{ info.authPublicationDate }}</div>
            </div>
            <div class="item-box-line" v-show="info.simpleFamily">
              <div class="name">简单同族：</div>
              <div class="value one-line-text" :title="info.simpleFamily ">{{ info.simpleFamily }}</div>
            </div>
            <div class="item-box-line" v-show="info.extensionFamily">
              <div class="name">扩展同族：</div>
              <div class="value one-line-text" :title="info.extensionFamily">{{ info.extensionFamily }}</div>
            </div>
            <div class="item-box-line" v-show="info.extensionFamilyNum || info.extensionFamilyNum === 0">
              <div class="name">扩展同族个数：</div>
              <div class="value">{{ info.extensionFamilyNum }}</div>
            </div>
          </div>
          <div class="item-box">
            <div class="item-box-line" v-show="info.inventor">
              <div class="name">发明人：</div>
              <div class="value">{{ info.inventor }}</div>
            </div>
            <div class="item-box-line" v-show="info.priorityDate">
              <div class="name">优先权日：</div>
              <div class="value">{{ info.priorityDate }}</div>
            </div>
            <div class="item-box-line" v-show="info.priorityNo">
              <div class="name">优先权号：</div>
              <div class="value">{{ info.priorityNo }}</div>
            </div>
          </div>
        </div>
      </base-can-hide-item>
      <base-can-hide-item label="摘要">
        <div class="abstract">
          <div class="item-box">
            <div class="item-box-line">
              <div class="name">中文</div>
            </div>
            <div class="item-box-content" v-html="info.abstractC"></div>

          </div>
          <div class="item-box">
            <div class="item-box-line">
              <div class="name">英文</div>
            </div>
            <div class="item-box-content" v-html="info.abstractE"></div>
          </div>
        </div>
      </base-can-hide-item>
      <base-can-hide-item :default-show="false" label="摘要附图">
        <el-image
            style="width: 186px; height: 150px; margin-right: 10px; margin-bottom: 10px; cursor: pointer"
            v-for="(item, index) in [info.abstractImg]"
            fit="fill"
            :key="index"
            :src="item"
            :preview-src-list="[info.abstractImg]">
        </el-image>
      </base-can-hide-item>
      <base-can-hide-item label="权利要求">
        <div class="switch-btns">
          <el-button v-for="(item, index) in btnList" @click="claimIndex = index" :key="index" :type="claimIndex === index? 'primary' : ''">
            {{ item }}
          </el-button>
        </div>
        <div class="item-box">
          <div class="item-box-content" v-html="info.claim" v-show="claimIndex === 0"></div>
          <div class="item-box-content" v-html="info.claimC" v-show="claimIndex === 1"></div>
          <div class="item-box-content" v-html="info.claimE" v-show="claimIndex === 2"></div>
        </div>
      </base-can-hide-item>
      <base-can-hide-item label="说明书">
        <div class="switch-btns">
          <el-button v-for="(item, index) in btnList" @click="instructionIndex = index" :key="index" :type="instructionIndex === index? 'primary' : ''">
            {{ item }}
          </el-button>
        </div>
        <div class="item-box">
          <div class="item-box-content" v-html="info.instruction" v-show="instructionIndex === 0"></div>
          <div class="item-box-content" v-html="info.instructionC"  v-show="instructionIndex === 1"></div>
          <div class="item-box-content" v-html="info.instructionE" v-show="instructionIndex === 2"></div>
        </div>
      </base-can-hide-item>

      <base-can-hide-item label="附图">
        <el-image
            style="width: 186px; height: 150px; margin-right: 10px; margin-bottom: 10px; cursor: pointer"
            v-for="(item, index) in info.patentFigure"
            fit="fill"
            :key="index"
            :src="item"
            :preview-src-list="info.patentFigure">
        </el-image>
      </base-can-hide-item>
    </div>
    <div class="directory-box">
      <div ref="directory" class="directory">
        <div class="directory-title">目录</div>
        <div class="nav-list-item" @click="handleClick(index)" v-for="(item, index) in navList" :key="index"
             :class="{active: activeIndex === index}">
          {{ item.name }}
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    info: Object,
    // activeIndex: {
    //   type: Number,
    //   default: 0,
    // }
  },
  name: "PatentContent",
  data() {
    return {
      isJump: false,
      activeIndex: 0,
      claimIndex: 0,
      instructionIndex: 0,
      btnList: ['原文', '中文', '英文'],
      navList: [
        {
          name: '标题',
        },
        {
          name: '基本信息',
        },
        {
          name: '摘要',
        },
        {
          name: '摘要附图',
        },
        {
          name: '权利要求',
        },
        {
          name: '说明书',
        },
        {
          name: '附图',
        },
      ],
      scroll: undefined, // 滚动距离（实时更新）
      directory: null,
    }
  },
  watch: {
    //  监听滚动量的变好
    scroll() {
      this.loadScroll();
    }
  },
  mounted() {
  //   scroll 代表滚动条距离页面顶部距离
    window.addEventListener('scroll', this.dataScroll);
    this.directory = this.$refs.directory;
  },
  methods: {
    handleClick(index) {
      this.activeIndex = index;
      this.isJump= true;
      this.jump(index);
    },
    jump(index) {
      const sections = document.querySelectorAll('.searchItem');
      const total = sections[index].offsetTop;
      document.body.scrollTop = total +300;
      document.documentElement.scrollTop = total + 300;
      // Safari
      // window.pageYOffset = total;
    },
    dataScroll() {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scroll > 360 && !this.directory.className.includes('is-fixed')) {
         this.directory.className =  this.directory.className + ' is-fixed'
      } else if (this.scroll < 360 && this.directory.className.includes('is-fixed')) {
        this.directory.className = 'directory'
      }
    },
    // 用循环的方式将每个带目录的标题距离顶部的距离与滚动条当前位置对比来确定哪个标题变亮
    loadScroll() {
      let self = this;
      if (this.isJump) { // 跳转的就不需要根据距离去设置当前项
        this.isJump = false;
        return
      }
      const sections = document.querySelectorAll('.searchItem');
      sections.forEach((i, index) => {
        if (self.scroll >= i.offsetTop - 300) {
          return self.activeIndex = index;
        }
      })
    },
  }
}
</script>
<style scoped lang="scss">
.content {
  display: flex;
  position: relative;
}

::v-deep .el-form-item__label {
  color: #000;
  font-size: 18px;
  line-height: 22px; /* 122.222% */
  padding-bottom: 20px;
}

.content-left {
  width: calc(100% - 16px);
}

.item-box {
  border-radius: 4px;
  background: #F5F6F7;
  padding: 19px 20px 1px;
  font-size: 16px;
  line-height: 26px;
  white-space: pre-wrap;

  .item-box-line {
    display: flex;
    margin-bottom: 15px;

    .name {
      color: #646A73;
      white-space: nowrap;
    }
  }
  .item-box-content {
    //display: flex;
    margin-bottom: 15px;
  }

}

.base-info-box {
  display: flex;
  justify-content: space-between;

  .item-box {
    width: 302px;
  }
}

.abstract {
  display: flex;
  justify-content: space-between;

  .item-box {
    width: 455px;
  }
}
.directory-box {
  min-width: 155px;
  margin-left: 55px;
}
.directory {
  top: 120px;
  width: 155px;
  height: 572px;
  border-left: 1px solid #DEE0E3;
  &.is-fixed {
    position: fixed;
  }
  .directory-title {
    padding-left: 29px;
  }

  .nav-list-item {
    cursor: pointer;
    padding-left: 29px;
    margin: 16px 0;
    color: var(---N600-, #646A73);

    /* 文字/P1.3-Reg */
    font-family: "PingFang SC";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    //a {
    //  color: black;
    //}
    &.active {
      position: relative;
      left: -1px;
      color: #3370FF !important;
      border-left: 2px solid #3370FF;
    }
  }
}

.switch-btns {
  margin-bottom: 20px;
}
</style>
