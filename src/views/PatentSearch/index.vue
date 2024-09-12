<template>
  <div class="container-box">
    <el-form :model="advancedSearchForm" :rules="rule" label-position="top">
      <div class="search">
        <el-input
            prefix-icon="el-icon-search"
            v-model="advancedSearchForm.searchValue"
            v-on:keyup.enter.native="clickSearch"
                  placeholder="搜索功能导航、组织数据等" clearable/>
        <el-button @click="clickSearch" type="primary" round>搜索</el-button>
      </div>
      <el-radio-group v-model="advancedSearchForm.field">
        <el-radio
                   ref="radio"
                   v-for="(item) in queryList" :label="item.key" :key="item.key">{{ item.label }}</el-radio>
      </el-radio-group>
      <div class="advanced-search" @click="changeAdvance">
        <span>高级检索</span>
        <i v-show="!useAdvancedSearch" class="el-icon-arrow-up"></i>
        <i v-show="useAdvancedSearch" class="el-icon-arrow-down"></i>
      </div>
      <!--    高级检索-->
      <div v-show="useAdvancedSearch" class="advanced-search-box">
        <el-row :gutter="59">
          <el-col :span="12">
            <el-form-item label="申请人">
              <el-input
                  v-model="advancedSearchForm.applicant"
                  placeholder="请输入"
                  clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签">
              <el-input
                  v-model="advancedSearchForm.label"
                  placeholder="请输入"
                  clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="59">
          <el-col :span="12">
            <el-form-item label="申请日期">
              <el-date-picker
                  v-model="advancedSearchForm.applicationDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  clearable
                  range-separator="-"
                  start-placeholder="开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="解析日期">
<!--              <el-input-->
<!--                  v-model="advancedSearchForm.analysisDate"-->
<!--                  placeholder="请输入"-->
<!--              ></el-input>-->
              <el-date-picker
                  v-model="advancedSearchForm.analysisDate"
                  value-format="yyyy-MM-dd"
                  clearable
                  type="date"
                  range-separator="-"
                  start-placeholder="开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="59">
          <el-col :span="24">
            <el-form-item label="摘要">
              <el-input
                  v-model="advancedSearchForm.abstractAll"
                  clearable
                  placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="59">
          <el-col :span="24">
            <el-form-item label="技术效果">
              <el-input type="textarea" :rows="5"
                        v-model="advancedSearchForm.technicalEffect"
                        clearable
                        placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <result
          v-if="dataList.length > 0 || leftQueryList.length > 0 "
          v-loading="loading"
          :form="advancedSearchForm"
          :page="page"
          :size="size"
          :data-list="dataList"
          :query-list="leftQueryList"
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
      </result>
    </el-form>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import result from "./components/result.vue";
import {patentSearch} from "@/api/PatentSearch";
import {mapGetters, mapMutations} from "vuex";
import store from "@/store";

export default {
  name: "index",
  mixins: [rule],
  components: {
    result,
  },
  data() {
    return {
      notUsePageSerch: false,
      nuUseCheckList: false,
      loading: false,
      isUseCheckList: false,
      isSearch: false,// 锁
      useAdvancedSearch: false, // 使用高级检索
      advancedSearchForm: {
        searchValue: '',
        field: 'all',
        applicant: '',
        label:'',
        applicationDate: "",
        analysisDate: "",
        abstractAll: "",
        technicalEffect: "",
        checkList: [],
        filter: {},
      },
      queryList: [
        {
          label: '关键词',
          key: 'all',
        },
        {
          label: '专利名称',
          key: 'title',
        },
        {
          label: '专利号',
          key: 'number',
        },
        {
          label: '专利主体',
          key: 'inventor',
        },
        {
          label: '技术方案',
          key: 'proposal',
        },
      ],
      dataList: [],
      leftQueryList: [], //左侧赛选项
      page: 1,
      size: 10,
      sizes: [10, 20, 50, 100],
      total: 0,
    }
  },
  beforeRouteEnter(to, from, next) {
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    //  所以通过设置全局锁的形式解决
    if (from.path === '/PatentSearch/detail') {
      store.commit('patentSearch/SET_USER_SEARCH_DATA', true);
    }
    next();
  },

  watch: {
    page() {
      if (this.notUsePageSerch) {
        this.notUsePageSerch = false;
        return
      }
      this.isUseCheckList = true;
      this.searchRes();
    },
    'advancedSearchForm.checkList'() {
      if (this.nuUseCheckList) { // 避免多次调用接口
        this.nuUseCheckList = false;
        return
      }
      this.getCheckList();
    }
  },
  computed: {
    ...mapGetters(['searchData', 'useSearchData']),
  },
  mounted() {
    this.$refs.radio.forEach((item) => { // 我们使用element-ui的单选框radio，点击的时候报错如下图的错，究其原因是访问ibility问题：这个错误可能是因为HTML元素<input>上的aria-hidden属性被错误地使用了。aria-hidden属性是一个用于指示元素是否对屏幕阅读器等辅助技术隐藏的属性。如果一个<input>元素被设置为aria-hidden="true"，这可能违反了无障碍性web的最佳实践，因为屏幕阅读器用户依赖这类元素来理解应用的结构和内容
      item.$refs.radio.removeAttribute("aria-hidden");
    });
  },
  beforeMount() {
    if (this.useSearchData) {
      this.advancedSearchForm = {
        ...this.searchData,
        checkList: [],
        filter: {},
      }
      this.nuUseCheckList = true;
      this['patentSearch/SET_USER_SEARCH_DATA'](false);
      this.searchRes();
    }
  },
  methods: {
    ...mapMutations(['patentSearch/SET_USER_SEARCH_DATA']),
    changeAdvance() {
      this.useAdvancedSearch = !this.useAdvancedSearch;
      if (this.useAdvancedSearch) {
        // this.advancedSearchForm.
      }
    },
    initPageSize() {
      this.notUsePageSerch = true; // 防止多次调用接口
      this.size = 10;
      this.page = 1;
      this.total = 0;
    },
    handleSearch() {
      this.initPageSize();
      this.searchRes();
    },
    getCheckList() {
      this.isUseCheckList = true;
      this.initPageSize();
      this.advancedSearchForm.filter = this.getFilter(this.advancedSearchForm.checkList);
      this.searchRes();

    },
    /**
     *  获取filter对象
     * @param arr
     * @returns {{}}
     */
    getFilter(arr) {
      const obj = {};
      arr.forEach(i => {
        const index = Object.keys(obj).findIndex( j =>  j=== i.fatherKey);
        if (index === -1) {
          obj[i.fatherKey] = [];
          obj[i.fatherKey].push(i.data);
        } else {
          obj[i.fatherKey].push(i.data);
        }
      })
      return obj;
    },
    clickSearch() {
      this.advancedSearchForm.filter = {};
      this.nuUseCheckList = true;

      this.advancedSearchForm.checkList = [];

      this.searchRes();
    },
    searchRes() {
      const { applicant , label, applicationDate, analysisDate, abstractAll, technicalEffect} = this.advancedSearchForm;
      if (this.advancedSearchForm.searchValue === '' && !(applicant || label || applicationDate || analysisDate || abstractAll || technicalEffect) ) {
        return this.$message.warning('搜索框不能为空');
      }
      this.loading = true;
      const data = {
        query: this.advancedSearchForm.searchValue, //"检索词",
        searchType: this.useAdvancedSearch ? 'advance': 'normal', // 检索类型，普通为normal，高级为advance",
        field: this.advancedSearchForm.field,
        advance: {
          applicant: this.advancedSearchForm.applicant,
          label: this.advancedSearchForm.label,
          applicationDate: this.advancedSearchForm.applicationDate,
          analysisDate: this.advancedSearchForm.analysisDate, //"解析日期",
          abstractAll:  this.advancedSearchForm.abstractAll, //"摘要",
          technicalEffect:  this.advancedSearchForm.technicalEffect, // "技术效果"
        },
        filter: this.advancedSearchForm.filter,
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
            imgUrl: i.abstractImg ? i.abstractImg : require('./result-img.png'),
          }
        })
        if(this.isUseCheckList) { // 使用 侧边检索
          this.isUseCheckList = false;
        } else  { // 初始化侧边数据
          this.leftQueryList = apps.map((i) => {
            return {
              name: i.name,
              children: i.children.map(j => {
                return {
                  ...j,
                  fatherKey: i.key,
                }
              }),
              show: false,
            }
          })
        }

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
.search {
  margin-top: 54px;
  margin-bottom: 35px;
  width: 100%;
  height: 72px;
  border-radius: 36px;
  background: #FFF;
  display: flex;
  align-items: center;

  .el-input {
    margin-left: 20px;
    font-size: 18px;
  }

  ::v-deep .el-input__inner {
    border: none;
  }

  .el-button {
    width: 151px;
    height: 72px;
    flex-shrink: 0;
    border-radius: 36px;
    color: #FFF;

    font-family: "PingFang SC";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
  }
}

.advanced-search {
  cursor: pointer;
  margin-top: 45px;
  display: flex;
  align-items: center;

  span {
    color: #000;
    font-family: "PingFang SC";
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 133.333% */
    margin-right: 6px;
  }

  .el-icon-arrow-up {
    color: rgba(143, 149, 158, 1);
    width: 20px;
    height: 20px;
  }
}

.advanced-search-box {
  margin-top: 20px;
  margin-bottom: 65px;
  padding: 55px 77px;
  //height: 745px;
  border-radius: 12px;
  background: #FFF;
}
.container-box {
  padding-bottom:20px;
}
</style>
