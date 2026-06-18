import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "info";
};

const variants = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  info: "bg-blue-100 text-blue-800",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
