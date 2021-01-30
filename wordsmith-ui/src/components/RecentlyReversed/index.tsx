import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import { useData } from "../../providers/DataProvider";
import resolveRelativeDate from "../../utils/resolveRelativeDate";
import { ReactComponent as ClockIcon } from "../../icons/clock.svg";
import { ReactComponent as ForwardIcon } from "../../icons/rotate_right.svg";
import { ReactComponent as BackwardIcon } from "../../icons/rotate_left.svg";
import { breakpoints } from "../../style/breakpoints";
import EmptyRecentlyReversed from "../EmptyRecentlyReversed";

export interface RecentlyReversedProps {}

/**
 * Renders a list of most recent reversals.
 */
function RecentlyReversed() {
  const { recentlyReversed } = useData();

  // Make sure we only render 5 elements
  const filteredRecentlyReversed = [...recentlyReversed].slice(0, 5);
  return (
    <StyledContainer>
      <ul>
        {filteredRecentlyReversed.length < 1 ? (
          <EmptyRecentlyReversed />
        ) : (
          filteredRecentlyReversed.map(
            ({ id, originalText, reversedText, createdTs }) => {
              return (
                <StyledRecentlyReversedTextContainer key={id}>
                  <StyledIconAndTextWrapper>
                    <StyledForwardIcon />
                    <StyledRecentlyReversedText>
                      {originalText}
                    </StyledRecentlyReversedText>
                  </StyledIconAndTextWrapper>

                  <StyledIconAndTextWrapper>
                    <StyledBackwardIcon />
                    <StyledRecentlyReversedText>
                      {reversedText}
                    </StyledRecentlyReversedText>
                  </StyledIconAndTextWrapper>

                  <StyledIconAndTextWrapper>
                    <StyledClockIcon />
                    <StyledRecentlyReversedCreatedTime>
                      {resolveRelativeDate(createdTs)}
                    </StyledRecentlyReversedCreatedTime>
                  </StyledIconAndTextWrapper>
                </StyledRecentlyReversedTextContainer>
              );
            }
          )
        )}
      </ul>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledRecentlyReversedTextContainer = styled.li`
  list-style-type:none;
  background: ${({ theme }) => theme.color.lightCardBackground};
  padding: ${({ theme }) => theme.spacing[4]};
  padding-top: ${({ theme }) => theme.spacing[3]};
  padding-bottom: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: auto;
  height: auto;

  position: relative;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    width: 6px;
    background: ${({ theme }) => theme.color.secondary};
    border-radius: ${({ theme }) => theme.borderRadius};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[5]};
    padding-top: ${({ theme }) => theme.spacing[4]};
    padding-bottom: ${({ theme }) => theme.spacing[4]};
    margin-bottom: ${({ theme }) => theme.spacing[5]};
  }
`;

const StyledRecentlyReversedText = styled.p`
  color: ${({ theme }) => theme.color.text.light};
  font-size: ${({ theme }) => theme.fontSize[3]};
  grid-column: 2;
  text-align: left;
`;

const StyledRecentlyReversedCreatedTime = styled(StyledRecentlyReversedText)`
  font-size: ${({ theme }) => theme.fontSize[2]};
`;

const StyledIconAndTextWrapper = styled.span`
  display: grid;
  grid-template-columns: min-content auto;

  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;

interface SharedProps {
  theme: Theme;
}

const sharedIconStyles = ({ theme }: SharedProps) => css`
  margin-right: ${theme.spacing[2]};
  align-self: flex-start;
  width: 24px;
  height: 24px;
  grid-column: 1;
  path {
    fill: ${theme.color.secondary};
    fill-opacity: 1;
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    margin-right: ${theme.spacing[4]};
  }
`;

const StyledClockIcon = styled(ClockIcon)`
  ${sharedIconStyles}
  width: 22px;
  height: 22px;
`;

const StyledForwardIcon = styled(ForwardIcon)`
  ${sharedIconStyles}
`;

const StyledBackwardIcon = styled(BackwardIcon)`
  ${sharedIconStyles};
`;

export default RecentlyReversed;
