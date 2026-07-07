'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    company_name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // New unified signup endpoint - creates org + user + trial in one call
      const res = await fetch('http://localhost:8000/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formData.company_name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          full_name: formData.full_name.trim(),
          phone: formData.phone.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Registration failed');
      }

      const data = await res.json();

      // Show success message (user needs to verify email)
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
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(74, 124, 89, 0.1)" }}>
              <svg className="w-8 h-8" fill="none" stroke="#4A7C59" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl mb-3" style={{ fontFamily: "var(--font-heading)", color: "#1A1A18" }}>
              Check your email
            </h1>
            <p className="mb-8" style={{ color: "#6B6B63" }}>
              We've sent a verification link to <strong style={{ color: "#1A1A18" }}>{formData.email}</strong>
            </p>
            <p className="text-sm mb-6" style={{ color: "#6B6B63" }}>
              Click the link in the email to verify your account and start your 30-day free trial.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-11 px-8 rounded-lg text-sm font-medium"
              style={{ background: "#D4A017", color: "#fff" }}
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#FAF9F6" }}>
      <Header />
      <div className="min-h-screen flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-light tracking-tight inline-block mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Get Started
            </h1>
            <p className="text-sm" style={{ color: "#6B6B63" }}>Start your free 30-day trial</p>
          </div>

        <div className="bg-white rounded-xl p-8 ring-1 ring-[#E8E6E0] animate-fade-in">
          {error && (
            <div className="mb-6 p-4 rounded-lg text-sm" style={{ background: "rgba(192, 57, 43, 0.08)", border: "1px solid rgba(192, 57, 43, 0.2)", color: "#C0392B" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Company Name</label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                required
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="Acme Corporation"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Full Name</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="John Smith"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Work Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="you@company.com"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Phone (Optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="+234..."
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="••••••••"
                disabled={loading}
              />
              <p className="text-xs mt-1.5" style={{ color: "#8A8880" }}>Minimum 8 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg text-sm font-medium disabled:opacity-50"
              style={{ background: "#D4A017", color: "#fff" }}
            >
              {loading ? 'Creating account...' : 'Start Free Trial'}
            </button>

            <p className="text-xs text-center" style={{ color: "#8A8880" }}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: "#6B6B63" }}>
            Already have an account?{' '}
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
    </div>
  );
}
