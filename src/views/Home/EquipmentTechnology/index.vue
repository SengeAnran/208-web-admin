

<template>
<div class="container-box">
  <back-btn/>
  <div class="base-title">
    装备技术全景展示
  </div>
  <!--    专题开始-->
  <div class="nav-list">
    <div class="nav-list-item" v-for="(item, index) in navList" :key="index">

      <div class="box">
        <div class="name">{{ item.name }}</div>
        <div class="img">
          <img v-show="item.imgUrl" :src="item.imgUrl" alt="">
        </div>
        <el-button type="primary" @click="goDetail(item)" size="small">查看详情</el-button>
      </div>

    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      navList: [
        {
          imgUrl: require('./img_01.png'),
          name: '展示图一',
          path: '/EquipmentTechnology/detail',
        },
        {
          imgUrl: null,
          name: '展示图二',
          path: '',
        },
        {
          imgUrl: null,
          name: '展示图三',
          path: '',
        },
        {
          imgUrl: null,
          name: '展示图四',
          path: '',
        },
        {
          imgUrl: null,
          name: '展示图五',
          path: '',
        },
        {
          imgUrl: null,
          name: '展示图六',
          path: '',
        },
        {
          imgUrl: null,
          name: '展示图七',
          path: '',
        },
        {
          imgUrl: null,
          name: '展示图八',
          path: '',
        },
      ],
    }
  },
  methods: {
    goDetail(item) {
      if (!item.path) {
        return this.$message.warning('正在开发中...');
      }
      this.$router.push({
        path: item.path,
      })
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
.nav-list {
  margin-top: 24px;
  display: flex;
  //justify-content: space-between;
  flex-wrap: wrap;
  .nav-list-item:nth-child(4n) {
    margin-right: 0;
  }

  .nav-list-item {

    width: 280px;
    height: 260px;
    border-radius: 12px;
    margin-right: 26px;
    margin-bottom: 24px;

    .box {
      width: 100%;
      height: 100%;
      padding: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      //justify-content: center;
      background: rgba(255, 255, 255, 0.70);
      .img {
        width: 259px;
        height: 84px;
        margin-top: 26px;
        margin-bottom: 18px;
        img {

          width: 100%;
          height: 100%;
          object-fit: contain;

        }

      }

      .name {
        color: #000;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 122.222% */
        margin-bottom: 24px;
        align-self: start;
      }

      //.el-button {
      //  border-radius: 4px;
      //  border: 1px solid #0A9FFD;
      //  color: #0A9FFD;
      //}

    }
  }
}
</style>
