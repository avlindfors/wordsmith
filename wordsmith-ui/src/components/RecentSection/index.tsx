import * as React from "react";
import styled from "@emotion/styled";
import { useApi } from "../../providers/ApiProvider";
import EmptyRecentlyReversed from "../EmptyRecentlyReversed";
import RecentlyReversed from "../RecentlyReversed";

const RecentSection = () => {
  const { recentlyReversedText } = useApi();
  return (
    <StyledSectionContainer>
      <StyledSectionHeader>Recently reversed</StyledSectionHeader>
      {recentlyReversedText.length < 1 ? (
        <EmptyRecentlyReversed />
      ) : (
        <RecentlyReversed />
      )}
    </StyledSectionContainer>
  );
};

const StyledSectionHeader = styled.h1`
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize[5]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const StyledSectionContainer = styled.div`
  background: ${({ theme }) => theme.color.background.dark};
  padding: ${({ theme }) => theme.spacing[8]};
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default RecentSection;
