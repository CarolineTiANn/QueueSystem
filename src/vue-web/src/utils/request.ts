import axios from "axios";
import { getAccessToken } from "@/utils/auth";

const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // 在请求发送之前对请求数据进行处理
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 携带token
    }

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: { data: any }) => {
    // 对响应数据进行处理
    // ...

    return response.data;
  },
  (error) => {
    // 对响应错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
