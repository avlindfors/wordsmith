import * as React from "react";
import styled from "@emotion/styled";

import Header from "../Header";
import ReverseForm from "../ReverseForm";
import LatestResult from "../LatestResult";

const MainSection = () => {
  return (
    <StyledSectionContainer>
      <StyledGridRowContainer gridRow={1}>
        <Header />
        <section>
          <StyledIntroductionHeader>
            Reverse words in sentences
          </StyledIntroductionHeader>
          <StyledIntroductionText>
            Using state of the art technology; we can offer free reversal of
            words within sentences. It’s not much, but it’s honest work.
          </StyledIntroductionText>

          {/** Formulär för att skicka data */}
          <ReverseForm />

          {/** Visar resultatet av senaste reverseringen */}
          <StyledResultHeader>Result</StyledResultHeader>
          <LatestResult result={undefined} />
        </section>
      </StyledGridRowContainer>
      <StyledDisclaimerGridRowContainer gridRow={2}>
        <p>Created by Alexander Lindfors with React & Spring Boot</p>
      </StyledDisclaimerGridRowContainer>
    </StyledSectionContainer>
  );
};

const StyledIntroductionText = styled.p`
  color: ${({ theme }) => theme.color.text.light};
  font-size: ${({ theme }) => theme.fontSize[4]};
  margin-bottom: ${({ theme }) => theme.spacing[7]};
  line-height: 1.5em;
`;

const StyledIntroductionHeader = styled.h2`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize[6]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const StyledResultHeader = styled.h3`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize[5]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const StyledSectionContainer = styled.div`
  background: ${({ theme }) => theme.color.background.dark};
  padding: ${({ theme }) => theme.spacing[8]};
  padding-bottom: ${({ theme }) => theme.spacing[6]};
  grid-column: 1;
  display: grid;
  grid-template-rows: 1fr auto;

  // TODO: lägg till @media
`;

interface StyledGridRowContainerProps {
  gridRow: number;
}

const StyledGridRowContainer = styled.section<StyledGridRowContainerProps>`
  grid-row: ${({ gridRow }) => gridRow};
`;

const StyledDisclaimerGridRowContainer = styled(StyledGridRowContainer)`
  color: ${({ theme }) => theme.color.secondary};
  text-align: center;
`;

export default MainSection;
