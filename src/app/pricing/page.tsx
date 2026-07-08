'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const pricingTiers = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for trying Closeware',
      monthlyPrice: 0,
      yearlyPrice: 0,
      dealLimit: billingPeriod === 'monthly' ? 2 : 24,
      features: [
        '2 deals per month',
        'Contract generation',
        'Instant verification',
        'Internal review workflow',
        'Digital signatures',
        'Complete audit trail',
        'Court-admissible export',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For individuals and small teams',
      monthlyPrice: 99,
      yearlyPrice: 950,
      dealLimit: billingPeriod === 'monthly' ? 20 : 240,
      savings: 238,
      features: [
        '20 deals per month',
        'Everything in Free',
        'Priority support',
        'Unlimited revisions per deal',
        'Advanced analytics',
        'Export templates',
      ],
      recommended: true,
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For growing businesses',
      monthlyPrice: 299,
      yearlyPrice: 2850,
      dealLimit: billingPeriod === 'monthly' ? 100 : 1200,
      savings: 738,
      features: [
        '100 deals per month',
        'Everything in Pro',
        'Team collaboration (multiple users)',
        'Role-based permissions',
        'Dedicated account manager',
        'Custom contract templates',
        'Monthly strategy calls',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: null,
      yearlyPrice: null,
      dealLimit: null,
      features: [
        'Unlimited deals',
        'Everything in Team',
        'Custom integrations',
        'API access',
        'SLA guarantee (24hr response)',
        'White-glove onboarding',
        'Custom compliance requirements',
        'Dedicated infrastructure',
      ],
      contactSales: true,
    },
  ];

  const getPrice = (tier: typeof pricingTiers[0]) => {
    if (tier.contactSales) return 'Custom';
    const price = billingPeriod === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice;
    return price === 0 ? 'Free' : `$${price?.toLocaleString()}`;
  };

  const getPeriodLabel = () => {
    return billingPeriod === 'monthly' ? '/month' : '/year';
  };

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      <Header />

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-5 pt-24 pb-12 text-center">
        <h1 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl mb-8" style={{ color: '#6B6B63' }}>
          Choose the plan that fits your needs. Upgrade or downgrade anytime.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 p-1 rounded-xl" style={{ background: '#F5F3EE' }}>
          <button
            onClick={() => setBillingPeriod('monthly')}
            className="px-6 py-2.5 text-sm font-medium rounded-lg transition-all"
            style={{
              background: billingPeriod === 'monthly' ? '#fff' : 'transparent',
              color: billingPeriod === 'monthly' ? '#1A1A18' : '#6B6B63',
              boxShadow: billingPeriod === 'monthly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className="px-6 py-2.5 text-sm font-medium rounded-lg transition-all relative"
            style={{
              background: billingPeriod === 'yearly' ? '#fff' : 'transparent',
              color: billingPeriod === 'yearly' ? '#1A1A18' : '#6B6B63',
              boxShadow: billingPeriod === 'yearly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            Yearly
            <span
              className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: '#D4A017', color: '#fff' }}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-5 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-8 relative flex flex-col ${tier.recommended ? 'border-2' : 'border'}`}
              style={{
                background: '#FFFFFF',
                borderColor: tier.recommended ? '#D4A017' : '#E8E6E0',
                boxShadow: tier.recommended ? '0 8px 32px rgba(212,160,23,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs px-4 py-1.5 rounded-full font-medium" style={{ background: '#D4A017', color: '#fff' }}>
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
                  {tier.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: '#6B6B63' }}>
                  {tier.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-baseline mb-1">
                    <span className="text-4xl font-light" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                      {getPrice(tier)}
                    </span>
                    {!tier.contactSales && tier.monthlyPrice !== 0 && (
                      <span className="ml-2 text-sm" style={{ color: '#6B6B63' }}>
                        {getPeriodLabel()}
                      </span>
                    )}
                  </div>

                  {tier.savings && billingPeriod === 'yearly' && (
                    <p className="text-xs" style={{ color: '#4A7C59' }}>
                      Save ${tier.savings}/year
                    </p>
                  )}

                  {tier.dealLimit && (
                    <p className="text-sm mt-2" style={{ color: '#8A8880' }}>
                      {tier.dealLimit} deals{billingPeriod === 'yearly' ? '/year' : '/month'}
                    </p>
                  )}
                  {tier.dealLimit === null && (
                    <p className="text-sm mt-2" style={{ color: '#8A8880' }}>
                      Unlimited deals
                    </p>
                  )}
                </div>
              </div>

              <Link
                href={tier.contactSales ? '/contact' : '/register'}
                className={`block w-full h-12 rounded-lg text-sm font-medium flex items-center justify-center mb-6 transition-colors ${
                  tier.recommended ? '' : 'border'
                }`}
                style={
                  tier.recommended
                    ? { background: '#D4A017', color: '#fff' }
                    : { borderColor: '#E8E6E0', color: '#4A4A45', background: 'transparent' }
                }
              >
                {tier.contactSales ? 'Contact Sales' : tier.id === 'free' ? 'Get Started Free' : 'Start Free Trial'}
              </Link>

              <ul className="space-y-3 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm" style={{ color: '#4A4A45' }}>
                    <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="#4A7C59" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-24">
          <h2 className="text-3xl mb-12 text-center" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Compare Plans
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr style={{ background: '#F5F3EE' }}>
                  <th className="text-left p-4 text-sm font-medium" style={{ color: '#1A1A18' }}>Feature</th>
                  <th className="text-center p-4 text-sm font-medium" style={{ color: '#1A1A18' }}>Free</th>
                  <th className="text-center p-4 text-sm font-medium" style={{ color: '#1A1A18' }}>Pro</th>
                  <th className="text-center p-4 text-sm font-medium" style={{ color: '#1A1A18' }}>Team</th>
                  <th className="text-center p-4 text-sm font-medium" style={{ color: '#1A1A18' }}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Deals per month', free: '2', pro: '20', team: '100', enterprise: 'Unlimited' },
                  { feature: 'Contract generation', free: true, pro: true, team: true, enterprise: true },
                  { feature: 'Instant verification', free: true, pro: true, team: true, enterprise: true },
                  { feature: 'Digital signatures', free: true, pro: true, team: true, enterprise: true },
                  { feature: 'Audit trail export', free: true, pro: true, team: true, enterprise: true },
                  { feature: 'Priority support', free: false, pro: true, team: true, enterprise: true },
                  { feature: 'Team collaboration', free: false, pro: false, team: true, enterprise: true },
                  { feature: 'Custom templates', free: false, pro: false, team: true, enterprise: true },
                  { feature: 'Dedicated account manager', free: false, pro: false, team: true, enterprise: true },
                  { feature: 'API access', free: false, pro: false, team: false, enterprise: true },
                  { feature: 'SLA guarantee', free: false, pro: false, team: false, enterprise: true },
                  { feature: 'Custom integrations', free: false, pro: false, team: false, enterprise: true },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E8E6E0' }}>
                    <td className="p-4 text-sm" style={{ color: '#4A4A45' }}>{row.feature}</td>
                    <td className="p-4 text-sm text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <svg className="w-5 h-5 mx-auto" fill="none" stroke="#4A7C59" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span style={{ color: '#D5D3CC' }}>—</span>
                        )
                      ) : (
                        <span style={{ color: '#1A1A18' }}>{row.free}</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-center">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <svg className="w-5 h-5 mx-auto" fill="none" stroke="#4A7C59" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span style={{ color: '#D5D3CC' }}>—</span>
                        )
                      ) : (
                        <span style={{ color: '#1A1A18' }}>{row.pro}</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-center">
                      {typeof row.team === 'boolean' ? (
                        row.team ? (
                          <svg className="w-5 h-5 mx-auto" fill="none" stroke="#4A7C59" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span style={{ color: '#D5D3CC' }}>—</span>
                        )
                      ) : (
                        <span style={{ color: '#1A1A18' }}>{row.team}</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <svg className="w-5 h-5 mx-auto" fill="none" stroke="#4A7C59" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span style={{ color: '#D5D3CC' }}>—</span>
                        )
                      ) : (
                        <span style={{ color: '#1A1A18' }}>{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl mb-12 text-center" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'What happens if I hit my deal limit?',
                a: 'You\'ll be prompted to upgrade to a higher tier. Don\'t worry - your existing deals remain accessible, you just can\'t create new ones until you upgrade or wait for your next billing period.',
              },
              {
                q: 'Can I change plans anytime?',
                a: 'Yes! Upgrade instantly at any time. If you downgrade, the change takes effect at the end of your current billing period.',
              },
              {
                q: 'What counts as a "deal"?',
                a: 'Each unique contract/agreement counts as one deal. You can revise and regenerate the same deal unlimited times - it only counts once.',
              },
              {
                q: 'Do yearly plans save money?',
                a: 'Yes! Yearly plans save ~20% compared to paying monthly. Pro yearly is $950 (vs $1,188 monthly), Team yearly is $2,850 (vs $3,588 monthly).',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! All paid plans come with a 30-day free trial. No credit card required to start. The Free plan is always free with no trial needed.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'Credit card, debit card, and bank transfer. Enterprise customers can request invoicing with NET 30 payment terms.',
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
            Start with our free plan. No credit card required. Upgrade anytime.
          </p>
          <Link href="/register" className="inline-flex items-center h-12 px-8 rounded-lg text-sm font-medium" style={{ background: '#D4A017', color: '#fff' }}>
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
