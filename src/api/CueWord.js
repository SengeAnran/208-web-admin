import service from "../utils/request";

// 专利解析
const path = process.env.VUE_APP_ENV === "production"? "" : "/api";
// const path = "/api";

//  专利-分页列表查询
export function getList(data) {
    return service({
        url: path + "/prompt/list",
        method: "post",
        data,
    });
}
//  专利-列表查询
export function getListAll(data) {
    return service({
        url: path + "/prompt/listAll",
        method: "post",
        data,
    });
}

//  详情
export function getDetail(data) {
    return service({
        url: path + "/patentSearch/detail",
        method: "post",
        data,
    });
}


//  编辑
export function editOne(data) {
    return service({
        url: path + "/prompt/edit",
        method: "post",
        data,
    });
}


//  更新状态
export function updateStatus(data) {
    return service({
        url: path + "/prompt/updateStatus",
        method: "post",
        data,
    });
}

//  增加
export function addOne(data) {
    return service({
        url: path + "/prompt/add",
        method: "post",
        data,
    });
}
//  批量删除
export function deleteAll(ids) {
    return service({
        url: path + "/prompt/deleteBatch?ids="+ ids,
        method: "DELETE",
    });
}

//  删除
export function deleteOne(id) {
    return service({
        url: path + "/prompt/delete?id=" + id,
        method: "DELETE",
    });
}


//  根据id查询
export function queryById(id) {
    return service({
        url: path + "/prompt/queryById?id=" + id,
        method: "get",
    });
}
