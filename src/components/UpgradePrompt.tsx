'use client';

import Link from 'next/link';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: string;
  dealsUsed: number;
  dealLimit: number;
  recommendedTier?: string;
  recommendedPrice?: number;
}

export default function UpgradePrompt({
  isOpen,
  onClose,
  currentTier,
  dealsUsed,
  dealLimit,
  recommendedTier,
  recommendedPrice,
}: UpgradePromptProps) {
  if (!isOpen) return null;

  const tierName = currentTier.charAt(0).toUpperCase() + currentTier.slice(1);
  const nextTierName = recommendedTier ? recommendedTier.charAt(0).toUpperCase() + recommendedTier.slice(1) : undefined;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="rounded-2xl max-w-md w-full p-8 relative animate-scale-in"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="#1A1A18" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Icon */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: 'rgba(212, 160, 23, 0.1)' }}
          >
            <svg className="w-8 h-8" fill="none" stroke="#D4A017" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Upgrade to Create More Deals
          </h2>

          {/* Message */}
          <p className="text-base mb-6" style={{ color: '#6B6B63' }}>
            You've used <span className="font-medium" style={{ color: '#1A1A18' }}>{dealsUsed} of {dealLimit} deals</span> on
            your {tierName} plan this month.
          </p>

          {/* Recommendation */}
          {nextTierName && recommendedPrice && (
            <div
              className="p-4 rounded-xl mb-6"
              style={{ background: '#F5F3EE', border: '1px solid #E8E6E0' }}
            >
              <p className="text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Recommended: {nextTierName} Plan
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-light" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                  ${recommendedPrice}
                </span>
                <span className="text-sm" style={{ color: '#6B6B63' }}>
                  /month
                </span>
              </div>
              <p className="text-xs" style={{ color: '#6B6B63' }}>
                {nextTierName === 'Pro' && '20 deals/month + priority support'}
                {nextTierName === 'Team' && '100 deals/month + team collaboration'}
                {nextTierName === 'Enterprise' && 'Unlimited deals + custom integrations'}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href="/pricing"
              className="flex-1 h-12 rounded-lg text-sm font-medium flex items-center justify-center"
              style={{ background: '#D4A017', color: '#fff' }}
              onClick={onClose}
            >
              View All Plans
            </Link>
            <button
              onClick={onClose}
              className="px-6 h-12 rounded-lg text-sm font-medium border"
              style={{ borderColor: '#E8E6E0', color: '#4A4A45' }}
            >
              Not Now
            </button>
          </div>

          {/* Additional Info */}
          <p className="text-xs mt-4 text-center" style={{ color: '#8A8880' }}>
            Your current billing period resets on {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
