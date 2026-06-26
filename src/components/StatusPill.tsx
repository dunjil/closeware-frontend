interface StatusPillProps {
  status: 'matched' | 'flagged' | 'missing';
  children: React.ReactNode;
}

export default function StatusPill({ status, children }: StatusPillProps) {
  const styles = {
    matched: { background: 'rgba(74, 124, 89, 0.08)', color: '#4A7C59', border: '1px solid rgba(74, 124, 89, 0.2)' },
    flagged: { background: 'rgba(192, 57, 43, 0.08)', color: '#C0392B', border: '1px solid rgba(192, 57, 43, 0.2)' },
    missing: { background: 'rgba(212, 160, 23, 0.08)', color: '#D4A017', border: '1px solid rgba(212, 160, 23, 0.25)' },
  };

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize"
      style={styles[status]}
    >
      {children}
    </span>
  );
}
``