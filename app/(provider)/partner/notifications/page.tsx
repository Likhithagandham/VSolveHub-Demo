import { NotificationsScreen } from "@/components/notifications/NotificationsScreen";

export const metadata = {
  title: "Notifications — Partner",
};

export default function PartnerNotificationsPage() {
  return (
    <NotificationsScreen
      audience="provider"
      backHref="/partner/dashboard"
      backLabel="Dashboard"
    />
  );
}
