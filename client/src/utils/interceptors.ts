// https://dev.to/charlintosh/setting-up-axios-interceptors-react-js-typescript-12k5

import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const on_request = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
};

const on_request_error = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const on_response = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const on_response_error = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export function interceptor_config(instance: AxiosInstance): AxiosInstance {
  instance.interceptors.request.use(on_request, on_request_error);
  instance.interceptors.response.use(on_response, on_response_error);
  return instance;
}
