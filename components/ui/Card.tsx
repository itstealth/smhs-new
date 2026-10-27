import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  variant?: "white" | "primary" | "slate" | "crimson";
  padding?: "none" | "small" | "medium" | "large";
  withHover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = "white",
  padding = "medium",
  withHover = false,
  ...props
}) => {
  const baseClasses = "rounded-premium border border-neutral-bg/50 shadow-premium transition-all duration-500 overflow-hidden";
  
  const variants = {
    white: "bg-white",
    primary: "bg-primary text-white border-primary/10",
    crimson: "bg-secondary text-white border-secondary/10",
    slate: "bg-slate-50 border-slate-100",
  };

  const paddings = {
    none: "p-0",
    small: "p-4 md:p-6",
    medium: "p-8 md:p-12",
    large: "p-12 md:p-16",
  };

  const hoverClasses = withHover ? "hover:shadow-premium-hover hover:-translate-y-1" : "";

  return (
    <div
      className={cn(baseClasses, variants[variant], paddings[padding], hoverClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={cn("bg-primary p-6 flex items-center gap-4", className)}>
    {children}
  </div>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={cn("p-8 md:p-12", className)}>
    {children}
  </div>
);
