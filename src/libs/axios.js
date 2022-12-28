import Vue from "vue";
// 引入Swal弹窗
import Swal from "sweetalert2";

// axios
import axios from "axios";
import router from "@/router";

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: "http://192.168.1.154:8588/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

axiosIns.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取令牌
    const accessToken = window.localStorage.getItem("token");
    // 如果存在令牌，将其添加到请求的授权标头中
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosIns.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status == 500) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
        showCancelButton: false,
      });
    }
    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem("accessToken");
      if (!window.localStorage.getItem("accessToken")) {
        router.push({ name: "/login", params: { cause: 401 } });
      }
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$http = axiosIns;

export default axiosIns;
