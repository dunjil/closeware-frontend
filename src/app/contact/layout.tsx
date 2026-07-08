import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Closeware | Get in Touch',
  description: 'Contact Closeware for M&A contract management support. Email: info@closeware.com | Phone: +234 810 062 0010 | Business hours: Mon-Fri 9am-6pm WAT.',
  keywords: [
    'contact closeware',
    'closeware support',
    'M&A contract support',
    'closeware email',
    'closeware phone',
    'customer support'
  ],
  openGraph: {
    title: 'Contact Us - Closeware',
    description: 'Get in touch with our team. Email: info@closeware.com | Phone: +234 810 062 0010',
    url: 'https://closeware.com/contact',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Closeware',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us - Closeware',
    description: 'Get in touch with our team for M&A contract management support.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
