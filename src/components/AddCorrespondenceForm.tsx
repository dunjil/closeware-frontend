'use client';

import { useState } from 'react';

interface AddCorrespondenceFormProps {
  dealId: string;
  onSuccess: () => void;
  onCancel: () => void;
  showToast?: (message: string, type: 'success' | 'error') => void;
}

export default function AddCorrespondenceForm({ dealId, onSuccess, onCancel, showToast }: AddCorrespondenceFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    correspondence_type: 'offer' as const,
    sender: '',
    recipient: '',
    subject: '',
    content: '',
    correspondence_date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('http://localhost:8000/api/v1/correspondence/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          deal_id: dealId,
          correspondence_date: new Date(formData.correspondence_date).toISOString(),
        }),
      });

      if (!res.ok) throw new Error('Failed to add correspondence');
      showToast?.('Correspondence added successfully', 'success');
      onSuccess();
    } catch (error) {
      console.error('Error adding correspondence:', error);
      showToast?.('Failed to add correspondence', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-slot="card" className="rounded-xl p-6 space-y-4">
      <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
        Add Correspondence
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Type</label>
          <select
            value={formData.correspondence_type}
            onChange={(e) => setFormData({ ...formData, correspondence_type: e.target.value as any })}
            className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
            style={{ borderColor: "#E8E6E0" }}
          >
            <option value="offer">Offer</option>
            <option value="counter_offer">Counter Offer</option>
            <option value="question">Question</option>
            <option value="answer">Answer</option>
            <option value="clarification">Clarification</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Date</label>
          <input
            type="date"
            value={formData.correspondence_date}
            onChange={(e) => setFormData({ ...formData, correspondence_date: e.target.value })}
            required
            className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
            style={{ borderColor: "#E8E6E0" }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>From</label>
          <input
            type="text"
            value={formData.sender}
            onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
            required
            className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
            style={{ borderColor: "#E8E6E0" }}
            placeholder="Acme Corporation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>To</label>
          <input
            type="text"
            value={formData.recipient}
            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
            required
            className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
            style={{ borderColor: "#E8E6E0" }}
            placeholder="Property Owner"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Subject</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
          style={{ borderColor: "#E8E6E0" }}
          placeholder="Re: Property Acquisition Offer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={6}
          className="w-full px-4 py-2.5 border rounded-lg text-[15px] resize-none"
          style={{ borderColor: "#E8E6E0" }}
          placeholder="Enter the full text of the correspondence..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="h-10 px-6 rounded-lg text-sm font-medium disabled:opacity-50" style={{ background: "#D4A017", color: "#fff" }}>
          {loading ? 'Adding...' : 'Add Correspondence'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-10 px-6 rounded-lg text-sm font-medium border"
          style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
