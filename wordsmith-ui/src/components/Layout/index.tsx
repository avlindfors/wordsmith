import React from "react";
import styled from "@emotion/styled";

import Footer from "../Footer";
import { breakpoints, maxWidth } from "../../style/breakpoints";

/**
 * Defines global layout. 
 */
function Layout({ children }: any) {
  return (
    <StyledAppContainer>
      <StyledContent>
        {children}
        <Footer />
      </StyledContent>
    </StyledAppContainer>
  );
}

const StyledAppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled.div`
  max-width: ${maxWidth};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[3]};
  padding-top: ${({theme}) => theme.spacing[4]};
  @media screen and (min-width: ${breakpoints.md}) {
    padding-bottom: ${({theme}) => theme.spacing[7]};
    padding: ${({ theme }) => theme.spacing[7]};
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1.5fr 1fr;
    grid-column-gap: ${({ theme }) => theme.spacing[8]};
  }
`;

export default Layout;
