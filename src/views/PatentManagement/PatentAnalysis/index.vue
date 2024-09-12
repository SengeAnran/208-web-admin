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
        @afterSave="onAfterSave"
        editPath="/PatentManagement/PatentAnalysis/edit"
        :viewPath="viewPath"
        :query.sync="query"
        :form.sync="form"
        addText="新建解析"
        determineText="开始解析"
        hideEdit
        hideView
        selection
        multipleDelete
        id-key="id"
        :showOrder="false"
        deleteText="是否确认删除？"
        labelWidth="100px"
        actionWidth="180px"
        dialogWidth="800px"
        :permission-add="['*:*:*']"
        :permission-edit="['*:*:*']"
        :permission-delete="['*:*:*']"
    >
      <template v-slot:search>
        <div class="inline-flex mb-6 pl-0">
          <div class="search-item">
            <span class="label">专利名称</span>
            <el-input v-model="query.title" placeholder="请输入"></el-input>
          </div>
          <!--          <div class="search-item">-->
          <!--            <span class="label">类型</span>-->
          <!--            <el-select-->
          <!--                v-model="query.source"-->
          <!--                placeholder="请选择类型"-->
          <!--                clearable-->
          <!--                style="width: 240px"-->
          <!--            >-->
          <!--              &lt;!&ndash;            <el-option&ndash;&gt;-->
          <!--              &lt;!&ndash;                v-for="dict in dict.type.sys_common_status"&ndash;&gt;-->
          <!--              &lt;!&ndash;                :key="dict.value"&ndash;&gt;-->
          <!--              &lt;!&ndash;                :label="dict.label"&ndash;&gt;-->
          <!--              &lt;!&ndash;                :value="dict.value"&ndash;&gt;-->
          <!--              &lt;!&ndash;            />&ndash;&gt;-->
          <!--              <el-option-->
          <!--                  v-for="dict in option"-->
          <!--                  :key="dict.value"-->
          <!--                  :label="dict.label"-->
          <!--                  :value="dict.value"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </div>-->
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
<!--        <el-button @click="exportFile">导出</el-button>-->
      </template>
      <template v-slot:table>
        <el-table-column label="专利名称" prop="titleC" align="left" min-width="100px"></el-table-column>
        <el-table-column label="解析状态" prop="status" align="center">
          <template v-slot="{row}">
            {{ row.status === 1 ? '解析完成' : (row.status === 0 ? '解析中' : (row.status === -1 ? '解析失败' : '')) }}
          </template>
        </el-table-column>
        <el-table-column label="审核状态" prop="auditStatus" align="center">
          <template v-slot="{row}">
            {{ row.auditStatus === 1 ? '已审核' : '未审核' }}
          </template>
        </el-table-column>
        <el-table-column label="数据来源" prop="source" align="center">
          <template v-slot="{row}">
            {{ row.source === 1 ? '文件上传' : (row.source === 2 ? '引用文件' : '引用数据源') }}
          </template>
        </el-table-column>
        <el-table-column label="提示词" prop="prompt" align="center"/>
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
                      query: { id: scope.data.id,  publicationNo: scope.data.publicationNo },
                    })
                  "
        >查看</el-link>
        <el-link
            v-if="scope.data.status === 1"
            type="primary"
            @click="
                    $router.push({
                      path: viewPath,
                      query: { id: scope.data.id, type: 'audit', publicationNo: scope.data.publicationNo },
                    })
                  "
        >审核
        </el-link>
        <el-link
            v-if="scope.data.status === -1"
            type="primary"
            @click="reAnalysis(scope.data)"
        >重新解析</el-link>
      </template>
      <template v-slot:tableActionAfter="scope">
        <el-link @click="expertData(scope.data)" type="primary">导出</el-link>
      </template>
      <template v-slot:form>
        <el-form-item label="选择数据" :rules="rule.select" prop="uploadFile">
          <el-button :class="{btnActive: form.source === 1}" @click="form.source= 1" icon="el-icon-plus">上传文件
          </el-button>
          <el-button :class="{btnActive:  form.source === 2}" @click="form.source= 2">选择数据文件</el-button>
          <el-button :class="{btnActive:  form.source === 3}" @click="form.source= 3">选择数据源</el-button>
          <file-upload v-model="form.uploadFile" :limit="1" :fileType="['xls','xlsx']"
                       :fileSize="200"
                       :hide-file-list="false"
                       v-if="form.source === 1"></file-upload>
          <!--        <div class="tips">-->
          <!--          <div class="tips-item" v-for="item in form.patents" :key="item.id">-->
          <!--            <div class="text">{{item.name}}</div>-->
          <!--            <img @click="removeOne(item, index)" src="./remove.png" alt=""/>-->
          <!--          </div>-->
          <!--        </div>-->
        </el-form-item>
        <el-form-item label="提示词选择" :rules="rule.select" prop="promptId">
          <el-select v-model="form.promptId" placeholder="请选择" clearable style="width: 200px" @change="chengePro">
            <el-option
                v-for="dict in promptOption"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            />
          </el-select>
          <el-button style="margin-left: 18px" @click="goPage">提示词管理</el-button>
<!--                    <el-input style="margin-top: 16px" :rows="10" type="textarea" v-model="form.promptContent"></el-input>-->
<!--          <div class="editor base-item-box">-->
<!--            <quill-editor-->
<!--                ref="QuillEditor"-->
<!--                v-model="form.promptContent"-->
<!--                v-bind:options="options"-->
<!--            />-->
<!--          </div>-->
        </el-form-item>
        <el-form-item v-for="(item) in form.prompts" :key="item.id" :label="item.extractField">
          <el-input style="margin-top: 16px" :rows="10" type="textarea" v-model="item.extractSample"></el-input>
        </el-form-item>
      </template>
    </Crud>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import {addOne, deleteAll, deleteOne, editOne, getList, reAnalysis, exportExcelSingle} from "@/api/PatentAnalysis";
import {getListAll, queryById} from "@/api/CueWord";
import {toolbarOptions} from "@/utils/constant";
import {downloadWordFile} from "@/utils/data";

export default {
  name: "index",
  mixins: [rule],
  data() {
    return {
      viewPath: '/PatentManagement/PatentAnalysis/detail',
      query: {
        title: '',
        source: undefined,
        searchTime: '',
      },
      form: {
        source: 1, // 资源类型 1 文件上传 2 引用文件 3 数据源
        uploadFile: [],
        sourceId: undefined, //数据ID
        // promptContent: '', // 提示词
        promptId: undefined, //提示词id
        prompts: [],
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
          label: '文件上传',
          value: 1,
        },
        {
          label: '引用文件',
          value: 2,
        },
        {
          label: '引用数据源',
          value: 3,
        },
      ],
      promptOption: [],
      currentRow: null,
      getMethod: getList,
      deleteMethod: deleteOne,
      deleteAllMethod: deleteAll,
      addMethod: addOne,
      updateMethod: editOne,
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
      getListAll({type: 1,  status: 1}).then(res => {
        this.promptOption = res.map(i => {
          return {
            label: i.templateName,
            value: i.id,
            text: i.extractSample,
          }
        })
      })
      this.timer = window.setInterval(() => {
        this.$refs.crud.getItems();
      }, 60000);
    },
    removeOne(item, index) {
      this.form.patents.splice(index, 1);
    },
    // 编辑
    editItem(item) {
      this.$refs.crud.editItem(item);
    },
    //  编辑前

    beforeEdit(item) {
      let obj = {
        ...item,
        uploadFile: [],
      }
      if (item.sourceId) {
        obj.uploadFile = [
          {
            name: item.sourceId,
            url: item.sourceId,
            id: item.sourceId,
          }
        ];
      }
      this.form = obj
    },
    //  保存前
    beforeSave() {
      const data = {
        ...this.form,
        sourceId: this.form.uploadFile[0].id,
      }
      return data;
    },
    goLayCode() {

    },
    //  导出
    exportFile() {

    },
    chengePro(val) {
      if (val) {
        queryById(val).then(res => {
          // console.log(res)
          this.form.prompts = res.extractFields.map(i => {
            return {
              extractSample: i.extractSample,
              extractField: i.extractField,
            }
          });
        })
        // const obj = this.promptOption.filter(i => i.value === val)[0];
        // this.form.promptContent = obj.text;
      }

    },
    //  导出
    expertData(data) {
      exportExcelSingle({publicationNo: data.publicationNo}).then(res => {
        downloadWordFile(res, data.titleC);
      })
    },
    goPage() {
      this.$router.push({
        path: '/PatentManagement/CueWord',
      })
    },
    // 重新解析
    reAnalysis(row) {
      const data = {
        id: row.id,
      }
      reAnalysis(data).then((res = '解析中，请耐心等待') => {
        this.$message.success(res);
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

.editor {
  margin-top: 15px;
  width: 100%;

  ::v-deep .ql-editor {
    min-height: 200px;
  }
}

.base-item-box {
  padding: 0;
}
.el-link {
  margin: 0 4px;
}
</style>
