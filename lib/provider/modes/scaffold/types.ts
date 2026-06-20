export type DemoStat = {
  label: string;
  value: string;
};

export type DemoRow = {
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: string;
  amount?: string;
};

export type DemoSection = {
  title: string;
  description?: string;
  rows: DemoRow[];
};

export type ScaffoldPageData = {
  stats?: DemoStat[];
  sections: DemoSection[];
};

export type ScaffoldPageKey =
  | "dashboard"
  | "leads"
  | "work"
  | "workDetail"
  | "calendar"
  | "earnings"
  | "profile";
