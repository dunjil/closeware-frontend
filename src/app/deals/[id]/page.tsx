'use client';

import { useEffect, useState } from 'react';
import { api, Deal, Correspondence, Document, ContractDraft, DiscrepancyReport, Signature } from '@/lib/api';
import StatusPill from '@/components/StatusPill';
import AddCorrespondenceForm from '@/components/AddCorrespondenceForm';
import UploadDocumentForm from '@/components/UploadDocumentForm';
import AddContractDraftForm from '@/components/AddContractDraftForm';
import SignatureCanvas from '@/components/SignatureCanvas';
import InternalReviewPanel from '@/components/InternalReviewPanel';
import InviteExternalUserModal from '@/components/InviteExternalUserModal';
import GenerateOfferLetterModal from '@/components/GenerateOfferLetterModal';
import { useToast } from '@/hooks/useToast';
import { exportContractToPDF } from '@/lib/pdfExport';
import { exportContractToDOCX } from '@/lib/docxExport';
import Link from 'next/link';

export default function DealPage({ params }: { params: { id: string } }) {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [correspondence, setCorrespondence] = useState<Correspondence[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [drafts, setDrafts] = useState<ContractDraft[]>([]);
  const [reports, setReports] = useState<DiscrepancyReport[]>([]);
  const [activeTab, setActiveTab] = useState<'correspondence' | 'documents' | 'drafts' | 'comparison' | 'workflow'>('correspondence');
  const [selectedDraftForReview, setSelectedDraftForReview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [runningComparison, setRunningComparison] = useState(false);
  const [generatingContract, setGeneratingContract] = useState(false);
  const [showRegenerateForm, setShowRegenerateForm] = useState<string | null>(null);
  const [regenerationPrompt, setRegenerationPrompt] = useState('');
  const [applyingFix, setApplyingFix] = useState<string | null>(null);
  const [selectedFixes, setSelectedFixes] = useState<Set<string>>(new Set());
  const [applyingBatchFixes, setApplyingBatchFixes] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState<{ draftId: string; isBuyer: boolean } | null>(null);
  const [signatures, setSignatures] = useState<Record<string, Signature[]>>({});
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showOfferLetterModal, setShowOfferLetterModal] = useState(false);
  const { showToast, ToastContainer } = useToast();

  const loadDealData = async () => {
    try {
      const [dealData, corrData, docsData, draftsData, reportsData] = await Promise.all([
        api.getDeal(params.id),
        api.getCorrespondence(params.id),
        api.getDocuments(params.id),
        api.getContractDrafts(params.id),
        api.getReports(params.id),
      ]);
      setDeal(dealData);
      setCorrespondence(corrData);
      setDocuments(docsData);
      setDrafts(draftsData);
      setReports(reportsData);
    } catch (error) {
      console.error('Error loading deal data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDealData();
  }, [params.id]);

  const handleFormSuccess = () => {
    setShowAddForm(false);
    loadDealData();
  };

  const handleRunComparison = async (draftId: string) => {
    setRunningComparison(true);
    try {
      await api.runComparison(draftId);
      await loadDealData();
      setActiveTab('comparison');
      showToast('Verification completed successfully', 'success');
    } catch (error) {
      console.error('Error running comparison:', error);
      showToast('Failed to run verification', 'error');
    } finally {
      setRunningComparison(false);
    }
  };

  const handleGenerateContract = async () => {
    setGeneratingContract(true);
    try {
      const contractType = deal?.deal_type === 'jv_agreement' ? 'JV' : deal?.deal_type === 'nda_only' ? 'NDA' : 'SPA';
      await api.generateContract(params.id, contractType);
      await loadDealData();
      setActiveTab('drafts');
      showToast('Contract generated successfully', 'success');
    } catch (error: any) {
      console.error('Error generating contract:', error);
      showToast(error.message || 'Failed to generate contract', 'error');
    } finally {
      setGeneratingContract(false);
    }
  };

  const handleRegenerateContract = async (draftId: string) => {
    if (!regenerationPrompt.trim()) {
      showToast('Please enter corrections or suggestions', 'error');
      return;
    }

    setGeneratingContract(true);
    try {
      const contractType = deal?.deal_type === 'jv_agreement' ? 'JV' : deal?.deal_type === 'nda_only' ? 'NDA' : 'SPA';
      await api.regenerateContract(draftId, regenerationPrompt, contractType);
      await loadDealData();
      setShowRegenerateForm(null);
      setRegenerationPrompt('');
      showToast('Contract regenerated successfully', 'success');
    } catch (error) {
      console.error('Error regenerating contract:', error);
      showToast('Failed to regenerate contract', 'error');
    } finally {
      setGeneratingContract(false);
    }
  };

  const handleApplySingleFix = async (itemId: string, draftId: string) => {
    setApplyingFix(itemId);
    try {
      await api.applySingleFix(draftId, itemId);
      await loadDealData();
      setActiveTab('drafts');
      showToast('Fix applied successfully - new version created', 'success');
    } catch (error) {
      console.error('Error applying fix:', error);
      showToast('Failed to apply fix', 'error');
    } finally {
      setApplyingFix(null);
    }
  };

  const handleToggleFixSelection = (itemId: string) => {
    const newSelection = new Set(selectedFixes);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedFixes(newSelection);
  };

  const handleApplySelectedFixes = async () => {
    if (selectedFixes.size === 0) {
      showToast('Please select at least one fix to apply', 'error');
      return;
    }

    if (!latestReport?.contract_draft_id) {
      showToast('No contract draft found', 'error');
      return;
    }

    setApplyingBatchFixes(true);
    try {
      await api.applyMultipleFixes(latestReport.contract_draft_id, Array.from(selectedFixes));
      await loadDealData();
      setSelectedFixes(new Set());
      setActiveTab('drafts');
      showToast(`${selectedFixes.size} fix${selectedFixes.size > 1 ? 'es' : ''} applied successfully`, 'success');
    } catch (error) {
      console.error('Error applying fixes:', error);
      showToast('Failed to apply fixes', 'error');
    } finally {
      setApplyingBatchFixes(false);
    }
  };

  const loadSignatures = async (draftId: string) => {
    try {
      const sigs = await api.getSignatures(draftId);
      setSignatures(prev => ({ ...prev, [draftId]: sigs }));
    } catch (error) {
      console.error('Error loading signatures:', error);
    }
  };

  const handleSignContract = async (signatureData: string) => {
    if (!showSignatureModal) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      await api.signContract(
        showSignatureModal.draftId,
        user.full_name || user.name || 'Unknown',
        user.role || 'Authorized Signatory',
        signatureData,
        showSignatureModal.isBuyer,
        user.email
      );

      await loadSignatures(showSignatureModal.draftId);
      setShowSignatureModal(null);
      showToast('Contract signed successfully', 'success');
    } catch (error) {
      console.error('Error signing contract:', error);
      showToast('Failed to sign contract', 'error');
    }
  };

  const handleExportPDF = (draft: ContractDraft) => {
    const draftSignatures = signatures[draft.id] || [];
    exportContractToPDF({
      title: draft.title,
      content: draft.content,
      dealTitle: deal?.title,
      dealType: deal?.deal_type,
      version: draft.version,
      signatures: draftSignatures,
    });
    showToast('PDF exported successfully', 'success');
  };

  const handleExportDOCX = async (draft: ContractDraft) => {
    const draftSignatures = signatures[draft.id] || [];
    await exportContractToDOCX({
      title: draft.title,
      content: draft.content,
      dealTitle: deal?.title,
      dealType: deal?.deal_type,
      version: draft.version,
      signatures: draftSignatures,
    });
    showToast('DOCX exported successfully', 'success');
  };

  // Load signatures for drafts
  useEffect(() => {
    drafts.forEach(draft => {
      if (!signatures[draft.id]) {
        loadSignatures(draft.id);
      }
    });
  }, [drafts]);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: "#FAF9F6" }}>
        <div className="max-w-5xl mx-auto px-5 py-8">
          <div className="h-6 w-48 rounded" style={{ background: "#E8E6E0" }} />
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF9F6" }}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: "#C0392B" }}>Deal not found</p>
          <Link href="/dashboard" className="inline-flex items-center h-10 px-6 rounded-lg text-sm font-medium" style={{ background: "#D4A017", color: "#fff" }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const latestReport = reports[0];
  const fixableItems = latestReport?.items.filter(item =>
    item.suggested_fix && (item.status === 'flagged' || item.status === 'missing')
  ) || [];

  return (
    <div className="min-h-screen" style={{ background: "#FAF9F6" }}>
      <ToastContainer />

      {/* Header */}
      <header className="border-b" style={{ borderColor: "#E8E6E0", background: "rgba(250,249,246,0.85)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-5xl mx-auto px-5 py-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm mb-4 hover:underline" style={{ color: "#6B6B63" }}>
            ← Back to deals
          </Link>

          <h1 className="text-3xl mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
            {deal.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4 text-sm">
              <span style={{ color: "#6B6B63" }}>
                Type: <strong className="capitalize" style={{ color: "#1A1A18" }}>{deal.deal_type.replace('_', ' ')}</strong>
              </span>
              <span style={{ color: "#6B6B63" }}>
                Status: <strong className="capitalize" style={{ color: "#1A1A18" }}>{deal.status}</strong>
              </span>
              {deal.agreed_price && (
                <span style={{ color: "#6B6B63", fontFamily: "var(--font-mono)" }}>
                  Price: <strong style={{ color: "#1A1A18" }}>{deal.currency} {deal.agreed_price.toLocaleString()}</strong>
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowOfferLetterModal(true)}
                className="h-10 px-6 rounded-lg text-sm font-medium border"
                style={{ borderColor: "#E8E6E0", color: "#6B6B63" }}
              >
                 Generate Offer Letter
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="h-10 px-6 rounded-lg text-sm font-medium"
                style={{ background: "#D4A017", color: "#fff" }}
              >
                Invite External Reviewer
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Correspondence', value: correspondence.length },
            { label: 'Documents', value: documents.length },
            { label: 'Drafts', value: drafts.length },
            { label: 'Verifications', value: reports.length },
          ].map((stat) => (
            <div key={stat.label} data-slot="card" className="rounded-xl p-6 text-center">
              <div className="text-3xl font-medium mb-1" style={{ fontFamily: "var(--font-mono)", color: "#D4A017" }}>
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: "#6B6B63" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b mb-8" style={{ borderColor: "#E8E6E0" }}>
          <nav className="flex gap-8 overflow-x-auto">
            {[
              { id: 'correspondence', label: 'Correspondence' },
              { id: 'documents', label: 'Documents' },
              { id: 'drafts', label: 'Contract Drafts' },
              { id: 'comparison', label: 'Verification' },
              { id: 'workflow', label: 'Internal Review' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 px-2 text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? 'border-b-2 font-medium' : ''
                }`}
                style={activeTab === tab.id ? { borderColor: "#D4A017", color: "#D4A017" } : { color: "#6B6B63" }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Correspondence Tab */}
        {activeTab === 'correspondence' && (
          <div className="space-y-6">
            {!showAddForm && (
              <button onClick={() => setShowAddForm(true)} className="h-10 px-6 rounded-lg text-sm font-medium" style={{ background: "#D4A017", color: "#fff" }}>
                Add Correspondence
              </button>
            )}

            {showAddForm && (
              <AddCorrespondenceForm
                dealId={params.id}
                onSuccess={handleFormSuccess}
                onCancel={() => setShowAddForm(false)}
                showToast={showToast}
              />
            )}

            {correspondence.map((item) => (
              <div key={item.id} data-slot="card" className="rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs px-3 py-1 rounded-full capitalize" style={{ background: "rgba(212,160,23,0.08)", color: "#D4A017" }}>
                    {item.correspondence_type.replace('_', ' ')}
                  </span>
                  <span className="text-sm" style={{ fontFamily: "var(--font-mono)", color: "#8A8880" }}>
                    {new Date(item.correspondence_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-3 text-sm" style={{ color: "#6B6B63" }}>
                  <span>From:</span> <strong style={{ color: "#1A1A18" }}>{item.sender}</strong>
                  <span className="mx-3">→</span>
                  <span>To:</span> <strong style={{ color: "#1A1A18" }}>{item.recipient}</strong>
                </div>
                {item.subject && <div className="font-medium mb-3" style={{ color: "#1A1A18" }}>{item.subject}</div>}
                <div className="whitespace-pre-wrap text-[15px]" style={{ color: "#4A4A45" }}>{item.content}</div>
              </div>
            ))}

            {correspondence.length === 0 && !showAddForm && (
              <div data-slot="card" className="rounded-xl p-16 text-center">
                <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                  No correspondence yet
                </h3>
                <p className="text-sm" style={{ color: "#6B6B63" }}>
                  Add offer letters, counter-offers, and email exchanges to build your negotiation trail
                </p>
              </div>
            )}
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div>
            {!showAddForm && (
              <button onClick={() => setShowAddForm(true)} className="h-10 px-6 rounded-lg text-sm font-medium mb-6" style={{ background: "#D4A017", color: "#fff" }}>
                Upload Document
              </button>
            )}

            {showAddForm && (
              <div className="mb-6">
                <UploadDocumentForm
                  dealId={params.id}
                  onSuccess={handleFormSuccess}
                  onCancel={() => setShowAddForm(false)}
                  showToast={showToast}
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {documents.map((doc) => (
                <div key={doc.id} data-slot="card" className="rounded-xl p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium flex-1" style={{ color: "#1A1A18" }}>{doc.title}</h3>
                    <span className="text-xs px-3 py-1 rounded-full capitalize ml-3" style={{ background: "#F5F3EE", color: "#6B6B63" }}>
                      {doc.document_type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-sm mb-3" style={{ color: "#6B6B63" }}>
                    Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}
                  </div>
                  {doc.download_url && (
                    <a href={doc.download_url} className="text-sm font-medium hover:underline" style={{ color: "#D4A017" }}>
                      Download →
                    </a>
                  )}
                </div>
              ))}

              {documents.length === 0 && !showAddForm && (
                <div className="col-span-full" data-slot="card">
                  <div className="rounded-xl p-16 text-center">
                    <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                      No documents yet
                    </h3>
                    <p className="text-sm" style={{ color: "#6B6B63" }}>
                      Upload title documents, ownership records, and supporting paperwork
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Drafts Tab */}
        {activeTab === 'drafts' && (
          <div className="space-y-6">
            {!showAddForm && (
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleGenerateContract}
                  disabled={generatingContract}
                  className="h-10 px-6 rounded-lg text-sm font-medium disabled:opacity-50"
                  style={{ background: "#D4A017", color: "#fff" }}
                >
                  {generatingContract ? 'Generating...' : ' Generate Contract with AI'}
                </button>
                <button onClick={() => setShowAddForm(true)} className="h-10 px-6 rounded-lg text-sm font-medium border" style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}>
                  Add Manual Draft
                </button>
              </div>
            )}

            {showAddForm && (
              <AddContractDraftForm
                dealId={params.id}
                onSuccess={handleFormSuccess}
                onCancel={() => setShowAddForm(false)}
                showToast={showToast}
              />
            )}

            {drafts.map((draft) => (
              <div key={draft.id} data-slot="card" className="rounded-xl p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                      {draft.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm" style={{ color: "#6B6B63" }}>
                      <span>Version {draft.version} • {new Date(draft.created_at).toLocaleDateString()}</span>
                      {draft.status && (
                        <span className="text-xs px-3 py-1 rounded-full capitalize" style={{
                          background: draft.status.includes('pending') ? 'rgba(212,160,23,0.08)' :
                                     draft.status === 'approved' ? 'rgba(74,124,89,0.08)' : '#F5F3EE',
                          color: draft.status.includes('pending') ? '#D4A017' :
                                draft.status === 'approved' ? '#4A7C59' : '#6B6B63'
                        }}>
                          {draft.status.replace(/_/g, ' ')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleRunComparison(draft.id)}
                      disabled={runningComparison}
                      className="h-10 px-5 rounded-lg text-sm font-medium disabled:opacity-50"
                      style={{ background: "#D4A017", color: "#fff" }}
                    >
                      {runningComparison ? 'Running...' : 'Run Verification'}
                    </button>
                    <button
                      onClick={() => handleExportPDF(draft)}
                      className="h-10 px-5 rounded-lg text-sm font-medium border"
                      style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}
                    >
                      Export PDF
                    </button>
                    <button
                      onClick={() => handleExportDOCX(draft)}
                      className="h-10 px-5 rounded-lg text-sm font-medium border"
                      style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}
                    >
                      Export DOCX
                    </button>
                    <button
                      onClick={() => setShowRegenerateForm(draft.id)}
                      className="h-10 px-5 rounded-lg text-sm font-medium border"
                      style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}
                    >
                      Suggest Corrections
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDraftForReview(draft.id);
                        setActiveTab('workflow');
                      }}
                      className="h-10 px-5 rounded-lg text-sm font-medium border"
                      style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}
                    >
                      Review Workflow
                    </button>
                  </div>
                </div>
                <div className="text-sm line-clamp-3 whitespace-pre-wrap" style={{ color: "#6B6B63" }}>
                  {draft.content}
                </div>

                {showRegenerateForm === draft.id && (
                  <div className="mt-6 p-6 rounded-xl" style={{ background: "#F5F3EE" }}>
                    <label className="block text-sm font-medium mb-3" style={{ color: "#1A1A18" }}>
                      Enter corrections or suggestions:
                    </label>
                    <textarea
                      value={regenerationPrompt}
                      onChange={(e) => setRegenerationPrompt(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2.5 border rounded-lg text-[15px] resize-none mb-4"
                      style={{ borderColor: "#E8E6E0" }}
                      placeholder="E.g., Change payment terms to 45 days, update buyer name to include Ltd., add force majeure clause..."
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleRegenerateContract(draft.id)}
                        disabled={generatingContract}
                        className="h-10 px-6 rounded-lg text-sm font-medium disabled:opacity-50"
                        style={{ background: "#D4A017", color: "#fff" }}
                      >
                        {generatingContract ? 'Regenerating...' : 'Regenerate Contract'}
                      </button>
                      <button
                        onClick={() => {
                          setShowRegenerateForm(null);
                          setRegenerationPrompt('');
                        }}
                        className="h-10 px-6 rounded-lg text-sm font-medium border"
                        style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Signatures Section */}
                <div className="mt-6 pt-6 border-t" style={{ borderColor: "#E8E6E0" }}>
                  <h4 className="text-sm font-medium mb-4" style={{ color: "#1A1A18" }}>Signatures</h4>

                  {signatures[draft.id] && signatures[draft.id].length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {signatures[draft.id].map((sig) => (
                        <div key={sig.id} className="p-4 rounded-lg border" style={{ borderColor: "#E8E6E0", background: "#F5F3EE" }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(74,124,89,0.08)", color: "#4A7C59" }}>
                              {sig.is_buyer ? 'Buyer' : 'Seller'}
                            </span>
                            <span className="text-xs" style={{ color: "#8A8880" }}>
                              {new Date(sig.signed_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm font-medium mb-1" style={{ color: "#1A1A18" }}>{sig.signer_name}</p>
                          <p className="text-xs" style={{ color: "#6B6B63" }}>{sig.signer_title}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm mb-4" style={{ color: "#6B6B63" }}>No signatures yet</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowSignatureModal({ draftId: draft.id, isBuyer: true })}
                      className="h-10 px-6 rounded-lg text-sm font-medium border"
                      style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}
                    >
                      Sign as Buyer
                    </button>
                    <button
                      onClick={() => setShowSignatureModal({ draftId: draft.id, isBuyer: false })}
                      className="h-10 px-6 rounded-lg text-sm font-medium border"
                      style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}
                    >
                      Sign as Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {drafts.length === 0 && !showAddForm && (
              <div data-slot="card" className="rounded-xl p-16 text-center">
                <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                  No contract drafts yet
                </h3>
                <p className="text-sm mb-6" style={{ color: "#6B6B63" }}>
                  Generate an AI-powered contract from your deal trail or add a manual draft
                </p>
                <button onClick={handleGenerateContract} disabled={generatingContract} className="h-10 px-6 rounded-lg text-sm font-medium" style={{ background: "#D4A017", color: "#fff" }}>
                  {generatingContract ? 'Generating...' : ' Generate with AI'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Verification Tab */}
        {activeTab === 'comparison' && latestReport && (
          <div>
            {/* Summary */}
            <div data-slot="card" className="rounded-xl p-8 mb-8">
              <h3 className="text-2xl mb-6" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                Verification Summary
              </h3>
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-5xl font-light mb-2" style={{ fontFamily: "var(--font-mono)", color: "#4A7C59" }}>
                    {latestReport.summary?.matched || 0}
                  </div>
                  <div className="text-sm" style={{ color: "#6B6B63" }}>Matched</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-light mb-2" style={{ fontFamily: "var(--font-mono)", color: "#C0392B" }}>
                    {latestReport.summary?.flagged || 0}
                  </div>
                  <div className="text-sm" style={{ color: "#6B6B63" }}>Flagged</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-light mb-2" style={{ fontFamily: "var(--font-mono)", color: "#D4A017" }}>
                    {latestReport.summary?.missing || 0}
                  </div>
                  <div className="text-sm" style={{ color: "#6B6B63" }}>Missing</div>
                </div>
              </div>

              {fixableItems.length > 0 && (
                <div className="pt-6 border-t flex flex-wrap gap-4" style={{ borderColor: "#E8E6E0" }}>
                  <button
                    onClick={handleApplySelectedFixes}
                    disabled={selectedFixes.size === 0 || applyingBatchFixes}
                    className="h-10 px-6 rounded-lg text-sm font-medium disabled:opacity-50"
                    style={{ background: "#D4A017", color: "#fff" }}
                  >
                    {applyingBatchFixes
                      ? 'Applying Fixes...'
                      : `Apply Selected Fixes (${selectedFixes.size})`
                    }
                  </button>
                  {selectedFixes.size > 0 && (
                    <button onClick={() => setSelectedFixes(new Set())} className="h-10 px-6 rounded-lg text-sm font-medium border" style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}>
                      Clear Selection
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Items */}
            <div className="space-y-6">
              {latestReport.items.map((item) => (
                <div key={item.id} data-slot="card" className="rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      {item.suggested_fix && (item.status === 'flagged' || item.status === 'missing') && (
                        <input
                          type="checkbox"
                          checked={selectedFixes.has(item.id)}
                          onChange={() => handleToggleFixSelection(item.id)}
                          className="w-5 h-5 cursor-pointer"
                        />
                      )}
                      <StatusPill status={item.status}>{item.status}</StatusPill>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full capitalize" style={{ fontFamily: "var(--font-mono)", background: "#F5F3EE", color: "#6B6B63" }}>
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="mb-4" style={{ color: "#1A1A18" }}>{item.description}</p>

                  {item.suggested_fix && (item.status === 'flagged' || item.status === 'missing') && (
                    <div className="p-4 rounded-xl border" style={{ background: "rgba(212,160,23,0.08)", borderColor: "rgba(212,160,23,0.25)" }}>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium" style={{ color: "#D4A017" }}>
                          Suggested Fix:
                        </span>
                        <button
                          onClick={() => handleApplySingleFix(item.id, latestReport.contract_draft_id)}
                          disabled={applyingFix === item.id}
                          className="h-9 px-4 rounded-lg text-sm font-medium disabled:opacity-50"
                          style={{ background: "#D4A017", color: "#fff" }}
                        >
                          {applyingFix === item.id ? 'Applying...' : 'Apply Fix'}
                        </button>
                      </div>
                      <p className="text-sm italic whitespace-pre-wrap" style={{ color: "#1A1A18" }}>
                        {item.suggested_fix}
                      </p>
                    </div>
                  )}

                  {item.source_reference && (
                    <div className="mt-4 text-xs" style={{ color: "#8A8880" }}>
                      Source: {JSON.stringify(item.source_reference)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comparison' && !latestReport && (
          <div data-slot="card" className="rounded-xl p-20 text-center">
            <h3 className="text-2xl mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
              No verification reports yet
            </h3>
            <p className="mb-8 max-w-md mx-auto" style={{ color: "#6B6B63" }}>
              Upload or generate a contract draft and run a verification to get started
            </p>
            <button
              onClick={() => setActiveTab('drafts')}
              className="h-10 px-6 rounded-lg text-sm font-medium"
              style={{ background: "#D4A017", color: "#fff" }}
            >
              Go to Drafts
            </button>
          </div>
        )}

        {/* Internal Review Workflow Tab */}
        {activeTab === 'workflow' && (
          <div>
            {selectedDraftForReview && drafts.find(d => d.id === selectedDraftForReview) ? (
              <>
                <div className="mb-6">
                  <button
                    onClick={() => setActiveTab('drafts')}
                    className="text-sm hover:underline"
                    style={{ color: '#6B6B63' }}
                  >
                    ← Back to drafts
                  </button>
                </div>
                <InternalReviewPanel
                  draft={drafts.find(d => d.id === selectedDraftForReview)!}
                  dealId={params.id}
                  onReviewCreated={loadDealData}
                  showToast={showToast}
                />
              </>
            ) : (
              <div data-slot="card" className="rounded-xl p-20 text-center">
                <h3 className="text-2xl mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                  Select a draft to review
                </h3>
                <p className="mb-8 max-w-md mx-auto" style={{ color: "#6B6B63" }}>
                  Go to the Contract Drafts tab and click "Review Workflow" on a draft
                </p>
                <button
                  onClick={() => setActiveTab('drafts')}
                  className="h-10 px-6 rounded-lg text-sm font-medium"
                  style={{ background: "#D4A017", color: "#fff" }}
                >
                  Go to Drafts
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <InviteExternalUserModal
          dealId={params.id}
          onSuccess={() => {
            setShowInviteModal(false);
            showToast('Invitation sent successfully', 'success');
          }}
          onCancel={() => setShowInviteModal(false)}
          showToast={showToast}
        />
      )}

      {/* Offer Letter Modal */}
      {showOfferLetterModal && (
        <GenerateOfferLetterModal
          dealId={params.id}
          onClose={() => setShowOfferLetterModal(false)}
          onSuccess={() => {
            loadDealData();
            showToast('Offer letter saved successfully', 'success');
          }}
        />
      )}

      {/* Signature Modal */}
      {showSignatureModal && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setShowSignatureModal(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="max-w-xl w-full">
              <SignatureCanvas
                onSave={handleSignContract}
                onCancel={() => setShowSignatureModal(null)}
                signerName={JSON.parse(localStorage.getItem('user') || '{}').full_name || 'Unknown'}
                signerTitle={JSON.parse(localStorage.getItem('user') || '{}').role || 'Authorized Signatory'}
                isBuyer={showSignatureModal.isBuyer}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
