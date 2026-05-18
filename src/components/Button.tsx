import React from "react";
import { cn } from "@/src/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary-container text-on-primary-container shadow-primary-glow hover:opacity-90 active:scale-[0.98]",
      secondary: "bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
      ghost: "bg-transparent text-on-surface-variant hover:bg-surface-container-low transition-colors",
      outline: "bg-transparent border-2 border-outline-variant text-on-surface-variant hover:bg-surface-container-low",
      danger: "bg-error-container text-on-error-container hover:bg-error-container/80 transition-colors",
    };

    const sizes = {
      sm: "h-10 px-4 text-xs font-bold uppercase tracking-wider",
      md: "h-12 px-6 text-sm font-bold uppercase tracking-wider",
      lg: "h-14 px-5 text-base font-bold",
      xl: "h-14 px-8 text-lg font-bold leading-normal",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-primary/50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
