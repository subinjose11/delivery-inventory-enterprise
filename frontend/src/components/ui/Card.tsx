import React from "react";
import { cn } from "../../lib/utils";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
