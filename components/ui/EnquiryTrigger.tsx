import type { ReactNode } from "react";

export default function EnquiryTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <button type="button" data-open-enquiry className={className}>
      {children}
    </button>
  );
}
