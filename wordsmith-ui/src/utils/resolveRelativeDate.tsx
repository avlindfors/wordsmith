import { DateTime, ToRelativeOptions } from "luxon";

const RELATIVE_TIME_OPTIONS: ToRelativeOptions = {
  style: "long",
  locale: "en-us",
  padding: 1000,
};

function resolveRelativeDate(createdTs: string): string {
  const dateTime = DateTime.fromISO(createdTs);
  const relativeTime = dateTime.toRelative(RELATIVE_TIME_OPTIONS);
  if (relativeTime === null) {
    return createdTs;
  }

  return relativeTime;
}

export default resolveRelativeDate;
