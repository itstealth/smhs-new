'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin/contact');
        router.refresh();
      } else {
        setError('Incorrect password. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 font-dm bg-[radial-gradient(circle_at_top,_#3a0a24,_#010e3a_65%)]">
      {/* subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="bg-white rounded-3xl shadow-[0_30px_80px_rgba(1,14,58,0.45)] px-9 py-10 border border-white/10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-navy-deeper flex items-center justify-center mb-5 shadow-lg shadow-crimson/20">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-playfair text-2xl font-bold text-navy-deeper">Admin Login</h1>
            <p className="text-text-light text-sm mt-1.5">SMHS Leads Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-[11px] font-bold text-[#555] tracking-widest uppercase mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                placeholder="Enter admin password"
                className={`w-full px-4 py-3.5 rounded-xl text-sm text-[#1C1C1E] placeholder-[#B8B4AC] bg-[#FAFAF8] border-2 outline-none transition-colors duration-200 focus:bg-white ${
                  error ? 'border-crimson focus:border-crimson' : 'border-[#E8E3DA] focus:border-navy'
                }`}
              />
              {error && (
                <p className="text-crimson text-xs mt-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy-deeper hover:bg-navy-dark disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-crimson/20"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-[11px] mt-6 tracking-wide">
          Seedling Modern High School — Restricted Access
        </p>
      </div>
    </div>
  );
}
