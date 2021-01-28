import React from 'react';
import resolveRelativeDate from '../resolveRelativeDate';
import { DateTime } from 'luxon';

test('can get relative date format with just now', () => {
  const datetime = DateTime.local().toISO();
  const relativeTime = resolveRelativeDate(datetime);
  expect(relativeTime).toEqual("1 second ago");
});


test('can get relative date format with hours', () => {
  const datetime = DateTime.local().minus({hours: 12}).toISO();
  const relativeTime = resolveRelativeDate(datetime);
  expect(relativeTime).toEqual("12 hours ago");
});

test('can get relative date format with logical month', () => {
  const datetime = DateTime.local().minus({days: 35}).toISO();
  const relativeTime = resolveRelativeDate(datetime);
  expect(relativeTime).toEqual("1 month ago");
});
