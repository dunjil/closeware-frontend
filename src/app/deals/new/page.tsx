'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewDealPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    deal_type: 'property' as const,
    asset_description: '',
    agreed_price: '',
    currency: 'NGN',
    buyer_name: '',
    seller_name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('access_token');

      const res = await fetch(
        `http://localhost:8000/api/v1/deals?organization_id=${user.organization_id}&creator_id=${user.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            deal_type: formData.deal_type,
            asset_description: formData.asset_description,
            agreed_price: formData.agreed_price ? parseFloat(formData.agreed_price) : null,
            currency: formData.currency,
            parties: {
              buyer: formData.buyer_name,
              seller: formData.seller_name,
            },
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to create deal');
      }

      const deal = await res.json();
      router.push(`/deals/${deal.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF9F6" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "#E8E6E0", background: "rgba(250,249,246,0.85)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-4xl mx-auto px-5 h-16 flex items-center">
          <Link href="/dashboard" className="text-sm hover:underline" style={{ color: "#6B6B63" }}>
            ← Back to deals
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-8">
        <h1 className="text-2xl font-semibold mb-8" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
          Create New Deal
        </h1>

        {error && (
          <div className="mb-6 p-4 rounded-lg text-sm" style={{ background: "rgba(192, 57, 43, 0.08)", border: "1px solid rgba(192, 57, 43, 0.2)", color: "#C0392B" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div data-slot="card" className="rounded-xl p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Deal Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="Reign Restaurant Property Acquisition"
                disabled={loading}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Deal Type *</label>
                <select
                  value={formData.deal_type}
                  onChange={(e) => setFormData({ ...formData, deal_type: e.target.value as any })}
                  className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                  style={{ borderColor: "#E8E6E0" }}
                  disabled={loading}
                >
                  <option value="property">Property Acquisition</option>
                  <option value="corporate_ma">Corporate M&A</option>
                  <option value="jv_agreement">Joint Venture</option>
                  <option value="nda_only">NDA Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                  style={{ borderColor: "#E8E6E0" }}
                  disabled={loading}
                >
                  <option value="NGN">NGN (₦)</option>
                  <option value="USD">USD ($)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Asset Description</label>
              <textarea
                value={formData.asset_description}
                onChange={(e) => setFormData({ ...formData, asset_description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border rounded-lg text-[15px] resize-none"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="Commercial property located at Plot 123, Victoria Island, Lagos..."
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Agreed Price</label>
              <input
                type="number"
                value={formData.agreed_price}
                onChange={(e) => setFormData({ ...formData, agreed_price: e.target.value })}
                step="0.01"
                className="w-full px-4 py-2.5 border rounded-lg text-[15px] font-mono"
                style={{ borderColor: "#E8E6E0" }}
                placeholder="4450000000.00"
                disabled={loading}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Buyer Name</label>
                <input
                  type="text"
                  value={formData.buyer_name}
                  onChange={(e) => setFormData({ ...formData, buyer_name: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                  style={{ borderColor: "#E8E6E0" }}
                  placeholder="Acme Corporation"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A18" }}>Seller Name</label>
                <input
                  type="text"
                  value={formData.seller_name}
                  onChange={(e) => setFormData({ ...formData, seller_name: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-lg text-[15px]"
                  style={{ borderColor: "#E8E6E0" }}
                  placeholder="Property Owner Ltd."
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t" style={{ borderColor: "#E8E6E0" }}>
              <button
                type="submit"
                disabled={loading}
                className="h-10 px-6 rounded-lg text-sm font-medium disabled:opacity-50"
                style={{ background: "#D4A017", color: "#fff" }}
              >
                {loading ? 'Creating...' : 'Create Deal'}
              </button>
              <Link href="/dashboard" className="h-10 px-6 rounded-lg text-sm font-medium inline-flex items-center border" style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}>
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
