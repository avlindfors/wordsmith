import React from "react";
import styled from "@emotion/styled";

import RecentlyReversedSkeleton from "../RecentlyReversedSkeleton";

/**
 * Render an empty state for recently reversed text.
 */
function EmptyRecentlyReversed() {
  return (
    <StyledEmptyContainer>
      <RecentlyReversedSkeleton />
      <StyledEmptyHeader>Looks empty</StyledEmptyHeader>
      <StyledEmptyText>
        Use the form to reverse some text and you will see a history of
        reversals here
      </StyledEmptyText>
    </StyledEmptyContainer>
  );
};

const StyledEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({theme}) => theme.spacing[7]};
`;

const StyledEmptyHeader = styled.h4`
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize[3]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const StyledEmptyText = styled.p`
  color: ${({ theme }) => theme.color.secondary};
  line-height: 1.5em;
  text-align: center;
`;

export default EmptyRecentlyReversed;
