'use client';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'info'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: 'bg-[var(--destructive)]',
    warning: 'bg-[var(--primary)]',
    info: 'bg-[var(--primary)]'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 animate-slide-up">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            {title}
          </h3>
          <p className="text-[var(--muted-foreground)] mb-6">{message}</p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-[var(--border)] rounded-md hover:border-[#D5D3CC] transition"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-md transition ${variantStyles[variant]} hover:opacity-90`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
