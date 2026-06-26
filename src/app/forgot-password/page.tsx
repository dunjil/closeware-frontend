'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to send reset email');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#FAF9F6" }}>
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-xl p-10 ring-1 ring-[#E8E6E0]">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(212, 160, 23, 0.1)" }}>
              <svg className="w-8 h-8" fill="none" stroke="#D4A017" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl mb-3" style={{ fontFamily: "var(--font-heading)", color: "#1A1A18" }}>
              Check your email
            </h1>
            <p className="mb-8" style={{ color: "#6B6B63" }}>
              If an account exists for <strong style={{ color: "#1A1A18" }}>{email}</strong>, you'll receive a password reset link shortly.
            </p>
            <p className="text-sm mb-6" style={{ color: "#8A8880" }}>
              The link will expire in 1 hour for security.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-11 px-8 rounded-lg text-sm font-medium"
              style={{ background: "#D4A017", color: "#fff" }}
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#FAF9F6" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-[32px] font-light tracking-tight inline-block mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Close<span style={{ color: "#D4A017" }} className="font-medium">ware</span>
          </Link>
          <p className="text-sm" style={{ color: "#6B6B63" }}>Reset your password</p>
        </div>

        <div className="bg-white rounded-xl p-8 ring-1 ring-[#E8E6E0] animate-fade-in">
          <p className="mb-6 text-sm" style={{ color: "#6B6B63" }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-lg text-sm" style={{ background: "rgba(192, 57, 43, 0.08)", border: "1px solid rgba(192, 57, 43, 0.2)", color: "#C0392B" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="you@company.com"
                disabled={loading}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg text-sm font-medium disabled:opacity-50"
              style={{ background: "#D4A017", color: "#fff" }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: "#6B6B63" }}>
            Remember your password?{' '}
            <Link href="/login" className="font-medium hover:underline" style={{ color: "#D4A017" }}>
              Sign in
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs hover:underline" style={{ color: "#8A8880" }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
