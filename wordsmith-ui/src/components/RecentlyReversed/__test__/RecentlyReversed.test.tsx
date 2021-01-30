import React from "react";
import { render } from "@testing-library/react";
import { DateTime } from "luxon";

import RecentlyReversed from "..";
import AppProvider from "../../../providers/AppProvider";
import { DataContext, ReversedText } from "../../../providers/DataProvider";

function renderWithContext(context: ReversedText[] = []) {
  return render(
    <AppProvider>
      <DataContext.Provider value={{ recentlyReversed: context }}>
        <RecentlyReversed />
      </DataContext.Provider>
    </AppProvider>
  );
}

describe("RecentlyReversed", () => {
  test("shows empty state if no reversals are found", () => {
    const rendered = renderWithContext();

    const emptyHeader = rendered.getByText("Looks empty");
    expect(emptyHeader).toBeVisible();
  });

  test("can show recent reversals", () => {
    // We mock contents of the Dataprovider-context
    const rendered = renderWithContext(createReversals(1));

    const emptyHeader = rendered.queryByText("Looks empty");
    expect(emptyHeader).toBeNull();

    const renderedReversals = rendered.getAllByText("test");
    expect(renderedReversals).toHaveLength(1);
  });

  test("always shows only 5 most recent reversals", () => {
    // We mock contents of the Dataprovider-context
    const rendered = renderWithContext(createReversals(10));

    const emptyHeader = rendered.queryByText("Looks empty");
    expect(emptyHeader).toBeNull();

    const renderedReversals = rendered.getAllByText("test");
    expect(renderedReversals).toHaveLength(5);
  });
});

function createReversals(numberOfReversals: number): ReversedText[] {
  const arrayOfReversals = [];
  for (let i = 0; i < numberOfReversals; i++) {
    arrayOfReversals.push({
      originalText: "test",
      reversedText: "tset",
      createdTs: DateTime.local().toISO(),
      id: "id-" + i,
    });
  }
  return arrayOfReversals;
}
