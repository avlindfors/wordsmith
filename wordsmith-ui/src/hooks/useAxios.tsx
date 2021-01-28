import { useState } from "react";
import axios, { AxiosError, AxiosResponse, Method } from "axios";
import ErrorName from "../enums/ErrorName";
import { ErrorObject } from "../providers/DataProvider";

interface UseAxiosType {
  isLoading: boolean;
  error: ErrorObject | undefined;
  response: any | undefined;
  performCall: (data?: any) => void;
}

interface AxiosRequestProps {
  url: string;
  method: Method;
  onResponse: (response: any | undefined) => void;
  initialLoadingState?: boolean;
  delayMillis?: number;
}

const API_HOST = process.env.REACT_APP_API_HOST as string;
const API_PORT = process.env.REACT_APP_API_PORT as string;
// Use CRA proxy outside of production env.
const isProduction: boolean = process.env.NODE_ENV === "production";
const BASE_URL = isProduction ? `${API_HOST}:${API_PORT}` : "";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  timeoutErrorMessage:
    "Could not connect to server before timeout. Please try again.",
});

function useAxios({
  url,
  method,
  initialLoadingState = false,
  delayMillis = 0,
  onResponse,
}: AxiosRequestProps): UseAxiosType {
  const [isLoading, setIsLoading] = useState<boolean>(initialLoadingState);
  const [error, setError] = useState<ErrorObject | undefined>(undefined);
  const [response, setResponse] = useState<any | undefined>(undefined);

  function performCall(data : any): void {
    var actualDelayMillis = delayMillis;
    if (isProduction) {
      actualDelayMillis = 0;
    }

    setIsLoading(true);
    setError(undefined);
    setTimeout(() => {
      axiosConfig
        .request({
          url: url,
          method: method,
          data: data,
          responseType: 'json'
        })
        .then((response: AxiosResponse) => {
          const responseData = response.data;
          setResponse(responseData);
          if (onResponse !== undefined) {
            onResponse(responseData);
          }
        })
        .catch((error: AxiosError) => {
          console.error(error);
          if (error.request !== undefined) {
            const errorObject: ErrorObject = {
              errorName: ErrorName.NETWORK_ERROR,
              description: error.message,
            };
            setError(errorObject);
          } else if (error.response !== undefined) {
            const errorObject = error.response?.data as ErrorObject;
            setError(errorObject);
          } else {
            const errorObject: ErrorObject = {
              errorName: ErrorName.UNKNOWN_ERROR,
              description: error.message,
            };
            setError(errorObject);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, actualDelayMillis);
  }

  return { isLoading, error, response, performCall } as UseAxiosType;
}

export default useAxios;
