'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim()
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ detail: 'Login failed' }));
        throw new Error(data.detail || 'Invalid credentials');
      }

      const data = await res.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#FAF9F6" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-[32px] font-light tracking-tight inline-block mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Close<span style={{ color: "#D4A017" }} className="font-medium">ware</span>
          </Link>
          <p className="text-sm" style={{ color: "#6B6B63" }}>Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl p-8 ring-1 ring-[#E8E6E0] animate-fade-in">
          {error && (
            <div className="mb-6 p-4 rounded-lg text-sm" style={{ background: "rgba(192, 57, 43, 0.08)", border: "1px solid rgba(192, 57, 43, 0.2)", color: "#C0392B" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
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
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium" style={{ color: "#1A1A18" }}>Password</label>
                <Link href="/forgot-password" className="text-xs hover:underline" style={{ color: "#D4A017" }}>
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: "#6B6B63" }}>
            Don't have an account?{' '}
            <Link href="/register" className="font-medium hover:underline" style={{ color: "#D4A017" }}>
              Sign up
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
