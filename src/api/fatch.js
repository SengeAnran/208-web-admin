//  知识库-智能问答
const path = '/api'
export function postChat(data) {
    return fetch(path + "/knowledgeBase/chat", {
        method: "post",
        // 3.1  传递数据
        body: JSON.stringify(data),
    //     #  3.2  设置请求头
        headers: {
            'Content-Type': 'application/json',
            'accept': 'text/event-stream'
        }
    });
}
