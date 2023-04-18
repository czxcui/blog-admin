import axios, { AxiosRequestConfig } from "axios";
import { useUserStore } from "@/stores/modules/user";
import { ElMessage } from "element-plus"; //el提示框
import { showMessage, faultState } from "./status";

const service = axios.create({
  //请求地址
  baseURL: "http://localhost:8080/",
  //接口超时时间
  timeout: 6000,
  //允许跨域携带cookie信息
  withCredentials: true,
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const userStore = useUserStore();
    const token: string = userStore.token;
    if (token) {
      config.headers = {
        Authentication: userStore.token || null,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    const data = {
      ...(response.data instanceof Object
        ? response.data
        : JSON.parse(response.data)),
    };
    console.log(data);

    switch (data.code) {
      case 66666:
        ElMessage.success({
          dangerouslyUseHTMLString: true,
          message: `<strong><h3>欢迎用户 ${data.data.username}</h3> </strong>`,
          grouping: true,
        });
   
        break;
      case 6667:
      case 666:
        break;
      
      case 111:
      case 113:
      case 114:
      case 121:
      case 120:
      case 119:
        ElMessage.error(data.msg);
        break;

      case 117:
      case 116:
      case 115:
      case 112:
        ElMessage.error(data.msg);
        const userStore = useUserStore();
        userStore.token = null;
        location.reload();
        break;
    }
    // console.log(data)
    return data || {};
  },
  (error) => {

    const { response } = error;
    // ElMessage.error(error);
    if (response) {
      // showMessage(response.status);
      ElMessage.error(showMessage(response.status));
      return Promise.reject(response.data);
    } else {
      ElMessage.error("网络连接异常请重新连接!");
    }
  }
);

export default service;
