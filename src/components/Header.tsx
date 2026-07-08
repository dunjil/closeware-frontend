'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50" style={{ background: "rgba(250,249,246,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid #E8E6E0" }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <Image
              src="/logo.svg"
              alt="Closeware"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            <span className="text-[26px] font-light tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Close<span style={{ color: "#D4A017" }} className="font-medium">ware</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 sm:gap-5">
            <Link
              href="/#how-it-works"
              className="text-sm"
              style={{ color: "#4A4A45" }}
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className="text-sm"
              style={{
                color: isActive('/pricing') ? "#D4A017" : "#4A4A45",
                fontWeight: isActive('/pricing') ? 500 : 400
              }}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-sm"
              style={{
                color: isActive('/contact') ? "#D4A017" : "#4A4A45",
                fontWeight: isActive('/contact') ? 500 : 400
              }}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="text-sm px-3 py-2"
              style={{ color: "#4A4A45" }}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm rounded-lg font-medium"
              style={{ background: "#1A1A18", color: "#fff" }}
            >
              Get started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="#1A1A18"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden"
            style={{
              background: "#FAF9F6",
              borderTop: "1px solid #E8E6E0",
            }}
          >
            <div className="px-6 py-4 space-y-3">
              <Link
                href="/#how-it-works"
                className="block py-2 text-sm"
                style={{ color: "#4A4A45" }}
                onClick={closeMobileMenu}
              >
                How it works
              </Link>
              <Link
                href="/pricing"
                className="block py-2 text-sm"
                style={{
                  color: isActive('/pricing') ? "#D4A017" : "#4A4A45",
                  fontWeight: isActive('/pricing') ? 500 : 400
                }}
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-sm"
                style={{
                  color: isActive('/contact') ? "#D4A017" : "#4A4A45",
                  fontWeight: isActive('/contact') ? 500 : 400
                }}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="block py-2 text-sm"
                style={{ color: "#4A4A45" }}
                onClick={closeMobileMenu}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="block w-full py-3 text-sm text-center rounded-lg font-medium"
                style={{ background: "#1A1A18", color: "#fff" }}
                onClick={closeMobileMenu}
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          style={{ top: '65px' }}
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
