// https://dev.to/charlintosh/setting-up-axios-interceptors-react-js-typescript-12k5

import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const on_request = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (localStorage.token && config.headers != null) {
    config.headers["Authorization"] = "Bearer " + localStorage.token;
  }

  return config;
};

const on_request_error = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const on_response = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const on_response_error = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

export function interceptor_config(instance: AxiosInstance): AxiosInstance {
  instance.interceptors.request.use(on_request, on_request_error);
  instance.interceptors.response.use(on_response, on_response_error);
  return instance;
}
