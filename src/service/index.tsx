import axiosInstance from "../utils/axios";

class APIService {
  static fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);

  static post = (url: string, body: any, config = {}) =>
    axiosInstance.post(url, body, config).then((res) => res);

  static update = (url: string, id: any, body: any) =>
    axiosInstance.patch(`${url}/${id}`, body).then((res) => res);

  static delete = (url: string, id: any) =>
    axiosInstance.delete(`${url}/${id}`).then((res) => res);
}

export default APIService;
