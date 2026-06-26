'use client';

import { useState, useEffect } from 'react';
import { api, InternalReview, ContractDraft } from '@/lib/api';

interface InternalReviewPanelProps {
  draft: ContractDraft;
  dealId: string;
  onReviewCreated?: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

export default function InternalReviewPanel({ draft, dealId, onReviewCreated, showToast }: InternalReviewPanelProps) {
  const [reviews, setReviews] = useState<InternalReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showActionForm, setShowActionForm] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'request_review' | 'request_revisions' | 'approve' | 'comment' | 'send_external'>('request_review');
  const [comment, setComment] = useState('');
  const [revieweeEmail, setRevieweeEmail] = useState('');
  const [sentToPartyName, setSentToPartyName] = useState('');
  const [sentToPartyEmail, setSentToPartyEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = async () => {
    try {
      const data = await api.getDraftReviews(draft.id);
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [draft.id]);

  const handleSubmit = async () => {
    setError(null);

    // Validation
    if (!comment.trim() && selectedAction !== 'approve') {
      setError('Please add a comment');
      return;
    }

    if (selectedAction === 'request_review' && !revieweeEmail.trim()) {
      setError('Please enter reviewer email address');
      return;
    }

    if (selectedAction === 'request_revisions' && !revieweeEmail.trim()) {
      setError('Please enter the email of person to request revisions from');
      return;
    }

    if (selectedAction === 'send_external') {
      if (!sentToPartyName.trim()) {
        setError('Please enter counterparty contact name');
        return;
      }
      if (!sentToPartyEmail.trim()) {
        setError('Please enter counterparty contact email');
        return;
      }
    }

    setSubmitting(true);
    try {
      await api.createInternalReview(
        draft.id,
        dealId,
        selectedAction,
        comment || undefined,
        revieweeEmail || undefined,
        sentToPartyName || undefined,
        sentToPartyEmail || undefined
      );
      setComment('');
      setRevieweeEmail('');
      setSentToPartyName('');
      setSentToPartyEmail('');
      setShowActionForm(false);
      await loadReviews();
      onReviewCreated?.();
      showToast('Review action recorded successfully', 'success');
    } catch (error: any) {
      console.error('Error creating review:', error);
      const errorMsg = error.message || 'Failed to create review action';
      setError(errorMsg);
      showToast(errorMsg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      internal_draft: { bg: '#F5F3EE', color: '#6B6B63', label: 'Internal Draft' },
      pending_internal_review: { bg: 'rgba(212,160,23,0.08)', color: '#D4A017', label: 'Pending Review' },
      pending_revisions: { bg: 'rgba(192,57,43,0.08)', color: '#C0392B', label: 'Pending Revisions' },
      sent_to_counterparty: { bg: 'rgba(74,124,89,0.08)', color: '#4A7C59', label: 'Sent to Counterparty' },
      awaiting_counterparty_response: { bg: 'rgba(212,160,23,0.08)', color: '#D4A017', label: 'Awaiting Response' },
      approved: { bg: 'rgba(74,124,89,0.08)', color: '#4A7C59', label: 'Approved' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.internal_draft;

    return (
      <span className="text-xs px-3 py-1 rounded-full" style={{ background: config.bg, color: config.color }}>
        {config.label}
      </span>
    );
  };

  const getActionLabel = (action: string) => {
    const labels = {
      request_review: 'Requested Review',
      request_revisions: 'Requested Revisions',
      approve: 'Approved',
      comment: 'Commented',
      send_external: 'Sent to Counterparty',
    };
    return labels[action as keyof typeof labels] || action;
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div data-slot="card" className="rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
            Draft Status
          </h3>
          {getStatusBadge(draft.status)}
        </div>

        {draft.sent_externally_at && (
          <div className="text-sm mb-2" style={{ color: '#6B6B63' }}>
            Sent externally: {new Date(draft.sent_externally_at).toLocaleString()}
            {draft.sent_to_party && <> to <strong style={{ color: '#1A1A18' }}>{draft.sent_to_party}</strong></>}
          </div>
        )}

        {!showActionForm && (
          <button
            onClick={() => setShowActionForm(true)}
            className="h-10 px-6 rounded-lg text-sm font-medium mt-4"
            style={{ background: '#D4A017', color: '#fff' }}
          >
            Add Review Action
          </button>
        )}
      </div>

      {/* Action Form */}
      {showActionForm && (
        <div data-slot="card" className="rounded-xl p-6">
          <h4 className="text-sm font-medium mb-4" style={{ color: '#1A1A18' }}>New Review Action</h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Action
              </label>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value as any)}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: '#E8E6E0' }}
              >
                <option value="request_review">Request Review</option>
                <option value="request_revisions">Request Revisions</option>
                <option value="approve">Approve</option>
                <option value="comment">Add Comment</option>
                <option value="send_external">Send to Counterparty</option>
              </select>
            </div>

            {(selectedAction === 'request_review' || selectedAction === 'request_revisions') && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                  {selectedAction === 'request_review' ? 'Reviewer Email' : 'Assignee Email'}
                </label>
                <input
                  type="email"
                  value={revieweeEmail}
                  onChange={(e) => setRevieweeEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                  style={{ borderColor: '#E8E6E0' }}
                  placeholder="e.g., ceo@asedo.com"
                />
              </div>
            )}

            {selectedAction === 'send_external' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                    Counterparty Contact Name
                  </label>
                  <input
                    type="text"
                    value={sentToPartyName}
                    onChange={(e) => setSentToPartyName(e.target.value)}
                    className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                    style={{ borderColor: '#E8E6E0' }}
                    placeholder="e.g., John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                    Counterparty Email
                  </label>
                  <input
                    type="email"
                    value={sentToPartyEmail}
                    onChange={(e) => setSentToPartyEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                    style={{ borderColor: '#E8E6E0' }}
                    placeholder="e.g., contact@seller.com"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                Comment / Instructions {selectedAction === 'approve' ? '(Optional)' : ''}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px] resize-none"
                style={{ borderColor: '#E8E6E0' }}
                placeholder="Add your feedback or instructions..."
              />
            </div>

            {error && (
              <div className="p-4 rounded-lg border" style={{ background: 'rgba(192,57,43,0.08)', borderColor: 'rgba(192,57,43,0.25)' }}>
                <p className="text-sm" style={{ color: '#C0392B' }}>{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="h-10 px-6 rounded-lg text-sm font-medium disabled:opacity-50"
                style={{ background: '#D4A017', color: '#fff' }}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                onClick={() => {
                  setShowActionForm(false);
                  setComment('');
                }}
                className="h-10 px-6 rounded-lg text-sm font-medium border"
                style={{ borderColor: '#E8E6E0', color: '#4A4A45' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review History */}
      <div data-slot="card" className="rounded-xl p-6">
        <h4 className="text-sm font-medium mb-4" style={{ color: '#1A1A18' }}>Review History</h4>

        {loading ? (
          <p className="text-sm" style={{ color: '#6B6B63' }}>Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm" style={{ color: '#6B6B63' }}>No review actions yet</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="pb-4 border-b last:border-b-0" style={{ borderColor: '#E8E6E0' }}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-3 py-1 rounded-full" style={{ background: '#F5F3EE', color: '#6B6B63' }}>
                      {getActionLabel(review.action)}
                    </span>
                    {review.previous_status && review.new_status && (
                      <span className="text-xs" style={{ color: '#8A8880' }}>
                        {review.previous_status.replace(/_/g, ' ')} → {review.new_status.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs" style={{ color: '#8A8880', fontFamily: 'var(--font-mono)' }}>
                    v{review.draft_version} • {new Date(review.created_at).toLocaleString()}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-sm mt-2 whitespace-pre-wrap" style={{ color: '#4A4A45' }}>
                    {review.comment}
                  </p>
                )}
                {review.sent_to_party_name && (
                  <p className="text-sm mt-2" style={{ color: '#6B6B63' }}>
                    Sent to: <strong style={{ color: '#1A1A18' }}>{review.sent_to_party_name}</strong>
                    {review.sent_to_party_email && <> ({review.sent_to_party_email})</>}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
