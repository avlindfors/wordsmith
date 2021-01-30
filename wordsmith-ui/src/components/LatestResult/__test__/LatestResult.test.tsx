import React from "react";
import { render } from "@testing-library/react";
import { DateTime } from "luxon";

import LatestResult from "..";
import AppProvider from "../../../providers/AppProvider";
import { DataContext } from "../../../providers/DataProvider";

function renderWithContext(context: any = {}) {
  return render(
    <AppProvider>
      <DataContext.Provider value={context}>
        <LatestResult />
      </DataContext.Provider>
    </AppProvider>
  );
}

describe("LatestResult", () => {
  test("shows a placeholder if no reversal has been made", () => {
    const rendered = renderWithContext();

    const reversedText = rendered.getByText(
      "Use the form above to reverse some text"
    );
    expect(reversedText).toBeVisible();
  });

  test("shows most recent reversal", () => {
    const expectedReversedText = "sihT txet sah ydaerla neeb desrever";
    const rendered = renderWithContext({
      reverseResult: {
        originalText: "This text has already been reversed",
        reversedText: expectedReversedText,
        createdTs: DateTime.local().toISO(),
        id: "id-1",
      },
    });

    const reversedText = rendered.getByText(expectedReversedText);
    expect(reversedText).toBeVisible();
  });
});
