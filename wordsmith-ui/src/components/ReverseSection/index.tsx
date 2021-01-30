import React from "react";
import styled from "@emotion/styled";

import ReverseForm from "../ReverseForm";
import LatestResult from "../LatestResult";
import { breakpoints } from "../../style/breakpoints";

/**
 * Container for the reverse form section.
 */
function ReverseSection() {
  return (
    <StyledSectionContainer>
      <section>
        <StyledHeader>
          <StyledLogo>Wordsmith Inc.</StyledLogo>
        </StyledHeader>
        <section>
          <StyledIntroductionHeader>Reverse words</StyledIntroductionHeader>
          <StyledIntroductionText>
            Using state of the art technology; we can offer free reversal of
            words within sentences. It’s not much, but it’s honest work.
          </StyledIntroductionText>
          <ReverseForm />
          <LatestResult />
        </section>
      </section>
    </StyledSectionContainer>
  );
};

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

const StyledIntroductionHeader = styled.h2`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize[5]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  @media screen and (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize[6]};
  }
`;

const StyledIntroductionText = styled.p`
  color: ${({ theme }) => theme.color.text.light};
  font-size: ${({ theme }) => theme.fontSize[3]};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  line-height: 1.5em;

  @media screen and (min-width: ${breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSize[4]};
  }
`;

const StyledSectionContainer = styled.section`
  background: ${({ theme }) => theme.color.background.dark};
  grid-column: 1;
`;

export default ReverseSection;
