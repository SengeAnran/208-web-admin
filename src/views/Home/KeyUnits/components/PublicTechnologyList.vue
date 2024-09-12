
<template>
<div class="technology-list">
  <div class="base-mini-title">首次公开技术</div>
  <div class="list">
    <List
        v-loading="loading"
        :page="page"
        :size="size"
        :data-list="dataList"
        hideBtn
        hideCheck
    >
      <el-pagination
          style="margin-top: 15px"
          background
          :current-page.sync="page"
          :page-sizes="sizes"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
      />
    </List>
  </div>

</div>
</template>

<script>
import List from "@/views/Home/components/list.vue";
import {patentSearch} from "@/api/PatentSearch";

export default {
  name: "PublicTechnologyList.vue",
  components: {List},
  data() {
    return {
      loading: false,
      dataList: [],
      page: 1,
      size: 10,
      sizes: [10, 20, 50, 100],
      total: 0,
      searchValue: 'd',
    }
  },
  mounted() {
  },
  methods: {
    searchRes() {
      this.loading = true;
      const data = {
        query: this.searchValue, //"检索词",
        pageNo: this.page,
        pageSize: this.size
      }
      patentSearch(data).then(res => {
        const {apps, result, total} = res;
        console.log(apps, result, total);
        this.total = total;
        this.dataList = result.map(i => {
          return {
            ...i,
            titleC: i.titleC.replace(/em/gi, 'mark' ),
            imgUrl: i.abstractImg ? i.abstractImg : require('../img/result-img.png'),
          }
        })
        this.loading = false;

      })
    },
    // 分页大小切换
    handleSizeChange(val) {
      this.isUseCheckList = true;
      this.page = 1;
      this.size = val;
      this.searchRes();
    },
  }
}
</script>

<style scoped lang="scss">
.list {
  border-radius: 12px;
  background: #FFF;
  padding: 52px 50px 55px;
  //margin-top: 30px;
}
.technology-list {
  margin-top: 60px;
}
</style>
