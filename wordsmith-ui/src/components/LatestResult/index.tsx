import styled from "@emotion/styled";
import React from "react";

import { useData } from "../../providers/DataProvider";
import { ReactComponent as LockIcon } from "../../icons/lock.svg";
import { breakpoints } from "../../styles/breakpoints";

const DEFAULT_RESULT_MESSAGE = "Use the form above to reverse some text";

const LatestResult = () => {
  const { reverseResult } = useData();

  return (
    <section>
      <StyledResultHeader>Result</StyledResultHeader>
      <StyledResultContainer>
        <StyledIconContainer>
          <StyledLockIcon />
        </StyledIconContainer>
        <StyledResultBox>
          <p>
            {reverseResult !== undefined
              ? reverseResult.reversedText
              : DEFAULT_RESULT_MESSAGE}
          </p>
        </StyledResultBox>
      </StyledResultContainer>
    </section>
  );
};

const StyledResultHeader = styled.h3`
  color: ${({ theme }) => theme.color.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize[4]};

  @media screen and (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize[5]};
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
`;

const StyledLockIcon = styled(LockIcon)`
  width: 24px;
  height: 24px;
  path {
    fill: ${({ theme }) => theme.color.disabled};
  }

  @media screen and (min-width: ${breakpoints.md}) {
    width: 36px;
    height: 36px;
  }
`;

const StyledIconContainer = styled.div`
  display: none;
  padding: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.color.resultBoxBorder};
  height: inherit;
  width: auto;
  @media screen and (min-width: ${breakpoints.sm}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (min-width: ${breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const StyledResultBox = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.color.text.dark};
  font-size: ${({ theme }) => theme.fontSize[3]};
  line-height: 1.5em;
  word-wrap: break-word;
  word-break: break-all;

  @media screen and (min-width: ${breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[5]};
  }
`;

const StyledResultContainer = styled.div`
  min-height: ${({ theme }) => theme.inputBoxHeight};
  background: ${({ theme }) => theme.color.resultBoxBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

export default LatestResult;
