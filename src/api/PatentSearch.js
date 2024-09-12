import service from "../utils/request";

// 专利检索
// const path = process.env.VUE_APP_ENV === "production"? "" : "/api";
const path = "/api";

//  检索
export function patentSearch(data) {
    return service({
        url: path + "/patentSearch",
        method: "post",
        data,
    });
}

//  检索详情
export function patentSearchDetail(data) {
    return service({
        url: path + "/patentSearch/detail",
        method: "post",
        data,
    });
}

//
// 专利-通过申请号查询
export function queryByApplicationNo(params) {
    return service({
        url: path + "/patentAnalysis/queryByPublicationNo",
        method: "get",
        params,
    });
}
// 重点专利
export function getImportant(params) {
    return service({
        url: path + "/patentSearch/important",
        method: "get",
        params,
    });
}
