import service from "../utils/request";

// 专利解析
// const path = process.env.VUE_APP_ENV === "production"? "" : "/api";
const path = "/api";

//  专利-分页列表查询
export function getList(data) {
    return service({
        url: path + "/patentReport/list",
        method: "post",
        data,
    });
}

//  详情
export function getDetail(params) {
    return service({
        url: path + "/patentReport/queryById",
        method: "get",
        params,
    });
}

// -重新解析
export function reAnalysis(params) {
    return service({
        url: path + "/patentReport/reAnalysis",
        method: "get",
        params,
    });
}
// -重新生成
export function reCreate(params) {
    return service({
        url: path + "/patentReport/reCreate",
        method: "get",
        params,
    });
}


//  编辑
export function editOne(data) {
    return service({
        url: path + "/patentReport/edit",
        method: "post",
        data,
    });
}

//  增加
export function addOne(data) {
    return service({
        url: path + "/patentReport/add",
        method: "post",
        data,
    });
}
//  批量删除
export function deleteAll(ids) {
    return service({
        url: path + "/patentReport/deleteBatch?ids="+ ids,
        method: "DELETE",
    });
}

//  删除
export function deleteOne(id) {
    return service({
        url: path + "/patentReport/delete?id=" + id,
        method: "DELETE",
    });
}

// 专利-分页列表查询
export function getPatentList(data) {
    return service({
        url: path + "/patent/list",
        method: "post",

        data,
    });
}

// 导出单个
export function exportExcelSingle(params) {
    return service({
        url: path + "/patentReport/exportExcelSingle",
        method: "GET",
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: 'blob',
        params,
    });
}

// 导出单个
export function exportSingle(params) {
    return service({
        url: path + "/patentReport/exportSingle",
        method: "GET",
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: 'blob',
        params,
    });
}

// 导出多个
export function exportExcelBatch(params) {
    return service({
        url: path + "/patentReport/exportExcelBatch",
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: 'blob',
        params,
    });
}


// 审核
export function audit(data) {
    return service({
        url: path + "/patentReport/audit",
        method: "post",
        data
    });
}

// 审核详情
export function getAuditDetail(params) {
    return service({
        url: path + "/patentReport/audit/detail",
        method: "get",
        params
    });
}
