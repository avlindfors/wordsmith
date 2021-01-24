import styled from "@emotion/styled";
import React from "react";

const RecentlyReversedSkeleton = () => {
  return (
    <StyledSkeletonContainer>
      <StyledHeader></StyledHeader>
      <StyledContent></StyledContent>
      <StyledContent></StyledContent>
    </StyledSkeletonContainer>
  );
};

const StyledSkeletonContainer = styled.div`
  background: ${({ theme }) => theme.color.lightCardBackground};
  padding: ${({ theme }) => theme.spacing[5]};
  margin-bottom: ${({ theme }) => theme.spacing[7]};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: auto;
  height: auto;
`;

const StyledSkeletonElement = styled.div`
  background: ${({ theme }) => theme.color.skeletonText};
  height: 30px;
  border-radius: inherit;
  &:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;

const StyledHeader = styled(StyledSkeletonElement)`
  width: 200px;
`;
const StyledContent = styled(StyledSkeletonElement)`
  width: 400px;
  max-width: 100%;
`;

export default RecentlyReversedSkeleton;
