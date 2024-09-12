<template>
  <div class="home container-box">
    <!--    专题开始-->
    <div class="nav-list">
      <div class="nav-list-item" v-for="(item, index) in navList" :key="index">
        <div class="box">
          <img :src="item.imgUrl" alt="">
          <div class="name">{{ item.name }}</div>
          <el-button  :disabled="index === 3" @click="goDetail(item)" :type="index === 3? 'info': ''"  size="small">查看详情</el-button>
        </div>
      </div>
    </div>
    <!--    专题结束-->
    <Search/>
    <!--    专利数量开始-->
    <div class="base-title ">
      专利数量
    </div>
    <div class="patent-number">
      <div class="pie-char">
        <pie-chart :list="pieList" hideLegend :total="total" min-title="总数量" showMinTitle/>
      </div>
      <div class="icon-number-list">
        <div class="list-item" v-for="(item, index) in numberList" :key="index">
          <div class="item-left" :style="{backgroundColor: item.bgColor}">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="item-right">
            <div class="name">{{item.name}}</div>
            <count-up :num="item.number"/>
          </div>
        </div>
      </div>
    </div>
    <!--    专利数量结束-->
  </div>
</template>

<script>
import Search from "./Search.vue";
import PieChart from "@/components/PieChart.vue";
import store from "@/store";
import {getChart, getStatistic} from "@/api/home";
// import {mapMutations} from "vuex";

export default {
  components: {
    PieChart,
    Search
  },
  data() {
    return {
      pieList: [
        // { name: ' ', value: 9 },
        // { name: '化学和材料科学', value: 10 },
        // { name: '电气工程', value: 16 },
        // { name: '生物技术和医药', value: 20 },
        // { name: '信息技术和通信', value: 36 },
        // { name: '其他', value: 9 },
      ],
      total: 0,
      navList: [

        {
          imgUrl: require('./img/icon_02.svg'),
          name: '装备技术全景展示',
          path: '/EquipmentTechnology',
        },
        {
          imgUrl: require('./img/icon_03.svg'),
          name: '专利检索与智能解析',
          path: '/PatentSearch',
        },
        {
          imgUrl: require('./img/icon_04.svg'),
          name: '专利情报分析报告',
          path: '/PatentManagement/SpecialReport',
        },
        {
          imgUrl: require('./img/icon_01.svg'),
          name: '重点单位 /行业监控',
          path: '/KeyUnits',
        },
      ],
      numberList: [
        // {
        //   imgUrl: require('./img/list_icon_01.svg'),
        //   name: '信息技术和通信',
        //   number: 2456,
        //   bgColor: 'rgba(173, 198, 255, 0.20)',
        // },
        {
          imgUrl: require('./img/list_icon_02.svg'),
          // name: '生物技术和医药',
          name: '仪器',
          number: 5642,
          bgColor: 'rgba(198, 233, 255, 0.5)',
        },
        {
          imgUrl: require('./img/list_icon_03.svg'),
          name: '电气工程',
          number: 2563,
          bgColor: 'rgba(10, 159, 253, 0.2)',

        },
        {
          imgUrl: require('./img/list_icon_04.svg'),
          // name: '化学和材料科学',
          name: '化学',
          number: 4568,
          bgColor: 'rgba(235, 196, 253, 0.2)',
        },
        {
          imgUrl: require('./img/list_icon_05.svg'),
          // name: '机械工程自动化',
          name: '机械工程',
          number: 4256,
          bgColor: 'rgba(174, 233, 167, 0.2)',
        },
        {
          imgUrl: require('./img/list_icon_06.svg'),
          name: '其他领域',
          number: 3645,
          bgColor: 'rgba(249, 254, 197, 0.3)',
        },
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    //  所以通过设置全局锁的形式解决
    if (from.path === '/PatentSearch/detail') {
      store.commit('home/SET_USER_SEARCH_DATA', true);
    }
    next();
  },
  beforeMount() {
    this.initData();
  },
  methods: {
    initData() {
      getStatistic().then(res => {
        res.forEach(i => {
          switch (i.name) {
            case '电气工程': this.numberList[1].number = i.value; break;
            case '仪器': this.numberList[0].number = i.value; break;
            case '化学': this.numberList[2].number = i.value; break;
            case '机械工程': this.numberList[3].number = i.value; break;
            case '其他领域': this.numberList[4].number = i.value; break;
            default: break;
          }
        });
      })
      getChart().then(res => {
        res.forEach(i => {
          this.total += i.value;
        });
        this.pieList = res;
      })
    },
    // ...mapMutations(['home/SET_USER_SEARCH_DATA']),
    goDetail(item) {
      if (item.path === '') {
        this.$message.warning('正在开发中，敬请期待！')
      }
      this.$router.push({
        path: item.path,
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 62px;
  .nav-list {
    margin-top: 47px;
    margin-bottom: 60px;
    display: flex;
    justify-content: space-between;

    .nav-list-item {

      width: 281px;
      height: 226px;
      border-radius: 12px;
      border: 2px solid #FFF;
      background: url("./img/Rectangle.png") right top no-repeat;
      background-size: 60% 60%;

      .box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        //justify-content: center;
        background: rgba(255, 255, 255, 0.70);

        img {
          margin-top: 26px;
          width: 105.574px;
          height: 82px;
          object-fit: contain;
          margin-bottom: 18px;
        }

        .name {
          color: #000;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 122.222% */
          margin-bottom: 24px;
        }

        .el-button {
          border-radius: 4px;
          border: 1px solid #0A9FFD;
          color: #0A9FFD;
        }

      }
    }
  }
  .base-title {
    margin-top: 60px;
    margin-bottom: 22px;
    color: #1F2329;
    font-size: 20px;
    font-style: normal;
    font-weight: bold;
    line-height: 22px; /* 110% */

  }
  .patent-number {
    height: 382px;
    border-radius: 12px;
    background: #FFF;
    display: flex;
    padding: 34px 22px 34px 34px;
    .pie-char {
      min-width: 480px;
    }
    .icon-number-list {
      display: flex;
      flex-wrap: wrap;
      .list-item {
        width: 320px;
        height: 86px;
        padding: 16px 20px;
        margin-right: 12px;
        margin-bottom: 28px;
        border-radius: 12px;
        background: #F8F9FA;
        display: flex;
        align-items: center;
        .item-left {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;

        }
        .name {
          color: #000;
          /* 文字/P1.3-Reg */
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 157.143% */
        }
      }
    }
  }
}
</style>
