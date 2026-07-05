import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Closeware - Track Every Change. Sign With Confidence.",
  description: "Complete M&A contract platform with comprehensive audit trail. Generate, verify, review, and sign—with complete documentation for compliance and disputes. Court-admissible export for legal proceedings.",
  keywords: [
    "M&A contract management",
    "audit trail",
    "contract verification",
    "legal compliance",
    "deal management",
    "contract audit trail",
    "court-admissible documentation",
    "M&A workflow",
    "contract lifecycle management",
    "digital signatures",
    "compliance documentation"
  ],
  authors: [{ name: "Closeware" }],
  creator: "Closeware",
  publisher: "Closeware",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://closeware.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Closeware - Track Every Change. Sign With Confidence.",
    description: "Complete M&A contract platform with comprehensive audit trail. Generate, verify, review, and sign—with complete documentation for compliance and disputes.",
    url: 'https://closeware.com',
    siteName: 'Closeware',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Closeware - Complete M&A Contract Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Closeware - Track Every Change. Sign With Confidence.",
    description: "Complete M&A contract platform with comprehensive audit trail. Court-admissible documentation for high-stakes deals.",
    images: ['/og-image.png'],
    creator: '@closeware',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
