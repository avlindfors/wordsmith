import React from "react";
import styled from "@emotion/styled";

/**
 * Create a simple skeleton representation of a recent reversal;
 */
function RecentlyReversedSkeleton() {
  return (
    <StyledSkeletonContainer>
      <StyledHeader></StyledHeader>
      <StyledSkeletonElement></StyledSkeletonElement>
      <StyledSkeletonElement></StyledSkeletonElement>
    </StyledSkeletonContainer>
  );
};

const StyledSkeletonContainer = styled.div`
  background: ${({ theme }) => theme.color.lightCardBackground};
  padding: ${({ theme }) => theme.spacing[5]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 100%;
  height: auto;
`;

const StyledSkeletonElement = styled.div`
  background: ${({ theme }) => theme.color.skeletonText};
  width: 100%;
  height: 30px;
  border-radius: inherit;
  &:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;

const StyledHeader = styled(StyledSkeletonElement)`
  max-width: 200px;
`;

export default RecentlyReversedSkeleton;
