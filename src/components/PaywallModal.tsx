'use client';

import { useRouter } from 'next/navigation';

interface PaywallModalProps {
  isOpen: boolean;
  reason?: string;
  onClose?: () => void;
}

export default function PaywallModal({ isOpen, reason, onClose }: PaywallModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const defaultReason = "Your trial has expired or your subscription is inactive.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-8"
        style={{ border: '1px solid #E8E6E0' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: 'rgba(212, 160, 23, 0.1)' }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="#D4A017"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Content */}
        <h2
          className="text-2xl text-center mb-3"
          style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}
        >
          Subscription Required
        </h2>

        <p className="text-center mb-8" style={{ color: '#6B6B63' }}>
          {reason || defaultReason}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push('/pricing')}
            className="w-full h-12 rounded-lg text-sm font-medium"
            style={{ background: '#D4A017', color: '#fff' }}
          >
            View Pricing & Upgrade
          </button>

          <button
            onClick={() => router.push('/dashboard/subscription')}
            className="w-full h-12 rounded-lg text-sm font-medium border"
            style={{ borderColor: '#E8E6E0', color: '#4A4A45' }}
          >
            View Subscription Details
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="text-sm hover:underline mt-2"
              style={{ color: '#8A8880' }}
            >
              Cancel
            </button>
          )}
        </div>

        {/* Support Link */}
        <p className="text-center text-xs mt-8" style={{ color: '#8A8880' }}>
          Need help? Contact{' '}
          <a href="mailto:support@closeware.com" className="hover:underline" style={{ color: '#D4A017' }}>
            support@closeware.com
          </a>
        </p>
      </div>
    </div>
  );
}
