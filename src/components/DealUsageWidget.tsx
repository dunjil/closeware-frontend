'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DealUsage {
  tier: string;
  billing_period: string;
  deal_limit: number | null;
  deals_used: number;
  deals_remaining: number | null;
  can_create_deal: boolean;
  should_upgrade: boolean;
  usage_percentage: number | null;
  period_start: string;
  period_end: string;
}

export default function DealUsageWidget() {
  const [usage, setUsage] = useState<DealUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const token = localStorage.getItem('access_token') || localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
      const response = await fetch(`${API_URL}/subscriptions/deal-usage`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsage(data);
      } else if (response.status === 404) {
        // No subscription found - silently handle (they're on FREE tier)
        setError(null);
        setLoading(false);
      } else {
        console.error('Failed to load usage data:', response.status);
        setError(null); // Don't show error to user, just don't display widget
      }
    } catch (err) {
      console.error('Error fetching usage:', err);
      setError(null); // Don't show error to user
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl p-6 border" style={{ background: '#FFFFFF', borderColor: '#E8E6E0' }}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error || !usage) {
    return null;
  }

  const isUnlimited = usage.deal_limit === null;
  const isNearLimit = usage.usage_percentage && usage.usage_percentage >= 80;
  const tierName = usage.tier.charAt(0).toUpperCase() + usage.tier.slice(1);

  return (
    <div
      className="rounded-2xl p-6 border"
      style={{
        background: '#FFFFFF',
        borderColor: isNearLimit ? '#D4A017' : '#E8E6E0',
        boxShadow: isNearLimit ? '0 4px 16px rgba(212,160,23,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#8A8880' }}>
            Deal Usage This Month
          </p>
          <h3 className="text-2xl font-light" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
            {isUnlimited ? 'Unlimited' : `${usage.deals_used} / ${usage.deal_limit}`}
          </h3>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'rgba(212, 160, 23, 0.1)',
            color: '#D4A017',
          }}
        >
          {tierName} Plan
        </div>
      </div>

      {/* Progress Bar */}
      {!isUnlimited && (
        <div className="mb-4">
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: '#F5F3EE' }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${Math.min(usage.usage_percentage || 0, 100)}%`,
                background: isNearLimit ? '#D4A017' : '#4A7C59',
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-xs" style={{ color: '#6B6B63' }}>
              {usage.deals_remaining} deals remaining
            </p>
            <p className="text-xs" style={{ color: '#6B6B63' }}>
              {Math.round(usage.usage_percentage || 0)}% used
            </p>
          </div>
        </div>
      )}

      {/* Upgrade Prompt */}
      {isNearLimit && (
        <div
          className="p-4 rounded-lg mb-4"
          style={{ background: 'rgba(212, 160, 23, 0.08)', border: '1px solid rgba(212, 160, 23, 0.25)' }}
        >
          <p className="text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
            You're running low on deals
          </p>
          <p className="text-xs mb-3" style={{ color: '#6B6B63' }}>
            Upgrade to get more deals and unlock additional features.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-4 py-2 rounded-lg text-xs font-medium"
            style={{ background: '#D4A017', color: '#fff' }}
          >
            View Plans
          </Link>
        </div>
      )}

      {/* Limit Reached */}
      {!usage.can_create_deal && (
        <div
          className="p-4 rounded-lg"
          style={{ background: 'rgba(192, 57, 43, 0.08)', border: '1px solid rgba(192, 57, 43, 0.25)' }}
        >
          <p className="text-sm font-medium mb-2" style={{ color: '#C0392B' }}>
            Deal limit reached
          </p>
          <p className="text-xs mb-3" style={{ color: '#6B6B63' }}>
            You've used all {usage.deal_limit} deals this month. Upgrade to continue creating deals.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-4 py-2 rounded-lg text-xs font-medium"
            style={{ background: '#C0392B', color: '#fff' }}
          >
            Upgrade Now
          </Link>
        </div>
      )}

      {/* Unlimited Message */}
      {isUnlimited && (
        <div
          className="p-4 rounded-lg"
          style={{ background: 'rgba(74, 124, 89, 0.08)' }}
        >
          <p className="text-sm" style={{ color: '#4A7C59' }}>
            ✓ You have unlimited deals on the Enterprise plan
          </p>
        </div>
      )}

      {/* Period Info */}
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid #F5F3EE' }}>
        <p className="text-xs" style={{ color: '#8A8880' }}>
          Billing period: {new Date(usage.period_start).toLocaleDateString()} - {new Date(usage.period_end).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
