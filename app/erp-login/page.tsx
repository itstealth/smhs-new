"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const roles = [
  { id: "student", label: "Student" },
  { id: "parent", label: "Parent" },
  { id: "teacher", label: "Teacher / Staff" },
];

export default function ERPLoginPage() {
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // ERP redirect would go here
  }

  const placeholders: Record<string, string> = {
    student: "Student ID (e.g. SMHS2026001)",
    parent: "Parent / Guardian ID",
    teacher: "Employee ID",
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#010e3a]">

      {/* ── LEFT PANEL ── */}
      <div className="relative hidden lg:flex lg:w-[52%] flex-col justify-between p-12 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/Home/School2.webp"
            alt="Seedling Modern High School"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#010e3a]/90 via-[#010e3a]/70 to-[#01217e]/60" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="block">
            <Image
              src="/SPS_Logo.webp"
              alt="Seedling Modern High School"
              width={200}
              height={200}
              className="rounded-full object-cover ring-2 ring-white/20"
            />
          </Link>
        </div>

        {/* Centre quote */}
        <div className="relative z-10 max-w-md">
          <div className="w-8 h-[2px] bg-[#a3123f] mb-6" />
          <blockquote className="font-serif text-3xl xl:text-4xl font-bold text-white leading-snug mb-4">
            Learning today,<br />
            <span className="italic text-[#a3123f]">leading tomorrow.</span>
          </blockquote>
          <p className="text-white/45 text-[13px] leading-relaxed">
            Access your personalised dashboard — academics, attendance, fee records, and more.
          </p>
        </div>

        {/* Bottom stat strip */}
        <div className="relative z-10 flex items-center gap-8">
          {[
            { value: "20,000+", label: "Students" },
            { value: "200+", label: "Faculty" },
            { value: "33+", label: "Years" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-white/35 tracking-[0.25em] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-16 bg-[#f8f9fc] relative overflow-hidden">

        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#a3123f]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#a3123f]/5 blur-3xl pointer-events-none" />

        <div className="w-full max-w-[420px] relative z-10">

          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-3 mb-8">
            <Image src="/SPS_Logo.webp" alt="Seedling Modern High School" width={50} height={50} className="rounded-full object-cover" />
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-5 h-[1.5px] bg-[#a3123f] inline-block" />
              <span className="text-[#a3123f] text-[9.5px] font-bold tracking-[0.5em] uppercase">ERP Portal</span>
            </div>
            <h1 className="font-serif text-[2rem] font-bold text-[#010e3a] leading-tight mb-1">
              Sign in to your<br />
              <span className="italic text-[#a3123f]">dashboard</span>
            </h1>
            <p className="text-[#010e3a]/45 text-[13px] mt-2">
              Use credentials provided by your school administrator.
            </p>
          </div>

          {/* Role selector */}
          <div className="flex gap-2 mb-6 p-1 rounded-xl bg-[#010e3a]/6 border border-[#010e3a]/8">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex-1 py-2 text-[11px] font-bold tracking-[0.08em] uppercase rounded-lg transition-all duration-200 ${
                  role === r.id
                    ? "bg-[#010e3a] text-white shadow-md"
                    : "text-[#010e3a]/45 hover:text-[#010e3a]/70"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* User ID */}
            <div>
              <label className="block text-[11px] font-bold text-[#010e3a]/60 tracking-[0.1em] uppercase mb-1.5">
                {role === "student" ? "Student ID" : role === "parent" ? "Parent ID" : "Employee ID"}
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#010e3a]/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder={placeholders[role]}
                  required
                  className="w-full pl-10 pr-4 py-3 text-[13px] text-[#010e3a] bg-white border border-[#010e3a]/12 rounded-xl outline-none focus:border-[#a3123f]/50 focus:ring-2 focus:ring-[#a3123f]/10 transition-all placeholder:text-[#010e3a]/25"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold text-[#010e3a]/60 tracking-[0.1em] uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#010e3a]/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-11 py-3 text-[13px] text-[#010e3a] bg-white border border-[#010e3a]/12 rounded-xl outline-none focus:border-[#a3123f]/50 focus:ring-2 focus:ring-[#a3123f]/10 transition-all placeholder:text-[#010e3a]/25"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#010e3a]/30 hover:text-[#010e3a]/60 transition-colors"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button type="button" className="text-[11.5px] text-[#a3123f] hover:text-[#8a0f34] font-semibold transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#a3123f] hover:bg-[#8a0f34] text-white text-[12px] font-bold tracking-[0.15em] uppercase rounded-xl transition-colors duration-200 shadow-lg shadow-[#a3123f]/20"
            >
              Sign In
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </form>

          {/* Divider + help */}
          <div className="mt-8 pt-6 border-t border-[#010e3a]/8">
            <p className="text-center text-[12px] text-[#010e3a]/40">
              Having trouble signing in?{" "}
              <Link href="/contact-us" className="text-[#010e3a]/65 hover:text-[#a3123f] font-semibold transition-colors">
                Contact your administrator
              </Link>
            </p>
          </div>

          {/* Back link */}
          <div className="mt-5 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] text-[#010e3a]/35 hover:text-[#010e3a]/60 transition-colors tracking-wide"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}