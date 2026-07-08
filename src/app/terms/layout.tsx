import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Closeware | Legal Terms & Conditions',
  description: 'Closeware Terms of Service. Subscription pricing, 30-day trial, refund policy, and legal terms for our M&A contract management platform.',
  keywords: [
    'closeware terms of service',
    'terms and conditions',
    'legal terms',
    'subscription terms',
    'contract management terms',
    'user agreement'
  ],
  openGraph: {
    title: 'Terms of Service - Closeware',
    description: 'Read our Terms of Service for subscription, usage, and legal terms.',
    url: 'https://closeware.com/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service - Closeware',
    description: 'Legal terms and conditions for using Closeware.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
