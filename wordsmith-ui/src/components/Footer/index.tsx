import styled from "@emotion/styled";
import React from "react";
import { breakpoints } from "../../styles/breakpoints";

const Footer = () => {
  return (
    <StyledFooter>
      <p>Created by Alexander Lindfors with React & Spring Boot</p>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  background: ${({ theme }) => theme.color.background.light};
  padding: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize[2]};
  color: ${({ theme }) => theme.color.secondary};
  width: 100%;
  text-align: center;

  // Sprid över båda kolumnerna
  grid-column: 1 / 3;
  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 0;
    background: transparent;
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    padding-top: ${({ theme }) => theme.spacing[7]};
  }
`;
export default Footer;
