import axios from "axios";
import dayjs from "dayjs";

const api = axios.create({
  //baseURL: import.meta.env.VITE_API_URL || "http://localhost:8090",
  headers: {
    "Content-Type": "application/json",
  },
});

api.defaults.headers.common['AJAX'] = 'true';
api.interceptors.request.use(
  (config) => {
    let url = config.url;

    let cp = localStorage.getItem('auto-contextpath');
    if (cp == null){
      cp = '/auto'
    }
    url = url.replace('/auto', cp);

    const timeStamp = dayjs().format("YYYYMMDDHHmmssSSS");
    if (url.indexOf("?") > 0) {
      url += "&t=" + timeStamp;
    } else {
      url += "?t=" + timeStamp;
    }

    config.url = url;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response?.config?.responseType !== undefined && response?.config?.responseType !== 'blob') {
      if (response.headers["content-type"].indexOf("application/json") !== undefined && response.headers["content-type"].indexOf("application/json") === -1) {
        return response;
      }
    }
    return Promise.resolve(response.data);
  }, (error) => {
    if (error.status === 401) {
      alert('로그인 세션이 종료되었습니다.')
      let cp = localStorage.getItem('tims-contextpath');
      location.href = cp + '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  });

api.GET = (url, params) => {
  return api.get(url, {params})
}
api.POST = (url, formData, config={}) => {
  return api.post(url, formData, config)
}


export default api;
