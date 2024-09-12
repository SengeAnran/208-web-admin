import service from "../utils/request";

// 专利解析
// const path = process.env.VUE_APP_ENV === "production"? "" : "/api";
const path = "/api";

//  专利-分页列表查询
export function getList(data) {
    return service({
        url: path + "/patentAnalysis/list",
        method: "post",
        data,
    });
}

// //  详情
// export function getDetail(data) {
//     return service({
//         url: path + "/patentSearch/detail",
//         method: "post",
//         data,
//     });
// }


//  编辑
export function editOne(data) {
    return service({
        url: path + "/patentAnalysis/edit",
        method: "post",
        data,
    });
}

//  增加
export function addOne(data) {
    return service({
        url: path + "/patentAnalysis/add",
        method: "post",
        data,
    });
}
//  批量删除
export function deleteAll(ids) {
    return service({
        url: path + "/patentAnalysis/deleteBatch?ids="+ ids,
        method: "DELETE",
    });
}

//  删除
export function deleteOne(id) {
    return service({
        url: path + "/patentAnalysis/delete?id=" + id,
        method: "DELETE",
    });
}

//  详情
export function getDetail(params) {
    return service({
        url: path + "/patentAnalysis/queryById",
        method: "get",
        params,
    });
}


// 专利解析-重新解析
export function reAnalysis(params) {
    return service({
        url: path + "/patentAnalysis/reAnalysis",
        method: "get",
        params,
    });
}


// // 专利解析-重新解析
// export function importExcel(params) {
//     return service({
//         url: path + "/patentAnalysis/importExcel",
//         method: "get",
//         params,
//     });
// }
// 导出单个
export function exportExcelSingle(params) {
    return service({
        url: path + "patentAnalysis/exportSingle",
        method: "GET",
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: 'blob',
        params,
    });
}


// 导出多个
export function exportExcelBatch(params) {
    return service({
        url: path + "/patentAnalysis/exportExcelBatch",
        method: "GET",
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: 'blob',
        params,
    });
}

// 审核
export function audit(data) {
    return service({
        url: path + "/patentAnalysis/audit",
        method: "post",
        data
    });
}

// 审核详情
export function getAuditDetail(params) {
    return service({
        url: path + "/patentAnalysis/audit/detail",
        method: "get",
        params
    });
}
