"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

/* ═══════════════════════════════════════════════════════════
   ANIMATED DOCUMENT PREVIEW
   ═══════════════════════════════════════════════════════════ */
const STEPS = [
  { delay: 400 },   // header
  { delay: 900 },   // parties
  { delay: 1400 },  // asset
  { delay: 1900 },  // price
  { delay: 2500 },  // clause 1
  { delay: 3100 },  // clause 2
  { delay: 3800 },  // signatory 1
  { delay: 4400 },  // signatory 2
  { delay: 4900 },  // signature animation buyer
  { delay: 5400 },  // signature animation seller
  { delay: 5900 },  // verified badge
];

function AnimatedDocument() {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const run = () => {
      setStep(-1);
      STEPS.forEach((s, i) => setTimeout(() => setStep(i), s.delay));
    };
    run();
    const id = setInterval(run, 10000);
    return () => clearInterval(id);
  }, []);

  const show = (i: number) =>
    step >= i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5";

  return (
    <div className="bg-white rounded-xl shadow-2xl shadow-black/8 ring-1 ring-black/[0.04] w-full max-w-[400px] sm:max-w-[650px] overflow-hidden">
      {/* Letterhead */}
      <div className={`bg-[#1A1A18] px-6 py-3 flex items-center gap-3 transition-all duration-500 ease-out ${show(0)}`}>
        <div className="w-1 h-8 bg-[#D4A017] rounded-full flex-shrink-0" />
        <div>
          <p className="text-white font-semibold text-sm tracking-wide">RADIC TECHNOLOGIES</p>
          <p className="text-[#8A8880] text-[11px]">Sale & Purchase Agreement · Corporate M&A</p>
        </div>
      </div>

      <div className="px-6 pt-4 pb-3 space-y-3">
        {/* Parties */}
        <div className={`transition-all duration-500 ease-out ${show(1)}`}>
          <p className="text-[10px] text-[#8A8880] uppercase tracking-wider mb-1">Parties to this Agreement</p>
          <p className="text-sm font-semibold text-[#1A1A18]">RADIC TECHNOLOGIES LIMITED</p>
          <p className="text-[11px] text-[#4A4A45] mb-2">RC 1234567 · The Buyer</p>
          <p className="text-sm font-semibold text-[#1A1A18]">SUMMIT PROPERTIES HOLDINGS PLC</p>
          <p className="text-[11px] text-[#4A4A45]">RC 7654321 · The Seller</p>
        </div>

        {/* Asset */}
        <div className={`transition-all duration-500 ease-out ${show(2)}`}>
          <p className="text-[10px] text-[#8A8880] uppercase tracking-wider mb-1">Asset Description</p>
          <p className="text-sm font-medium text-[#1A1A18]">Prime Commercial Office Complex</p>
          <p className="text-[11px] text-[#4A4A45]">Tower A, Plot 42, Eko Atlantic City, Lagos · Title LA/EAC/2024/1847</p>
        </div>

        {/* Price */}
        <div className={`transition-all duration-500 ease-out ${show(3)}`}>
          <p className="text-[10px] text-[#8A8880] uppercase tracking-wider mb-1">Purchase Consideration</p>
          <p className="text-sm font-semibold font-mono text-[#1A1A18]">₦2,850,000,000.00</p>
          <p className="text-[11px] text-[#4A4A45]">Two Billion, Eight Hundred and Fifty Million Naira</p>
        </div>

        {/* Clause snippets */}
        <div className={`space-y-1.5 pt-1 transition-all duration-500 ease-out ${show(4)}`} style={{ borderTop: "1px solid #F5F3EE" }}>
          <p className="text-[10px] font-semibold text-[#1A1A18] uppercase tracking-wider">3. Payment Terms</p>
          <p className="text-[11px] text-[#6B6B63] leading-relaxed">The Purchase Price shall be paid in three instalments: (i) 40% upon execution, (ii) 30% upon completion of due diligence, and (iii) 30% upon transfer of title…</p>
        </div>

        <div className={`space-y-1.5 transition-all duration-500 ease-out ${show(5)}`}>
          <p className="text-[10px] font-semibold text-[#1A1A18] uppercase tracking-wider">7. Completion Date</p>
          <p className="text-[11px] text-[#6B6B63] leading-relaxed">Completion shall occur no later than <strong>sixty (60) days</strong> from the date of this Agreement, subject to conditions precedent outlined in Schedule A…</p>
        </div>

        {/* Signatories */}
        <div className={`grid grid-cols-2 gap-4 pt-3 transition-all duration-500 ease-out ${show(6)}`} style={{ borderTop: "1px solid #F5F3EE" }}>
          <div>
            <p className="text-[9px] text-[#8A8880] uppercase tracking-wider mb-1">For the Buyer</p>
            <div className="border-b border-[#1A1A18] pb-1 mb-1 min-h-[28px] relative overflow-hidden">
              {step >= 8 && (
                <svg viewBox="0 0 120 30" className="absolute inset-0 w-full h-full animate-draw-signature">
                  <path
                    d="M5,20 Q15,5 25,15 T45,18 Q55,12 65,20"
                    fill="none"
                    stroke="#1A1A18"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="100"
                    strokeDashoffset="100"
                    style={{ animation: 'draw 0.8s ease-out forwards' }}
                  />
                </svg>
              )}
            </div>
            <p className="text-[10px] font-medium text-[#1A1A18]">OKORO, C. N.</p>
            <p className="text-[9px] text-[#6B6B63]">Chief Executive Officer</p>
          </div>
          <div className={`transition-all duration-500 ease-out ${show(7)}`}>
            <p className="text-[9px] text-[#8A8880] uppercase tracking-wider mb-1">For the Seller</p>
            <div className="border-b border-[#1A1A18] pb-1 mb-1 min-h-[28px] relative overflow-hidden">
              {step >= 9 && (
                <svg viewBox="0 0 120 30" className="absolute inset-0 w-full h-full">
                  <path
                    d="M10,15 Q20,8 30,15 T50,16 Q60,10 70,15 T90,18"
                    fill="none"
                    stroke="#1A1A18"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="120"
                    strokeDashoffset="120"
                    style={{ animation: 'draw 0.8s ease-out forwards' }}
                  />
                </svg>
              )}
            </div>
            <p className="text-[10px] font-medium text-[#1A1A18]">ADEBAYO, O. K.</p>
            <p className="text-[9px] text-[#6B6B63]">Managing Director</p>
          </div>
        </div>

        {/* Status */}
        <div className={`flex items-center justify-between pb-3 transition-all duration-600 ease-out ${show(10)}`}>
          <p className="text-[10px] text-[#8A8880]">RADIC-REIGN-2026-042 · Closeware</p>
          <span className="text-[10px] font-semibold text-[#4A7C59] bg-[rgba(74,124,89,0.08)] px-3 py-1 rounded-full uppercase tracking-wider">Verified</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Closeware",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Complete M&A contract platform with comprehensive audit trail. Generate, verify, review, and sign contracts with complete documentation for compliance and disputes.",
    "operatingSystem": "Web",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": "1"
    },
    "featureList": [
      "Contract Generation",
      "Contract Verification",
      "Internal Review Workflows",
      "Complete Audit Trail",
      "External Collaboration",
      "Digital Signatures",
      "Court-Admissible Export"
    ]
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF9F6" }}>
      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50" style={{ background: "rgba(250,249,246,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid #E8E6E0" }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-[26px] font-light tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Close<span style={{ color: "#D4A017" }} className="font-medium">ware</span>
          </Link>
          <div className="flex items-center gap-5">
            <a href="#how-it-works" className="text-sm hidden sm:inline" style={{ color: "#4A4A45" }}>How it works</a>
            <a href="#pricing" className="text-sm hidden sm:inline" style={{ color: "#4A4A45" }}>Use cases</a>
            <Link href="/login" className="text-sm px-3 py-2" style={{ color: "#4A4A45" }}>Sign in</Link>
            <Link href="/register" className="px-4 py-2 text-sm rounded-lg font-medium" style={{ background: "#1A1A18", color: "#fff" }}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-[100dvh] flex items-center pt-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 w-full py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-in">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "#D4A017" }}>
                Complete M&A Contract Platform
              </p>
              <h1 className="text-[2.6rem] sm:text-[3.5rem] lg:text-[4rem] leading-[1.05] tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}>
                Track every change.
                <br />
                <span style={{ color: "#D4A017" }}>Sign with confidence.</span>
              </h1>
              <p className="text-base sm:text-lg mt-6 sm:mt-8 leading-relaxed max-w-sm" style={{ color: "#4A4A45", fontFamily: "var(--font-body)" }}>
                Complete M&A contract workflow with comprehensive audit trail. Generate, verify, review, and sign—with complete documentation for compliance and disputes.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
                <Link href="/register" className="h-12 sm:h-[52px] px-6 sm:px-8 text-sm sm:text-[15px] font-medium rounded-lg inline-flex items-center justify-center hover:scale-[1.02] transition-transform" style={{ background: "#D4A017", color: "#fff" }}>
                  Start your first deal
                </Link>
                <a href="#how-it-works" className="h-12 sm:h-[52px] px-6 text-sm inline-flex items-center justify-center rounded-lg border" style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}>
                  See how it works
                </a>
              </div>
              <p className="text-xs mt-4" style={{ color: "#8A8880" }}>Free 14-day trial. No credit card required.</p>
            </div>

            <div className="flex justify-center lg:justify-end animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="transform sm:rotate-[1.5deg] sm:hover:rotate-0 transition-transform duration-700 ease-out">
                <AnimatedDocument />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20" style={{ borderTop: "1px solid #E8E6E0", background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-light mb-2" style={{ fontFamily: "var(--font-mono)", color: "#D4A017" }}>$500M+</div>
              <p className="text-sm" style={{ color: "#6B6B63" }}>Deal value verified</p>
            </div>
            <div>
              <div className="text-5xl font-light mb-2" style={{ fontFamily: "var(--font-mono)", color: "#D4A017" }}>100%</div>
              <p className="text-sm" style={{ color: "#6B6B63" }}>Accuracy guarantee</p>
            </div>
            <div>
              <div className="text-5xl font-light mb-2" style={{ fontFamily: "var(--font-mono)", color: "#D4A017" }}>&lt;5min</div>
              <p className="text-sm" style={{ color: "#6B6B63" }}>Average verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 sm:py-28" style={{ borderTop: "1px solid #E8E6E0" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <h2 className="text-center text-3xl sm:text-4xl tracking-tight mb-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
            Verify your contract against reality.
          </h2>
          <p className="text-center text-sm sm:text-base mb-12 sm:mb-16" style={{ color: "#6B6B63" }}>
            Upload what you already have. See every discrepancy. Fix what doesn't match.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload your deal trail",
                body: "Upload emails, offer letters, counter-offers, and supporting documents. Everything organized in one place.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )
              },
              {
                step: "02",
                title: "Generate or upload your contract",
                body: "Generate a complete contract from your deal trail, or upload your existing draft (Word, PDF, Google Doc). We work with both.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              {
                step: "03",
                title: "Get instant verification",
                body: "See what matched, what's flagged, what's missing. Every discrepancy shown with suggested fixes. Apply fixes or regenerate your contract instantly.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-xl ring-1 bg-white hover:shadow-lg transition-all duration-500 animate-fade-in"
                style={{
                  borderColor: "#E8E6E0",
                  animationDelay: `${i * 150}ms`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                }}
              >
                {/* Step number above title */}
                <div className="mb-4">
                  <span
                    className="text-5xl block leading-none"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "rgba(212,160,23,0.25)",
                      fontWeight: 600
                    }}
                  >
                    {item.step}
                  </span>
                </div>

                {/* Icon with animation */}
                <div
                  className="mb-5 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: "#D4A017" }}
                >
                  {item.icon}
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="text-lg font-semibold mb-3 leading-tight"
                    style={{ color: "#1A1A18" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6B6B63" }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Platform Features */}
      <section className="py-16 sm:py-28" style={{ borderTop: "1px solid #E8E6E0", background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl tracking-tight mb-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
              Built for the complete deal lifecycle.
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: "#6B6B63" }}>
              From first offer to final signature, Closeware handles your entire M&A and asset acquisition workflow in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Contract Generation",
                body: "Generate complete SPAs, NDAs, and JV agreements from your deal trail. Or upload existing drafts—we work with both.",
                icon: (
                  <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "Instant Verification",
                body: "Every clause cross-checked against your complete correspondence and document trail. See what matched, what's flagged, what's missing.",
                icon: (
                  <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Internal Review Workflows",
                body: "Route contracts to legal, finance, and exec for approval. Track who reviewed, when, and what comments they made.",
                icon: (
                  <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Complete Audit Trail",
                body: "Every status change, review, and signature tracked with timestamps, IP addresses, and reasons. Built for disputes and compliance.",
                icon: (
                  <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                )
              },
              {
                title: "External Collaboration",
                body: "Invite counterparties to review drafts. Share documents securely. Manage revisions. No more email chaos.",
                icon: (
                  <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Digital Signatures",
                body: "Secure e-signature workflow with expiry tracking, automatic reminders, and completion notifications.",
                icon: (
                  <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                )
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 sm:p-8 rounded-xl ring-1 bg-white hover:shadow-lg transition-all duration-500 animate-fade-in"
                style={{
                  borderColor: "#E8E6E0",
                  animationDelay: `${i * 100}ms`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                }}
              >
                {/* Icon */}
                <div
                  className="mb-5 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                  style={{ color: "#D4A017" }}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="text-base sm:text-lg font-semibold mb-3 leading-tight"
                    style={{ color: "#1A1A18" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6B6B63" }}
                  >
                    {feature.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Platform value proposition */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-block px-6 py-3 rounded-lg" style={{ background: "rgba(212,160,23,0.08)" }}>
              <p className="text-sm font-medium" style={{ color: "#1A1A18" }}>
                <span style={{ color: "#D4A017" }}>One platform</span> replaces DocuSign, Ironclad, PandaDoc, and manual verification processes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Audit Trail Showcase */}
      <section className="py-16 sm:py-28" style={{ borderTop: "1px solid #E8E6E0", background: "#FAF9F6" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#D4A017" }}>
                Complete Audit Trail
              </p>
              <h2 className="text-3xl sm:text-4xl tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                Every change tracked. Every decision documented.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#4A4A45" }}>
                When you're signing a $50M acquisition, you need more than a contract—you need proof. Closeware tracks every status change, every review, every signature with complete timestamps, IP addresses, and reasons.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,160,23,0.1)" }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#D4A017" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: "#1A1A18" }}>Compliance-Ready</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B6B63" }}>
                      Court-admissible audit trail meets regulatory requirements. Every action logged with timestamp, user, and IP address. Export as PDF or DOCX for legal proceedings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,160,23,0.1)" }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#D4A017" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: "#1A1A18" }}>Dispute Protection</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B6B63" }}>
                      When deals go wrong, show exactly what was agreed, when, and by whom. Complete documentation protects your organization.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,160,23,0.1)" }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#D4A017" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: "#1A1A18" }}>Executive Accountability</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B6B63" }}>
                      Board asks who changed a term? Show them. CEO questions approval? Prove it. Complete transparency for all stakeholders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual Timeline */}
            <div className="lg:pl-8">
              <div className="rounded-xl p-8 bg-white ring-1" style={{ borderColor: "#E8E6E0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: "1px solid #E8E6E0" }}>
                  <h4 className="font-semibold" style={{ color: "#1A1A18" }}>Audit Trail</h4>
                  <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(74,124,89,0.08)", color: "#4A7C59", fontFamily: "var(--font-mono)" }}>
                    Live
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Timeline item 1 */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#4A7C59" }}></div>
                      <div className="w-px flex-1 mt-1" style={{ background: "#E8E6E0" }}></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-semibold" style={{ color: "#1A1A18" }}>Contract Fully Executed</p>
                        <span className="text-xs" style={{ color: "#8A8880", fontFamily: "var(--font-mono)" }}>2:47 PM</span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: "#6B6B63" }}>All parties signed. Deal closed.</p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "#8A8880" }}>
                        <span>By: System</span>
                        <span>•</span>
                        <span>IP: 172.16.254.1</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline item 2 */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#D4A017" }}></div>
                      <div className="w-px flex-1 mt-1" style={{ background: "#E8E6E0" }}></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-semibold" style={{ color: "#1A1A18" }}>Approved by Legal</p>
                        <span className="text-xs" style={{ color: "#8A8880", fontFamily: "var(--font-mono)" }}>11:23 AM</span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: "#6B6B63" }}>Payment terms verified. Ready for signature.</p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "#8A8880" }}>
                        <span>By: Sarah Chen, General Counsel</span>
                        <span>•</span>
                        <span>IP: 172.16.254.12</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline item 3 */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#D4A017" }}></div>
                      <div className="w-px flex-1 mt-1" style={{ background: "#E8E6E0" }}></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-semibold" style={{ color: "#1A1A18" }}>Contract Verified</p>
                        <span className="text-xs" style={{ color: "#8A8880", fontFamily: "var(--font-mono)" }}>9:15 AM</span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: "#6B6B63" }}>All clauses matched against deal trail. No discrepancies found.</p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "#8A8880" }}>
                        <span>By: Michael Rodriguez</span>
                        <span>•</span>
                        <span>IP: 172.16.254.8</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline item 4 */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#6B6B63" }}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-semibold" style={{ color: "#1A1A18" }}>Deal Created</p>
                        <span className="text-xs" style={{ color: "#8A8880", fontFamily: "var(--font-mono)" }}>Jun 15</span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: "#6B6B63" }}>New M&A deal initiated. Documents uploaded.</p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "#8A8880" }}>
                        <span>By: Michael Rodriguez</span>
                        <span>•</span>
                        <span>IP: 172.16.254.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 sm:py-28" style={{ borderTop: "1px solid #E8E6E0", background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <h2 className="text-center text-3xl sm:text-4xl tracking-tight mb-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
            Built for high-stakes deals.
          </h2>
          <p className="text-center text-sm sm:text-base mb-12 sm:mb-16" style={{ color: "#6B6B63" }}>Asset acquisitions, M&A, and joint ventures.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: "Asset Acquisitions", body: "Property, real estate, commercial assets. Every title document cross-checked against the final SPA." },
              { title: "M&A & Joint Ventures", body: "Multi-party negotiations with complex terms verified against email trails and offer letters." },
              { title: "Cross-Border Deals", body: "International transactions verified across multiple currencies, jurisdictions, and document sets." },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-xl ring-1 ring-[#E8E6E0] bg-[#FAF9F6]">
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: "#1A1A18" }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#6B6B63" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-28" style={{ borderTop: "1px solid #E8E6E0" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-6 text-center">
          <h2 className="text-[2.2rem] sm:text-5xl leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}>
            Track every change.
            <br />
            <span style={{ color: "#D4A017" }}>Sign with confidence.</span>
          </h2>
          <p className="text-base leading-relaxed mb-10 max-w-md mx-auto" style={{ color: "#4A4A45" }}>
            Complete M&A contract workflow with comprehensive audit trail. Generate, verify, review, and sign—with complete documentation for compliance and disputes.
          </p>
          <Link href="/register" className="h-12 sm:h-[52px] px-6 sm:px-8 text-sm sm:text-[15px] font-medium rounded-lg inline-flex items-center justify-center hover:opacity-90 transition-opacity" style={{ background: "#D4A017", color: "#fff" }}>
            Start your first deal free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10" style={{ borderTop: "1px solid #E8E6E0" }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-light tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Close<span style={{ color: "#D4A017" }} className="font-medium">ware</span>
            </p>
            <p className="text-xs mt-1" style={{ color: "#8A8880" }}>Deal verification for M&A and asset acquisitions.</p>
          </div>
          <div className="flex items-center gap-6 text-xs" style={{ color: "#8A8880" }}>
            <Link href="#" className="hover:text-[#4A4A45] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#4A4A45] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#4A4A45] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
