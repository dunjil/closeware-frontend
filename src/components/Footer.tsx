import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t mt-16" style={{ borderColor: '#E8E6E0', background: '#F5F3EE' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              Close<span style={{ color: '#D4A017' }}>ware</span>
            </h3>
            <p className="text-sm" style={{ color: '#6B6B63' }}>
              Complete M&A contract platform with comprehensive audit trail.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#1A1A18' }}>Product</h4>
            <ul className="space-y-2 text-sm" style={{ color: '#6B6B63' }}>
              <li>
                <Link href="/pricing" className="hover:text-[#4A4A45] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#4A4A45] transition-colors">
                  How it works
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#1A1A18' }}>Legal</h4>
            <ul className="space-y-2 text-sm" style={{ color: '#6B6B63' }}>
              <li>
                <Link href="/terms" className="hover:text-[#4A4A45] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#4A4A45] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#1A1A18' }}>Contact</h4>
            <ul className="space-y-2 text-sm" style={{ color: '#6B6B63' }}>
              <li>
                <Link href="/contact" className="hover:text-[#4A4A45] transition-colors">
                  Get in touch
                </Link>
              </li>
              <li>
                <a href="mailto:info@closeware.com" className="hover:text-[#4A4A45] transition-colors">
                  info@closeware.com
                </a>
              </li>
              <li>
                <a href="tel:+2348100620010" className="hover:text-[#4A4A45] transition-colors">
                  +234 810 062 0010
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs" style={{ borderTop: '1px solid #E8E6E0', color: '#8A8880' }}>
          © {new Date().getFullYear()} Closeware. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
