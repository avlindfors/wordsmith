import { DateTime, ToRelativeOptions } from "luxon";

const RELATIVE_TIME_OPTIONS: ToRelativeOptions = {
  style: "long",
  locale: "en-us",
};

const DEFAULT_TIME = "Unknown";

function resolveRelativeDate(createdTs: string | undefined): string {
  if (createdTs === undefined) {
    return DEFAULT_TIME;
  }

  // Hack fix to prevent relative time to express times in the future
  const dateTime = DateTime.fromISO(createdTs).minus({ seconds: 1 });
  const relativeTime = dateTime.toRelative(RELATIVE_TIME_OPTIONS);
  if (relativeTime === null) {
    return createdTs;
  }

  return relativeTime;
}

export default resolveRelativeDate;
