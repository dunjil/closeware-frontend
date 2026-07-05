'use client';

import Link from 'next/link';
import Header from '@/components/Header';

export default function PricingPage() {
  // Pay-per-deal tiers (tiered by complexity)
  const dealTiers = [
    {
      name: 'Simple Contracts',
      price: 500,
      examples: ['NDAs', 'Service agreements', 'Simple sales contracts'],
      features: [
        'Contract generation from deal trail',
        'Instant verification',
        'Internal review workflow',
        'Digital signatures',
        'Complete audit trail',
        'Court-admissible export',
      ],
    },
    {
      name: 'Property Acquisitions',
      price: 2500,
      examples: ['Real estate purchases', 'Commercial property', 'Land acquisitions'],
      features: [
        'All Simple Contract features',
        'Title document verification',
        'Multi-party coordination',
        'External collaborator access',
        'Priority support',
      ],
      recommended: true,
    },
    {
      name: 'M&A & Joint Ventures',
      price: 10000,
      examples: ['Corporate acquisitions', 'Joint venture agreements', 'Multi-entity deals'],
      features: [
        'All Property Acquisition features',
        'Complex multi-party negotiations',
        'Due diligence document tracking',
        'Custom contract templates',
        'Dedicated account support',
      ],
    },
  ];

  // Prepaid deal packs (for high-volume customers)
  const prepaidPacks = [
    {
      name: 'Starter Pack',
      deals: 5,
      price: 11000,
      regularPrice: 12500,
      savings: 'Save $1,500',
      features: [
        '5 deals (any type)',
        'Valid for 12 months',
        'Priority support',
        'Quarterly check-ins',
      ],
      bestFor: 'Small teams doing 5-10 deals/year',
    },
    {
      name: 'Growth Pack',
      deals: 15,
      price: 30000,
      regularPrice: 37500,
      savings: 'Save $7,500',
      features: [
        '15 deals (any type)',
        'Valid for 12 months',
        'Priority support',
        'Monthly strategy calls',
        'Dedicated success manager',
      ],
      bestFor: 'Mid-market teams doing 15-25 deals/year',
      recommended: true,
    },
    {
      name: 'Enterprise Pack',
      deals: 50,
      price: 90000,
      regularPrice: 125000,
      savings: 'Save $35,000',
      features: [
        '50 deals (any type)',
        'Valid for 12 months',
        'Dedicated account manager',
        'SLA guarantee (24hr response)',
        'Custom integrations',
        'White-glove onboarding',
      ],
      bestFor: 'Large enterprises & PE funds doing 50+ deals/year',
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      <Header />

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-5 pt-24 pb-16 text-center">
        <h1 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl mb-4" style={{ color: '#6B6B63' }}>
          Pay per deal. No monthly fees. No credit card required to start.
        </p>
        <p className="text-base" style={{ color: '#8A8880' }}>
          30-day free trial • Cancel anytime • All prices in USD
        </p>
      </div>

      {/* Pay-Per-Deal Pricing */}
      <div className="max-w-7xl mx-auto px-5 pb-24">
        <div className="mb-16">
          <h2 className="text-3xl mb-3 text-center" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Pay Per Deal
          </h2>
          <p className="text-center text-base mb-12" style={{ color: '#6B6B63' }}>
            One flat fee per contract. Pricing based on deal complexity.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {dealTiers.map((tier) => (
              <div
                key={tier.name}
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
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline mb-3">
                    <span className="text-5xl font-light" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                      ${tier.price.toLocaleString()}
                    </span>
                    <span className="ml-2 text-sm" style={{ color: '#6B6B63' }}>
                      per deal
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#8A8880' }}>Examples:</p>
                    {tier.examples.map((example, idx) => (
                      <p key={idx} className="text-sm mb-1" style={{ color: '#6B6B63' }}>
                        • {example}
                      </p>
                    ))}
                  </div>
                </div>

                <Link
                  href="/register"
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
        </div>

        {/* Prepaid Deal Packs */}
        <div className="mt-32 mb-16">
          <h2 className="text-3xl mb-3 text-center" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Prepaid Deal Packs
          </h2>
          <p className="text-center text-base mb-12" style={{ color: '#6B6B63' }}>
            For high-volume customers. Pay upfront and save on every deal.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {prepaidPacks.map((pack) => (
              <div
                key={pack.name}
                className={`rounded-2xl p-8 relative ${pack.recommended ? 'border-2' : 'border'}`}
                style={{
                  background: '#FFFFFF',
                  borderColor: pack.recommended ? '#D4A017' : '#E8E6E0',
                  boxShadow: pack.recommended ? '0 8px 32px rgba(212,160,23,0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {pack.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs px-4 py-1.5 rounded-full font-medium" style={{ background: '#D4A017', color: '#fff' }}>
                      BEST VALUE
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
                    {pack.name}
                  </h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-5xl font-light" style={{ fontFamily: 'var(--font-mono)', color: '#1A1A18' }}>
                      ${pack.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-medium" style={{ background: 'rgba(74, 124, 89, 0.1)', color: '#4A7C59' }}>
                      {pack.savings}
                    </div>
                  </div>
                  <p className="text-xs line-through mb-1" style={{ color: '#8A8880' }}>
                    Regular: ${pack.regularPrice.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium mb-3" style={{ color: '#1A1A18' }}>
                    {pack.deals} deals included
                  </p>
                  <p className="text-xs" style={{ color: '#6B6B63' }}>
                    {pack.bestFor}
                  </p>
                </div>

                <Link
                  href="/register"
                  className={`block w-full h-12 rounded-lg text-sm font-medium flex items-center justify-center mb-6 transition-colors ${
                    pack.recommended ? '' : 'border'
                  }`}
                  style={
                    pack.recommended
                      ? { background: '#D4A017', color: '#fff' }
                      : { borderColor: '#E8E6E0', color: '#4A4A45', background: 'transparent' }
                  }
                >
                  {pack.deals >= 50 ? 'Contact Sales' : 'Get Started'}
                </Link>

                <ul className="space-y-3">
                  {pack.features.map((feature, idx) => (
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
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl mb-12 text-center" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'How does pay-per-deal pricing work?',
                a: 'You only pay when you generate and close a deal. No monthly fees, no recurring charges. Just a one-time fee per contract based on deal complexity.',
              },
              {
                q: 'What counts as a "deal"?',
                a: 'Each contract generation counts as one deal. Regenerations and revisions to the same contract are free. You only pay once per deal, regardless of how many iterations.',
              },
              {
                q: 'What are prepaid deal packs?',
                a: 'Prepaid packs let you pay upfront for multiple deals at a discounted rate. For example, the Growth Pack includes 15 deals for $30,000 (normally $37,500), saving you $7,500. Packs are valid for 12 months and work with any deal type.',
              },
              {
                q: 'When do I get charged?',
                a: 'You are charged when you mark a contract as "ready for signature" or when all parties sign. If you abandon a deal before this stage, you are not charged.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'Credit card, bank transfer, and wire transfer. Enterprise customers can request invoicing with NET 30 payment terms. All billing is in USD.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Pay-per-deal has no commitment. Annual subscriptions can be cancelled with 30 days notice. Unused funds are not refunded.',
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
            Start your 30-day free trial. No credit card required. No monthly fees.
          </p>
          <Link href="/register" className="inline-flex items-center h-12 px-8 rounded-lg text-sm font-medium" style={{ background: '#D4A017', color: '#fff' }}>
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
