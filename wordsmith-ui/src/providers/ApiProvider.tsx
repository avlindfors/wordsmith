import React, { createContext, useContext, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import ErrorName from "../enums/ErrorName";

export interface ErrorObject {
  description: string;
  errorName: string;
}

export interface ReversedText {
  originalText: string;
  reversedText: string;
  createdTs: string;
  id: string;
}

export interface ApiContextInterface {
  isLoading: boolean;
  isLoadingRecentReversals: boolean;
  response: ReversedText;
  error: ErrorObject;
  errorLoadingRecentReversals: ErrorObject;

  recentlyReversedText: ReversedText[];

  reverseText: Function;
  getRecentlyReversedText: Function;
}

interface GetRecentReversalsResponse {
  recentReversals: ReversedText[];
}

const api = axios.create({
  timeout: 5000,
  timeoutErrorMessage: "Could not connect to server before timeout. Please try again."
});

const ApiContext: any = createContext(undefined);

function ApiProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecentReversals, setIsLoadingRecentReversals] = useState(true);

  const [error, setError] = useState<ErrorObject | undefined>(undefined);
  const [errorLoadingRecentReversals, setErrorLoadingRecentReversals] =
   useState<ErrorObject | undefined>(undefined);

  const [response, setResponse] = useState<ReversedText | undefined>(undefined);
  const [recentlyReversedText, setRecentlyReversedText] = useState<ReversedText[]>([]);

  function reverseText(textToReverse: string): void {
    setIsLoading(true);
    setError(undefined);

    api
      .post("/api/v1/reverse", {
        textToReverse,
      })
      .then((data: AxiosResponse) => {
        const responseData = data.data as ReversedText;
        setResponse(responseData);
        const recentUpdates = [...recentlyReversedText];
        recentUpdates.unshift(responseData);
        setRecentlyReversedText(recentUpdates);
      })
      .catch((error: AxiosError) => {
        console.error(error);
        const errorObject = error.response?.data as ErrorObject;
        setError(errorObject);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getRecentlyReversedText(): void {
    setIsLoadingRecentReversals(true);
    setErrorLoadingRecentReversals(undefined);

    setTimeout(() => {
      api
        .get("/api/v1/reversals")
        .then((data: AxiosResponse) => {
          const responseData = data.data as GetRecentReversalsResponse;
          const recentReversals = responseData.recentReversals;
          setRecentlyReversedText(recentReversals);
        })
        .catch((error: AxiosError) => {
          if (error.response !== undefined) {
            const errorObject = error.response?.data as ErrorObject;
            console.error(errorObject);
            setErrorLoadingRecentReversals(errorObject);
          } else if (error.request !== undefined) {
            const errorObject : ErrorObject = {
              errorName: ErrorName.NETWORK_ERROR,
              description: error.message
            }
            console.error(errorObject);
            setErrorLoadingRecentReversals(errorObject);
          } else {
            const errorObject : ErrorObject = {
              errorName: ErrorName.UNKNOWN_ERROR,
              description: error.message
            }
            console.error(errorObject);
            setErrorLoadingRecentReversals(errorObject);
          }
        })
        .finally(() => {
          setIsLoadingRecentReversals(false);
        });

    }, 1000)
  }

  return (
    <ApiContext.Provider
      value={{
        isLoading,
        isLoadingRecentReversals,
        error,
        errorLoadingRecentReversals,
        response,
        recentlyReversedText,
        reverseText,
        getRecentlyReversedText,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

function useApi(): ApiContextInterface {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }

  return context as ApiContextInterface;
}

export { ApiProvider, useApi };
