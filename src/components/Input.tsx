import React from "react";
import { cn } from "@/src/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-2">
        {label && <p className="text-on-surface text-sm font-semibold leading-normal">{label}</p>}
        <div className="relative group flex items-stretch">
          {leftIcon && (
            <div className="flex items-center justify-center bg-surface-container-lowest border border-outline-variant rounded-l-xl px-4 border-r-0 text-outline group-focus-within:text-primary transition-colors">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "form-input flex w-full min-w-0 flex-1 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 border border-outline-variant bg-surface-container-lowest h-14 placeholder:text-outline/60 p-4 transition-all",
              leftIcon ? "rounded-r-xl" : "rounded-xl",
              error ? "border-error focus:ring-error/50" : "focus:border-primary",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-error text-xs font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
