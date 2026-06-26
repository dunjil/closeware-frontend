'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/v1/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          new_password: password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to reset password');
      }

      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#FAF9F6" }}>
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-xl p-10 ring-1 ring-[#E8E6E0]">
            <p style={{ color: "#C0392B" }}>Invalid reset link</p>
          </div>
        </div>
      </div>
    );
  }

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
              Password reset successful
            </h1>
            <p className="mb-8" style={{ color: "#6B6B63" }}>
              Your password has been updated. Redirecting to login...
            </p>
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
          <p className="text-sm" style={{ color: "#6B6B63" }}>Create a new password</p>
        </div>

        <div className="bg-white rounded-xl p-8 ring-1 ring-[#E8E6E0] animate-fade-in">
          {error && (
            <div className="mb-6 p-4 rounded-lg text-sm" style={{ background: "rgba(192, 57, 43, 0.08)", border: "1px solid rgba(192, 57, 43, 0.2)", color: "#C0392B" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="••••••••"
                disabled={loading}
                autoFocus
              />
              <p className="text-xs mt-1.5" style={{ color: "#8A8880" }}>Minimum 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg text-sm font-medium disabled:opacity-50"
              style={{ background: "#D4A017", color: "#fff" }}
            >
              {loading ? 'Resetting password...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: "#6B6B63" }}>
            <Link href="/login" className="font-medium hover:underline" style={{ color: "#D4A017" }}>
              Back to Login
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
