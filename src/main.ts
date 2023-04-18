import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routers";
import pinia from "./stores";
// UI框架 element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

//图标组件
import sicon from "./components/iconfont/sicon.vue"
// //elementPlus的图标库
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//权限路由
import "./permission"

const app = createApp(App);




app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.component("sicon",sicon)
app.mount("#app");
