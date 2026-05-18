import React from "react";
import { cn } from "@/src/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-2">
        {label && <p className="text-on-surface text-sm font-semibold leading-normal">{label}</p>}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "appearance-none w-full rounded-xl border border-outline-variant bg-surface-container-lowest h-14 pl-4 pr-10 text-on-surface focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all cursor-pointer",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-outline">
            <ChevronDown size={20} />
          </div>
        </div>
        {error && <p className="text-error text-xs font-medium">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
