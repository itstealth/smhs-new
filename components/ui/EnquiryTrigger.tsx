"use client";

import type { ReactNode } from "react";
import { useEnquiry } from "@/components/EnquiryContext";

export default function EnquiryTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const { openEnquiry } = useEnquiry();

  return (
    <button type="button" onClick={openEnquiry} className={className}>
      {children}
    </button>
  );
}
