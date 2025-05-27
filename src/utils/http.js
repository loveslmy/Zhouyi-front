import axios from 'axios';

// 创建 Axios 实例
const http = axios.create({
  baseURL: 'http://localhost:8080/api', // 从环境变量中获取基础 URL
  timeout: 5000,                             // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json',
    // 可以在这里添加更多默认头信息
  }
});

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    //const token = localStorage.getItem('authToken'); // 假设你把 token 存储在 localStorage 中
    //if (token) {
    //  config.headers.Authorization = `Bearer ${token}`;
    //}
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  response => {
    if(response.status === 200) {
        return response.data;
    } else {
        console.error('Server Error:', response);
        return Promise.reject(response);
    }
    // 对响应数据做点什么
  },
  error => {
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('Server Error:', error.response.status);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('Network Error');
    } else {
      // 发送请求时发生了一些事情，触发了错误
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  }
);

export default http;