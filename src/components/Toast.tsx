'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = {
    success: 'var(--success)',
    error: 'var(--destructive)',
    info: 'var(--primary)',
  }[type];

  return (
    <div
      className="fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg text-white max-w-md z-50 animate-slide-up"
      style={{ background: bgColor }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">{message}</div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
