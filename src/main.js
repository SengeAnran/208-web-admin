import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Panel from "./components/Panel";
import CountUp from "./components/CountUp";
import Empty from "./components/Empty";
import PatentContent from "./components/PatentContent";
import BaseCanHideItem from "./components/BaseCanHideItem";
import BackBtn from "./components/BackBtn.vue";
import Crud from "./components/Crud";
import FileUpload from "./components/FileUpload";
import * as echarts from "echarts";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 新增：导入组件
import VueQuillEditor from 'vue-quill-editor' // 导入 VueQuillEditor，不带 {}

Vue.use(ElementUI);
Vue.use(plugins);
Vue.use(VueAwesomeSwiper);
Vue.component("Panel", Panel); // 面板
Vue.component("CountUp", CountUp); // 数子动态效果
Vue.component("Crud", Crud); // crud
Vue.component("FileUpload", FileUpload); // 文件上传
Vue.component("Empty", Empty); // 暂无数据
Vue.component("BaseCanHideItem", BaseCanHideItem); // 专利内容
Vue.component("PatentContent", PatentContent); // 专利内容
Vue.component("BackBtn", BackBtn); // 暂无数据
import plugins from "./plugins"; // plugins
Vue.prototype.$echarts = echarts;

import '@/assets/font/font.css'
// 新增：导入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 新增：注册组件
Vue.use(VueQuillEditor) // 这里用的是 use

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
