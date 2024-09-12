
<template>
<div class="container-box page">
  <Crud
      ref="crud"
      :get-method="getMethod"
      :delete-method="deleteMethod"
      :query.sync="query"
      :form.sync="form"
      addText="新增"
      selection
      multipleDelete
      id-key="id"
      :showOrder="false"
      deleteText="是否确认删除？"
      labelWidth="100px"
      dialogWidth="800px"
      :permission-add="['*:*:*']"
      :permission-edit="['*:*:*']"
      :permission-delete="['*:*:*']"
  >
    <template v-slot:search>
      <div class="inline-flex mb-6 pl-0">
        <div class="search-item">
          <span class="label">文件名称</span>
          <el-input v-model="query.name" placeholder="请输入"></el-input>
        </div>
        <div class="search-item">
          <span class="label">类型</span>
          <el-select
              v-model="query.type"
              placeholder="请选择类型"
              clearable
              style="width: 240px"
          >
<!--            <el-option-->
<!--                v-for="dict in dict.type.sys_common_status"-->
<!--                :key="dict.value"-->
<!--                :label="dict.label"-->
<!--                :value="dict.value"-->
<!--            />-->
            <el-option
                v-for="dict in option"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label">日期</span>
          <el-date-picker
              v-model="query.time"
              style="width: 180px"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="date"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </div>
    </template>
    <template v-slot:crudAction>
<!--      <el-button @click="uploadTip"  >导出</el-button>-->
    </template>
    <template v-slot:table>
      <el-table-column label="专报名称" prop="name" align="left" min-width="100px"></el-table-column>
      <el-table-column label="状态" prop="status" align="center"></el-table-column>
      <el-table-column label="标签" prop="relatedPatents" align="center"></el-table-column>
      <el-table-column label="修改时间" prop="finishTime" align="center"></el-table-column>
      <!-- <el-table-column label="激活状态" prop="status" align="center">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.resource_activate_status" :value="scope.row.status" />
        </template>
      </el-table-column> -->
    </template>
    <template v-slot:tableActionAfter="scope">
      <el-link @click="goLayCode(scope.data, 1, 'tileFile')" type="primary">铺码文件</el-link>
    </template>
    <template v-slot:form>
      <el-form-item label="选择数据" :rules="rule.select" prop="patents">
        <el-button :class="{btnActive: activeIndex === 0}" @click="activeIndex= 0" icon="el-icon-plus">上传文件</el-button>
        <el-button :class="{btnActive: activeIndex === 1}" @click="activeIndex= 1" >选择数据文件</el-button>
        <el-button :class="{btnActive: activeIndex === 2}" @click="activeIndex= 2" >选择数据源</el-button>
        <div class="tips">
          <div class="tips-item" v-for="item in form.patents" :key="item.id">
            <div class="text">{{item.name}}</div>
            <img @click="removeOne(item, index)" src="./remove.png" alt=""/>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="提示词选择" :rules="rule.input" prop="prompt">
        <el-select v-model="form.promptObj" placeholder="请选择" clearable style="width: 200px" @change="chengePro">
          <el-option
              v-for="dict in promptOption"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
        <el-button style="margin-left: 18px">提示词管理</el-button>
        <el-input style="margin-top: 16px" :rows="10" type="textarea" v-model="form.prompt"></el-input>
      </el-form-item>

    </template>
  </Crud>
</div>
</template>
<script>
import rule from "@/mixins/rule";
export default {
  name: "index",
  mixins: [rule],
  data() {
    return {
      activeIndex: 0,
      query: {
        name: '',
        type: undefined,
        time: '',
      },
      form: {
        patents: [
          {
            name: '新型发明专利2401',
            id: 1,
          },
          {
            name: '种新型结构装置1',
            id: 2,
          },
          {
            name: '测试专利解析报告-发明类',
            id: 3,
          },
          {
            name: '测试专利解析报告-新型发明类',
            id: 4,
          },
        ], // 专报
        prompt: '', // 提示词
        promptObj: undefined,
      },
      option: [
        {
          label: 'a',
          value: 1,
        },
      ],
      promptOption: [
        {
          label: '古典风格的干扰特特让他',
          value: 1,
          text: '法国干工地会尽快符合开口就是u和数据库阿瑟斯活动版面不想飞所以发生过的互动话题',
        },
      ],
      currentRow: null,
      getMethod: this.getInfoList,
      deleteMethod: this.deleteInfo,
    }
  },
  methods: {
    removeOne(item,index) {
      this.form.patents.splice(index, 1);
    },
    getInfoList() {

    },
    deleteInfo() {

    },
    goLayCode() {

    },
    chengePro(val) {
      console.log(val)
      if (val) {
        const obj = this.promptOption.filter(i => i.value === val)[0];
        this.form.prompt = obj.text;
      }

    }
  }
}
</script>


<style scoped lang="scss">
.btnActive {
  border: 1px solid #0A9FFD;
  color: #0A9FFD;
}
.search-item {
  margin-right: 42px;
}
.tips {
  margin-top: 23px;
  display: flex;
  flex-wrap: wrap;
  .tips-item {
    margin-right: 18px;
    margin-bottom: 16px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 312px;
    height: 56px;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid #DEE0E3;
    img {
      cursor: pointer;
    }
  }
}
</style>
