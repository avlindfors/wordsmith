import React from "react";
import styled from "@emotion/styled";
import { useData } from "../../providers/DataProvider";
import EmptyRecentlyReversed from "../EmptyRecentlyReversed";
import RecentlyReversed from "../RecentlyReversed";
import { breakpoints } from "../../styles/breakpoints";

const RecentSection = () => {
  const { recentlyReversed } = useData();

  return (
    <StyledSectionContainer>
      <StyledSectionHeader>Recently reversed</StyledSectionHeader>
      {recentlyReversed.length < 1 ? (
        <EmptyRecentlyReversed />
      ) : (
        <RecentlyReversed />
      )}
    </StyledSectionContainer>
  );
};

const StyledSectionHeader = styled.h1`
  color: ${({ theme }) => theme.color.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize[4]};
  @media screen and (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize[5]};
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
`;

const StyledSectionContainer = styled.div`
  background: ${({ theme }) => theme.color.background.dark};
  padding-top: ${({ theme }) => theme.spacing[7]};
  grid-column: 2;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.lg}) {
    align-items: center;
  }
`;

export default RecentSection;
