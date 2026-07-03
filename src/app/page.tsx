"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  return (
    <div className="min-h-screen" style={{ background: "#FAF9F6" }}>

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
                AI-Powered Contract Verification
              </p>
              <h1 className="text-[2.6rem] sm:text-[3.5rem] lg:text-[4rem] leading-[1.05] tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}>
                Never sign a contract
                <br />
                that <em className="not-italic" style={{ fontStyle: "italic", color: "#D4A017" }}>doesn't match reality.</em>
              </h1>
              <p className="text-base sm:text-lg mt-6 sm:mt-8 leading-relaxed max-w-sm" style={{ color: "#4A4A45", fontFamily: "var(--font-body)" }}>
                Upload your contract and deal trail. Get instant verification showing every discrepancy. Fix what doesn't match. Sign with confidence.
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
              <div className="text-5xl font-light mb-2" style={{ fontFamily: "var(--font-mono)", color: "#D4A017" }}>₦700M+</div>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Upload your deal trail",
                body: "Upload emails, offer letters, counter-offers, and supporting documents. Everything organized in one place.",
              },
              {
                step: "02",
                title: "Upload your contract",
                body: "Upload your existing draft (Word, PDF, Google Doc) or paste contract text. Most teams already draft contracts — we verify them.",
              },
              {
                step: "03",
                title: "Get instant verification",
                body: "See what matched ✅, what's flagged ⚠️, what's missing ❌. Every discrepancy shown with suggested fixes. Apply or regenerate with AI.",
              },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-xl ring-1 ring-[#E8E6E0] bg-white relative">
                <div className="absolute top-4 right-6 pointer-events-none">
                  <span className="text-7xl" style={{ fontFamily: "var(--font-mono)", color: "rgba(212,160,23,0.15)", fontWeight: 600, lineHeight: 1 }}>
                    {item.step}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-base font-medium mb-3" style={{ color: "#1A1A18" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed pr-16" style={{ color: "#6B6B63" }}>{item.body}</p>
                </div>
              </div>
            ))}
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
            Never sign a contract that
            <br />
            <em style={{ fontStyle: "italic", color: "#D4A017" }}>doesn't match reality.</em>
          </h2>
          <p className="text-base leading-relaxed mb-10 max-w-md mx-auto" style={{ color: "#4A4A45" }}>
            Upload your contract. Upload your deal trail. Get instant verification showing every discrepancy. Fix what doesn't match.
          </p>
          <Link href="/register" className="h-12 sm:h-[52px] px-6 sm:px-8 text-sm sm:text-[15px] font-medium rounded-lg inline-flex items-center justify-center hover:opacity-90 transition-opacity" style={{ background: "#D4A017", color: "#fff" }}>
            Start free trial
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
