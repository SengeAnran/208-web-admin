<template>
  <header class="header-bar">
    <!--    <div @click="goHome" class="logo">数智科技LOGO</div>-->
    <nav>
      <ul>
        <li v-for="(item, index) in navList" :class="{active: activeNavIndex === index}" @click="toPage(item, index)"
            :key="item.label">{{ item.label }}
        </li>
      </ul>
    </nav>
    <div class="header-right">
      <div class="img">
        <img src="./header.jpg" alt="">
      </div>
      <span>张三</span>
    </div>
  </header>
</template>
<script>
// import {mapGetters} from "vuex";

export default {
  name: "headerBar",
  data() {
    return {
      navList: [
        {
          label: '态势分析',
          path: '/',
        },
        {
          label: '统计分析',
          path: '/StatisticalAnalysis',
        },
        {
          label: '智能军事体能训考核系统',
          path: '/1',
        },
        {
          label: '考核管理',
          path: '/AssessmentManagement',
        },
        {
            label: '系统管理',
          path: '/SystemManager',
        },
        // {
        //   label: '关于我们',
        //   path: '/aboutUs',
        // },
      ],
      activeNavIndex:0,
    }
  },
  computed: {
    // ...mapGetters(['activeNavIndex']),
  },
  methods: {
    // 跳转页面
    toPage(item, index) {
      if (this.$route.path !== item.path) {
        this.$router.push(item.path);
        this.activeNavIndex = index;
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
  //z-index: 2000;
  width: 100%;
  background-color: white;
  //position: fixed;
  //top: 0;
  font-size: 20px;
  //padding: 0 32px;
  height: 71px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaecf1;

  .header-right {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 30px;
  .img{
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

    li {
      height: 44px;
      line-height: 44px;
      position: relative;
      box-sizing: border-box;
      list-style: none;
      padding: 0 20px;
      margin: 0 20px;
      cursor: pointer;
      color: #9a9da9;
      border: 1px solid rgba(20, 76, 20, 0.5);
      border-radius: 4px;
      color: rgba(20, 76, 20, 1);
      font-size: 18px;
      //&::after {
      //  visibility: hidden;
      //  position: absolute;
      //  bottom: 7px;
      //  left: 0;
      //  content: '';
      //  display: block;
      //  height: 4px;
      //  width: 100%;
      //  border-radius: 4px;
      //  //background-color: blue;
      //  background: -webkit-linear-gradient(left, #1d7dff, #13c4ff)
      //}
    }

    .active {
      color: white;
      background: rgba(20, 77, 20, 1);

      //&::after {
      //  visibility: visible;
      //}
    }
  }
}
</style>
