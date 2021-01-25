import React from "react";
import styled from "@emotion/styled";
import Footer from "../Footer";
import { breakpoints, maxWidth } from "../../styles/breakpoints";

function Layout({ children }: any) {
  return (
    <AppContainer>
      <Content>
        {children}
        <Footer />
      </Content>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  max-width: ${maxWidth};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[3]};
  padding-top: ${({theme}) => theme.spacing[4]};
  padding-bottom: ${({theme}) => theme.spacing[7]};
  @media screen and (min-width: ${breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[7]};
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1.5fr 1fr;
    grid-column-gap: ${({ theme }) => theme.spacing[7]};
  }
`;

export default Layout;
