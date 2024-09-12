import service from "../utils/request";

// 首页
const path = process.env.VUE_APP_ENV === "production"? "" : "/api";
// const path = "/api";

//  知识库-智能问答
export function postChat(data) {
    return service({
        url: path + "/knowledgeBase/chat",
        method: "post",
        data,
    });
}

//  知识库-参考资料
export function postSearch(data) {
    return service({
        url: path + "/knowledgeBase/search",
        method: "post",
        data,
    });
}

//  统计
export function getStatistic(data) {
    return service({
        url: path + "/index/statistic",
        method: "post",
        data,
    });
}

//  图表
export function getChart(data) {
    return service({
        url: path + "/index/chart",
        method: "post",
        data,
    });
}

//  图表
export function searchDocs(data) {
    return service({
        url: path + "/knowledgeBase/searchDocs",
        method: "post",
        data,
    });
}
