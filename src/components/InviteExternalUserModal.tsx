'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

interface InviteExternalUserModalProps {
  dealId: string;
  onSuccess: () => void;
  onCancel: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

export default function InviteExternalUserModal({
  dealId,
  onSuccess,
  onCancel,
  showToast,
}: InviteExternalUserModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [title, setTitle] = useState('');
  const [role, setRole] = useState<'external_reviewer' | 'external_signer'>('external_reviewer');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setSubmitting(true);

    try {
      await api.inviteExternalUser(
        dealId,
        email.trim(),
        name.trim(),
        organizationName.trim() || undefined,
        title.trim() || undefined,
        role,
        message.trim() || undefined
      );

      showToast(`Invitation sent to ${email}`, 'success');
      onSuccess();
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to send invitation';
      setError(errorMsg);
      showToast(errorMsg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="max-w-2xl w-full rounded-xl p-8"
          style={{ background: '#FFFFFF', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            className="text-2xl mb-6"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#1A1A18' }}
          >
            Invite External Reviewer
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Email Address <span style={{ color: '#C0392B' }}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: '#E8E6E0' }}
                placeholder="john.smith@xyzlaw.com"
                required
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Full Name <span style={{ color: '#C0392B' }}>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: '#E8E6E0' }}
                placeholder="John Smith"
                required
              />
            </div>

            {/* Organization (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Organization <span style={{ color: '#6B6B63' }}>(Optional)</span>
              </label>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: '#E8E6E0' }}
                placeholder="XYZ Law Firm"
              />
            </div>

            {/* Title (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Title <span style={{ color: '#6B6B63' }}>(Optional)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: '#E8E6E0' }}
                placeholder="Senior Partner"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'external_reviewer' | 'external_signer')}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: '#E8E6E0' }}
              >
                <option value="external_reviewer">External Reviewer (can view and comment)</option>
                <option value="external_signer">External Signer (can view, comment, and sign)</option>
              </select>
            </div>

            {/* Message (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Message <span style={{ color: '#6B6B63' }}>(Optional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px] resize-none"
                style={{ borderColor: '#E8E6E0' }}
                placeholder="Please review the payment terms in Section 4 and advise..."
              />
            </div>

            {/* Error Display */}
            {error && (
              <div
                className="p-4 rounded-lg border"
                style={{ background: 'rgba(192,57,43,0.08)', borderColor: 'rgba(192,57,43,0.25)' }}
              >
                <p className="text-sm" style={{ color: '#C0392B' }}>
                  {error}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="h-11 px-8 rounded-lg text-sm font-medium disabled:opacity-50"
                style={{ background: '#D4A017', color: '#fff' }}
              >
                {submitting ? 'Sending Invitation...' : 'Send Invitation'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="h-11 px-8 rounded-lg text-sm font-medium border"
                style={{ borderColor: '#E8E6E0', color: '#4A4A45' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
