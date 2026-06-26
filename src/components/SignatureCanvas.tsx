'use client';

import { useRef, useState, useEffect } from 'react';

interface SignatureCanvasProps {
  onSave: (signatureData: string) => void;
  onCancel: () => void;
  signerName: string;
  signerTitle: string;
  isBuyer: boolean;
}

export default function SignatureCanvas({
  onSave,
  onCancel,
  signerName,
  signerTitle,
  isBuyer
}: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set drawing style
    ctx.strokeStyle = '#1A1A18';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setIsEmpty(false);

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || isEmpty) return;

    const signatureData = canvas.toDataURL('image/png');
    onSave(signatureData);
  };

  return (
    <div data-slot="card" className="rounded-xl p-6">
      <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
        Sign Contract
      </h3>

      <div className="mb-4">
        <p className="text-sm mb-1" style={{ color: "#1A1A18" }}>
          <strong>{signerName}</strong>
        </p>
        <p className="text-sm mb-2" style={{ color: "#6B6B63" }}>
          {signerTitle} · Signing as {isBuyer ? 'Buyer' : 'Seller'}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm mb-2" style={{ color: "#6B6B63" }}>
          Draw your signature below:
        </p>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-32 border rounded-lg cursor-crosshair"
          style={{ borderColor: "#E8E6E0", background: "#FFFFFF" }}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={saveSignature}
          disabled={isEmpty}
          className="h-10 px-6 rounded-lg text-sm font-medium disabled:opacity-50"
          style={{ background: "#D4A017", color: "#fff" }}
        >
          Sign & Save
        </button>
        <button
          onClick={clearSignature}
          disabled={isEmpty}
          className="h-10 px-6 rounded-lg text-sm font-medium border disabled:opacity-50"
          style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}
        >
          Clear
        </button>
        <button
          onClick={onCancel}
          className="h-10 px-6 rounded-lg text-sm font-medium border"
          style={{ borderColor: "#E8E6E0", color: "#4A4A45" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
