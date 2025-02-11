import React, { useEffect } from "react";

import Layout from "./components/Layout";
import ReverseSection from "./components/ReverseSection";
import HistorySection from "./components/HistorySection";
import useAxios from "./hooks/useAxios";
import { useData, GetRecentReversalsResponse } from "./providers/DataProvider";
import FullScreenLoadingScreen from "./components/FullScreenLoadingScreen";

function App() {
  const { updateRecentlyReversed } = useData();

  const { isLoading, error, performCall } = useAxios({
    url: "/api/v1/reversals",
    method: "GET",
    initialLoadingState: true,
    onResponse: (response: GetRecentReversalsResponse) => {
      updateRecentlyReversed(response.recentReversals);
    },
    delayMillis: 1000,
  });

  useEffect(() => {
    performCall();
  }, []);

  const isError = error !== undefined;
  if (isLoading || isError) {
    return <FullScreenLoadingScreen isError={isError} />;
  }

  return (
    <Layout>
      <ReverseSection></ReverseSection>
      <HistorySection></HistorySection>
    </Layout>
  );
}

export default App;
