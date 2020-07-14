import axios from "axios";
import { message } from "ant-design-vue";
import router from "../router";

axios.interceptors.response.use(
  success => {
    if (success.status && success.status == 200) {
      message.success(
        "(test)获取到数据：" +
          JSON.stringify(success.data).slice(0, 30) +
          "......"
      );
    }
    return success.data;
  },
  error => {
    if (
      error.response.status == 504 ||
      error.response.status == 404 ||
      error.response.status == 500
    ) {
      message.error("服务器出错");
    } else if (error.response.status == 400) {
      message.error(error.response.data.error);
    } else if (error.response.status == 403) {
      message.error("权限不足，请联系管理员");
    } else if (error.response.status == 401) {
      message.error("尚未登录，请登录");
      localStorage.removeItem("Authorization");
      router.push("/login");
    } else {
      message.error(JSON.stringify(error.response.data));
    }
    return;
  }
);
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("Authorization")) {
      config.headers.Authorization = localStorage.getItem("Authorization");
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const base = "";

export const postKeyValueRequest = (url: string, params: Array<string>) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = "";
        for (const i in data) {
          ret +=
            encodeURIComponent(i) + "=" + encodeURIComponent(data[i]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
export const postRequest = (url: string, params: Array<string>) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params
  });
};
export const putRequest = (url: string, params: Array<string>) => {
  return axios({
    method: "put",
    url: `${base}${url}`,
    data: params
  });
};
export const getRequest = (url: string, params: Array<string>) => {
  return axios({
    method: "get",
    url: `${base}${url}`,
    params: params
  });
};
export const deleteRequest = (url: string, params: Array<string>) => {
  return axios({
    method: "delete",
    url: `${base}${url}`,
    params: params
  });
};
