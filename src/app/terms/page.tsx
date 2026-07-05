'use client';

import Link from 'next/link';
import Header from '@/components/Header';

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      <Header />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 pt-24 pb-16">
        <h1 className="text-5xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
          Terms of Service
        </h1>
        <p className="text-sm mb-12" style={{ color: '#6B6B63' }}>
          Last updated: July 5, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              1. Agreement to Terms
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and Closeware ("Company," "we," "us," or "our") concerning your access to and use of the Closeware platform and services (collectively, the "Services").
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              2. Description of Services
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Closeware provides a contract verification and management platform designed for mergers and acquisitions (M&A), property acquisitions, and business transactions. Our Services include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>AI-powered contract generation from deal documentation</li>
              <li>Contract verification against deal trail documents</li>
              <li>Internal review workflows and collaboration tools</li>
              <li>Complete audit trail tracking with timestamps and IP addresses</li>
              <li>Court-admissible documentation export (PDF and DOCX formats)</li>
              <li>Digital signature request and tracking</li>
              <li>Document storage and organization</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              3. Eligibility
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You must be at least 18 years old and have the legal capacity to enter into contracts to use our Services. By using the Services, you represent and warrant that you meet these requirements.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              If you are using the Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              4. User Accounts
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              To access certain features of the Services, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You may not share your account credentials with others or allow others to access your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              5. Pricing and Payment
            </h2>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>5.1 Pay-Per-Deal Pricing</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Closeware operates on a pay-per-deal pricing model. You will be charged when:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>You mark a contract as "ready for signature," OR</li>
              <li>All parties complete signing the contract</li>
            </ul>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Pricing is tiered based on deal complexity:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li><strong>Simple Contracts</strong> (NDAs, service agreements): $500 per deal</li>
              <li><strong>Property Acquisitions</strong> (real estate, land): $2,500 per deal</li>
              <li><strong>M&A & Joint Ventures</strong> (corporate acquisitions): $10,000 per deal</li>
            </ul>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>5.2 Prepaid Deal Packs</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You may purchase prepaid deal packs at discounted rates. Prepaid credits expire 12 months from the date of purchase and are non-refundable.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>5.3 What Counts as a Deal</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Each contract generation counts as one deal. Regenerations, revisions, and amendments to the same contract do not count as additional deals. Contract verification of uploaded documents without generation does not count as a deal.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>5.4 Payment Methods</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We accept credit cards, bank transfers, and wire transfers. All payments are processed in USD. Payment is due immediately upon invoice unless otherwise agreed in writing.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>5.5 Refunds</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              If you abandon a deal before marking it ready for signature, you will not be charged. Once charged, payments are non-refundable except in cases of service failure or billing errors.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              6. Free Trial
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We offer a 30-day free trial period for new accounts. During the trial, you may access all features of the Services without charge. No credit card is required to start a trial.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              After the trial period ends, you will be charged according to the pricing terms above for any deals you close. We reserve the right to modify or discontinue free trial offers at any time.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              7. User Obligations and Restrictions
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You agree NOT to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>Use the Services for any illegal purpose or in violation of any laws</li>
              <li>Upload malicious code, viruses, or harmful materials</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
              <li>Use the Services to create a competing product or service</li>
              <li>Scrape, data mine, or extract data from the Services without permission</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Upload content that infringes on intellectual property rights</li>
              <li>Misrepresent your identity or affiliation</li>
              <li>Share your account access with unauthorized parties</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              8. Intellectual Property Rights
            </h2>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>8.1 Our Intellectual Property</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              The Services, including all software, text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, and artwork (collectively, "Content"), are owned by Closeware and protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>8.2 Your Content</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You retain all ownership rights to the documents, contracts, and other materials you upload to the Services ("Your Content"). By uploading Your Content, you grant us a limited, non-exclusive, royalty-free license to process, store, and display Your Content solely for the purpose of providing the Services to you.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You represent and warrant that you own or have the necessary rights to upload Your Content and that Your Content does not violate any third-party rights.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>8.3 Generated Contracts</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Contracts generated by the Services using Your Content are owned by you. We claim no ownership rights to generated contracts, but we retain the right to store them as part of providing the Services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              9. Professional Legal Advice Disclaimer
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              <strong>IMPORTANT: Closeware is a contract verification and management tool, not a law firm.</strong> The Services do not constitute legal advice. Generated contracts and verification reports are tools to assist you, but they do not replace professional legal counsel.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You should always have contracts reviewed by qualified legal counsel before execution, especially for high-value or complex transactions. We are not responsible for the legal sufficiency, enforceability, or accuracy of any contract generated or verified using the Services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              10. Data Security and Confidentiality
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We implement industry-standard security measures to protect Your Content. However, no system is completely secure. You acknowledge that you upload Your Content at your own risk.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We treat Your Content as confidential and will not share it with third parties except:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>As necessary to provide the Services (e.g., cloud hosting providers)</li>
              <li>With your explicit consent</li>
              <li>As required by law or legal process</li>
              <li>To protect our rights or the safety of others</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              11. Limitation of Liability
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND</li>
              <li>WE ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
              <li>OUR TOTAL LIABILITY TO YOU SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM</li>
              <li>WE ARE NOT RESPONSIBLE FOR LEGAL DISPUTES ARISING FROM CONTRACTS GENERATED OR VERIFIED USING THE SERVICES</li>
            </ul>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              12. Indemnification
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You agree to indemnify, defend, and hold harmless Closeware, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>Your use of the Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your Content uploaded to the Services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              13. Termination
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We may suspend or terminate your access to the Services at any time, with or without cause, with or without notice. You may terminate your account at any time by contacting us at <a href="mailto:info@closeware.com" style={{ color: '#D4A017' }}>info@closeware.com</a>.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Upon termination:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>Your right to access the Services immediately ceases</li>
              <li>We may delete Your Content from our servers (subject to legal retention requirements)</li>
              <li>You remain liable for any outstanding payment obligations</li>
              <li>Sections of these Terms that by their nature should survive termination will survive</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              14. Governing Law and Dispute Resolution
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              These Terms are governed by the laws of Nigeria, without regard to conflict of law principles. Any disputes arising from these Terms or the Services shall be resolved through binding arbitration in Lagos, Nigeria, in accordance with the Arbitration and Conciliation Act.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Notwithstanding the foregoing, we may seek injunctive or other equitable relief in any court of competent jurisdiction to protect our intellectual property rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              15. Changes to Terms
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We reserve the right to modify these Terms at any time. We will notify you of material changes by email or through a notice on the Services. Your continued use of the Services after such notice constitutes acceptance of the modified Terms.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              If you do not agree to the modified Terms, you must stop using the Services and terminate your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              16. Miscellaneous
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              <strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Closeware regarding the Services.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              <strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full effect.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              <strong>Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              <strong>Assignment:</strong> You may not assign or transfer these Terms or your account without our prior written consent. We may assign these Terms without restriction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              17. Contact Information
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              If you have questions about these Terms, please contact us:
            </p>
            <div className="pl-6" style={{ color: '#4A4A45' }}>
              <p className="mb-2"><strong>Email:</strong> <a href="mailto:info@closeware.com" style={{ color: '#D4A017' }}>info@closeware.com</a></p>
              <p className="mb-2"><strong>Phone:</strong> <a href="tel:+2348100620010" style={{ color: '#D4A017' }}>+234 810 062 0010</a></p>
            </div>
          </section>

          <div className="mt-16 p-6 rounded-xl" style={{ background: '#F5F3EE', borderLeft: '4px solid #D4A017' }}>
            <p className="text-sm" style={{ color: '#4A4A45' }}>
              By using Closeware, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16" style={{ borderColor: '#E8E6E0', background: '#F5F3EE' }}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
                Close<span style={{ color: '#D4A017' }}>ware</span>
              </h3>
              <p className="text-sm" style={{ color: '#6B6B63' }}>
                Track every change. Sign with confidence.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4" style={{ color: '#1A1A18' }}>Product</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#6B6B63' }}>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/#how-it-works">How it works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4" style={{ color: '#1A1A18' }}>Legal</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#6B6B63' }}>
                <li><Link href="/terms" style={{ color: '#D4A017' }}>Terms of Service</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4" style={{ color: '#1A1A18' }}>Contact</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#6B6B63' }}>
                <li><a href="mailto:info@closeware.com">info@closeware.com</a></li>
                <li><a href="tel:+2348100620010">+234 810 062 0010</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm pt-8" style={{ borderTop: '1px solid #E8E6E0', color: '#8A8880' }}>
            <p>&copy; 2026 Closeware. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
