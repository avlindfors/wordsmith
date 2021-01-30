import React, { useState } from "react";
import { Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

import { useData } from "../../providers/DataProvider";
import resolveErrorMessage from "../../utils/resolveErrorMessage";
import { ReactComponent as WarningIcon } from "../../icons/error.svg";
import { breakpoints } from "../../style/breakpoints";
import useAxios from "../../hooks/useAxios";

const DEFAULT_PLACEHOLDER = "Enter some text here that you want to reverse.";

function validateForm(inputText: string): boolean {
  return (
    (inputText !== undefined || inputText !== null) &&
    inputText.trim().length >= 1
  );
}

const INPUT_MAX_LENGTH = 200;

/**
 * Create and handle the main form.
 */
function ReverseForm() {
  const { color } = useTheme();
  const [inputText, setInputText] = useState<string>("");
  const { updateReverseResult } = useData();
  const { isLoading, error, performCall } = useAxios({
    url: "/api/v1/reverse",
    method: "POST",
    onResponse: updateReverseResult,
  });

  const updateText = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setInputText(target.value);

    event.preventDefault();
  };

  const performPost = (event: React.FormEvent<HTMLFormElement>) => {
    performCall({ textToReverse: inputText });
    event.preventDefault();
  };

  const isValidForm = validateForm(inputText);
  const isMaxLength = inputText.length === INPUT_MAX_LENGTH;
  return (
    <StyledForm onSubmit={performPost}>
      <label style={{ width: "100%" }}>
        <StyledIntroductionText>
          Try it out by entering some text in the box below and press{" "}
          <b>REVERSE!</b>
        </StyledIntroductionText>
        <StyledTextArea
          tabIndex={1}
          name="textToReverse"
          id="textToReverse"
          placeholder={DEFAULT_PLACEHOLDER}
          onChange={updateText}
          value={inputText}
          maxLength={INPUT_MAX_LENGTH}
        />
      </label>

      <StyledButtonAndErrorMessageContainer>
        <StyledErrorMessageAndCounterContainer>
          {error && (
            <StyledErrorMessageContainer>
              <StyledWarningIcon />
              <StyledErrorMessage>
                {resolveErrorMessage(error)}
              </StyledErrorMessage>
            </StyledErrorMessageContainer>
          )}
          <StyledWordCounter
            textColor={isMaxLength ? color.warning : color.text.light}
          >{`${inputText.length} / ${INPUT_MAX_LENGTH}`}</StyledWordCounter>
        </StyledErrorMessageAndCounterContainer>
        <StyledSubmitButton type="submit" disabled={!isValidForm || isLoading}>
          {!isLoading ? "Reverse!" : "Reversing!"}
        </StyledSubmitButton>
      </StyledButtonAndErrorMessageContainer>
    </StyledForm>
  );
};

const StyledErrorMessageAndCounterContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize[3]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (min-width: ${breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.fontSize[3]};
  }
`;

const StyledWordCounter = styled.p<any>`
  color: ${({ textColor }) => textColor};
  margin-left: auto;
  font-size: ${({ theme }) => theme.fontSize[2]};
  white-space: nowrap;
  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSize[3]};
  }
`;

const StyledIntroductionText = styled.p`
  color: ${({ theme }) => theme.color.text.light};
  font-size: ${({ theme }) => theme.fontSize[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const StyledButtonAndErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledErrorMessage = styled.p`
  color: ${({ theme }) => theme.color.warning};
  margin-right: ${({ theme }) => theme.spacing[5]};
  font-size: ${({ theme }) => theme.fontSize[2]};
  @media screen and (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize[3]};
  }
`;

const StyledErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledWarningIcon = styled(WarningIcon)`
  margin-right: ${({ theme }) => theme.spacing[2]};
  path {
    fill: ${({ theme }) => theme.color.warning};
  }

  display: none;
  @media screen and (min-width: ${breakpoints.md}) {
    display: inline;
  }
`;

const StyledForm = styled.form`
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing[7]};
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]};
    background: ${({ theme }) => theme.color.lightCardBackground};
    padding: ${({ theme }) => theme.spacing[5]};
  }
`;

const StyledSubmitButton = styled.button`
  background: ${({ theme }) => theme.color.primary};
  height: ${({ theme }) => theme.reverseButtonHeight};
  padding: ${({ theme }) => createButtonPadding(theme)};
  color: ${({ theme }) => theme.color.reverseButtonText};
  font-size: ${({ theme }) => theme.fontSize[4]};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  box-sizing: border-box;
  cursor: pointer;

  transition: all 250ms ease;
  &:not(:disabled):hover {
    transform: translate3d(0, -1px, 0);
  }
  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
`;

function createButtonPadding(theme: Theme): string {
  return `0 ${theme.spacing[8]}`;
}

const StyledTextArea = styled.textarea`
  height: ${({ theme }) => theme.inputBoxHeight};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize[3]};
  color: ${({ theme }) => theme.color.text.dark};
  width: inherit;
  display: block;
  border: none;
  resize: none;
  @media screen and (min-width: ${breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[5]};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }
`;

export default ReverseForm;
