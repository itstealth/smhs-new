import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  variant = "h1",
  className,
  children,
  ...props
}) => {
  const baseClasses = "font-extrabold tracking-tight text-primary";
  
  const variants = {
    h1: "text-4xl md:text-6xl lg:text-7xl leading-tight",
    h2: "text-3xl md:text-4xl lg:text-5xl leading-tight",
    h3: "text-2xl md:text-3xl leading-snug",
    h4: "text-xl md:text-2xl font-bold",
  };

  const Component = variant;

  return (
    <Component
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "small" | "muted" | "lead";
  className?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = "body",
  className,
  children,
  ...props
}) => {
  const baseClasses = "leading-relaxed transition-colors";
  
  const variants = {
    lead: "text-lg md:text-xl text-primary/80 font-light",
    body: "text-base text-slate-700 font-medium",
    small: "text-sm text-slate-600",
    muted: "text-sm text-slate-500 italic",
  };

  return (
    <p
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </p>
  );
};
