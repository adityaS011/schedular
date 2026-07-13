import type { RedialInterval } from "./types";

export const REDIAL_COUNT_PENALTY: Record<number, number> = {
  0: -100,
  1: -90,
  2: -55,
  3: -31,
  4: -13,
  5: 0,
  6: 0,
  7: 0,
  8: -19,
  9: -43,
  10: -76,
};

export const REDIAL_INTERVAL_PENALTY: Record<RedialInterval, number> = {
  3: 0,
  6: 0,
  9: -12,
  12: -22,
  24: -34,
};

export const DAYS_PENALTY: Record<number, number> = {
  1: -40,
  2: -30,
  3: -20,
  4: -10,
  5: 0,
  6: 0,
  7: 0,
};

export const WINDOW_PENALTY: Record<number, number> = {
  3: -33,
  4: -26,
  5: -20,
  6: -13,
  7: -7,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
};
