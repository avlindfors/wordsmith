import React, { useState } from "react";
import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

import { useApi } from "../../providers/ApiProvider";
import resolveErrorMessage from "../../utils/resolveErrorMessage";
import { ReactComponent as WarningIcon } from "../../icons/error.svg";

const DEFAULT_PLACEHOLDER = "Enter some text here that you want to reverse.";

export interface ReverseFormProps {}

function validateForm(inputText: string): boolean {
  return (
    (inputText !== undefined || inputText !== null) &&
    inputText.trim().length >= 1
  );
}

const INPUT_MAX_LENGTH = 200;

const ReverseForm = (props: ReverseFormProps) => {
  const [inputText, setInputText] = useState<string>("");
  const { isLoading, error, reverseText } = useApi();

  const updateText = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setInputText(target.value);

    event.preventDefault();
  };

  const performPost = (event: React.FormEvent<HTMLFormElement>) => {
    reverseText(inputText);
    event.preventDefault();
  };

  const isValidForm = validateForm(inputText);
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
          <StyledWordCounter>{`${inputText.length} / ${INPUT_MAX_LENGTH}`}</StyledWordCounter>
        </StyledErrorMessageAndCounterContainer>
        <StyledSubmitButton type="submit" disabled={!isValidForm || isLoading}>
          {!isLoading ? "Reverse!" : "Loading!"}
        </StyledSubmitButton>
      </StyledButtonAndErrorMessageContainer>
    </StyledForm>
  );
};

const StyledErrorMessageAndCounterContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize[3]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledWordCounter = styled.p`
  color: ${({ theme }) => theme.color.text.light};
  margin-left: auto;
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
`;

const StyledForm = styled.form`
  background: ${({ theme }) => theme.color.lightCardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => theme.spacing[5]};
  display: flex;
  flex-direction: column;
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
  padding: ${({ theme }) => theme.spacing[5]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize[3]};
  color: ${({ theme }) => theme.color.text.dark};
  width: inherit;
  display: block;
  border: none;
  resize: none;
`;

export default ReverseForm;
