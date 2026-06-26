'use client';

import { useState } from 'react';

interface AddContractDraftFormProps {
  dealId: string;
  onSuccess: () => void;
  onCancel: () => void;
  showToast?: (message: string, type: 'success' | 'error') => void;
}

export default function AddContractDraftForm({ dealId, onSuccess, onCancel, showToast }: AddContractDraftFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('http://localhost:8000/api/v1/contract-drafts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          deal_id: dealId,
        }),
      });

      if (!res.ok) throw new Error('Failed to add contract draft');
      showToast?.('Contract draft saved successfully', 'success');
      onSuccess();
    } catch (error) {
      console.error('Error adding contract draft:', error);
      showToast?.('Failed to save contract draft', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-slot="card" className="rounded-xl p-6 space-y-4">
      <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
        Add Contract Draft
      </h3>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Draft Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
          style={{ borderColor: "#E8E6E0" }}
          placeholder="Sale and Purchase Agreement - Draft 1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Contract Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={16}
          className="w-full px-4 py-2.5 border rounded-lg text-sm font-mono resize-none"
          style={{ borderColor: "#E8E6E0" }}
          placeholder="Paste the full contract text here..."
        />
        <p className="text-xs mt-1" style={{ color: "#8A8880" }}>
          Paste the complete contract text. You can run verification against this draft after saving.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="h-10 px-6 rounded-lg text-sm font-medium disabled:opacity-50" style={{ background: "#D4A017", color: "#fff" }}>
          {loading ? 'Saving...' : 'Save Draft'}
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
