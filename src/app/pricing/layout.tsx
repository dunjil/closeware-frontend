import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Closeware | Simple Monthly & Yearly Plans',
  description: 'Simple subscription pricing for M&A contract management. Free tier with 2 deals/month, Pro at $99/month (20 deals), Team at $299/month (100 deals). No hidden fees.',
  keywords: [
    'closeware pricing',
    'contract management pricing',
    'M&A software pricing',
    'deal management cost',
    'subscription pricing',
    'contract platform pricing'
  ],
  openGraph: {
    title: 'Pricing - Closeware | Simple Monthly & Yearly Plans',
    description: 'Free tier with 2 deals/month. Pro at $99/month. Team at $299/month. No hidden fees, cancel anytime.',
    url: 'https://closeware.com/pricing',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Closeware Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Closeware',
    description: 'Simple subscription pricing. Free tier, Pro at $99/month, Team at $299/month.',
    images: ['/og-image.png'],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
