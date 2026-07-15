import {
  DAYS_PENALTY,
  REDIAL_COUNT_PENALTY,
  REDIAL_INTERVAL_PENALTY,
  WINDOW_PENALTY,
} from './data';
import { GuardrailState, ScoreResult, WeatherLevelType } from './types';

export * from './types';
export * from './data';

const getLevel = (score: number): WeatherLevelType => {
  if (score >= 82) return 1;
  if (score >= 62) return 2;
  if (score >= 42) return 3;
  return 4;
};

export const scoreGuardrails = ({
  redialCount,
  redialInterval,
  callingWindow,
  callingDays,
}: GuardrailState): ScoreResult => {
  const redialPenalty = REDIAL_COUNT_PENALTY[redialCount] ?? 0;
  const intervalPenalty = REDIAL_INTERVAL_PENALTY[redialInterval];
  const windowPenalty =
    WINDOW_PENALTY[callingWindow.end - callingWindow.start] ?? 0;
  const daysPenalty = DAYS_PENALTY[callingDays.length] ?? 0;

  // score = 100 + redial penalty + interval penalty + days penalty + window penalty     (floored at 0)
  const score = Math.max(
    0,
    100 + redialPenalty + intervalPenalty + daysPenalty + windowPenalty,
  );

  const weatherLevel = getLevel(score);

  return {
    score,
    redialPenalty,
    intervalPenalty,
    daysPenalty,
    windowPenalty,
    weatherLevel,
  };
};
