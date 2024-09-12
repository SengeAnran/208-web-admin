/**
 * vue、webpack等配置
 * https://cli.vuejs.org/zh/config
 */
const publicPath = process.env.VUE_APP_ENV === "production"? "/screen" : "/";
module.exports = {
    publicPath: publicPath,
    devServer: {
        open: true,
        proxy: {
            '/api': { // 测试环境
                target: 'http://222.128.6.162:28085/', //
                // target: 'http://192.168.43.182:8085/', //
                changeOrange: true,
                pathRewrite: { '^/api': '' },
            },
            '/login': { // 测试环境
                target: 'https://jqy.zjagri.cn/', //
                changeOrange: true,
                pathRewrite: { '^/login': '' },
            },
        },
    },
};
