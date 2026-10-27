"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : previousOverflow;

    if (!isOpen) return () => {
      document.body.style.overflow = previousOverflow;
    };

    const widgetScript = document.createElement("script");
    widgetScript.type = "text/javascript";
    widgetScript.async = true;
    widgetScript.src = "https://ke9zpvp4xn.in4.widgets.nopaperforms.com/vemwgts.js";
    document.body.appendChild(widgetScript);

    return () => {
      document.body.style.overflow = previousOverflow;
      widgetScript.remove();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-3 pointer-events-none"
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-modal-title"
              onClick={(event) => event.stopPropagation()}
              className="pointer-events-auto w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="relative flex items-center justify-between border-b border-[#034ea2]/10 px-5 py-4">
                <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-[#a3123f]" />
                <div>
                  <h2 id="enquiry-modal-title" className="font-serif text-lg font-bold text-[#034ea2]">
                    Enquire Now
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-400">
                    We&apos;ll get back to you within 24 hours
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close enquiry form"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f9fc] transition-colors hover:bg-[#034ea2]/10"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-4 py-3">
                <div
                  className="npf_wgts w-full"
                  data-height="400px"
                  data-w="1044b64843af99283fc04912e7ad8bec"
                  style={{ minHeight: 400 }}
                />
              </div>
            </section>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
