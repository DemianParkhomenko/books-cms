export const MILLISECOND = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: Math.round(30.44 * 24 * 60 * 60 * 1000),
  YEAR: 365 * 24 * 60 * 60 * 1000,
  MAX: Date.UTC(9999, 11, 31),
};
