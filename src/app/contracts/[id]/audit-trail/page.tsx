'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface StatusChange {
  id: string;
  old_status: string | null;
  new_status: string;
  changed_by_name: string;
  changed_by_email: string;
  reason: string | null;
  changed_at: string;
  ip_address: string | null;
}

interface Review {
  id: string;
  reviewer_name: string;
  reviewer_email: string;
  action: string;
  comments: string | null;
  draft_version: number;
  reviewed_at: string;
  ip_address: string | null;
}

interface SignatureRequest {
  id: string;
  signer_name: string;
  signer_email: string;
  signer_role: string;
  status: string;
  requested_at: string;
  signed_at: string | null;
  declined_at: string | null;
}

interface AuditTrail {
  contract_id: string;
  contract_title: string;
  current_status: string;
  created_at: string;
  status_changes: StatusChange[];
  internal_reviews: Review[];
  signature_requests: SignatureRequest[];
}

export default function AuditTrailPage() {
  const params = useParams();
  const router = useRouter();
  const contractId = params?.id as string;

  const [auditTrail, setAuditTrail] = useState<AuditTrail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'status' | 'reviews' | 'signatures'>('all');

  useEffect(() => {
    loadAuditTrail();
  }, [contractId]);

  const loadAuditTrail = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/audit-trail/${contractId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to load audit trail');
      const data = await res.json();
      setAuditTrail(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load audit trail');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const getStatusColor = (status: string) => {
    if (status.includes('approved') || status.includes('fully_executed') || status.includes('signed')) {
      return '#4A7C59'; // success green
    } else if (status.includes('pending') || status.includes('awaiting')) {
      return '#D4A017'; // gold
    } else if (status.includes('declined') || status.includes('expired')) {
      return '#C0392B'; // destructive red
    }
    return '#6B6B63'; // muted
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF9F6' }}>
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 rounded-full mx-auto mb-4"
               style={{ borderColor: '#E8E6E0', borderTopColor: '#D4A017' }}></div>
          <p style={{ color: '#6B6B63' }}>Loading audit trail...</p>
        </div>
      </div>
    );
  }

  if (error || !auditTrail) {
    return (
      <div className="min-h-screen p-8" style={{ background: '#FAF9F6' }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 text-center" style={{ border: '1px solid #E8E6E0' }}>
            <p style={{ color: '#C0392B' }}>{error || 'Audit trail not found'}</p>
            <button onClick={() => router.back()}
                    className="mt-4 px-4 py-2 rounded-lg"
                    style={{ background: '#D4A017', color: '#fff' }}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const allEvents = [
    ...auditTrail.status_changes.map(sc => ({ type: 'status', data: sc, timestamp: sc.changed_at })),
    ...auditTrail.internal_reviews.map(r => ({ type: 'review', data: r, timestamp: r.reviewed_at })),
    ...auditTrail.signature_requests.map(s => ({ type: 'signature', data: s, timestamp: s.signed_at || s.declined_at || s.requested_at }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const filteredEvents = activeTab === 'all' ? allEvents :
    activeTab === 'status' ? allEvents.filter(e => e.type === 'status') :
    activeTab === 'reviews' ? allEvents.filter(e => e.type === 'review') :
    allEvents.filter(e => e.type === 'signature');

  return (
    <div className="min-h-screen p-8" style={{ background: '#FAF9F6' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/contracts/${contractId}`}
                className="text-sm mb-4 inline-block hover:underline"
                style={{ color: '#6B6B63' }}>
            ← Back to Contract
          </Link>
          <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
            Audit Trail
          </h1>
          <p style={{ color: '#6B6B63' }}>{auditTrail.contract_title}</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider" style={{ color: '#8A8880' }}>Current Status:</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: `${getStatusColor(auditTrail.current_status)}15`, color: getStatusColor(auditTrail.current_status) }}>
              {formatStatus(auditTrail.current_status)}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl mb-6" style={{ border: '1px solid #E8E6E0' }}>
          <div className="flex border-b" style={{ borderColor: '#E8E6E0' }}>
            {[
              { key: 'all', label: 'All Activity', count: allEvents.length },
              { key: 'status', label: 'Status Changes', count: auditTrail.status_changes.length },
              { key: 'reviews', label: 'Reviews', count: auditTrail.internal_reviews.length },
              { key: 'signatures', label: 'Signatures', count: auditTrail.signature_requests.length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className="px-6 py-4 text-sm font-medium transition-colors"
                style={{
                  color: activeTab === tab.key ? '#D4A017' : '#6B6B63',
                  borderBottom: activeTab === tab.key ? '2px solid #D4A017' : 'none'
                }}
              >
                {tab.label} <span style={{ color: '#8A8880' }}>({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="p-6">
            {filteredEvents.length === 0 ? (
              <p className="text-center py-8" style={{ color: '#6B6B63' }}>No activity to display</p>
            ) : (
              <div className="space-y-6">
                {filteredEvents.map((event, idx) => (
                  <div key={idx} className="flex gap-4">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full"
                           style={{ background: event.type === 'status' ? '#D4A017' :
                                                event.type === 'review' ? '#4A7C59' : '#6B6B63' }}></div>
                      {idx < filteredEvents.length - 1 && (
                        <div className="w-px flex-1 mt-2" style={{ background: '#E8E6E0' }}></div>
                      )}
                    </div>

                    {/* Event content */}
                    <div className="flex-1 pb-6">
                      {event.type === 'status' && (
                        <div className="bg-white rounded-lg p-4" style={{ border: '1px solid #E8E6E0' }}>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium" style={{ color: '#1A1A18' }}>Status Changed</h3>
                            <span className="text-xs" style={{ color: '#8A8880' }}>
                              {formatDate((event.data as StatusChange).changed_at)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            {(event.data as StatusChange).old_status && (
                              <>
                                <span className="px-2 py-1 rounded text-xs"
                                      style={{ background: '#F5F3EE', color: '#6B6B63' }}>
                                  {formatStatus((event.data as StatusChange).old_status!)}
                                </span>
                                <span style={{ color: '#8A8880' }}>→</span>
                              </>
                            )}
                            <span className="px-2 py-1 rounded text-xs font-medium"
                                  style={{ background: `${getStatusColor((event.data as StatusChange).new_status)}15`,
                                          color: getStatusColor((event.data as StatusChange).new_status) }}>
                              {formatStatus((event.data as StatusChange).new_status)}
                            </span>
                          </div>
                          <p className="text-sm mb-2" style={{ color: '#6B6B63' }}>
                            By: {(event.data as StatusChange).changed_by_name} ({(event.data as StatusChange).changed_by_email})
                          </p>
                          {(event.data as StatusChange).reason && (
                            <p className="text-sm italic" style={{ color: '#6B6B63' }}>
                              "{(event.data as StatusChange).reason}"
                            </p>
                          )}
                          {(event.data as StatusChange).ip_address && (
                            <p className="text-xs mt-2" style={{ color: '#8A8880' }}>
                              IP: {(event.data as StatusChange).ip_address}
                            </p>
                          )}
                        </div>
                      )}

                      {event.type === 'review' && (
                        <div className="bg-white rounded-lg p-4" style={{ border: '1px solid #E8E6E0' }}>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium" style={{ color: '#1A1A18' }}>Internal Review</h3>
                            <span className="text-xs" style={{ color: '#8A8880' }}>
                              {formatDate((event.data as Review).reviewed_at)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-medium"
                                  style={{ background: (event.data as Review).action === 'approved' ?
                                          'rgba(74, 124, 89, 0.1)' : 'rgba(192, 57, 43, 0.1)',
                                          color: (event.data as Review).action === 'approved' ?
                                          '#4A7C59' : '#C0392B' }}>
                              {formatStatus((event.data as Review).action)}
                            </span>
                            <span className="text-xs" style={{ color: '#8A8880' }}>
                              Version {(event.data as Review).draft_version}
                            </span>
                          </div>
                          <p className="text-sm mb-2" style={{ color: '#6B6B63' }}>
                            Reviewer: {(event.data as Review).reviewer_name} ({(event.data as Review).reviewer_email})
                          </p>
                          {(event.data as Review).comments && (
                            <p className="text-sm italic p-3 rounded"
                               style={{ background: '#F5F3EE', color: '#4A4A45' }}>
                              "{(event.data as Review).comments}"
                            </p>
                          )}
                        </div>
                      )}

                      {event.type === 'signature' && (
                        <div className="bg-white rounded-lg p-4" style={{ border: '1px solid #E8E6E0' }}>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium" style={{ color: '#1A1A18' }}>Signature Request</h3>
                            <span className="text-xs" style={{ color: '#8A8880' }}>
                              Requested: {formatDate((event.data as SignatureRequest).requested_at)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded text-xs"
                                  style={{ background: '#F5F3EE', color: '#6B6B63' }}>
                              {formatStatus((event.data as SignatureRequest).signer_role)}
                            </span>
                            <span className="px-2 py-1 rounded text-xs font-medium"
                                  style={{ background: `${getStatusColor((event.data as SignatureRequest).status)}15`,
                                          color: getStatusColor((event.data as SignatureRequest).status) }}>
                              {formatStatus((event.data as SignatureRequest).status)}
                            </span>
                          </div>
                          <p className="text-sm mb-2" style={{ color: '#6B6B63' }}>
                            Signer: {(event.data as SignatureRequest).signer_name} ({(event.data as SignatureRequest).signer_email})
                          </p>
                          {(event.data as SignatureRequest).signed_at && (
                            <p className="text-sm" style={{ color: '#4A7C59' }}>
                              ✓ Signed: {formatDate((event.data as SignatureRequest).signed_at!)}
                            </p>
                          )}
                          {(event.data as SignatureRequest).declined_at && (
                            <p className="text-sm" style={{ color: '#C0392B' }}>
                              ✗ Declined: {formatDate((event.data as SignatureRequest).declined_at!)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E8E6E0' }}>
            <div className="text-3xl font-light mb-2"
                 style={{ fontFamily: 'var(--font-mono)', color: '#D4A017' }}>
              {auditTrail.status_changes.length}
            </div>
            <p className="text-sm" style={{ color: '#6B6B63' }}>Status Changes</p>
          </div>
          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E8E6E0' }}>
            <div className="text-3xl font-light mb-2"
                 style={{ fontFamily: 'var(--font-mono)', color: '#4A7C59' }}>
              {auditTrail.internal_reviews.length}
            </div>
            <p className="text-sm" style={{ color: '#6B6B63' }}>Internal Reviews</p>
          </div>
          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E8E6E0' }}>
            <div className="text-3xl font-light mb-2"
                 style={{ fontFamily: 'var(--font-mono)', color: '#6B6B63' }}>
              {auditTrail.signature_requests.filter(s => s.status === 'signed').length}/{auditTrail.signature_requests.length}
            </div>
            <p className="text-sm" style={{ color: '#6B6B63' }}>Signatures Collected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
