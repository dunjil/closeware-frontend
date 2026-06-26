'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Subscription {
  id: string;
  tier: 'lite' | 'pro' | 'enterprise';
  status: 'trial' | 'active' | 'cancelled' | 'expired';
  billing_period: 'monthly' | 'annual';
  base_price: number;
  included_deals: number;
  overage_price: number;
  current_period_start: string;
  current_period_end: string;
  trial_ends_at?: string;
  cancel_at_period_end: boolean;
}

interface UsageSummary {
  deals_used: number;
  deals_included: number;
  overage_deals: number;
  base_cost: number;
  overage_cost: number;
  subtotal: number;
  vat: number;
  total_cost: number;
  period_start: string;
  period_end: string;
}

interface Invoice {
  id: string;
  invoice_number: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  subtotal: number;
  vat_amount: number;
  total_amount: number;
  created_at: string;
  due_date: string;
  paid_at?: string;
}

export default function SubscriptionDashboard() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<UsageSummary | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // Fetch subscription + usage
      const subRes = await fetch('http://localhost:8000/api/v1/subscriptions/current', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!subRes.ok) throw new Error('Failed to load subscription');
      const subData = await subRes.json();

      setSubscription(subData.subscription);
      setUsage(subData.usage_summary);

      // Fetch invoices
      const invRes = await fetch('http://localhost:8000/api/v1/subscriptions/invoices', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (invRes.ok) {
        const invData = await invRes.json();
        setInvoices(invData);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 1000).toFixed(0)}K`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTierName = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      trial: { bg: 'rgba(212, 160, 23, 0.1)', color: '#D4A017', text: 'Trial' },
      active: { bg: 'rgba(74, 124, 89, 0.1)', color: '#4A7C59', text: 'Active' },
      cancelled: { bg: 'rgba(192, 57, 43, 0.1)', color: '#C0392B', text: 'Cancelled' },
      expired: { bg: 'rgba(138, 136, 128, 0.1)', color: '#8A8880', text: 'Expired' },
    };

    const style = styles[status as keyof typeof styles] || styles.active;

    return (
      <span
        className="px-3 py-1 rounded-full text-xs font-medium"
        style={{ background: style.bg, color: style.color }}
      >
        {style.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8" style={{ background: '#FAF9F6' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-2 rounded-full mx-auto" style={{ borderColor: '#E8E6E0', borderTopColor: '#D4A017' }}></div>
            <p className="mt-4" style={{ color: '#6B6B63' }}>Loading subscription...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !subscription) {
    return (
      <div className="min-h-screen p-8" style={{ background: '#FAF9F6' }}>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-8 ring-1 ring-[#E8E6E0]">
            <p style={{ color: '#C0392B' }}>{error || 'No subscription found'}</p>
          </div>
        </div>
      </div>
    );
  }

  const isTrialExpiringSoon = subscription.status === 'trial' && subscription.trial_ends_at &&
    new Date(subscription.trial_ends_at).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000; // 7 days

  return (
    <div className="min-h-screen p-8" style={{ background: '#FAF9F6' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm hover:underline mb-4 inline-block" style={{ color: '#8A8880' }}>
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
            Subscription & Billing
          </h1>
          <p style={{ color: '#6B6B63' }}>Manage your plan and view usage</p>
        </div>

        {/* Trial Expiring Warning */}
        {isTrialExpiringSoon && (
          <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(212, 160, 23, 0.1)', border: '1px solid rgba(212, 160, 23, 0.25)' }}>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="#D4A017" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <p className="font-medium mb-1" style={{ color: '#D4A017' }}>Your trial is ending soon</p>
                <p className="text-sm mb-3" style={{ color: '#6B6B63' }}>
                  Your trial expires on {formatDate(subscription.trial_ends_at!)}. Upgrade to continue using Closeware.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center h-9 px-6 rounded-lg text-sm font-medium"
                  style={{ background: '#D4A017', color: '#fff' }}
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Current Plan Card */}
          <div className="md:col-span-2 bg-white rounded-xl p-6 ring-1 ring-[#E8E6E0]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
                  Current Plan
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-medium" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                    {getTierName(subscription.tier)}
                  </span>
                  {getStatusBadge(subscription.status)}
                </div>
              </div>
              <Link
                href="/pricing"
                className="h-10 px-6 rounded-lg text-sm font-medium border flex items-center"
                style={{ borderColor: '#E8E6E0', color: '#4A4A45' }}
              >
                Change Plan
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg" style={{ background: '#F5F3EE' }}>
                <p className="text-xs mb-1" style={{ color: '#8A8880' }}>Base Price</p>
                <p className="text-xl font-medium" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                  {formatCurrency(subscription.base_price)}
                  <span className="text-sm font-normal" style={{ color: '#6B6B63' }}>
                    /{subscription.billing_period === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: '#F5F3EE' }}>
                <p className="text-xs mb-1" style={{ color: '#8A8880' }}>Included Deals</p>
                <p className="text-xl font-medium" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                  {subscription.included_deals}
                  <span className="text-sm font-normal" style={{ color: '#6B6B63' }}>
                    /{subscription.billing_period === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t" style={{ borderColor: '#E8E6E0' }}>
              <p className="text-sm mb-2" style={{ color: '#6B6B63' }}>
                Billing Period: <strong style={{ color: '#1A1A18' }}>{formatDate(subscription.current_period_start)}</strong> to{' '}
                <strong style={{ color: '#1A1A18' }}>{formatDate(subscription.current_period_end)}</strong>
              </p>
              {subscription.status === 'trial' && subscription.trial_ends_at && (
                <p className="text-sm" style={{ color: '#6B6B63' }}>
                  Trial ends: <strong style={{ color: '#D4A017' }}>{formatDate(subscription.trial_ends_at)}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Usage Summary Card */}
          <div className="bg-white rounded-xl p-6 ring-1 ring-[#E8E6E0]">
            <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
              Usage This Period
            </h3>

            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm" style={{ color: '#6B6B63' }}>Deals Used</span>
                <span className="text-2xl font-medium" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                  {usage?.deals_used || 0}
                </span>
              </div>
              <div className="h-2 rounded-full" style={{ background: '#E8E6E0' }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${Math.min(((usage?.deals_used || 0) / subscription.included_deals) * 100, 100)}%`,
                    background: (usage?.deals_used || 0) > subscription.included_deals ? '#C0392B' : '#D4A017',
                  }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: '#8A8880' }}>
                {subscription.included_deals - (usage?.deals_used || 0) > 0
                  ? `${subscription.included_deals - (usage?.deals_used || 0)} deals remaining`
                  : `${(usage?.overage_deals || 0)} overage deals`}
              </p>
            </div>

            <div className="pt-4 border-t" style={{ borderColor: '#E8E6E0' }}>
              <p className="text-xs mb-2" style={{ color: '#8A8880' }}>Current Bill Estimate</p>
              <p className="text-2xl font-medium" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                {formatCurrency(usage?.total_cost || subscription.base_price)}
              </p>
              {usage && usage.overage_deals > 0 && (
                <p className="text-xs mt-2" style={{ color: '#6B6B63' }}>
                  Includes {formatCurrency(usage.overage_cost)} overage
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Usage Breakdown */}
        {usage && (
          <div className="bg-white rounded-xl p-6 ring-1 ring-[#E8E6E0] mb-8">
            <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
              Cost Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span style={{ color: '#6B6B63' }}>Base subscription</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                  {formatCurrency(usage.base_cost)}
                </span>
              </div>

              {usage.overage_deals > 0 && (
                <div className="flex justify-between items-center">
                  <span style={{ color: '#6B6B63' }}>
                    Overage ({usage.overage_deals} deals × {formatCurrency(subscription.overage_price)})
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                    {formatCurrency(usage.overage_cost)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: '#E8E6E0' }}>
                <span style={{ color: '#6B6B63' }}>Subtotal</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                  {formatCurrency(usage.subtotal)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span style={{ color: '#6B6B63' }}>VAT (7.5%)</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                  {formatCurrency(usage.vat)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t font-medium" style={{ borderColor: '#E8E6E0' }}>
                <span style={{ color: '#1A1A18' }}>Total</span>
                <span className="text-xl" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                  {formatCurrency(usage.total_cost)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Invoices */}
        <div className="bg-white rounded-xl p-6 ring-1 ring-[#E8E6E0]">
          <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
            Billing History
          </h3>

          {invoices.length === 0 ? (
            <p className="text-center py-8" style={{ color: '#8A8880' }}>
              No invoices yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: '#E8E6E0' }}>
                    <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: '#6B6B63' }}>Invoice</th>
                    <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: '#6B6B63' }}>Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: '#6B6B63' }}>Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium" style={{ color: '#6B6B63' }}>Amount</th>
                    <th className="text-right py-3 px-4 text-sm font-medium" style={{ color: '#6B6B63' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b" style={{ borderColor: '#E8E6E0' }}>
                      <td className="py-3 px-4" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18', fontSize: '14px' }}>
                        {invoice.invoice_number}
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: '#6B6B63' }}>
                        {formatDate(invoice.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            background: invoice.status === 'paid' ? 'rgba(74, 124, 89, 0.1)' : 'rgba(212, 160, 23, 0.1)',
                            color: invoice.status === 'paid' ? '#4A7C59' : '#D4A017',
                          }}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                        {formatCurrency(invoice.total_amount)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-sm hover:underline" style={{ color: '#D4A017' }}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
