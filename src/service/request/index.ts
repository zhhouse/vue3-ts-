import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HXRequestInterceptors, HXRequestConfig } from "./type";

class HXRequest {
  instance: AxiosInstance;
  interceptors?: HXRequestInterceptors;
  constructor(config: HXRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        return err;
      }
    );
  }
  async request(config: HXRequestConfig) {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    const result = await this.instance.request(config);
    return result.data;
  }
  post(config: HXRequestConfig) {
    return this.request({ ...config, method: "POST" });
  }
  get(config: HXRequestConfig) {
    return this.instance.request({ ...config, method: "GET" });
  }
}

export default HXRequest;
