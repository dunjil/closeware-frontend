'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface GenerateOfferLetterModalProps {
  dealId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function GenerateOfferLetterModal({
  dealId,
  onClose,
  onSuccess
}: GenerateOfferLetterModalProps) {
  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [letterType, setLetterType] = useState<'offer' | 'counter_offer'>('offer');
  const [proposedPrice, setProposedPrice] = useState('');
  const [proposedTerms, setProposedTerms] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Generated letter
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [letterSubject, setLetterSubject] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/offer-letters/${dealId}/generate-offer-letter`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          letter_type: letterType,
          proposed_price: proposedPrice ? parseFloat(proposedPrice) : null,
          proposed_terms: proposedTerms || null,
          additional_notes: additionalNotes || null
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to generate letter');
      }

      const data = await res.json();
      setGeneratedLetter(data.letter_content);
      setLetterSubject(`${letterType === 'offer' ? 'Offer' : 'Counter-Offer'} - Deal Proposal`);
      setStep('preview');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/offer-letters/${dealId}/save-offer-letter`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          letter_content: generatedLetter,
          letter_type: letterType,
          subject: letterSubject
        })
      });

      if (!res.ok) throw new Error('Failed to save letter');

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.5)' }}
         onClick={onClose}>
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
           style={{ border: '1px solid #E8E6E0' }}
           onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: '#E8E6E0' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
              {step === 'form' ? 'Generate Offer Letter' : 'Review & Save'}
            </h2>
            <button onClick={onClose}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100"
                    style={{ color: '#6B6B63' }}>
              ✕
            </button>
          </div>
          <p className="text-sm mt-2" style={{ color: '#6B6B63' }}>
            {step === 'form'
              ? 'AI will draft a professional business letter on your company letterhead'
              : 'Review the generated letter before saving'}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'form' ? (
            <div className="space-y-6">
              {/* Letter Type */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                  Letter Type
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setLetterType('offer')}
                    className="flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium"
                    style={{
                      borderColor: letterType === 'offer' ? '#D4A017' : '#E8E6E0',
                      background: letterType === 'offer' ? 'rgba(212, 160, 23, 0.05)' : 'white',
                      color: letterType === 'offer' ? '#D4A017' : '#6B6B63'
                    }}>
                    Initial Offer
                  </button>
                  <button
                    onClick={() => setLetterType('counter_offer')}
                    className="flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium"
                    style={{
                      borderColor: letterType === 'counter_offer' ? '#D4A017' : '#E8E6E0',
                      background: letterType === 'counter_offer' ? 'rgba(212, 160, 23, 0.05)' : 'white',
                      color: letterType === 'counter_offer' ? '#D4A017' : '#6B6B63'
                    }}>
                    Counter-Offer
                  </button>
                </div>
              </div>

              {/* Proposed Price */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                  Proposed Price (Optional)
                </label>
                <input
                  type="number"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  placeholder="1000000"
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: '#E8E6E0', fontFamily: 'var(--font-mono)' }}
                />
                <p className="text-xs mt-1" style={{ color: '#8A8880' }}>
                  Leave empty to use deal's agreed price or "to be negotiated"
                </p>
              </div>

              {/* Proposed Terms */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                  Proposed Terms (Optional)
                </label>
                <textarea
                  value={proposedTerms}
                  onChange={(e) => setProposedTerms(e.target.value)}
                  placeholder="e.g., Payment in 3 installments, 30-day due diligence period, etc."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border resize-none"
                  style={{ borderColor: '#E8E6E0' }}
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                  Additional Context (Optional)
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any specific points to emphasize or context the AI should know..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border resize-none"
                  style={{ borderColor: '#E8E6E0' }}
                />
              </div>

              {error && (
                <div className="p-4 rounded-lg" style={{ background: 'rgba(192, 57, 43, 0.1)', color: '#C0392B' }}>
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Subject Line */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                  Subject Line
                </label>
                <input
                  type="text"
                  value={letterSubject}
                  onChange={(e) => setLetterSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: '#E8E6E0' }}
                />
              </div>

              {/* Generated Letter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A18' }}>
                  Generated Letter
                </label>
                <div className="bg-white rounded-lg p-6 border"
                     style={{ borderColor: '#E8E6E0', maxHeight: '500px', overflowY: 'auto' }}>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed"
                       style={{ fontFamily: 'Georgia, serif', color: '#1A1A18' }}>
                    {generatedLetter}
                  </pre>
                </div>
                <p className="text-xs mt-2" style={{ color: '#8A8880' }}>
                  💡 Review carefully before saving. You can edit the letter after saving if needed.
                </p>
              </div>

              {error && (
                <div className="p-4 rounded-lg" style={{ background: 'rgba(192, 57, 43, 0.1)', color: '#C0392B' }}>
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-between" style={{ borderColor: '#E8E6E0' }}>
          <button
            onClick={step === 'form' ? onClose : () => setStep('form')}
            className="px-6 py-3 rounded-lg border"
            style={{ borderColor: '#E8E6E0', color: '#6B6B63' }}
            disabled={loading}>
            {step === 'form' ? 'Cancel' : '← Back'}
          </button>

          {step === 'form' ? (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-3 rounded-lg disabled:opacity-50"
              style={{ background: '#D4A017', color: '#fff' }}>
              {loading ? 'Generating...' : '✨ Generate with AI'}
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-3 rounded-lg disabled:opacity-50"
              style={{ background: '#4A7C59', color: '#fff' }}>
              {loading ? 'Saving...' : '✓ Save Letter'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
