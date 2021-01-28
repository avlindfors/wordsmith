import React, { createContext, useContext, useState } from "react";

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

export interface DataContextInterface {
  recentlyReversed: ReversedText[];
  updateRecentlyReversed: (listOfRecentReversals : ReversedText[]) => void;
  reverseResult: ReversedText | undefined;
  updateReverseResult: ( reversalResult: ReversedText) => void;
}

export interface GetRecentReversalsResponse {
  recentReversals: ReversedText[];
}

const DataContext: any = createContext(undefined);

function DataProvider({ children }: any) {
  const [recentlyReversed, setRecentlyReversed] = useState<ReversedText[]>([]);
  const [reverseResult, setReverseResult] = useState<ReversedText | undefined>(undefined);

  function updateReverseResult(reversedText : ReversedText) : void {
    setReverseResult(reversedText);
    const recentUpdates = [...recentlyReversed];
    recentUpdates.unshift(reversedText);
    updateRecentlyReversed(recentUpdates);
  }

  function updateRecentlyReversed(recentlyReversed : ReversedText[]) : void {
    setRecentlyReversed(recentlyReversed);
  }


  return (
    <DataContext.Provider
      value={{
        // only use these
        recentlyReversed,
        updateRecentlyReversed,
        reverseResult,
        updateReverseResult
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData(): DataContextInterface {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within an DataProvider");
  }

  return context as DataContextInterface;
}

export { DataProvider, useData };
