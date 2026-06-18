import { TextareaHTMLAttributes, forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`input min-h-[100px] resize-y ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
