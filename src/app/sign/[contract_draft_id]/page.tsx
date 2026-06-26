'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function SignContractPage() {
  const params = useParams();
  const router = useRouter();
  const contractDraftId = params?.contract_draft_id as string;

  const [contract, setContract] = useState<any>(null);
  const [signatureRequests, setSignatureRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    loadContractAndRequests();
  }, [contractDraftId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = '#1A1A18';
  }, []);

  const loadContractAndRequests = async () => {
    try {
      // Load contract draft
      const contractRes = await fetch(`http://localhost:8000/api/v1/contract-drafts/${contractDraftId}`);
      if (!contractRes.ok) throw new Error('Contract not found');
      const contractData = await contractRes.json();
      setContract(contractData);

      // Load signature requests for this contract
      const reqRes = await fetch(`http://localhost:8000/api/v1/signature-requests/${contractDraftId}`);
      if (reqRes.ok) {
        const requests = await reqRes.json();
        setSignatureRequests(requests);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load contract');
    } finally {
      setLoading(false);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const isCanvasEmpty = () => {
    const canvas = canvasRef.current;
    if (!canvas) return true;

    const context = canvas.getContext('2d');
    if (!context) return true;

    const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    return !pixelData.some(channel => channel !== 0);
  };

  const handleSign = async () => {
    if (isCanvasEmpty()) {
      setError('Please provide a signature');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    setSigning(true);
    setError('');

    try {
      const signatureData = canvas.toDataURL();

      // Get first pending signature request (simplified - in production, match by email)
      const pendingRequest = signatureRequests.find(req => req.status === 'pending');
      if (!pendingRequest) {
        throw new Error('No pending signature request found');
      }

      const res = await fetch(`http://localhost:8000/api/v1/signature-requests/${pendingRequest.id}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signature_data: signatureData,
          signature_type: 'drawn'
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to submit signature');
      }

      const result = await res.json();
      setSuccess(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSigning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF9F6' }}>
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 rounded-full mx-auto mb-4" style={{ borderColor: '#E8E6E0', borderTopColor: '#D4A017' }}></div>
          <p style={{ color: '#6B6B63' }}>Loading contract...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF9F6' }}>
        <div className="max-w-md w-full text-center bg-white rounded-xl p-10" style={{ border: '1px solid #E8E6E0' }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(74, 124, 89, 0.1)' }}>
            <svg className="w-8 h-8" fill="none" stroke="#4A7C59" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
            Signature Recorded!
          </h1>
          <p className="mb-2" style={{ color: '#6B6B63' }}>
            Your signature has been successfully recorded.
          </p>
          <p className="text-sm" style={{ color: '#8A8880' }}>
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ background: '#FAF9F6' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
            Sign Contract
          </h1>
          <p style={{ color: '#6B6B63' }}>
            Please review the contract below and provide your signature
          </p>
        </div>

        {/* Contract Preview */}
        <div className="bg-white rounded-xl p-8 mb-6" style={{ border: '1px solid #E8E6E0' }}>
          <h2 className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
            {contract?.title}
          </h2>
          <div
            className="prose max-w-none"
            style={{ color: '#4A4A45', whiteSpace: 'pre-wrap' }}
          >
            {contract?.content}
          </div>
        </div>

        {/* Signature Section */}
        <div className="bg-white rounded-xl p-8" style={{ border: '1px solid #E8E6E0' }}>
          <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A18' }}>
            Your Signature
          </h3>

          <p className="text-sm mb-4" style={{ color: '#6B6B63' }}>
            Draw your signature in the box below using your mouse or touchscreen
          </p>

          <div className="border-2 rounded-lg mb-4 inline-block" style={{ borderColor: '#E8E6E0' }}>
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="cursor-crosshair"
              style={{ display: 'block' }}
            />
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-lg" style={{ background: 'rgba(192, 57, 43, 0.1)', color: '#C0392B' }}>
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={clearSignature}
              className="px-6 py-2 rounded-lg border"
              style={{ borderColor: '#E8E6E0', color: '#6B6B63' }}
            >
              Clear
            </button>

            <button
              onClick={handleSign}
              disabled={signing}
              className="px-6 py-2 rounded-lg disabled:opacity-50"
              style={{ background: '#D4A017', color: '#fff' }}
            >
              {signing ? 'Submitting...' : 'Sign Contract'}
            </button>
          </div>

          <p className="text-xs mt-6" style={{ color: '#8A8880' }}>
            By signing this contract, you agree to its terms and conditions. This signature is legally binding.
          </p>
        </div>
      </div>
    </div>
  );
}
