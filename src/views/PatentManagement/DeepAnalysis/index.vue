
<template>
<div class="container-box page">
  <Crud
      ref="crud"
      :get-method="getMethod"
      :delete-method="deleteMethod"
      :delete-all-method="deleteAllMethod"
      :add-method="addMethod"
      :update-method="updateMethod"
      :before-save-method="beforeSave"
      :after-save-method="afterSave"
      :export-method="exportMethod"
      @afterSave="onAfterSave"
      editPath="/PatentManagement/DeepAnalysis/edit"
      :viewPath="viewPath"
      :query.sync="query"
      :form.sync="form"
      addText="新增深度解析"
      hideEdit
      hideView
      selection
      multipleDelete
      id-key="id"
      :showOrder="false"
      deleteText="是否确认删除？"
      labelWidth="170px"
      dialogWidth="800px"
      actionWidth="160px"
      :permission-add="['*:*:*']"
      :permission-edit="['*:*:*']"
      :permission-delete="['*:*:*']"
  >
    <template v-slot:search>
      <div class="inline-flex mb-6 pl-0">
        <div class="search-item">
          <span class="label">深度解析名称</span>
          <el-input v-model="query.title" placeholder="请输入"></el-input>
        </div>
<!--        <div class="search-item">-->
<!--          <span class="label">类型</span>-->
<!--          <el-select-->
<!--              v-model="query.type"-->
<!--              placeholder="请选择类型"-->
<!--              clearable-->
<!--              style="width: 240px"-->
<!--          >-->
<!--&lt;!&ndash;            <el-option&ndash;&gt;-->
<!--&lt;!&ndash;                v-for="dict in dict.type.sys_common_status"&ndash;&gt;-->
<!--&lt;!&ndash;                :key="dict.value"&ndash;&gt;-->
<!--&lt;!&ndash;                :label="dict.label"&ndash;&gt;-->
<!--&lt;!&ndash;                :value="dict.value"&ndash;&gt;-->
<!--&lt;!&ndash;            />&ndash;&gt;-->
<!--            <el-option-->
<!--                v-for="dict in option"-->
<!--                :key="dict.value"-->
<!--                :label="dict.label"-->
<!--                :value="dict.value"-->
<!--            />-->
<!--          </el-select>-->
<!--        </div>-->
        <div class="search-item">
          <span class="label">状态</span>
          <el-select
              v-model="query.status"
              placeholder="请选择状态"
              clearable
              style="width: 240px"
          >
            <el-option
                v-for="dict in statusOption"
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
      <el-table-column label="深度解析名称" prop="title" align="left" min-width="100px"></el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template v-slot="{row}">
          {{ row.status === 1 ? '解析完成' : (row.status === 0 ?'解析中': (row.status === -1 ?'解析失败': ''))  }}
        </template>
      </el-table-column>
      <el-table-column label="相关专利" prop="patentNames" align="center"></el-table-column>
      <el-table-column label="提示词" prop="prompt" align="center" />
      <el-table-column label="完成时间" prop="finishTime" align="center"></el-table-column>
      <!-- <el-table-column label="激活状态" prop="status" align="center">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.resource_activate_status" :value="scope.row.status" />
        </template>
      </el-table-column> -->
    </template>
    <template v-slot:tableAction="scope">
      <el-link v-if="scope.data.status === 1" type="primary" @click="editItem(scope.data)"
      >编辑
      </el-link>
      <el-link
          v-if="scope.data.status === 1"
          type="primary"
          @click="
                    $router.push({
                      path: viewPath,
                      query: { id: scope.data.id },
                    })
                  "
      >查看</el-link>
    </template>
    <template v-slot:tableActionAfter="scope">
      <el-link @click="expertData(scope.data)" type="primary">导出</el-link>
    </template>
    <template v-slot:form>
      <el-form-item label="深度解析名称" :rules="rule.input" prop="title">
        <el-input  v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="选择专利" :rules="rule.select5" prop="patents">
        <el-button icon="el-icon-plus" @click="handleAddPatent">添加</el-button>
        <div class="tips">
          <div class="tips-item" v-for="(item,index) in form.patents" :key="item.id">
            <div class="text">{{item.name}}</div>
            <img @click="removeOne(item, index)" src="./remove.png" alt=""/>
          </div>
        </div>
      </el-form-item>
<!--      <el-form-item label="提示词选择" :rules="rule.input" prop="promptContent">-->
<!--        <el-select v-model="form.promptId" placeholder="请选择" clearable style="width: 200px" @change="chengePro">-->
<!--          <el-option-->
<!--              v-for="dict in promptOption"-->
<!--              :key="dict.value"-->
<!--              :label="dict.label"-->
<!--              :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--        <el-button style="margin-left: 18px" @click="goPage">提示词管理</el-button>-->
<!--        <el-input style="margin-top: 16px" :rows="10" type="textarea" v-model="form.promptContent"></el-input>-->
<!--&lt;!&ndash;        <div class="editor base-item-box">&ndash;&gt;-->
<!--&lt;!&ndash;          <quill-editor&ndash;&gt;-->
<!--&lt;!&ndash;              ref="QuillEditor"&ndash;&gt;-->
<!--&lt;!&ndash;              v-model="form.promptContent"&ndash;&gt;-->
<!--&lt;!&ndash;              v-bind:options="options"&ndash;&gt;-->
<!--&lt;!&ndash;          />&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--      </el-form-item>-->

    </template>
  </Crud>
  <selectPatentsDialog v-if="dialogVisible" @addData="addData" title-text="选择专利" :dialog-visible.sync="dialogVisible"/>
</div>
</template>
<script>
import rule from "@/mixins/rule";
import selectPatentsDialog from "./selectPatentsDialog.vue";
import {
  addOne,
  deleteAll,
  deleteOne,
  editOne,
  exportExcelBatch,
  // exportExcelSingle,
  exportSingle,
  getList
} from "@/api/DeepAnalysis";
import {getListAll} from "@/api/CueWord";
import {toolbarOptions} from "@/utils/constant";
import { downloadWordFile} from "@/utils/data";

export default {
  name: "index",
  mixins: [rule],
  components: {
    selectPatentsDialog,
  },
  data() {
    return {
      viewPath: '/PatentManagement/DeepAnalysis/detail',
      query: {
        title: '',
        // type: undefined,
        status: undefined,
        searchTime: '',
      },
      form: {
        title: '',
        patents: [], // 专报
        // promptContent: '', // 提示词
        // promptId: undefined, //提示词id
      },
      statusOption: [
        {
          label: '解析失败',
          value: -1,
        },
        {
          label: '解析中',
          value: 0,
        },
        {
          label: '解析完成',
          value: 1,
        },
      ],
      options: {
        placeholder: "请输入",
        theme: "bubble",
        contentType: 'html',
        modules: {
          toolbar: {
            container: toolbarOptions, // 显示配置
            handlers: {                // 逻辑配置
              // "image": this.handleImageButton, // 自定义 image 按钮的处理函数
              // "clean": this.handleCleanButton, // 自定义 clean 按钮的处理函数
              // ...
            }
          }
        }
      }, // 配置
      option: [
        {
          label: 'a',
          value: 1,
        },
      ],
      promptOption: [],
      currentRow: null,
      getMethod: getList,
      deleteMethod: deleteOne,
      deleteAllMethod: deleteAll,
      addMethod: addOne,
      updateMethod: editOne,
      exportMethod: exportExcelBatch,
      dialogVisible: false,
      timer: null,
    }
  },
  beforeMount() {
    this.init();
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    init() {
      getListAll({type: 2, status: 1}).then(res => {
        this.promptOption = res.map(i => {
          return  {
            label: i.templateName,
            value: i.id,
            text: i.extractSample,
          }
        })
      })
      this.timer = window.setInterval(() => {
        this.$refs.crud.getItems();
      },60000);
    },
    addData(data) {
      const pushData = data.map(i => {
        return {
          name: i.titleC,
          // id: i.applicationNo,
          id: i.publicationNo,
        }
      })
      pushData.forEach(i => {
        const index = this.form.patents.findIndex(j => j.id === i.id)
        if ( index!== -1){
          this.form.patents.splice(index, 1);
        }
      })
      this.form.patents.push(...pushData);
    },
    removeOne(item,index) {
      this.form.patents.splice(index, 1);
    },
    // 编辑
    editItem(item) {
      this.$refs.crud.editItem(item);
    },
    //  保存前
    beforeSave() {
      // this.$modal.loading('正在后台生成专报，请耐心等待');
      this.$message.info('正在后台生成中，请耐心等待');
      return  {
        ...this.form,
        promptId: this.form.promptId + '',
        patents: this.form.patents.map(i => i.id).join(','),
      };
    },
    afterSave() {
      // this.$modal.closeLoading();
    },
    goLayCode() {
      // this.$modal.closeLoading();
    },
    // 点击添加专利
    handleAddPatent() {
      this.dialogVisible = true;
    },
    chengePro(val) {
      if (val) {
        const obj = this.promptOption.filter(i => i.value === val)[0];
        this.form.promptContent = obj.text;
      }

    },
    //  导出
    expertData(data) {
      exportSingle({id: data.id}).then(res => {
        downloadWordFile(res, data.title);
      })
    },
    goPage() {
      this.$router.push({
        path: '/PatentManagement/CueWord',
      })
    },
    // 添加过后
    onAfterSave() {
     setTimeout(() => {
       this.$refs.crud.getItems();
     }, 2000)
    },
  }
}
</script>


<style scoped lang="scss">
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
    line-height: normal;
    img {
      cursor: pointer;
    }
  }
}
.editor {
  margin-top: 15px;
  width: 100%;

  ::v-deep .ql-editor {
    min-height: 200px;
  }
}
.base-item-box {
  padding: 0  ;
}
.el-link {
  margin: 0 4px;
}
</style>
