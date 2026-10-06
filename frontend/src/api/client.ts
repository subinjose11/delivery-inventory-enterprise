import axios, { AxiosError, AxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage =
        data?.detail?.message ||
        (typeof data?.detail === "string" ? data.detail : null) ||
        data?.message ||
        error.message ||
        "An unexpected API error occurred";

      return Promise.reject(new ApiError(status, errorMessage, data));
    } else if (error.request) {
      return Promise.reject(
        new ApiError(0, "Unable to reach server. Please check your network or backend connection.", null)
      );
    }
    return Promise.reject(new ApiError(500, error.message || "An unexpected error occurred", null));
  }
);

export async function apiClient<T>(
  method: HttpMethod,
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const response = await axiosInstance.request<T>({
    method,
    url,
    data,
    ...config,
  });

  return response.data;
}

export default axiosInstance;
