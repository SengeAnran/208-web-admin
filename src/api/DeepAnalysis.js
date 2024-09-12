import service from "../utils/request";

// 深度解析
// const path = process.env.VUE_APP_ENV === "production"? "" : "/api";
const path = "/api";

//  专利-分页列表查询
export function getList(data) {
    return service({
        url: path + "/deepAnalysis/list",
        method: "post",

        data,
    });
}

//  详情
export function getDetail(params) {
    return service({
        url: path + "/deepAnalysis/queryById",
        method: "get",
        params,
    });
}

// -重新解析
export function reAnalysis(params) {
    return service({
        url: path + "/deepAnalysis/reAnalysis",
        method: "get",
        params,
    });
}


//  编辑
export function editOne(data) {
    return service({
        url: path + "/deepAnalysis/edit",
        method: "post",
        data,
    });
}

//  增加
export function addOne(data) {
    return service({
        url: path + "/deepAnalysis/add",
        method: "post",
        data,
    });
}
//  批量删除
export function deleteAll(ids) {
    return service({
        url: path + "/deepAnalysis/deleteBatch?ids="+ ids,
        method: "DELETE",
    });
}

//  删除
export function deleteOne(id) {
    return service({
        url: path + "/deepAnalysis/delete?id=" + id,
        method: "DELETE",
    });
}


// 导出单个
export function exportExcelSingle(params) {
    return service({
        url: path + "/deepAnalysis/exportExcelSingle",
        method: "GET",
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: 'blob',
        params,
    });
}

// 导出单个
export function exportSingle(params) {
    return service({
        url: path + "/deepAnalysis/exportSingle",
        method: "GET",
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: 'blob',
        params,
    });
}

// 导出多个
export function exportExcelBatch(params) {
    return service({
        url: path + "/deepAnalysis/exportExcelBatch",
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: 'blob',
        params,
    });
}
