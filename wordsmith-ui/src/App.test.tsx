import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { DataProvider } from "./providers/DataProvider";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@emotion/react";

function customRender({ children }: any) {
  return render(
    <ThemeProvider theme={theme}>
      <DataProvider>{children}</DataProvider>
    </ThemeProvider>
  );
}

test("app is showing loader", () => {
  const { getByTestId } = customRender(<App />);
  expect(getByTestId("loading-title")).toBeDefined();
});

test("app is rendered", () => {
  var render = customRender(<App />);

  const headerElement = render.findByTestId("site-title");
  expect(headerElement).toBeDefined();
});
