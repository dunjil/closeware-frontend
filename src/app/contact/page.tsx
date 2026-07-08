'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Send to backend API
    // For now, just simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      <Header />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 pt-24 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Get in Touch
          </h1>
          <p className="text-lg" style={{ color: '#6B6B63' }}>
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
              Contact Information
            </h2>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212, 160, 23, 0.1)' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#D4A017' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1" style={{ color: '#1A1A18' }}>Email</h3>
                  <a href="mailto:info@closeware.com" className="text-sm hover:underline" style={{ color: '#D4A017' }}>
                    info@closeware.com
                  </a>
                  <p className="text-xs mt-1" style={{ color: '#8A8880' }}>We typically respond within 24 hours</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212, 160, 23, 0.1)' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#D4A017' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1" style={{ color: '#1A1A18' }}>Phone</h3>
                  <a href="tel:+2348100620010" className="text-sm hover:underline" style={{ color: '#D4A017' }}>
                    +234 810 062 0010
                  </a>
                  <p className="text-xs mt-1" style={{ color: '#8A8880' }}>Monday - Friday, 9am - 5pm WAT</p>
                </div>
              </div>

              {/* Support */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212, 160, 23, 0.1)' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#D4A017' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1" style={{ color: '#1A1A18' }}>Support</h3>
                  <p className="text-sm" style={{ color: '#6B6B63' }}>
                    For technical support, log in to your account and use the support chat.
                  </p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="mt-12 p-6 rounded-xl" style={{ background: '#F5F3EE', border: '1px solid #E8E6E0' }}>
              <h3 className="font-medium mb-3" style={{ color: '#1A1A18' }}>Office Hours</h3>
              <div className="space-y-2 text-sm" style={{ color: '#6B6B63' }}>
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium" style={{ color: '#1A1A18' }}>9:00 AM - 6:00 PM WAT</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium" style={{ color: '#1A1A18' }}>10:00 AM - 2:00 PM WAT</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium" style={{ color: '#1A1A18' }}>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-sm" style={{ border: '1px solid #E8E6E0' }}>
              <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
                Send us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(74, 124, 89, 0.1)' }}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#4A7C59' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm mb-6" style={{ color: '#6B6B63' }}>
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-medium hover:underline"
                    style={{ color: '#D4A017' }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                      Full Name <span style={{ color: '#C0392B' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                      style={{ borderColor: '#E8E6E0', color: '#1A1A18' }}
                      placeholder="John Smith"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                      Email Address <span style={{ color: '#C0392B' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                      style={{ borderColor: '#E8E6E0', color: '#1A1A18' }}
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                      style={{ borderColor: '#E8E6E0', color: '#1A1A18' }}
                      placeholder="Acme Corporation"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                      style={{ borderColor: '#E8E6E0', color: '#1A1A18' }}
                      placeholder="+234 800 000 0000"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                      Subject <span style={{ color: '#C0392B' }}>*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                      style={{ borderColor: '#E8E6E0', color: '#1A1A18' }}
                    >
                      <option value="">Select a subject</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="demo">Request a Demo</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="billing">Billing Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                      Message <span style={{ color: '#C0392B' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border text-sm resize-none"
                      style={{ borderColor: '#E8E6E0', color: '#1A1A18' }}
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-lg text-sm font-medium transition-opacity disabled:opacity-50"
                    style={{ background: '#D4A017', color: '#fff' }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="text-xs text-center" style={{ color: '#8A8880' }}>
                    By submitting this form, you agree to our{' '}
                    <Link href="/privacy" className="underline" style={{ color: '#D4A017' }}>
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Prompt */}
        <div className="mt-16 text-center p-12 rounded-2xl" style={{ background: '#F5F3EE' }}>
          <h2 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}>
            Looking for Answers?
          </h2>
          <p className="text-base mb-6" style={{ color: '#6B6B63' }}>
            Check out our pricing page for common questions about how Closeware works.
          </p>
          <Link href="/pricing#faq" className="inline-flex items-center h-12 px-8 rounded-lg text-sm font-medium border" style={{ borderColor: '#E8E6E0', color: '#4A4A45' }}>
            View FAQ
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
