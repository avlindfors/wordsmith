import React from "react";
import styled from "@emotion/styled";
import { breakpoints } from "../../styles/breakpoints";

function Header() {
  return (
    <StyledHeader>
      <StyledLogo data-testid="site-title">Wordsmith Inc.</StyledLogo>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  text-align: left;
  @media screen and (min-width: ${breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }
`;

const StyledLogo = styled.h1`
  color: ${({ theme }) => theme.color.logoColor};
  font-size: ${({ theme }) => theme.fontSize[4]};
`;

export default Header;
