<template>
  <div class="container-box">
    <back-btn/>
    <div class="base-title">
      装备技术全景展示
    </div>
    <div class="main-box">
      <div class="little-title">制导系统</div>
      <div class="show-box">
        <img src="./img_01.png" alt="">
        <div
            class="tip-item"
            v-for="(item, index) in boxList"
            :key="index"
            :style="{left: item.position.x + 'px', top: item.position.y + 'px', width: item.position.width  + 'px', height: item.position.height  + 'px'}">
          <div class="click-box" @click="() => { item.data.showBox = !item.data.showBox}">
            <img v-if="item.bgImg" :src="item.bgImg" :style="{left: item.imgPosition.x + 'px', top: item.imgPosition.y + 'px', width: item.imgPosition.width  + 'px', height: item.imgPosition.height  + 'px'}" alt="">
          </div>
          <div v-show="item.data.showBox" class="info-box" >
            <div class="box-top">
              <div class="name">
                {{ item.data.name }}
              </div>
              <div class="more"  @click="goListPage(item.data.key)">
                更多>
              </div>
            </div>

            <div v-loading="loading" class="patent-list">
              <div class="patent-list-item" :class="{activeOne: item2.active}"  @click="goDetail(item2)" v-for="(item2, index2) in item.data.patentList"
                   :key="index2">
                {{ item2.name }}
              </div>
            </div>
<!--            <el-button type="primary">-->
<!--              查看全部-->
<!--            </el-button>-->
          </div>
        </div>
        <!--滑动-->
        <div class="swiper-box" @click="showBox">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slider v-for="(item, index) in imgList" :key="index">
              <img :src="item.imgUrl" alt="">
            </swiper-slider>
            <template #btn>
              <div  class="right swiper-button-right"></div>
            </template>
          </swiper>
          <div class="left swiper-button-left"></div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import swiper from '@/components/Swiper';
import {getImportant} from "@/api/PatentSearch";
import SwiperSlider from "@/components/SwiperSlider.vue";

export default {
  name: "index",
  components: {SwiperSlider, swiper},
  data() {
    return {
      loading: false,
      nowShowIndex: 0,
      boxList: [
        {
          position: {
            x: 232,
            y: 196,
            width: 169,
            height: 60,
          },
          bgImg: require('./bg_01.png'),
          imgPosition: {
            x: -56,
            y: 0,
            width: 241,
            height: 63,
          },
          data: {
            name: '杀伤拦截弹头',
            key: 'killVehicle',
            patentList: [],
            showBox: false,
          }
        },
        {
          position: {
            x: 488,
            y: 196,
            width: 489,
            height: 60,
          },
          imgPosition: {
            x: -29,
            y: 2,
            width: 502,
            height: 56,
          },
          bgImg: require('./bg_02.png'),
          data: {
            name: '推进器',
            key: 'booster',
            patentList: [],
            showBox: false,
          }
        },
        {
          position: {
            x: 658,
            y: 501,
            width: 309,
            height: 200,
          },
          imgPosition: {
            x: -29,
            y: 2,
            width: 309,
            height: 190,
          },
          bgImg: null,
          data: {
            name: '可动喷嘴',
            key: 'nozzle',
            patentList: [],
            showBox: false,
          }
        },
      ],
      swiperOption: {
        // direction: 'vertical',
        speed: 1000,
        // slidesPerView: 3,
        // spaceBetween: 0,
        loop: true,
        // grabCursor: true,
        // observer: true,
        // autoplay: {
        //   delay: 1500,
        //   disableOnInteraction: false,
        // },
        // autoplay: true,
        // nextButton:'.swiper-button-right',//绑定下一页的控制按钮
        // prevButton:'.swiper-button-left'//绑定上一页的控制按钮
        navigation: {
          nextEl:'.swiper-button-right',//绑定下一页的控制按钮
          prevEl:'.swiper-button-left'//绑定上一页的控制按钮
        }

      },
      imgList: [
        {
          imgUrl: require('./icon_01.png'),
        },
        {
          imgUrl: require('./icon_02.png'),
        },
        {
          imgUrl: require('./icon_03.png'),
        },
      ],
      swiper: null,
    }
  },
  beforeMount() {
    this.getList();
  },
  mounted() {
    this.mySwiper = this.$refs.mySwiper;
    this.init();
  },
  methods: {
    init() {
      const left = document.querySelector('.swiper-button-left');
      const right = document.querySelector('.swiper-button-right');
      // left.onclick = () => this.switchShow('reduce');
      // right.onclick = () => this.switchShow('add');
      left.addEventListener('click', () => this.switchShow('reduce'), true);
      right.addEventListener('click', () => this.switchShow('add'), true);
    },
    switchShow(type) {
      if (!this.boxList[2].data.showBox) {
        this.boxList[2].data.showBox = true;
      }
      this.boxList[2].data.patentList.forEach(i => {
        i.active = false;
      })
      if (type === 'add'){
        this.nowShowIndex = (this.nowShowIndex + 1)%3;
      } else {
        this.nowShowIndex =( this.nowShowIndex - 1) === -1?  2: (this.nowShowIndex - 1);
      }
      if (this.boxList[2].data.patentList.length > 0) {
        this.boxList[2].data.patentList[this.nowShowIndex].active = true;
      }

    },
    showBox(e) {
      e.stopPropagation();
      this.boxList[2].data.showBox = true;
      // this.nowShowIndex = 0;
      // if (this.boxList[2].data.patentList.length > 0) {
      //   this.boxList[2].data.patentList[this.nowShowIndex].active = true;
      // }
    },
    goListPage(name) {
      this.$router.push({
        path: '/EquipmentTechnology/list',
        query: {
          key: name,
        }
      })
    },
    getList() {
      this.loading = true;
      getImportant( {key: 'killVehicle'}).then(res => {
        this.boxList[0].data.patentList = res.map(i => {
          return {
            ...i,
            name: i.titleC,
            active: false,
          }
        })
        this.loading = false;
      })
      getImportant( {key: 'booster'}).then(res => {
        this.boxList[1].data.patentList = res.map(i => {
          return {
            ...i,
            name: i.titleC,
            active: false,
          }
        })
        this.loading = false;
      })
      getImportant( {key: 'nozzle'}).then(res => {
        this.boxList[2].data.patentList = res.map(i => {
          return {
            ...i,
            name: i.titleC,
            active: false,
          }
        })
        this.boxList[2].data.patentList[0].active = true;
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
    },
    // clickLeft() {
    //   console.log(this.mySwiper.swiper)
    //   // this.mySwiper.swiper.prevEl();
    //   // this.mySwiper.swiper.prevEl();
    //   // this.  mySwiper.swiper.next()
    //   // this.swiper.$swiper.
    // },
    clickRight() {
    }
  }
}
</script>
<style scoped lang="scss">
.base-title {
  margin-top: 44px;
  margin-bottom: 22px;
  color: #1F2329;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 110% */
}

.main-box {
  padding: 44px 22px;
  width: 1200px;
  height: 817px;
  border-radius: 12px;
  background: #FFF;

  .little-title {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
  }

  .show-box {
    position: relative;
    padding-top: 51px;
    width: 1052px;
    height: 750px;

    .tip-item {
      cursor: pointer;
      position: absolute;
      &:hover {
        //background-color: rgba(5, 255, 0, 0.4);
      }
      .click-box {
        position: relative;
        width: 100%;
        height: 100%;
        &:hover img {
          display: inline-block;
        }
        img {
          position: absolute;
          display: none;
        }
      }
      //background: #00CE79;
      .info-box {
        position: absolute;
        left: 50%;
        bottom: calc(100% + 70px);
        transform: translateX(-50%);
        display: flex;
        min-width: 169px;
        max-width: 250px;
        padding: 12px 12px 7px 12px;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 6px;
        border-radius: 8px;
        border: 1px solid #0A9FFD;
        background: #F3FAFF;
        color: #0A9FFD;
        font-size: 14px;
        line-height: 22px; /* 137.5% */
        .box-top {
          width: 100%;
          align-self: start;
          display: flex;
          justify-content: space-between;
          .name {
            color: #000;
            font-size: 16px;
            line-height: 22px; /* 137.5% */
            margin-bottom: 9px;
          }
          .more:hover {

          }
        }


        .patent-list {
          width: 100%;
          min-height: 50px;
          max-height: 150px;
          overflow-y: auto;
          padding-right: 20px;
          display: flex;
          flex-direction: column;
          &::-webkit-scrollbar {
            width: 4px;
            background-color: rgba(255, 255, 255, 0);
          }
          &::-webkit-scrollbar-thumb {
            width: 4px;
            border-radius: 2px;
            background: #0A9FFD;
          }
          //align-items: center;
          .patent-list-item {
            min-height: 16px;
            margin-bottom: 16px;
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:  ellipsis;
            font-size: 16px;
            line-height: 16px;
            text-decoration: underline;
            color: #000;
            &.activeOne {
              color: #0A9FFD;
            }
          }
        }
      }
    }
    .swiper-box {
      position: absolute;
      top: 515px;
      right: 145px;
      height: 135px;
      width: 213px;
      //background: red;
      img {
        width: 100%;
        height: 100%;
      }
      .swiper-container, .swiper-button-left {
        visibility: hidden;
      }
      &:hover {
        .swiper-container, .swiper-button-left {
          visibility: visible;
        }
      }
    }
  }
}
.left,.right {
  z-index: 100;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  cursor: pointer;
}
.left {
  left: -13px;
  background: url("./left.png") no-repeat;
  background-size: 100% 100%;
}
.right {
  right: 0;
  background: url("./right.png") no-repeat;
  background-size: 100% 100%;
}
</style>
