import * as axios from "axios";

// console.info('BASE_URL: ->', process.env.REACT_APP_BASE_URL);

const axiosInstance = axios.default?.create({
    baseURL:  "http://192.168.0.106:8080/api"   /*"https://my-prohelp-server.vercel.app/api" */,
    headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (req: any) => {
  try {
    const accessToken = localStorage.getItem("x-toks");
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  } catch (error) {
    // console.log('request: ', error.response.status)
    return Promise.reject(error);
  }
});

axiosInstance.interceptors.response.use(
  (res: any) => res,
  async (err: any) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        console.info("expired");

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const refreshResponse = await axiosInstance.post("/auth/token", {
            refreshToken,
          });
          if (refreshResponse?.data) {
            localStorage.setItem(
              "accessToken",
              refreshResponse?.data.accessToken
            );
            refreshResponse.config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
          }
          return axiosInstance(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
