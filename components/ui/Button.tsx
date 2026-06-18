import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...props }, ref) => {
    const base =
      variant === "primary"
        ? "btn-primary"
        : variant === "danger"
          ? "rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          : "btn-secondary";
    return (
      <button ref={ref} className={`${base} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
