const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface Deal {
  id: string;
  organization_id: string;
  creator_id: string;
  deal_type: 'property' | 'corporate_ma' | 'jv_agreement' | 'nda_only';
  status: 'draft' | 'negotiating' | 'verification' | 'review' | 'approved' | 'closed' | 'cancelled';
  title: string;
  asset_description?: string;
  agreed_price?: number;
  currency?: string;
  parties?: Record<string, any>;
  terms?: Record<string, any>;
  created_at: string;
  updated_at: string;
  correspondence_count?: number;
  documents_count?: number;
  latest_draft_version?: number;
}

export interface Correspondence {
  id: string;
  deal_id: string;
  correspondence_type: 'offer' | 'counter_offer' | 'question' | 'answer' | 'clarification';
  sender: string;
  recipient: string;
  subject?: string;
  content: string;
  correspondence_date: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  deal_id: string;
  document_type: 'title' | 'ownership_record' | 'license' | 'certificate' | 'supporting' | 'other';
  title: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  metadata?: Record<string, any>;
  uploaded_at: string;
  download_url?: string;
}

export interface ContractDraft {
  id: string;
  deal_id: string;
  version: number;
  title: string;
  content: string;
  status: 'internal_draft' | 'pending_internal_review' | 'pending_revisions' | 'sent_to_counterparty' | 'awaiting_counterparty_response' | 'approved';
  current_reviewer_id?: string;
  sent_externally_at?: string;
  sent_to_party?: string;
  created_at: string;
  updated_at: string;
}

export interface DiscrepancyItem {
  id: string;
  report_id: string;
  status: 'matched' | 'flagged' | 'missing';
  category: string;
  description: string;
  source_reference?: Record<string, any>;
  suggested_fix?: string;
  created_at: string;
}

export interface DiscrepancyReport {
  id: string;
  deal_id: string;
  contract_draft_id: string;
  summary?: {
    total_items: number;
    matched: number;
    flagged: number;
    missing: number;
  };
  items: DiscrepancyItem[];
  created_at: string;
  updated_at: string;
}

export interface Signature {
  id: string;
  contract_draft_id: string;
  signer_name: string;
  signer_title: string;
  signer_email?: string;
  signature_type: string;
  signed_at: string;
  is_buyer: boolean;
}

export interface InternalReview {
  id: string;
  contract_draft_id: string;
  deal_id: string;
  action: 'request_review' | 'request_revisions' | 'approve' | 'comment' | 'send_external';
  reviewer_id: string;
  reviewee_id?: string;
  comment?: string;
  draft_version: number;
  previous_status?: string;
  new_status: string;
  ip_address?: string;
  sent_to_party_name?: string;
  sent_to_party_email?: string;
  created_at: string;
}

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  async getDeal(dealId: string): Promise<Deal> {
    const res = await fetch(`${API_BASE}/deals/${dealId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch deal');
    return res.json();
  },

  async listDeals(organizationId: string): Promise<Deal[]> {
    const res = await fetch(`${API_BASE}/deals?organization_id=${organizationId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch deals');
    return res.json();
  },

  async getCorrespondence(dealId: string): Promise<Correspondence[]> {
    const res = await fetch(`${API_BASE}/correspondence/deal/${dealId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch correspondence');
    return res.json();
  },

  async getDocuments(dealId: string): Promise<Document[]> {
    const res = await fetch(`${API_BASE}/documents/deal/${dealId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  },

  async getContractDrafts(dealId: string): Promise<ContractDraft[]> {
    const res = await fetch(`${API_BASE}/contract-drafts/deal/${dealId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch contract drafts');
    return res.json();
  },

  async runComparison(contractDraftId: string): Promise<DiscrepancyReport> {
    const res = await fetch(`${API_BASE}/comparison/compare/${contractDraftId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to run comparison');
    return res.json();
  },

  async getReports(dealId: string): Promise<DiscrepancyReport[]> {
    const res = await fetch(`${API_BASE}/comparison/reports/deal/${dealId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch reports');
    return res.json();
  },

  async generateContract(
    dealId: string,
    contractType: 'SPA' | 'JV' | 'NDA' = 'SPA',
    title?: string
  ): Promise<ContractDraft> {
    const res = await fetch(`${API_BASE}/contracts/generate/${dealId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ contract_type: contractType, title }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: 'Failed to generate contract' }));
      throw new Error(error.detail || 'Failed to generate contract');
    }
    return res.json();
  },

  async regenerateContract(
    contractDraftId: string,
    corrections: string,
    contractType: 'SPA' | 'JV' | 'NDA' = 'SPA'
  ): Promise<ContractDraft> {
    const res = await fetch(`${API_BASE}/contracts/regenerate/${contractDraftId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ corrections, contract_type: contractType }),
    });
    if (!res.ok) throw new Error('Failed to regenerate contract');
    return res.json();
  },

  async applySingleFix(
    contractDraftId: string,
    discrepancyItemId: string
  ): Promise<ContractDraft> {
    const res = await fetch(`${API_BASE}/fixes/apply-fix/${contractDraftId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ discrepancy_item_id: discrepancyItemId }),
    });
    if (!res.ok) throw new Error('Failed to apply fix');
    return res.json();
  },

  async applyMultipleFixes(
    contractDraftId: string,
    discrepancyItemIds: string[]
  ): Promise<ContractDraft> {
    const res = await fetch(`${API_BASE}/fixes/apply-fixes/${contractDraftId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ discrepancy_item_ids: discrepancyItemIds }),
    });
    if (!res.ok) throw new Error('Failed to apply fixes');
    return res.json();
  },

  async signContract(
    contractDraftId: string,
    signerName: string,
    signerTitle: string,
    signatureData: string,
    isBuyer: boolean,
    signerEmail?: string
  ): Promise<Signature> {
    const res = await fetch(`${API_BASE}/signatures/${contractDraftId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        signer_name: signerName,
        signer_title: signerTitle,
        signer_email: signerEmail,
        signature_data: signatureData,
        signature_type: 'drawn',
        is_buyer: isBuyer,
      }),
    });
    if (!res.ok) throw new Error('Failed to sign contract');
    return res.json();
  },

  async getSignatures(contractDraftId: string): Promise<Signature[]> {
    const res = await fetch(`${API_BASE}/signatures/${contractDraftId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch signatures');
    return res.json();
  },

  async createInternalReview(
    contractDraftId: string,
    dealId: string,
    action: 'request_review' | 'request_revisions' | 'approve' | 'comment' | 'send_external',
    comment?: string,
    revieweeEmail?: string,
    sentToPartyName?: string,
    sentToPartyEmail?: string
  ): Promise<InternalReview> {
    const res = await fetch(`${API_BASE}/internal-reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        contract_draft_id: contractDraftId,
        deal_id: dealId,
        action,
        comment,
        reviewee_email: revieweeEmail,
        sent_to_party_name: sentToPartyName,
        sent_to_party_email: sentToPartyEmail,
      }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to create internal review');
    }
    return res.json();
  },

  async getDraftReviews(draftId: string): Promise<InternalReview[]> {
    const res = await fetch(`${API_BASE}/internal-reviews/draft/${draftId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch draft reviews');
    return res.json();
  },

  async getDealReviews(dealId: string): Promise<InternalReview[]> {
    const res = await fetch(`${API_BASE}/internal-reviews/deal/${dealId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch deal reviews');
    return res.json();
  },

  async getPendingReviews(): Promise<InternalReview[]> {
    const res = await fetch(`${API_BASE}/internal-reviews/pending`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch pending reviews');
    return res.json();
  },

  async inviteExternalUser(
    dealId: string,
    email: string,
    name: string,
    organizationName?: string,
    title?: string,
    role: 'external_reviewer' | 'external_signer' = 'external_reviewer',
    message?: string
  ): Promise<any> {
    const res = await fetch(`${API_BASE}/external/deals/${dealId}/invite-external`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email,
        name,
        organization_name: organizationName,
        title,
        role,
        message,
      }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to send invitation');
    }
    return res.json();
  },

  async validateInvite(token: string): Promise<any> {
    const res = await fetch(`${API_BASE}/external/validate-invite/${token}`);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Invalid invitation');
    }
    return res.json();
  },

  async completeExternalSignup(token: string, password: string, phone?: string): Promise<any> {
    const res = await fetch(`${API_BASE}/external/complete-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invite_token: token,
        password,
        phone,
      }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to complete signup');
    }
    return res.json();
  },

  // Subscription & Billing Methods
  async getCurrentSubscription(): Promise<any> {
    const res = await fetch(`${API_BASE}/subscriptions/current`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch subscription');
    return res.json();
  },

  async getUsageSummary(): Promise<any> {
    const res = await fetch(`${API_BASE}/subscriptions/usage`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch usage');
    return res.json();
  },

  async getUsageBreakdown(): Promise<any> {
    const res = await fetch(`${API_BASE}/subscriptions/usage/breakdown`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch usage breakdown');
    return res.json();
  },

  async canUseFeature(): Promise<{ can_use: boolean; reason?: string }> {
    const res = await fetch(`${API_BASE}/subscriptions/can-use-feature`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to check feature access');
    return res.json();
  },

  async createSubscription(tier: string, billing_period: 'monthly' | 'annual' = 'monthly'): Promise<any> {
    const res = await fetch(`${API_BASE}/subscriptions/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ tier, billing_period }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to create subscription');
    }
    return res.json();
  },

  async upgradeSubscription(new_tier: string): Promise<any> {
    const res = await fetch(`${API_BASE}/subscriptions/upgrade`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ new_tier }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to upgrade subscription');
    }
    return res.json();
  },

  async cancelSubscription(): Promise<any> {
    const res = await fetch(`${API_BASE}/subscriptions/cancel`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to cancel subscription');
    }
    return res.json();
  },

  async getInvoices(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/subscriptions/invoices`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch invoices');
    return res.json();
  },

  async getInvoice(invoiceId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/subscriptions/invoices/${invoiceId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch invoice');
    return res.json();
  },
};
