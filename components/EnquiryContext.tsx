"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import EnquiryModal from "./EnquiryModal";

interface EnquiryContextType {
  openEnquiry: () => void;
  closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEnquiry = () => setIsOpen(true);
  const closeEnquiry = () => setIsOpen(false);

  return (
    <EnquiryContext.Provider value={{ openEnquiry, closeEnquiry }}>
      {children}
      <EnquiryModal isOpen={isOpen} onClose={closeEnquiry} />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within EnquiryProvider");
  }
  return context;
}