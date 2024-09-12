import request from "@/utils/request";

// 上传文档
export function uploadFile(data) {
  return request({
    url: "/api/fileMgt/upload",
    method: "post",
    data,
  });
}
// 上传文档（阿里云）
export function ossUploadFile(data) {
  return request({
    url: "/file/ossUpload",
    method: "post",
    data,
  });
}
// 获取文件信息
export function getFileInfo(fileId) {
  return request({
    url: `/file/getFileInfo/${fileId}`,
    method: "get",
  });
}
// 获取文件服务器地址
export function getFileConfig() {
  return request({
    url: `/file/getFileConfig`,
    method: "get",
  });
}
//引入教案模板复制
export function copyFile(id) {
  return request({
    url: `/file/copyFile?sourceFileId=${id}&targetFileType=4`,
    method: "post",
  });
}

// 获取地区数据
export function getAreaList(params) {
  return request({
    url: "system/area/list",
    method: "get",
    params,
  });
}

//文件切片上传
export function getSliceUploadApi(params) {
  return request({
    url: "/file/getOssPartUploadId",
    method: "get",
    params,
  });
}
