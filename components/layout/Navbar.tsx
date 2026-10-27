"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, X, Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "About", href: "/about", dropdown: [
      { name: "About Seedling", href: "/about" },
      { name: "Leadership", href: "/about/leadership" },
    ]
  },
  {
    name: "Academics", href: "/curriculum", dropdown: [
      { name: "Curriculum", href: "/curriculum" },
      // { name: "Result", href: "/result" },
      { name: "Learning Support", href: "/learning-support" },
    ]
  },
  { name: "School Life", href: "/school-life", dropdown: [{ name: "School Life", href: "/school-life" }, { name: "Sports", href: "/sports" },] },
  { name: "News & Events", href: "/news-and-events" },
  { name: "Admissions", href: "/admissions", dropdown: [{ name: "Admissions", href: "/admissions" }, { name: "Apply & Pay Online", href: "/admissions/apply" }, { name: "Transport Facility", href: "/transport-facility" }] },
  { name: "Career", href: "/career" },
  { name: "Alumni", href: "/alumni" },
  { name: "Contact", href: "/contact-us" },
];

const announcements = [
  "Admissions open for 2026–27 Academic Session",
  "Scholarship available for meritorious students in Academics & Sports",
  "Parent counselling available online & offline",
  "Seedling wins State-level inter-school debate championship",
];

const schools = [
  "Seedling Modern High School (CBSE), Durgapura, Jaipur",
];

function InquiryPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    candidateName: "",
    className: "",
    parentName: "",
    email: "",
    phone: "",
    school: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Reset form and errors when popup closes
  useEffect(() => {
    if (!isOpen) {
      setFormErrors({});
    }
  }, [isOpen]);

  const handleFormChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    const phoneVal = formData.phone;
    if (!phoneVal) {
      errors.phone = 'Mobile number is required';
    } else if (phoneVal.length !== 10) {
      errors.phone = 'Enter 10-digit mobile number';
    } else if (!/^[6-9]/.test(phoneVal)) {
      errors.phone = 'Must start with 6, 7, 8, or 9';
    }
    if (!formData.parentName.trim()) {
      errors.parentName = 'Parent name is required';
    }
    if (!formData.candidateName.trim()) {
      errors.candidateName = 'Student name is required';
    }
    if (!formData.className) {
      errors.className = 'Please select a grade';
    }
    if (!formData.school) {
      errors.school = 'Please select gender';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please enter a message';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setSubmitting(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbxQxDh9kDCYD-SWIS_JIXYGtSf3F9Id8lESGKrqT9GJ4NT9fuqh63Gu1BW6lhYITjMR/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: formData.candidateName,
          class_name: formData.className,
          parent_name: formData.parentName,
          email: formData.email,
          phone: formData.phone,
          student_name: formData.candidateName,
          school: formData.school,
          message: formData.message,
        }),
      });
      window.location.href = '/thank-you';
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-navy-deeper/75 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[210] w-[calc(100%-2rem)] max-w-[400px] [translate:-50%_-50%] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            <div className="relative px-8 pt-8 pb-3">
              <h3 className="font-playfair text-3xl font-semibold text-center text-navy-deeper tracking-tight">Enquiry Form</h3>
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-navy-deeper/80 text-navy-deeper hover:bg-navy-deeper hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-8">
              {submitted ? (
                <div className="text-center py-10">
                  <h3 className="font-playfair text-3xl font-semibold text-navy-deeper mb-3">Thank You!</h3>
                  <p className="text-text-light font-dm mb-7 leading-relaxed">Your admission inquiry has been submitted. Our team will contact you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ candidateName: "", className: "", parentName: "", email: "", phone: "", school: "", message: "" }); }}
                    className="w-full h-11 bg-navy-deeper text-white border border-crimson rounded font-playfair font-black text-base uppercase hover:bg-navy transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Parent's Name *"
                      value={formData.parentName}
                      onChange={handleFormChange("parentName")}
                      className="h-11 w-full rounded border border-[#cfcfcf] bg-white px-3 font-playfair text-base text-text-base placeholder:text-[#8c8c8c] focus:outline-none focus:border-navy"
                    />
                    {formErrors.parentName && <p className="text-crimson text-xs mt-1 pl-1">{formErrors.parentName}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Student Name *"
                      value={formData.candidateName}
                      onChange={handleFormChange("candidateName")}
                      className="h-11 w-full rounded border border-[#cfcfcf] bg-white px-3 font-playfair text-base text-text-base placeholder:text-[#8c8c8c] focus:outline-none focus:border-navy"
                    />
                    {formErrors.candidateName && <p className="text-crimson text-xs mt-1 pl-1">{formErrors.candidateName}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number *"
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData(prev => ({ ...prev, phone: val }));
                        if (formErrors.phone) setFormErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      className="h-11 w-full rounded border border-[#cfcfcf] bg-white px-3 font-playfair text-base text-text-base placeholder:text-[#8c8c8c] focus:outline-none focus:border-navy"
                    />
                    {formErrors.phone && <p className="text-crimson text-xs mt-1 pl-1">{formErrors.phone}</p>}
                  </div>

                  {/* <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleFormChange("email")}
                    className="h-11 w-full rounded border border-[#cfcfcf] bg-white px-3 font-playfair text-base text-text-base placeholder:text-[#8c8c8c] focus:outline-none focus:border-navy"
                  /> */}

                 

                  <div>
                    <select
                      required
                      value={formData.className}
                      onChange={(e) => {
                        handleFormChange("className")(e);
                        if (formErrors.className) setFormErrors(prev => ({ ...prev, className: '' }));
                      }}
                      className="h-11 w-full rounded border border-[#cfcfcf] bg-white px-3 font-playfair text-base text-text-base focus:outline-none focus:border-navy"
                    >
                      <option value="">Grade Applying For *</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                    {formErrors.className && <p className="text-crimson text-xs mt-1 pl-1">{formErrors.className}</p>}
                  </div>

                  <div>
                    <select
                      required
                      value={formData.school}
                      onChange={(e) => {
                        handleFormChange("school")(e);
                        if (formErrors.school) setFormErrors(prev => ({ ...prev, school: '' }));
                      }}
                      className="h-11 w-full rounded border border-[#cfcfcf] bg-white px-3 font-playfair text-base text-text-base focus:outline-none focus:border-navy"
                    >
                      <option value="">Select Gender *</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {formErrors.school && <p className="text-crimson text-xs mt-1 pl-1">{formErrors.school}</p>}
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleFormChange("message")}
                      className="w-full rounded border border-[#cfcfcf] bg-white px-3 py-2 font-playfair text-base text-text-base placeholder:text-[#8c8c8c] focus:outline-none focus:border-navy resize-none"
                    />
                    {formErrors.message && <p className="text-crimson text-xs mt-1 pl-1">{formErrors.message}</p>}
                  </div>

                  <button type="submit" disabled={submitting} className="w-full h-11 bg-navy-deeper text-white border border-crimson rounded font-playfair font-black text-base uppercase hover:bg-navy disabled:opacity-60 transition-colors">
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [showInquiryPopup, setShowInquiryPopup] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50 bg-navy-deeper">
        {/* ── ANNOUNCEMENT TICKER (commented out)
        <div className="overflow-hidden h-8 flex items-center border-b border-white/[0.06]">
          <div className="flex items-center gap-0 whitespace-nowrap animate-marquee">
            {[...announcements, ...announcements].map((a, i) => (
              <span key={i} className="inline-flex items-center gap-4 text-[10.5px] font-medium tracking-[0.12em] uppercase text-white/60 px-8">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson flex-shrink-0 inline-block" />
                {a}
              </span>
            ))}
          </div>
        </div>
        */}

        {/* ── MAIN HEADER ── */}
        <header className="bg-navy-deeper">
          <div className="max-w-[1600px] mx-auto px-4 py-2 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between h-[68px] gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center gap-4 group">
                  <Image
                    src="/SPS_Logo.webp"
                    alt="Seedling Schools Logo"
                    width={200}
                    height={60}
                    className="h-20 w-auto object-contain"
                    priority
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center justify-end gap-1">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group flex items-center">
                    {item.dropdown ? (
                      <>
                        <button className={`inline-flex h-10 items-center justify-center gap-1 px-2.5 text-[13px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-default ${pathname.startsWith(item.href) ? "text-sand" : "text-white/80 hover:text-white"}`}>
                          {item.name}
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-navy-deeper/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={`block px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${pathname === sub.href ? "text-sand" : "text-white/80 hover:text-white hover:bg-white/5"}`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`inline-flex h-10 items-center justify-center px-2.5 text-[13px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${pathname === item.href ? "text-sand" : "text-white/80 hover:text-white"}`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Apply & pay the registration fee online */}
              <Link
                href="/admissions/apply"
                className="hidden xl:inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-crimson px-5 py-2.5 text-[12px] font-black uppercase tracking-widest text-white transition-colors hover:bg-crimson-dark"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Apply &amp; Pay
              </Link>

              {/* Mobile Menu Button */}
              <div className="xl:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2.5 rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>

                          </div>
          </div>
        </header>

        {/* ── MOBILE NAV DRAWER ── */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[80] bg-navy-deeper/60 backdrop-blur-sm xl:hidden"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="fixed inset-y-0 left-0 z-[90] w-[80%] max-w-[320px] bg-navy-deeper xl:hidden overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-3 border-b border-white/[0.06]">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Image
                      src="/SPS_Logo.webp"
                      alt="Seedling Schools Logo"
                      width={180}
                      height={54}
                      className=" w-auto object-contain"
                    />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/40 hover:text-white transition-colors bg-white/10 rounded-full"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="flex flex-col gap-1">
                    {navItems.filter(item => item.name !== "Home").map((item) => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between">
                          {item.dropdown ? (
                            <button
                              onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                              className={`flex-1 py-3 text-[16px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${pathname.startsWith(item.href) ? "text-sand" : "text-white/70"}`}
                            >
                              {item.name}
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                                className={`transition-transform ${mobileExpanded === item.name ? "rotate-180" : ""}`}>
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => { setIsOpen(false); setMobileExpanded(null); }}
                              className={`flex-1 py-3 text-[16px] font-bold uppercase tracking-wider transition-colors ${pathname === item.href ? "text-sand" : "text-white/70"}`}
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                        {item.dropdown && mobileExpanded === item.name && (
                          <div className="ml-4 border-l border-white/[0.08] pl-4 space-y-1">
                            {item.dropdown.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={() => { setIsOpen(false); setMobileExpanded(null); }}
                                className={`block py-2.5 text-[14px] font-semibold uppercase tracking-wider transition-colors ${pathname === child.href ? "text-sand" : "text-white/50"}`}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <Link
                      href="#"
                      onClick={(e) => { e.preventDefault(); setShowInquiryPopup(true); setIsOpen(false); setMobileExpanded(null); }}
                      className="block w-full text-center py-4 bg-crimson text-white text-[12px] font-black uppercase tracking-widest rounded-lg hover:bg-crimson-dark transition-colors mt-4"
                    >
                      Enquire Now
                    </Link>
                    <div className="flex items-center justify-center gap-4 py-4">
                      <a
                        href="tel:+919587772837"
                        className="flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                        aria-label="Call us"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                      <a
                        href="mailto:smhsjaipur@jnujaipur.ac.in"
                        className="flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                        aria-label="Email us"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                      <a
                        href="/contact-us#location"
                        className="flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                        aria-label="Find us on map"
                      >
                        <MapPin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <div className="fixed left-3 sm:left-6 bottom-5 sm:bottom-8 z-[110] flex flex-col items-start gap-2 sm:gap-3">
        <a
          href="tel:+919587772837"
          className="flex items-center justify-center gap-2 bg-navy-deeper hover:bg-navy text-white w-11 h-11 sm:w-auto sm:h-auto sm:px-5 sm:py-3 rounded-full font-black text-xs tracking-widest uppercase shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 border border-white/10"
          aria-label="Call Seedling Schools"
        >
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">Call Us</span>
        </a>

        <a
          href="https://wa.me/919587772837"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white w-11 h-11 sm:w-auto sm:h-auto sm:px-5 sm:py-3 rounded-full font-black text-xs tracking-widest uppercase shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
          aria-label="Message Seedling Schools on WhatsApp"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>

      <div className={`fixed right-3 sm:right-6 bottom-5 sm:bottom-8 z-[70] ${isOpen ? "hidden" : ""}`}>
        <button
          onClick={() => setShowInquiryPopup(true)}
          className="flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-4 py-3 sm:px-6 sm:py-3.5 rounded-full font-black text-xs sm:text-sm tracking-widest uppercase shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Enquire Now
        </button>
      </div>
      {/* <style jsx global>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style> */}
      <InquiryPopup isOpen={showInquiryPopup} onClose={() => setShowInquiryPopup(false)} />
    </>
  );
}
