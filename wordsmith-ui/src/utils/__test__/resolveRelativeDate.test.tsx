import React from "react";
import resolveRelativeDate from "../resolveRelativeDate";
import { DateTime } from "luxon";

describe("resolveRelativeDate", () => {
  test("can resolve bad input", () => {
    const relativeTime = resolveRelativeDate(undefined);
    expect(relativeTime).toEqual("Unknown");
  });

  test("can resolve from just now", () => {
    const relativeTime = resolveRelativeDate(DateTime.local().toISO());
    expect(relativeTime).toEqual("1 second ago");
  });

  test("can resolve from hours ago", () => {
    const datetime = DateTime.local().minus({ hours: 12 }).toISO();
    const relativeTime = resolveRelativeDate(datetime);
    expect(relativeTime).toEqual("12 hours ago");
  });

  test("can resolve from months ago", () => {
    const datetime = DateTime.local().minus({ days: 35 }).toISO();
    const relativeTime = resolveRelativeDate(datetime);
    expect(relativeTime).toEqual("1 month ago");
  });
});
