export type BookingStatus = {
  code: string;
  label: string;
  description?: string;
};

export type BookingFlow = {
  code: string;
  name: string;
  mechanic: "push-dispatch" | "inbox-pull";
  formComponent: string;
  fields: string[];
  statuses: BookingStatus[];
  isEnquiry: boolean;
};
