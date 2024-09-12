
<template>
<div class="container-box page">
  <Crud
      ref="crud"
      :get-method="getMethod"
      :delete-method="deleteMethod"
      :delete-all-method="deleteAllMethod"
      :add-method="addMethod"
      :update-method="updateMethod"
      :before-edit-method="beforeEdit"
      :before-save-method="beforeSave"
      :query.sync="query"
      :form.sync="form"
      addText="新建提示词"
      hide-view
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
          <span class="label">提示词名称</span>
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
                v-for="dict in promptOption"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label">日期</span>
          <el-date-picker
              v-model="query.searchTime"
              style="width: 170px"
              value-format="yyyy-MM-dd"
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
      <el-table-column label="提示词模板名称" prop="templateName" align="left" min-width="100px"></el-table-column>
      <el-table-column label="类型"  align="center">
        <template v-slot="{row}">
          {{row.typ === 1? '专利解析' :( row.typ === 2? '专报生成': '')}}
        </template>
      </el-table-column>
      <el-table-column label="提示词说明" prop="comment" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center" >
        <template v-slot="{row}">
          {{row.status === 1? '启用' :'停用'}}
          <el-switch
              @change="val => changeStatus(val, row.id)"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" prop="updateTime" align="center"></el-table-column>
    </template>
    <template v-slot:tableAction="scope">
      <el-link @click="showDetail(scope.data)" type="primary">详情</el-link>
    </template>
    <template v-slot:form>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="提示词名称" :rules="rule.input" prop="templateName">
            <el-input v-model="form.templateName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" :rules="rule.input" prop="typ">
            <el-select v-model="form.typ" placeholder="请选择" clearable style="width: 200px" @change="changePro">
              <el-option
                  v-for="dict in promptOption"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="提示词说明" prop="comment">
        <el-input :max="30" placeholder="填写提示词说明，一般写明用途，30字符以内" v-model="form.comment"></el-input>
      </el-form-item>
      <el-form-item label="抽取内容背景" prop="extractContentBg">
        <el-input type="textarea" rows="3" placeholder="描述需要抽取内容的背景知识" v-model="form.extractContentBg"></el-input>
      </el-form-item>
      <el-form-item label="抽取字段" :rules="rule.extractFieldsRule" prop="extractFields">
        <el-button class="add-title-btn" @click="addField" type="primary" size="mini" plain>添加</el-button>
        <div class="field-item"  v-for="(item, index) in form.extractFields" :key="index">
          <div class="tag-box">
            <el-tag closable  @close="handleClose(index)">{{ item. extractField}}</el-tag>
          </div>
          <el-input  type="textarea" rows="6" v-model="item.extractSample"></el-input>
        </div>
<!--        <el-tag v-for="(item, index) in form.tips" :key="index" closable  @close="handleClose(item)">{{ item }}</el-tag>-->
<!--        <el-input-->
<!--            class="input-new-tag"-->
<!--            v-if="inputVisible"-->
<!--            v-model="inputValue"-->
<!--            ref="saveTagInput"-->
<!--            size="small"-->
<!--            @keyup.enter.native="handleInputConfirm"-->
<!--            @blur="handleInputConfirm"-->
<!--        >-->
<!--        </el-input>-->
<!--        <el-button v-else type="primary" class="button-new-tag" size="small" @click="showInput" icon="el-icon-edit"></el-button>-->
      </el-form-item>
<!--      <el-form-item label="抽取示例" prop="extractSample">-->
<!--        <el-input type="textarea" rows="13" placeholder="专利名称：用于在内容导向网络中创建和管理虚拟专用组的方法和设备（CN103262063A）-->
<!--创新主体：华为技术有限公司-->
<!--应用领域：用于在内容导向网络中管理虚拟专用组的内容，在军事领域，虚拟专用组的创建和管理使得军队能够按需共享和传播关键信息。-->
<!--技术方案：内容路由器包括：存储器，其用于在内容导向网络（CON）中缓存来自客户的内容；以及发射器，其耦接到所述存储器，且用于根据请求来转发内容，其中内容由用户进行签名，CON可向不同用户提供不同安全级别。-->
<!--技术效果：通过内容路由器实现内容的缓存和转发，并保证内容的安全性。通过多种加密算法和应用程序编程接口，实现了内容的签名、验证、发布和订阅。同时支持跨域操作，提高了系统的扩展性和互操作性." v-model="form.extractSample"></el-input>-->
<!--      </el-form-item>-->

    </template>
  </Crud>
  <DetailDialog
      :dialog-visible.sync="showDetailDialog"
      :form="detailForm"
  />
</div>
</template>
<script>
import rule from "@/mixins/rule";
import {deleteAll, deleteOne, editOne, getList, addOne, queryById, updateStatus} from "@/api/CueWord";
import DetailDialog from "./DetailDialog.vue";
import {patentArr, specialReportArr} from "@/views/PatentManagement/CueWord/constant";
export default {
  name: "index",
  components: {DetailDialog},
  mixins: [rule],
  data() {
    return {
      showDetailDialog: false,
      activeIndex: 0,
      inputVisible: false,
      inputValue: '',
      query: {
        name: '',
        type: undefined,
        searchTime: '',
      },
      form: {
        templateName: '', // 提示词名称
        typ: undefined, // 类型
        comment: '', // 提示词说明
        extractContentBg: '', // 抽取内容背景
        extractSample: '', // 抽取示例
        extractFields: [],
        tips: [],
        extractField: '', // 抽取字段
      },
      detailForm: {},//详情
      promptOption: [
        {
          label: '专利解析',
          value: 1,
          text: '',
        },
        {
          label: '专报生成',
          value: 2,
          text: '',
        },
      ],
      // localRule: {
      //   patentRule: [
      //     {required: true, validator: patentRule, trigger: "blur"},
      //   ],
      // },
      currentRow: null,
      getMethod: getList,
      deleteMethod: deleteOne,
      deleteAllMethod: deleteAll,
      addMethod: addOne,
      updateMethod: editOne,
    }
  },
  methods: {
    addField() {
      this.$prompt('请输入字段名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\S{1,7}$/,
        inputErrorMessage: '请输入最多七个字符的字段名称'
      }).then(({ value }) => {
        this.form.extractFields.push({
          extractField: value,
          extractSample: '',
        })
        // this.$message({
        //   type: 'success',
        //   message: '你的邮箱是: ' + value
        // });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });
      });
    },
    //  查看详情
    showDetail(row) {
      queryById(row.id).then(res => {
        this.detailForm = {
          ...res,
        }
        this.showDetailDialog = true;
      })
      // this.detailForm = {
      //   ...row,
      //   tips: row.extractField ? row.extractField.split(',') : [],
      // }

    },
    // 改变状态
    changeStatus(val, id) {
      const data = {
        status: val,
        id,
      }
      updateStatus(data).then(() => {
        this.$refs.crud.getItems();
      })
    },
    //  编辑前
    beforeEdit(item) {
      queryById(item.id).then(res => {
        this.form = {
          ...res,
          // tips: item.extractField ? item.extractField.split(',') : [],
        }
      })

    },
    //  保存前
    beforeSave() {
      const data = {
        ...this.form,
        // extractField: this.form.tips.join(','),
      }
      return data;
    },
    removeOne(item,index) {
      this.form.patents.splice(index, 1);
    },
    goLayCode() {

    },
    changePro(val) {
      if (val) {
        // const obj = this.promptOption.filter(i => i.value === val)[0];
        // this.form.prompt = obj.text;
        this.form.extractFields = val === 1? patentArr.map(i => {return {...i}}): specialReportArr.map(i => {return {...i}});
      }

    },
    handleClose(index) {
      // this.form.tips.splice(this.form.tips.indexOf(tag), 1);
      this.form.extractFields.splice(index, 1);
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
        this.form.tips.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
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

.el-tag {
  margin-right: 10px;
}
::v-deep .el-form-item__content {
  position: relative;

  .add-title-btn {
    position: absolute;
    top: 36px;
    left: -84px;
  }
  .field-item {
    display: flex;
    margin-bottom: 20px;
    .tag-box {
      min-width: 130px;
    }
  }
}

</style>
