import React, { useEffect } from "react";
import { Global, ThemeProvider } from "@emotion/react";

import { theme } from "./styles/theme";
import { globalStyles } from "./styles/globalStyles";
import Layout from "./components/Layout";
import MainSection from "./components/MainSection";
import RecentSection from "./components/RecentSection";
import { useApi } from "./providers/ApiProvider";
import styled from "@emotion/styled";
import { breakpoints } from "./styles/breakpoints";

function App() {
  const { isLoadingRecentReversals, getRecentlyReversedText } = useApi();

  // Load recent changes from API once.
  useEffect(() => {
    getRecentlyReversedText();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {isLoadingRecentReversals ? (
        <StyledAppLoader>
          <StyledAppHeader>Wordsmith Inc.</StyledAppHeader>
          <SpinningLoader />
        </StyledAppLoader>
      ) : (
        <Layout>
          <MainSection></MainSection>
          <RecentSection></RecentSection>
        </Layout>
      )}
    </ThemeProvider>
  );
}

const StyledAppLoader = styled.div`
  background: ${({ theme }) => theme.color.background.dark};
  color: ${({ theme }) => theme.color.text.light};
  padding: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: ${breakpoints.md}) {
    flex-direction: row;
  }
`;

const StyledAppHeader = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  @media screen and (min-width: ${breakpoints.md}) {
    margin-right: ${({ theme }) => theme.spacing[5]};
    margin-bottom: 0;
  }
`;

const SpinningLoader = styled.div`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }

  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: ${({ theme }) => `8px solid ${theme.color.primary}`};
  border-top-color: transparent;
  animation: 1s infinite ease-in-out rotate;
`;

export default App;
