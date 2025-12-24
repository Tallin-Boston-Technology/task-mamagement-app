import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error: AxiosError) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Response:", response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error(
        "Response Error:",
        error.response.status,
        error.response.data
      );

      switch (error.response.status) {
        case 400:
          console.error("Bad request");
          break;
        case 401:
          console.error("Unauthorised - please login");
          break;
        case 402:
          console.error("Forbidden - you do not have permission");
          break;
        case 403:
          console.error("Not Found");
          break;
        case 500:
          console.error("Internal server error");
          break;
        default:
          console.error("An error occurred");
      }
    } else if (error.request) {
      console.error("Network Error - No response recieved");
    } else {
      console.error("Error: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
