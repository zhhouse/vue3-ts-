import type { AxiosResponse,AxiosRequestConfig } from "axios";

export interface HXRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

export interface HXRequestConfig extends AxiosRequestConfig {
  interceptors?: HXRequestInterceptors;
}
