'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const tiers = [
    {
      name: 'Lite',
      id: 'lite',
      monthlyPrice: 75000,
      annualPrice: 750000,
      includedDeals: billingPeriod === 'monthly' ? 1 : 12,
      overagePrice: 60000,
      features: [
        '1 deal per month included',
        'Up to 3 team members',
        'Unlimited external collaborators',
        'AI contract generation',
        'Contract verification',
        'Email support',
      ],
      target: 'Solo lawyers, small firms',
    },
    {
      name: 'Pro',
      id: 'pro',
      monthlyPrice: 150000,
      annualPrice: 1500000,
      includedDeals: billingPeriod === 'monthly' ? 2 : 24,
      overagePrice: 50000,
      features: [
        '2 deals per month included',
        'Up to 5 team members',
        'Unlimited external collaborators',
        'AI contract generation & verification',
        'Internal review workflow',
        'E-signatures',
        'Priority support',
      ],
      recommended: true,
      target: 'Mid-sized companies',
    },
    {
      name: 'Enterprise',
      id: 'enterprise',
      monthlyPrice: 500000,
      annualPrice: 5000000,
      includedDeals: billingPeriod === 'monthly' ? 10 : 120,
      overagePrice: 40000,
      features: [
        '10 deals per month included',
        'Unlimited team members',
        'Unlimited external collaborators',
        'All Pro features',
        'Dedicated account manager',
        'Custom integrations',
        'Phone & Slack support',
      ],
      target: 'Large enterprises, PE funds',
    },
  ];

  const getPrice = (tier: typeof tiers[0]) => {
    return billingPeriod === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
  };

  const formatPrice = (price: number) => {
    return `₦${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#E8E6E0' }}>
        <div className="max-w-6xl mx-auto px-5 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Closeware
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="h-10 px-6 rounded-lg text-sm font-medium border flex items-center" style={{ borderColor: '#E8E6E0', color: '#4A4A45' }}>
              Log In
            </Link>
            <Link href="/signup" className="h-10 px-6 rounded-lg text-sm font-medium flex items-center" style={{ background: '#D4A017', color: '#fff' }}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-5 py-16 text-center">
        <h1 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
          Transparent Pricing
        </h1>
        <p className="text-xl mb-8" style={{ color: '#6B6B63' }}>
          Start with a 30-day free trial. No credit card required.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex rounded-lg p-1 mb-12" style={{ background: '#F5F3EE' }}>
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'monthly' ? '' : 'hover:bg-white/50'
            }`}
            style={billingPeriod === 'monthly' ? { background: '#fff', color: '#1A1A18' } : { color: '#6B6B63' }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'annual' ? '' : 'hover:bg-white/50'
            }`}
            style={billingPeriod === 'annual' ? { background: '#fff', color: '#1A1A18' } : { color: '#6B6B63' }}
          >
            Annual
            <span className="ml-2 text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(212,160,23,0.15)', color: '#D4A017' }}>
              Save 2 months
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-5 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-8 relative ${tier.recommended ? 'border-2' : 'border'}`}
              style={{
                background: '#FFFFFF',
                borderColor: tier.recommended ? '#D4A017' : '#E8E6E0',
                boxShadow: tier.recommended ? '0 8px 32px rgba(212,160,23,0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs px-4 py-1.5 rounded-full font-medium" style={{ background: '#D4A017', color: '#fff' }}>
                    RECOMMENDED
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
                  {tier.name}
                </h3>
                <p className="text-sm" style={{ color: '#6B6B63' }}>
                  {tier.target}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-light" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                    {formatPrice(getPrice(tier))}
                  </span>
                  <span className="ml-2 text-sm" style={{ color: '#6B6B63' }}>
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <p className="text-sm" style={{ color: '#6B6B63' }}>
                  {tier.includedDeals} deal{tier.includedDeals > 1 ? 's' : ''} included
                </p>
                <p className="text-xs mt-1" style={{ color: '#8A8880' }}>
                  + {formatPrice(tier.overagePrice)} per additional deal
                </p>
              </div>

              <Link
                href="/signup"
                className={`block w-full h-12 rounded-lg text-sm font-medium flex items-center justify-center mb-6 transition-colors ${
                  tier.recommended ? '' : 'border'
                }`}
                style={
                  tier.recommended
                    ? { background: '#D4A017', color: '#fff' }
                    : { borderColor: '#E8E6E0', color: '#4A4A45', background: 'transparent' }
                }
              >
                Start Free Trial
              </Link>

              <ul className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm" style={{ color: '#4A4A45' }}>
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="#4A7C59" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl mb-12 text-center" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'What counts as a "deal"?',
                a: 'Each contract generation counts as one deal. Regenerations and revisions to the same contract are free.',
              },
              {
                q: 'What happens if I exceed my included deals?',
                a: 'You can continue using Closeware. Overage deals are billed at the end of your billing period at the published rate.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Your subscription remains active until the end of your billing period. No refunds for partial months.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'Bank transfer and Paystack (for online payments). Invoices are sent monthly with 30-day payment terms.',
              },
              {
                q: 'Is VAT included?',
                a: 'No. Prices are exclusive of 7.5% VAT (Nigerian tax). VAT will be added to your invoice.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="rounded-xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E8E6E0' }}>
                <h3 className="font-medium mb-2" style={{ color: '#1A1A18' }}>
                  {faq.q}
                </h3>
                <p className="text-sm" style={{ color: '#6B6B63' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center rounded-2xl p-12" style={{ background: '#F5F3EE' }}>
          <h2 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Ready to get started?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B6B63' }}>
            Start your 30-day free trial today. No credit card required.
          </p>
          <Link href="/signup" className="inline-flex items-center h-12 px-8 rounded-lg text-sm font-medium" style={{ background: '#D4A017', color: '#fff' }}>
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
