'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('Invalid verification link');
      return;
    }

    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Verification failed');
      }

      setStatus('success');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#FAF9F6" }}>
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-xl p-10 ring-1 ring-[#E8E6E0]">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(212, 160, 23, 0.1)" }}>
              <div className="animate-spin w-8 h-8 border-2 rounded-full" style={{ borderColor: "#E8E6E0", borderTopColor: "#D4A017" }}></div>
            </div>
            <h1 className="text-2xl mb-3" style={{ fontFamily: "var(--font-heading)", color: "#1A1A18" }}>
              Verifying your email...
            </h1>
            <p style={{ color: "#6B6B63" }}>
              Please wait while we verify your account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#FAF9F6" }}>
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-xl p-10 ring-1 ring-[#E8E6E0]">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(192, 57, 43, 0.1)" }}>
              <svg className="w-8 h-8" fill="none" stroke="#C0392B" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl mb-3" style={{ fontFamily: "var(--font-heading)", color: "#1A1A18" }}>
              Verification failed
            </h1>
            <p className="mb-8" style={{ color: "#6B6B63" }}>
              {error || 'This verification link is invalid or has expired.'}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg text-sm font-medium"
                style={{ background: "#D4A017", color: "#fff" }}
              >
                Go to Login
              </Link>
              <button
                onClick={() => router.push('/register')}
                className="text-sm hover:underline"
                style={{ color: "#6B6B63" }}
              >
                Request a new verification email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success
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
            Email verified!
          </h1>
          <p className="mb-2" style={{ color: "#6B6B63" }}>
            Your account is now active and ready to use.
          </p>
          <p className="text-sm mb-8" style={{ color: "#8A8880" }}>
            Redirecting to login...
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center h-11 px-8 rounded-lg text-sm font-medium"
            style={{ background: "#D4A017", color: "#fff" }}
          >
            Continue to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
