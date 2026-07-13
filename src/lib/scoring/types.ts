export enum CallingDay {
  Monday = "Mon",
  Tuesday = "Tue",
  Wednesday = "Wed",
  Thursday = "Thu",
  Friday = "Fri",
  Saturday = "Sat",
  Sunday = "Sun",
}

export interface CallingWindow  {
  start: number;
  end: number;
}

export type RedialInterval = 3 | 6 | 9 | 12 | 24;

export type WeatherLevelType = 1 | 2 | 3 | 4;

export interface ScoreResult {
  score: number;
  redialPenalty: number;
  intervalPenalty: number;
  daysPenalty: number;
  windowPenalty: number;
  weatherLevel: WeatherLevelType;
}

// The four inputs the UI collects — the input half of the scoring contract.
export interface GuardrailState {
  redialCount: number;
  redialInterval: RedialInterval;
  callingWindow: CallingWindow;
  callingDays: CallingDay[];
}