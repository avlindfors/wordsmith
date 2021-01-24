import React from "react";
import { Global, ThemeProvider } from "@emotion/react";

import { theme } from "./styles/theme";
import { globalStyles } from "./styles/globalStyles";
import Layout from "./components/Layout";
import MainSection from "./components/MainSection";
import RecentSection from "./components/RecentSection";
import { ApiProvider } from "./providers/ApiProvider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApiProvider>
        <Global styles={globalStyles} />
        <Layout>
          <MainSection></MainSection>
          <RecentSection></RecentSection>
        </Layout>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default App;
