<template>
  <el-dialog
      v-if="dialogVisible"
      :title="titleText"
      :visible.sync="dialogVisible"
      append-to-body
      width="1200px"
      @close="closeView"
  >
    <Crud
        ref="crud"
        :get-method="getMethod"
        :query.sync="query"
        addText="新增专报"
        hide-add
        hide-table-action
        useTableLeft
        selection
        id-key="id"
        :showOrder="false"
        :selectMaxNumber="5"
        :currentSelectNumber="currentSelectNumber"
        :currentSelections="selections"
        showSelected
        deleteText="是否确认删除？"
        labelWidth="100px"
        dialogWidth="800px"
        :permission-add="['*:*:*']"
        :permission-edit="['*:*:*']"
        :permission-delete="['*:*:*']"
        @selectionChange="selectionChange"
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
              <!--            <el-option-->
              <!--                v-for="dict in dict.type.sys_common_status"-->
              <!--                :key="dict.value"-->
              <!--                :label="dict.label"-->
              <!--                :value="dict.value"-->
              <!--            />-->
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
      <template v-slot:tableLeft>
        <div class="tip">已选择专利：</div>
        <div class="select-list">
          <el-tag class="select-item one-line-text" v-for="(item, index) in selections" :key="index" closable
                  @close="handleClose(item)">{{ item.titleC }}
          </el-tag>
        </div>
        <div class="bottom-tip">最多支持五份专利生成</div>
      </template>
      <template v-slot:insert>
        <el-button type="primary" @click="onSubmit" style="margin-bottom: 10px">确定</el-button>
      </template>
      <template v-slot:table>
        <el-table-column label="专利名称" prop="titleC" align="left" min-width="100px"></el-table-column>
        <el-table-column label="状态" prop="status" align="center">

          <template v-slot="{row}">
            {{ row.status === 1 ? '解析完成' : (row.status === 0 ?'解析中': (row.status === -1 ?'解析失败': ''))  }}
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
    </Crud>
  </el-dialog>
</template>

<script>
// import { getAuditReviewList } from "@/api/TeachService/PlanManage.js";
import rule from "@/mixins/rule.js";
import {getList} from "@/api/PatentAnalysis";
import _ from 'lodash'

export default {
  name: "AuditDialog",
  // dicts: ["tr_resource_type"],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    id: {
      //审核的id
      type: [String, Number],
    },
    type: {
      // 审核的类型
      type: [String, Number],
    },
    reviewMethod: {
      type: Function,
    },
    // 隐藏审核功能
    hideReview: {
      type: Boolean,
      default: false,
    },
    // 弹窗标题
    titleText: {
      type: String,
      default: "审核",
    },
  },
  mixins: [rule],
  data() {
    return {
      handleClose(tag) {
        this.selections.splice(this.selections.indexOf(tag), 1);
      },
      selections: [],
      currentSelectNumber: 0,
      query: {
        title: '',
        // source: undefined,
        status: undefined,
        searchTime: '',
      },
      loading: false,
      getMethod: getList,
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
    };
  },
  watch: {},
  methods: {
    getInfoList() {

    },
    // 提交选中
    async onSubmit() {
      this.$emit("addData", _.cloneDeep(this.selections));
      this.$emit("update:dialogVisible", false);

    },
    //  关闭窗口
    closeView() {
      // if (!this.hideReview) {
      //   this.$refs.form.resetFields();
      // }
      // this.$emit('update:dialogVisible')
      this.$emit("update:dialogVisible", false);
    },
    selectionChange(val) {
      // console.log(val);
      if (val.length && this.selections.length > 5) {
        return this.$message.warning('最多选取五条！');
      }
      let currentSelections = val
      currentSelections = currentSelections.filter(i => {
        const index = this.selections.findIndex(j => i.titleC === j.titleC && i.id === j.id);
        return index === -1
      })
      if (this.selections.length +  currentSelections.length > 5) {
        return this.$message.warning('最多选取五条！');
      }
      this.selections.push(..._.cloneDeep(currentSelections));
      this.currentSelectNumber = this.selections.length;
      // this.selections = val;
    }
  },
};
</script>

<style scoped lang="scss">
.search-item {
  margin-right: 42px;
}

::v-deep .table-left {
  min-height: 120px;
  width: 253px;
  margin-right: 24px;
  padding: 18px;
  border-radius: 4px;
  border: 1px solid #DEE0E3;
}

.tip {
  color: #000;
  font-size: 18px;
  line-height: 22px; /* 122.222% */
}

.select-list {
  display: flex;
  flex-direction: column;

  .select-item {
    position: relative;
    margin: 4px 0;

    ::v-deep .el-icon-close {
      position: absolute;
      right: 3px;
      top: 7px;
    }
  }
}

.bottom-tip {
  position: absolute;
  bottom: 18px;
  color: #646A73;
  font-size: 14px;
  line-height: 22px; /* 157.143% */
}
</style>

