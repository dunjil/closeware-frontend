import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Closeware | Data Protection & Privacy',
  description: 'Closeware Privacy Policy. Learn how we collect, use, and protect your data. GDPR compliant. 7-year audit trail retention for legal compliance.',
  keywords: [
    'closeware privacy policy',
    'data protection',
    'GDPR compliance',
    'privacy',
    'data security',
    'audit trail retention'
  ],
  openGraph: {
    title: 'Privacy Policy - Closeware',
    description: 'Learn how we protect your data. GDPR compliant with 7-year audit trail retention.',
    url: 'https://closeware.com/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Closeware',
    description: 'Learn how we protect your data and ensure compliance.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
