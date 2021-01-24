import React from "react";
import styled from "@emotion/styled";

function Layout({ children }: any) {
  return <AppContainer>{children}</AppContainer>;
}

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: 100vh;

  // TODO: lägg till @media
  grid-template-columns: 2fr 1fr;
`;

export default Layout;
