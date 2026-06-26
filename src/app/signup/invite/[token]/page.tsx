'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function InviteSignupPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState<any>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    validateInvite();
  }, [params.token]);

  const validateInvite = async () => {
    try {
      const data = await api.validateInvite(params.token);
      setInviteData(data);
    } catch (err: any) {
      setError(err.message || 'Invalid or expired invitation');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSubmitting(true);

    try {
      await api.completeExternalSignup(params.token, password, phone || undefined);

      // Success - redirect to login with message
      router.push('/login?message=Account created successfully. Please log in.');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF9F6' }}>
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#D4A017' }} />
          <p style={{ color: '#6B6B63' }}>Validating invitation...</p>
        </div>
      </div>
    );
  }

  if (error && !inviteData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF9F6' }}>
        <div className="max-w-md w-full mx-4">
          <div className="rounded-xl p-8 text-center" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#C0392B' }}>
              Invalid Invitation
            </h1>
            <p className="mb-6" style={{ color: '#6B6B63' }}>
              {error}
            </p>
            <Link href="/" className="inline-block h-10 px-6 rounded-lg text-sm font-medium" style={{ background: '#D4A017', color: '#fff', lineHeight: '40px' }}>
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#FAF9F6' }}>
      <div className="max-w-lg w-full">
        {/* Header Card */}
        <div className="rounded-xl p-6 mb-6" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h1 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            You've been invited by {inviteData?.inviter_name}
          </h1>
          <div className="space-y-2 text-sm" style={{ color: '#6B6B63' }}>
            <div>
              <strong style={{ color: '#1A1A18' }}>Deal:</strong> {inviteData?.deal_title}
            </div>
            <div>
              <strong style={{ color: '#1A1A18' }}>Invited by:</strong> {inviteData?.inviter_name}
            </div>
          </div>
          {inviteData?.message && (
            <div className="mt-4 p-4 rounded-lg" style={{ background: '#F5F3EE', borderLeft: '4px solid #D4A017' }}>
              <p className="text-sm italic" style={{ color: '#4A4A45' }}>
                "{inviteData.message}"
              </p>
            </div>
          )}
        </div>

        {/* Signup Form */}
        <div className="rounded-xl p-8" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 className="text-xl mb-6" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Create Your Reviewer Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email (Verified, Disabled) */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={inviteData?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 border rounded-lg text-[15px] bg-gray-50"
                  style={{ borderColor: '#E8E6E0', color: '#6B6B63' }}
                />
                <span className="absolute right-3 top-3 text-xs px-2 py-1 rounded" style={{ background: 'rgba(74,124,89,0.08)', color: '#4A7C59' }}>
                  ✓ Verified
                </span>
              </div>
            </div>

            {/* Name (Pre-filled but editable) */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Full Name
              </label>
              <input
                type="text"
                value={inviteData?.name || ''}
                disabled
                className="w-full px-4 py-2.5 border rounded-lg text-[15px] bg-gray-50"
                style={{ borderColor: '#E8E6E0', color: '#6B6B63' }}
              />
            </div>

            {/* Organization (Pre-filled but editable) */}
            {inviteData?.organization_name && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                  Organization
                </label>
                <input
                  type="text"
                  value={inviteData.organization_name}
                  disabled
                  className="w-full px-4 py-2.5 border rounded-lg text-[15px] bg-gray-50"
                  style={{ borderColor: '#E8E6E0', color: '#6B6B63' }}
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Password <span style={{ color: '#C0392B' }}>*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: '#E8E6E0' }}
                placeholder="At least 8 characters"
                required
                minLength={8}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Confirm Password <span style={{ color: '#C0392B' }}>*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: '#E8E6E0' }}
                placeholder="Re-enter password"
                required
              />
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Phone Number <span style={{ color: '#6B6B63' }}>(Optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: '#E8E6E0' }}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 rounded-lg border" style={{ background: 'rgba(192,57,43,0.08)', borderColor: 'rgba(192,57,43,0.25)' }}>
                <p className="text-sm" style={{ color: '#C0392B' }}>
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-lg text-sm font-medium disabled:opacity-50"
              style={{ background: '#D4A017', color: '#fff' }}
            >
              {submitting ? 'Creating Account...' : 'Create Account & Continue'}
            </button>

            {/* Terms */}
            <p className="text-xs text-center" style={{ color: '#8A8880' }}>
              By creating an account, you agree to our{' '}
              <a href="/terms" className="underline" style={{ color: '#D4A017' }}>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="underline" style={{ color: '#D4A017' }}>
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
