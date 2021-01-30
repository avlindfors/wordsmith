import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as BrokenIcon } from "../../icons/bug_fixing.svg";

interface PropType {
  isError: boolean;
}

/**
 * Renders a loading or error screen.
 */
function FullScreenLoadingScreen({ isError }: PropType) {
  return (
    <StyledAppLoader>
      <StyledAppHeader isError={isError} data-testid="loading-title">Wordsmith Inc.</StyledAppHeader>
      <SpinningLoader isError={isError} />

      <ErrorInfo isError={isError}>
        <ErrorHeader>Oh oh!</ErrorHeader>
        <ErrorText>Looks like we’re having some problems</ErrorText>
        <StyledBrokenIcon />
        <ErrorText>Go grab a cup of coffee and we'll be right back</ErrorText>
      </ErrorInfo>
    </StyledAppLoader>
  );
}

const StyledBrokenIcon = styled(BrokenIcon)`
  width: 300px;
  height: auto;
  max-width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const StyledAppLoader = styled.div`
  background: ${({ theme }) => theme.color.background.dark};
  color: ${({ theme }) => theme.color.text.light};
  padding: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface ErrorProps {
  isError: boolean;
}

const ErrorInfo = styled.section<ErrorProps>`
  transition: all 500ms ease;
  display: ${({ isError }) => (isError ? "inline" : "none")};
  opacity: ${({ isError }) => (isError ? 1 : 0)};
  transform: ${({ isError, theme }) =>
    isError && `translateY(-${theme.spacing[5]})`};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorHeader = styled.h2`
  color: ${({ theme }) => theme.color.warning};
  font-size: ${({ theme }) => theme.fontSize[6]};
  font-weight: 600;
`;

const ErrorText = styled.p`
  text-align: center;
  &::not(::last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;

const StyledAppHeader = styled.h1<ErrorProps>`
  transition: all 500ms ease;
  transform: ${({ isError, theme }) =>
    isError && `translateY(${theme.spacing[5]})`};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ isError, theme }) =>
    isError ? theme.fontSize[4] : theme.fontSize[5]};
`;

const SpinningLoader = styled.div<ErrorProps>`
  visibility: ${({ isError }) => isError && "hidden"};
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }

  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: ${({ theme }) => `8px solid ${theme.color.secondary}`};
  border-top-color: transparent;
  animation: 1s infinite ease-in-out rotate;
`;

export default FullScreenLoadingScreen;
