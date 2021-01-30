import React from "react";
import { render } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";

import App from "./App";
import AppProvider from "./providers/AppProvider";

const server = setupServer(
  rest.get("/api/v1/reversals", (req, res, ctx) => {
    return res(
      ctx.json({
        recentReversals: [
          {
            id: "f3fb8336-2cf6-4596-b2bc-552afb246789",
            originalText: "and another one!",
            reversedText: "dna rehtona eno!",
            createdTs: "2021-01-28T21:20:07.373Z",
          },
          {
            id: "cf13b360-9420-49af-9795-c7f26e377910",
            originalText: "test",
            reversedText: "tset",
            createdTs: "2021-01-28T21:20:03.601Z",
          },
          {
            id: "795e037d-17dc-4d9b-bb85-6c2ca02c48bb",
            originalText: "COuld this be working?",
            reversedText: "dluOC siht eb gnikrow?",
            createdTs: "2021-01-28T20:02:21.912Z",
          },
          {
            id: "6b9d6482-a0c7-4d76-9fbe-62688a162433",
            originalText: "test",
            reversedText: "tset",
            createdTs: "2021-01-28T20:01:20.920Z",
          },
          {
            id: "bcc762cf-c31f-42c4-81cd-be24d98a320f",
            originalText: "new entry 123",
            reversedText: "wen yrtne 321",
            createdTs: "2021-01-28T19:59:46.666Z",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("app can render", async () => {
  const rendered = render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  await rendered.findByText("Wordsmith Inc.");
});
