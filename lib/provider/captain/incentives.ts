export type CaptainIncentives = {
  dailyTargetJobs: number;
  completedToday: number;
  dailyBonusPaise: number;
  dailyProgressPct: number;
  peakHourActive: boolean;
  peakHourLabel: string;
  streakDays: number;
  weeklyBonusPaise: number;
};

export type CaptainBonus = {
  id: string;
  title: string;
  description: string;
  amountPaise: number;
  status: "active" | "locked" | "earned";
  progressPct?: number;
};

const DAILY_TARGET = 5;
const DAILY_BONUS_PAISE = 20_000;
const WEEKLY_BONUS_PAISE = 75_000;

export function buildCaptainIncentives(completedToday: number, acceptanceRate: number): CaptainIncentives {
  const hour = new Date().getHours();
  const peakHourActive = (hour >= 8 && hour <= 11) || (hour >= 17 && hour <= 21);
  const peakHourLabel = peakHourActive
    ? hour >= 17
      ? "Evening peak · 1.2× fare"
      : "Morning peak · 1.15× fare"
    : "Off-peak rates";

  const streakDays = Math.min(7, Math.max(1, Math.floor(acceptanceRate / 15)));

  return {
    dailyTargetJobs: DAILY_TARGET,
    completedToday,
    dailyBonusPaise: DAILY_BONUS_PAISE,
    dailyProgressPct: Math.min(100, Math.round((completedToday / DAILY_TARGET) * 100)),
    peakHourActive,
    peakHourLabel,
    streakDays,
    weeklyBonusPaise: WEEKLY_BONUS_PAISE,
  };
}

export function buildCaptainBonuses(completedToday: number, acceptanceRate: number): CaptainBonus[] {
  const dailyProgress = Math.min(100, Math.round((completedToday / DAILY_TARGET) * 100));

  return [
    {
      id: "daily-five",
      title: "Daily 5",
      description: `Complete ${DAILY_TARGET} jobs today`,
      amountPaise: DAILY_BONUS_PAISE,
      status: completedToday >= DAILY_TARGET ? "earned" : "active",
      progressPct: dailyProgress,
    },
    {
      id: "acceptance",
      title: "90% accept club",
      description: "Keep acceptance above 90%",
      amountPaise: 10_000,
      status: acceptanceRate >= 90 ? "earned" : acceptanceRate >= 75 ? "active" : "locked",
      progressPct: Math.min(100, Math.round(acceptanceRate)),
    },
    {
      id: "peak-hour",
      title: "Peak hour hero",
      description: "3 jobs during peak hours",
      amountPaise: 15_000,
      status: completedToday >= 3 ? "active" : "locked",
      progressPct: Math.min(100, Math.round((completedToday / 3) * 100)),
    },
  ];
}
