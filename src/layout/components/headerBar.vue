<template>
  <header class="header-bar">
    <div @click="goHome" class="logo">智能化专利检索和分析系统</div>
    <nav>
      <ul>
        <li v-for="(item, index) in navList" :class="{active: activeNavIndex === item.index}"
            :key="item.label">
          <div class="btn"  @click="toPage(item, index)">{{ item.label }}</div>
          <ChildrenNav :nav-list="item.children" @goPage="(val) => toPage(val, index)"></ChildrenNav>
        </li>
      </ul>
    </nav>
    <div class="header-right">
      <span style="margin-right: 7px">退出</span>
      <img src="../exit.png" alt="">
    </div>
  </header>
</template>
<script>
// import {mapGetters} from "vuex";
import ChildrenNav from "./ChildrenNav.vue";
import {mapGetters} from "vuex";
export default {
  name: "headerBar",
  components: {
    ChildrenNav,
  },
  data() {
    return {
      navList: [
        {
          label: '首页',
          // isDev: true,
          path: '/',
          index: 0,
        },
        {
          label: '装备技术全景展示',
          path: '/EquipmentTechnology',
          index: 5,
        },
        {
          label: '专利检索与智能解析',
          path: '/PatentSearch',
          index: 1,
        },
        {
          label: '专利管理',
          path: '/1',
          disable: true,
          index: 2,
          children: [
            {
              label: '专利解析',
              path: '/PatentManagement/PatentAnalysis',
              index: 2,
            },
            {
              label: '专利深度解析',
              path: '/PatentManagement/DeepAnalysis',
              index: 2,
            },
            {
              label: '专利情报分析报告',
              path: '/PatentManagement/SpecialReport',
              index: 2,
            },
            {
              label: '提示词管理',
              path: '/PatentManagement/CueWord',
              index: 2,
            },
          ]
        },
        // {
        //   label: '数据管理',
        //   path: '',
        //   disable: true,
        //   children: [
        //     // {
        //     //   label: '文件管理',
        //     //   path: '/DataManagement/FileManage',
        //     // },
        //     // {
        //     //   label: '数据源管理',
        //     //   path: '/DataManagement/DataSourceManage',
        //     // },
        //   ]
        // },
        {
          label: '通用能力',
          disable: true,
          path: '',
          index: 4,
          children: [
            // {
            //   label: '文件管理',
            //   path: '/DataManagement/FileManage',
            // },
            {
              label: '科研创新助理',
              path: '/ResearchInnovation',
              index: 4,
            },
          ]
        },

        // {
        //   label: '统计分析',
        //   path: '/aboutUs',
        //   isDev: true,
        //
        // },
      ],
      // activeNavIndex: 0,
    }
  },
  computed: {
    ...mapGetters(['activeNavIndex']),
  },
  methods: {
    // 跳转页面
    toPage(item) {
      if (item.isDev) {
        this.$message.warning('正在开发中...')
        return;
      }
      if (item.disable) {
        return
      }
      if (this.$route.path !== item.path) {
        this.$router.push(item.path);
        // this.activeNavIndex = index;
      }
    },
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header-bar {
  z-index: 2001;
  width: 100%;
  background: #304155;
  position: fixed;
  top: 0;
  font-size: 20px;
  //padding: 0 32px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //border-bottom: 1px solid #eaecf1;

  .logo {
    padding-left: 32px;
    color: #FFF;
    font-family: "PingFang SC";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 122.222% */
  }

  .header-right {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 30px;
    color: white;
    .img {
      width: 49px;
      height: 49px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;

      img {
        width: 49px;
        height: 49px;
        object-fit: fill;
      }
    }

  }

  ul {
    display: flex;
    justify-content: space-between;

    li {
      height: 35px;
      line-height: 35px;
      position: relative;
      box-sizing: border-box;
      list-style: none;
      white-space: nowrap;
      //margin: 0 20px;
      cursor: pointer;
      color: white;
      //border: 1px solid rgba(20, 76, 20, 0.5);
      border-radius: 4px;
      font-size: 16px;
      .btn {
        width: 100%;
        height: 100%;
        padding: 0 20px;
      }
      &:hover .children-nav {
        display: flex;
      }
    }

    .active {
      color: white;
      background: #0A9FFD;

      //&::after {
      //  visibility: visible;
      //}
    }
  }
}
</style>
