import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

function Header() {
  const theme = useTheme();

  return (
    <header style={{ marginBottom: theme.spacing[8] }}>
      <StyledLogo>Wordsmith Inc.</StyledLogo>
    </header>
  );
}

const StyledLogo = styled.h1`
  color: ${({ theme }) => theme.color.logoColor};
  font-size: ${({ theme }) => theme.fontSize[4]};
`;

export default Header;
