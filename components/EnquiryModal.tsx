"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputCls = "w-full px-3 py-2 bg-[#f8f9fc]/40 border border-[#034ea2]/10 rounded-lg text-gray-800 text-sm outline-none focus:border-[#034ea2] focus:bg-white transition-all";
const labelCls = "block text-[9px] uppercase tracking-[0.2em] text-[#a3123f] font-semibold mb-1";

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    studentName: "", parentName: "", phone: "", grade: "", gender: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ studentName: "", parentName: "", phone: "", grade: "", gender: "", message: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-3 pointer-events-none"
          >
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[92vh] overflow-y-auto pointer-events-auto shadow-2xl">
              {submitted ? (
                <div className="p-10 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#f8f9fc] flex items-center justify-center text-2xl">✅</div>
                  <h3 className="font-serif text-2xl font-bold text-[#034ea2] mb-2">Thank You!</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Our admissions team will reach out to you within 24 hours.</p>
                  <button onClick={handleClose} className="mt-5 px-6 py-2.5 bg-[#034ea2] text-white text-sm font-semibold rounded-lg hover:bg-[#a3123f] transition-colors">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="relative px-5 pt-5 pb-4 border-b border-[#034ea2]/10">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a3123f] via-[#a3123f] to-[#a3123f] rounded-t-2xl" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-serif text-lg font-bold text-[#034ea2]">Enquire Now</h2>
                        <p className="text-gray-400 text-xs mt-0.5">We&apos;ll get back to you within 24 hours</p>
                      </div>
                      <button onClick={handleClose} className="w-8 h-8 rounded-full bg-[#f8f9fc] hover:bg-[#034ea2]/10 flex items-center justify-center transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="px-5 py-4">
                    <div className="space-y-3">

                      {/* Row 1: Student + Parent */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Student Name *</label>
                          <input type="text" required value={formData.studentName}
                            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                            className={inputCls} placeholder="Student's name" />
                        </div>
                        <div>
                          <label className={labelCls}>Parent Name *</label>
                          <input type="text" required value={formData.parentName}
                            onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                            className={inputCls} placeholder="Parent's name" />
                        </div>
                      </div>

                      {/* Row 2: Phone + Grade */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Phone Number *</label>
                          <input type="tel" required value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={inputCls} placeholder="Contact number" />
                        </div>
                        <div>
                          <label className={labelCls}>Applying for Grade *</label>
                          <select required value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            className={`${inputCls} appearance-none cursor-pointer`}>
                            <option value="" disabled>Select grade</option>
                            {["Play Group","LKG","UKG","Prep","Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 11"].map((g) => (
                              <option key={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Gender */}
                      <div>
                        <label className={labelCls}>Gender</label>
                        <div className="flex gap-2">
                          {["Male", "Female", "Others"].map((g) => (
                            <label key={g} className={`flex items-center gap-1.5 cursor-pointer px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                              formData.gender === g ? "border-[#034ea2] bg-[#034ea2]/5 text-[#034ea2]" : "border-[#034ea2]/10 text-gray-500 hover:border-[#034ea2]/30"
                            }`}>
                              <input type="radio" name="gender" value={g} checked={formData.gender === g}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="sr-only" />
                              {g}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className={labelCls}>Message</label>
                        <textarea rows={2} value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={`${inputCls} resize-none`}
                          placeholder="Any specific enquiry or message..." />
                      </div>
                    </div>

                    <button type="submit"
                      className="w-full mt-4 py-3 bg-[#034ea2] text-white font-semibold rounded-lg hover:bg-[#a3123f] transition-colors duration-300 text-sm tracking-wide flex items-center justify-center gap-2 group">
                      Submit Enquiry
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        className="group-hover:translate-x-1 transition-transform">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>

                    <p className="text-gray-400 text-[11px] mt-3 text-center">
                      Your information will be kept confidential.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
