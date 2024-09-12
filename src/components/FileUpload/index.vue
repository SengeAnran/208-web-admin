<template>
  <div class="upload-file">
    <el-upload
      :disabled="disabled"
      action="#"
      multiple
      :name="`${uploadId}`"
      :accept="acceptType"
      :before-upload="handleBeforeUpload"
      :on-change="handleChange"
      :file-list="fileList"
      :limit="limit"
      :http-request="uploadFile"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :show-file-list="false"
      :headers="headers"
      class="upload-file-uploader"
      :ref="`Uploader-${uploadId}`"
      :auto-upload="false"
      :timeout="180000"
    >
      <!-- 上传按钮 -->
      <el-button v-if="!hideBtn" size="mini" type="primary" v-text="text"></el-button>
      <!-- 上传提示 -->
      <div class="el-upload__tip" slot="tip" v-if="isShowTip">
        请上传<span v-if="fileSize"
          >大小不超过<b style="color: #f56c6c">{{ fileSize }}MB</b></span
        >
        <span v-if="fileType"
          >格式为<b style="color: #f56c6c">{{ fileType.join("/") }}</b> 的文件</span
        >
      </div>
    </el-upload>

    <!-- 文件列表 -->
    <transition-group
      v-if="!hideFileList"
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li :key="file.url" class="el-upload-list__item ele-upload-list__item-content" v-for="(file, index) in fileList">
        <el-link :href="file.url" :underline="false" target="_blank">
          <span class="el-icon-document"> {{ file.name }} </span>
        </el-link>
        <div class="ele-upload-list__item-content-action">
          <el-link v-if="!disabled" :underline="false" @click="handleDelete(index)" type="danger">删除</el-link>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
// import { getToken } from "@/utils/auth";
import _ from "lodash";

import { uploadFile } from "@/api/common";

export default {
  name: "FileUpload",
  props: {
    // 值
    value: [String, Object, Array],
    // 组件id
    uploadId: {
      type: [String, Number],
      default: () => Date.now(),
    },
    // 数量限制
    limit: {
      type: Number,
      default: 10,
    },
    // 上传按钮文本(MB)
    text: {
      type: String,
      default: "选取文件",
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 500,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["doc", "docx", "xls", "ppt", "txt", "pdf", "jpg", "png", "mp4", "pptx"],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true,
    },
    // 禁用上传
    disabled: {
      type: Boolean,
      default: false,
    },
    // 隐藏文件列表
    hideFileList: {
      type: Boolean,
      default: false,
    },
    // 隐藏上传按钮
    hideBtn: {
      type: Boolean,
      default: false,
    },
    // 显示上传情况提示
    showMsg: {
      type: Boolean,
      default: false,
    },
    // 上传时附带的额外参数
    paramsObj: {
      type: Object,
      default: () => {},
    },
    // 自定义上传前校检
    customBeforeUpload: {
      type: Function,
    },
  },
  data() {
    return {
      number: 0,
      uploadList: [],
      headers: {
        // Authorization: "Bearer " + getToken(),
      },
      fileList: [],
      uploadFiles: [], //待上传的文件列表
      fileTotal: 0, //上传文件总数
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          let temp = 1;
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(",");
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            if (typeof item === "string") {
              item = { name: item, url: item };
            }
            item.uid = item.uid || new Date().getTime() + temp++;
            return item;
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
    acceptType() {
      return this.fileType.map((val) => "." + val).join(",");
    },
  },
  methods: {
    async handleChange(file, fileList) {
      console.log('fileList',file,fileList);
      let fList = document.getElementsByName(this.uploadId); //获取原始文件的个数
      if (fList && fList.length && fList[0].files) this.fileTotal = fList[0].files.length;
      if (file.status !== "ready") return (this.uploadFiles = []);
      this.uploadFiles.push(file.raw);
      if (this.uploadFiles.length === this.fileTotal) {
        let check = true;
        if (this.customBeforeUpload) check = await this.customBeforeUpload(this.uploadFiles);
        if (!check) {
          this.uploadFiles = [];
        } else this.$refs[`Uploader-${this.uploadId}`].submit();
      }
    },
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        const fileName = file.name.split(".");
        const fileExt = fileName[fileName.length - 1];
        const isTypeOk = this.fileType.indexOf(fileExt) >= 0;
        if (!isTypeOk) {
          this.$modal.msgError(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$modal.msgError(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      this.$modal.loading("正在上传文件，请稍候...");
      this.number++;
      return true;
    },
    // 上传文件
    async uploadFile(info) {
      const formData = new FormData();
      formData.append("file", info.file);
      if (this.paramsObj && Object.keys(this.paramsObj).length > 0) {
        Object.keys(this.paramsObj).map((i) => {
          formData.append(i, this.paramsObj[i]);
        });
      }
      let res = await uploadFile(formData);
      // console.log('res', res);
      // this.$emit("add", { ...res.data, uid: info.file.uid });

      this.handleUploadSuccess(res);
      this.$message.success("文件上传成功");
      this.$modal.closeLoading();
    },
    // 文件个数超出
    handleExceed() {
      this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
    },
    // 上传失败
    handleUploadError() {
      if (this.number) {
        this.number--;
      }
      this.$modal.msgError("上传文件失败，请重试");
      this.$modal.closeLoading();
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      if (res.length !== 0) {
        res.forEach(i => {
          this.uploadList.push({
            ...i,
            // 兼容性处理  name url
            name: i.originalName, // **
            url: i.filePath, // **
            fileName: i.fileName,
            fileId: i.id,
          });
        })
        this.uploadedSuccessfully();
      } else {
        this.number--;
        this.$modal.closeLoading();
        this.$modal.msgError(res.msg);
        this.$refs[`Uploader-${this.uploadId}`].handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
    // 删除文件
    handleDelete(index) {
      console.log('handleDelete',index);
      const deleteId = this.fileList[index].id;
      this.fileList.splice(index, 1);
      // this.$emit("input", this.listToString(this.fileList));
      this.$emit("input", this.fileList);
      this.$emit("updateList", _.cloneDeep(this.fileList));
      this.$emit("deleteOne", deleteId);
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        this.fileList = this.fileList.concat(this.uploadList);
        this.uploadList = [];
        this.uploadFiles = [];
        this.number = 0;
        // this.$emit("input", this.listToString(this.fileList));
        this.$emit("input", this.fileList);
        this.$emit("updateList", _.cloneDeep(this.fileList));
        if (this.showMsg) {
          this.$message.success("上传成功！");
        }
        this.$modal.closeLoading();
      }
    },
    // 获取文件名称
    getFileName(name) {
      if (name.lastIndexOf("/") > -1) {
        return name.slice(name.lastIndexOf("/") + 1);
      } else {
        return name;
      }
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = "";
      separator = separator || ",";
      for (let i in list) {
        strs += list[i].url + separator;
      }
      return strs != "" ? strs.substr(0, strs.length - 1) : "";
    },
  },
};
</script>

<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 5px;
}

.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}

.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}

.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
</style>
