import styled from "@emotion/styled";
import React from "react";

import { useApi } from "../../providers/ApiProvider";
import { ReactComponent as LockIcon } from "../../icons/lock.svg";

export interface LatestResultProps {
  result?: string;
}

const DEFAULT_RESULT_MESSAGE = "Use the form above to reverse some text";

const LatestResult = ({ result }: LatestResultProps) => {
  const { response } = useApi();

  return (
    <StyledResultContainer>
      <StyledIconContainer>
        <StyledLockIcon />
      </StyledIconContainer>
      <StyledResultBox>
        <p>
          {response !== undefined
            ? response.reversedText
            : DEFAULT_RESULT_MESSAGE}
        </p>
      </StyledResultBox>
    </StyledResultContainer>
  );
};

const StyledLockIcon = styled(LockIcon)`
  width: 36px;
  height: 36px;
  path {
    fill: ${({ theme }) => theme.color.disabled};
  }
`;

const StyledIconContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.color.resultBoxBorder};
  height: inherit;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledResultBox = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.color.text.dark};
  font-size: ${({ theme }) => theme.fontSize[3]};
  line-height: 1.5em;
  word-wrap: break-word;
  word-break: break-all;
`;

const StyledResultContainer = styled.div`
  height: ${({ theme }) => theme.inputBoxHeight};
  background: ${({ theme }) => theme.color.resultBoxBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

export default LatestResult;
