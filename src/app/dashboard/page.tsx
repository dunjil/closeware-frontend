'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Deal } from '@/lib/api';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    const loadDeals = async () => {
      try {
        const dealsData = await api.listDeals(parsedUser.organization_id);
        setDeals(dealsData);
      } catch (error) {
        console.error('Error loading deals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: "#FAF9F6" }}>
        <div className="max-w-5xl mx-auto px-5 py-8">
          <div className="h-6 w-48 rounded" style={{ background: "#E8E6E0" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#FAF9F6" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "#E8E6E0", background: "rgba(250,249,246,0.85)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-[22px] font-light tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Close<span style={{ color: "#D4A017" }} className="font-medium">ware</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:inline" style={{ color: "#6B6B63" }}>{user?.full_name}</span>
            <button onClick={handleLogout} className="text-sm hover:underline" style={{ color: "#8A8880" }}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8 space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "#1A1A18" }}>
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"},{" "}
            {user?.name?.split(" ")[0] || user?.full_name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#6B6B63" }}>
            {deals.length === 0 ? "No active deals." : `${deals.length} active deal${deals.length !== 1 ? 's' : ''}.`}
          </p>
        </div>

        {/* New Deal Button */}
        <div>
          <Link href="/deals/new" className="inline-flex items-center h-10 px-5 rounded-lg text-sm font-medium" style={{ background: "#D4A017", color: "#fff" }}>
            New Deal
          </Link>
        </div>

        {/* Deals list */}
        {deals.length === 0 ? (
          <div data-slot="card" className="rounded-xl p-12 text-center">
            <h3 className="text-lg font-medium mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
              No deals yet
            </h3>
            <p className="text-sm mb-6" style={{ color: "#6B6B63" }}>
              Create your first deal to start tracking negotiations and verifying contracts.
            </p>
            <Link href="/deals/new" className="inline-flex items-center h-10 px-5 rounded-lg text-sm font-medium" style={{ background: "#D4A017", color: "#fff" }}>
              Create deal
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {deals.map((deal) => (
              <Link key={deal.id} href={`/deals/${deal.id}`}>
                <div data-slot="card" className="rounded-xl p-6 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-medium mb-1" style={{ color: "#1A1A18" }}>{deal.title}</h3>
                      <p className="text-sm capitalize" style={{ color: "#6B6B63" }}>{deal.deal_type.replace('_', ' ')}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full capitalize" style={{ background: "rgba(212,160,23,0.08)", color: "#D4A017", border: "1px solid rgba(212,160,23,0.25)" }}>
                      {deal.status}
                    </span>
                  </div>

                  {deal.asset_description && (
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: "#6B6B63" }}>{deal.asset_description}</p>
                  )}

                  <div className="flex gap-6 text-xs" style={{ color: "#8A8880" }}>
                    {deal.agreed_price && (
                      <span className="font-mono">{deal.currency} {deal.agreed_price.toLocaleString()}</span>
                    )}
                    <span>{deal.correspondence_count || 0} correspondence</span>
                    <span>{deal.documents_count || 0} documents</span>
                    {deal.latest_draft_version && <span>v{deal.latest_draft_version}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
