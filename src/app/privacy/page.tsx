'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      <Header />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 pt-24 pb-16">
        <h1 className="text-5xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
          Privacy Policy
        </h1>
        <p className="text-sm mb-12" style={{ color: '#6B6B63' }}>
          Last updated: July 5, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              1. Introduction
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Closeware ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our contract verification and management platform (the "Services").
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              By using the Services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use the Services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              2. Information We Collect
            </h2>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>2.1 Information You Provide</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We collect information that you voluntarily provide to us, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li><strong>Account Information:</strong> Name, email address, phone number, company name, and password when you register for an account</li>
              <li><strong>Profile Information:</strong> Job title, role, and other optional profile details</li>
              <li><strong>Payment Information:</strong> Billing address and payment method details (processed securely through third-party payment processors)</li>
              <li><strong>Deal and Contract Data:</strong> Documents, contracts, correspondence, offer letters, title deeds, and other materials you upload to the Services</li>
              <li><strong>Communications:</strong> Information you provide when you contact us for support, feedback, or inquiries</li>
            </ul>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>2.2 Information Collected Automatically</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              When you access the Services, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent on pages, clicks, and navigation paths</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device type, and unique device identifiers</li>
              <li><strong>Log Data:</strong> Server logs including timestamps, error messages, and system events</li>
              <li><strong>Cookies and Similar Technologies:</strong> Cookies, web beacons, and similar tracking technologies (see Section 8 below)</li>
            </ul>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>2.3 Audit Trail Information</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              As part of our Services, we collect and store detailed audit trail information for every action taken in the platform, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>User actions (contract generation, verification, reviews, signatures)</li>
              <li>Timestamps (UTC) for all actions</li>
              <li>IP addresses of users performing actions</li>
              <li>Status changes and reasons provided</li>
              <li>Document upload and download events</li>
            </ul>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              This audit trail information is essential for providing court-admissible documentation and is retained as described in Section 6 below.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              3. How We Use Your Information
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li><strong>Provide Services:</strong> To deliver, maintain, and improve our contract verification and management platform</li>
              <li><strong>Process Transactions:</strong> To process payments and fulfill your orders</li>
              <li><strong>Contract Generation:</strong> To generate contracts from your uploaded documents and deal trail data</li>
              <li><strong>Verification:</strong> To compare contracts against correspondence and documents you provide</li>
              <li><strong>Audit Trail:</strong> To create complete, court-admissible audit trails of all actions in the platform</li>
              <li><strong>Communication:</strong> To send you service-related notices, updates, and support responses</li>
              <li><strong>Account Management:</strong> To manage your account, authentication, and access control</li>
              <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, and security threats</li>
              <li><strong>Analytics:</strong> To understand how users interact with the Services and improve user experience</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our Terms of Service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              4. How We Share Your Information
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We treat your contract data and deal information as confidential. We do not sell your personal information. We may share your information in the following circumstances:
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>4.1 Service Providers</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We may share your information with third-party service providers who perform services on our behalf, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>Cloud hosting and storage providers (e.g., AWS, Railway, Vercel)</li>
              <li>Payment processors (e.g., Stripe)</li>
              <li>Email service providers (e.g., MailerSend)</li>
              <li>Analytics providers (e.g., PostHog, Google Analytics)</li>
              <li>AI service providers (e.g., Anthropic Claude API for contract generation)</li>
            </ul>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              These service providers are contractually obligated to use your information only as necessary to provide services to us and to protect your information.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>4.2 Business Transfers</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              If we are involved in a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your information.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>4.3 Legal Requirements</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We may disclose your information if required by law or in response to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>Valid legal processes (subpoenas, court orders, warrants)</li>
              <li>Government or regulatory requests</li>
              <li>Legal claims or litigation</li>
              <li>Protection of our rights, property, or safety, or that of others</li>
            </ul>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>4.4 With Your Consent</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We may share your information with third parties when you explicitly consent to such sharing, such as when you invite external collaborators to review your contracts.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              5. Data Security
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>Encryption of data in transit (TLS/SSL)</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee access restrictions and confidentiality agreements</li>
              <li>Secure backup and disaster recovery procedures</li>
            </ul>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              6. Data Retention
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We retain your information for as long as necessary to provide the Services and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>6.1 Account Data</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Account information is retained for the duration of your account and for a reasonable period after account closure (typically 90 days) to allow for account recovery.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>6.2 Contract and Deal Data</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Contracts, documents, and deal trail data are retained for as long as you maintain your account, plus a retention period after account closure to comply with legal obligations and to provide court-admissible audit trails if needed for legal proceedings.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>6.3 Audit Trail Data</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Audit trail information (timestamps, IP addresses, user actions) is retained for a minimum of 7 years to ensure availability for legal proceedings and compliance purposes.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>6.4 Payment Data</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Payment transaction records are retained for 7 years to comply with tax and financial regulations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              7. Your Privacy Rights
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Depending on your location, you may have certain rights regarding your personal information:
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>7.1 Access and Portability</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You have the right to request a copy of the personal information we hold about you. You can export your contracts and documents directly from the Services at any time.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>7.2 Correction</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You can update your account information directly in your account settings. If you need assistance, contact us at <a href="mailto:info@closeware.com" style={{ color: '#D4A017' }}>info@closeware.com</a>.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>7.3 Deletion</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You may request deletion of your personal information by contacting us. However, we may retain certain information as required by law or for legitimate business purposes (e.g., audit trail data for court-admissibility).
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>7.4 Opt-Out</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You can opt out of marketing communications by clicking the "unsubscribe" link in emails or by contacting us. Note that you cannot opt out of service-related communications (e.g., account notices, security alerts).
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>7.5 Restriction and Objection</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              You may request that we restrict processing of your information or object to certain processing activities. Contact us to exercise these rights.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>7.6 How to Exercise Your Rights</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              To exercise any of these rights, contact us at <a href="mailto:info@closeware.com" style={{ color: '#D4A017' }}>info@closeware.com</a>. We will respond to your request within 30 days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              8. Cookies and Tracking Technologies
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We use cookies and similar tracking technologies to collect and track information about your use of the Services. Cookies are small data files stored on your device.
            </p>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>8.1 Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li><strong>Essential Cookies:</strong> Required for the Services to function (authentication, security)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the Services</li>
              <li><strong>Marketing Cookies:</strong> Track visits across websites to deliver relevant advertising</li>
            </ul>

            <h3 className="text-xl mb-3 mt-6" style={{ fontWeight: 500, color: '#1A1A18' }}>8.2 Managing Cookies</h3>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Most browsers allow you to refuse or accept cookies. Note that disabling essential cookies may prevent you from using certain features of the Services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              9. Third-Party Services
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              The Services may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              <strong>Third-party services we use include:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>Anthropic Claude API (for contract generation)</li>
              <li>Stripe (for payment processing)</li>
              <li>MailerSend (for transactional emails)</li>
              <li>Railway and Vercel (for hosting)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              10. International Data Transfers
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws.
            </p>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We take appropriate safeguards to ensure your information receives adequate protection, including using standard contractual clauses approved by the European Commission and ensuring service providers are certified under recognized frameworks.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              11. Children's Privacy
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              The Services are not intended for children under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              12. Changes to This Privacy Policy
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We may update this Privacy Policy from time to time. We will notify you of material changes by:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: '#4A4A45' }}>
              <li>Posting the updated Privacy Policy on this page with a new "Last updated" date</li>
              <li>Sending an email to the address associated with your account</li>
              <li>Displaying a prominent notice on the Services</li>
            </ul>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              Your continued use of the Services after such notice constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              13. Contact Us
            </h2>
            <p className="mb-4" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="pl-6" style={{ color: '#4A4A45' }}>
              <p className="mb-2"><strong>Email:</strong> <a href="mailto:info@closeware.com" style={{ color: '#D4A017' }}>info@closeware.com</a></p>
              <p className="mb-2"><strong>Phone:</strong> <a href="tel:+2348100620010" style={{ color: '#D4A017' }}>+234 810 062 0010</a></p>
            </div>
            <p className="mt-6" style={{ color: '#4A4A45', lineHeight: '1.8' }}>
              We are committed to resolving privacy concerns promptly and fairly.
            </p>
          </section>

          <div className="mt-16 p-6 rounded-xl" style={{ background: '#F5F3EE', borderLeft: '4px solid #D4A017' }}>
            <p className="text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
              Summary of Key Points
            </p>
            <ul className="text-sm space-y-1" style={{ color: '#4A4A45' }}>
              <li>• We collect information you provide and usage data to deliver our Services</li>
              <li>• Your contract data is treated as confidential and not sold to third parties</li>
              <li>• Audit trail data is retained for 7 years for court-admissibility</li>
              <li>• You have rights to access, correct, and delete your information</li>
              <li>• We use industry-standard security measures to protect your data</li>
              <li>• Contact us at info@closeware.com for privacy questions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
