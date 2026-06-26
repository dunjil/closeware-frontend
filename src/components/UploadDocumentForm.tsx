'use client';

import { useState } from 'react';

interface UploadDocumentFormProps {
  dealId: string;
  onSuccess: () => void;
  onCancel: () => void;
  showToast?: (message: string, type: 'success' | 'error') => void;
}

export default function UploadDocumentForm({ dealId, onSuccess, onCancel, showToast }: UploadDocumentFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    document_type: 'title' as const,
    title: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('deal_id', dealId);
      uploadFormData.append('document_type', formData.document_type);
      uploadFormData.append('title', formData.title);

      const res = await fetch('http://localhost:8000/api/v1/documents/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (!res.ok) throw new Error('Failed to upload document');
      showToast?.('Document uploaded successfully', 'success');
      onSuccess();
    } catch (error) {
      console.error('Error uploading document:', error);
      showToast?.('Failed to upload document', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-slot="card" className="rounded-xl p-6 space-y-4">
      <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
        Upload Document
      </h3>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Document Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
          style={{ borderColor: "#E8E6E0" }}
          placeholder="Certificate of Occupancy"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Document Type</label>
        <select
          value={formData.document_type}
          onChange={(e) => setFormData({ ...formData, document_type: e.target.value as any })}
          className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
          style={{ borderColor: "#E8E6E0" }}
        >
          <option value="title">Title Document</option>
          <option value="ownership_record">Ownership Record</option>
          <option value="license">License</option>
          <option value="certificate">Certificate</option>
          <option value="supporting">Supporting Document</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
          style={{ borderColor: "#E8E6E0" }}
        />
        <p className="text-xs mt-1" style={{ color: "#8A8880" }}>
          Accepted: PDF, Word, Images (max 10MB)
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="h-10 px-6 rounded-lg text-sm font-medium disabled:opacity-50" style={{ background: "#D4A017", color: "#fff" }}>
          {loading ? 'Uploading...' : 'Upload Document'}
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
