import { AxiosError } from "axios";

export interface ErrorResponse {
  msg: string;
  statusCode?: number;
  details?: any;
}

export const handleApiError = (error: unknown): ErrorResponse => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return {
        msg:
          error.response.data?.message ||
          error.message ||
          "Server error occurred",
        statusCode: error.response.status,
        details: error.response.data,
      };
    } else if (error.request) {
      return {
        msg: "No response from server, please check your internet connection",
        statusCode: 0,
      };
    }
  }

  if (error instanceof Error) {
    return {
      msg: error.message,
    };
  }

  return {
    msg: "An unexpected error has occurred",
  };
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof AxiosError && !error.response;
};

export const isServerError = (error: unknown): boolean => {
  return (
    error instanceof AxiosError &&
    !!error.response &&
    error.response.status >= 500
  );
};

export const isClientError = (error: unknown): boolean => {
  return (
    error instanceof AxiosError &&
    !!error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  );
};
