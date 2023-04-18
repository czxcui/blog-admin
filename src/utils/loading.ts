import { ElLoading } from "element-plus";
// 使用eleplus的加载动画
let loading: { close: () => void };
function openLoading() {
  loading = ElLoading.service({
    body: true,
    lock: true,
    text: "正在加载页面请求稍等...",
    spinner: "el-icon-loading",
    background: "rgba(255, 255, 255, 0.7)",
  });
}
function closeLoading() {
  setTimeout(()=>{loading.close();},1300)
}
export { openLoading, closeLoading };
