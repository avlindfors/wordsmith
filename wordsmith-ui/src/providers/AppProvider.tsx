import React from "react";
import { Global, ThemeProvider } from "@emotion/react";

import { globalStyles } from "../style/globalStyles";
import { theme } from "../style/theme";
import { DataProvider } from "./DataProvider";

/**
 * Wraps the app to provide required context.
 */
function AppProvider({ children }: any) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <DataProvider>{children}</DataProvider>
    </ThemeProvider>
  );
}

export default AppProvider;
