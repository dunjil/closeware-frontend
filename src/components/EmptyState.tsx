interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon = "📋", title, description, action }: EmptyStateProps) {
  return (
    <div className="card p-16 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      <p className="text-[var(--muted-foreground)] mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <button onClick={action.onClick} className="btn-gold">
          {action.label}
        </button>
      )}
    </div>
  );
}
