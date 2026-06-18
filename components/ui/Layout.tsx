import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn("max-w-7xl mx-auto px-6 w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  padding?: "none" | "small" | "medium" | "large" | "hero";
}

export const Section: React.FC<SectionProps> = ({
  className,
  containerClassName,
  children,
  padding = "medium",
  ...props
}) => {
  const paddings = {
    none: "py-0",
    small: "py-8 md:py-12",
    medium: "py-16 md:py-24",
    large: "py-24 md:py-32",
    hero: "py-24 md:py-32 lg:py-40",
  };

  return (
    <section
      className={cn("relative overflow-hidden", paddings[padding], className)}
      {...props}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
};
