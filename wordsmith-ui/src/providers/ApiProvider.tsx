import React, { createContext, useContext, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

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
  response: ReversedText;
  error: ErrorObject;

  recentlyReversedText: ReversedText[];

  reverseText: Function;
  getRecentlyReversedText: Function;
}

const ApiContext: any = createContext(undefined);

function ApiProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorObject | undefined>(undefined);

  const [response, setResponse] = useState<ReversedText | undefined>(undefined);
  const [recentlyReversedText, setRecentlyReversedText] = useState<ReversedText[]>([]);

  function sortByCreated(recentUpdates: ReversedText[]): ReversedText[] {
    return recentUpdates.sort((a, b) => {
      if (a.createdTs <= b.createdTs) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  function reverseText(textToReverse: string): void {
    setIsLoading(true);
    setError(undefined);
    setTimeout(() => {
      axios
        .post("/api/v1/reverse", {
          textToReverse,
        })
        .then((data: AxiosResponse) => {
          const responseData = data.data as ReversedText;
          setResponse(responseData);
          const recentUpdates = [...recentlyReversedText];
          recentUpdates.unshift(responseData);
          setRecentlyReversedText(sortByCreated(recentUpdates));
        })
        .catch((error: AxiosError) => {
          console.error(error);
          console.log(error.response);
          const errorObject = error.response?.data as ErrorObject;
          console.log(errorObject);
          setError(errorObject);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  }

  function getRecentlyReversedText(limit: number): ReversedText[] {
    return [];
  }

  return (
    <ApiContext.Provider
      value={{
        isLoading,
        error,
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
