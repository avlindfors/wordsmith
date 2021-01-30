import React from "react";
import { ThemeProvider } from "@emotion/react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import ReverseForm from "..";
import { DataProvider } from "../../../providers/DataProvider";
import { theme } from "../../../style/theme";

const mockServer = setupServer(
  rest.post("/api/v1/reverse", (req, res, ctx) => {
    return res(ctx.status(500));
  })
);

beforeAll(() => mockServer.listen());

afterEach(() => mockServer.resetHandlers());

afterAll(() => mockServer.close());

function customRender() {
  return render(
    <ThemeProvider theme={theme}>
      <DataProvider>
        <ReverseForm />
      </DataProvider>
    </ThemeProvider>
  );
}

describe("ReverseForm", () => {
  test("can show an error message", async () => {
    const rendered = customRender();

    const inputField = rendered.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "Reverse me" } });

    const submitButton = rendered.getByRole("button");
    fireEvent.click(submitButton);

    const errorMessage = await rendered.findByText(
      "Could not connect to server. Try again later"
    );
    expect(errorMessage).toBeVisible();
  });

  test("disables submit button when input is empty", () => {
    const rendered = customRender();

    const inputField = rendered.getByRole("textbox");
    expect(inputField).toHaveValue("");

    const submitButton = rendered.getByRole("button");
    expect(submitButton).toBeDisabled();
  });

  test("enables submit button when input is not empty", () => {
    const rendered = customRender();

    const inputField = rendered.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "Reverse this text!" } });
    expect(inputField).toHaveValue("Reverse this text!");

    const submitButton = rendered.getByRole("button");
    expect(submitButton).toBeEnabled();
  });

  test("shows the number of entered characters", () => {
    const rendered = customRender();

    var charCounter = rendered.getByText("0 / 200");
    waitFor(() => expect(charCounter).toHaveValue("0 / 200"));

    const inputField = rendered.getByRole("textbox");
    const textToReverse = "Count these characters!";
    fireEvent.change(inputField, { target: { value: textToReverse } });

    const expectedNumberOfChars = textToReverse.length;
    charCounter = rendered.getByText(`${expectedNumberOfChars} / 200`);
    waitFor(() => expect(charCounter).toBeDefined());
  });
});
