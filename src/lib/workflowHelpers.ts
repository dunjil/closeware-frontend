/**
 * Workflow helper utilities for contract draft internal review.
 * Mirrors server-side validation logic for better UX.
 */

export type DraftStatus =
  | 'internal_draft'
  | 'pending_internal_review'
  | 'pending_revisions'
  | 'sent_to_counterparty'
  | 'awaiting_counterparty_response'
  | 'approved';

export type ReviewAction =
  | 'request_review'
  | 'request_revisions'
  | 'approve'
  | 'comment'
  | 'send_external';

export interface StatusConfig {
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

/**
 * Get display configuration for a draft status.
 */
export function getStatusConfig(status: DraftStatus): StatusConfig {
  const configs: Record<DraftStatus, StatusConfig> = {
    internal_draft: {
      label: 'Internal Draft',
      description: 'Working copy, not yet submitted for review',
      color: '#6B6B63',
      bgColor: '#F5F3EE',
    },
    pending_internal_review: {
      label: 'Pending Review',
      description: 'Awaiting internal approval',
      color: '#D4A017',
      bgColor: 'rgba(212, 160, 23, 0.08)',
    },
    pending_revisions: {
      label: 'Pending Revisions',
      description: 'Changes requested, needs updates',
      color: '#C0392B',
      bgColor: 'rgba(192, 57, 43, 0.08)',
    },
    sent_to_counterparty: {
      label: 'Sent to Counterparty',
      description: 'Shared with external party',
      color: '#4A7C59',
      bgColor: 'rgba(74, 124, 89, 0.08)',
    },
    awaiting_counterparty_response: {
      label: 'Awaiting Response',
      description: 'Waiting for counterparty feedback',
      color: '#D4A017',
      bgColor: 'rgba(212, 160, 23, 0.08)',
    },
    approved: {
      label: 'Approved',
      description: 'Internally approved, ready to send',
      color: '#4A7C59',
      bgColor: 'rgba(74, 124, 89, 0.08)',
    },
  };

  return configs[status];
}

/**
 * Get human-readable action label.
 */
export function getActionLabel(action: ReviewAction): string {
  const labels: Record<ReviewAction, string> = {
    request_review: 'Requested Review',
    request_revisions: 'Requested Revisions',
    approve: 'Approved',
    comment: 'Commented',
    send_external: 'Sent to Counterparty',
  };
  return labels[action];
}

/**
 * Get available actions for current status (client-side hint only - server validates).
 */
export function getAvailableActions(
  status: DraftStatus,
  isAssignedReviewer: boolean
): ReviewAction[] {
  // Anyone can comment
  const actions: ReviewAction[] = ['comment'];

  switch (status) {
    case 'internal_draft':
      actions.push('request_review', 'send_external');
      break;

    case 'pending_internal_review':
      if (isAssignedReviewer) {
        actions.push('approve', 'request_revisions');
      }
      break;

    case 'pending_revisions':
      actions.push('request_review'); // Resubmit
      break;

    case 'approved':
      actions.push('send_external', 'request_review'); // Send or reopen
      break;

    case 'sent_to_counterparty':
    case 'awaiting_counterparty_response':
      // Can only comment or bring back to draft (via UI)
      break;
  }

  return actions;
}

/**
 * Check if a status transition is valid (client-side hint).
 * Server always has final say.
 */
export function isValidTransition(from: DraftStatus, to: DraftStatus): boolean {
  const validTransitions: Record<DraftStatus, DraftStatus[]> = {
    internal_draft: ['pending_internal_review', 'sent_to_counterparty'],
    pending_internal_review: ['pending_revisions', 'approved', 'internal_draft'],
    pending_revisions: ['pending_internal_review', 'internal_draft'],
    approved: ['sent_to_counterparty', 'internal_draft'],
    sent_to_counterparty: ['awaiting_counterparty_response', 'internal_draft'],
    awaiting_counterparty_response: ['internal_draft', 'approved'],
  };

  return validTransitions[from]?.includes(to) ?? false;
}

/**
 * Get help text for an action.
 */
export function getActionHelpText(action: ReviewAction): string {
  const helpTexts: Record<ReviewAction, string> = {
    request_review:
      'Assign this draft to someone for approval. Enter their email address.',
    request_revisions:
      'Send this draft back for changes. Enter the email of the person who should make revisions.',
    approve:
      'Mark this draft as approved. It can then be sent to the counterparty.',
    comment:
      'Add a note or discussion point without changing the workflow status.',
    send_external:
      'Send this draft to the counterparty. Enter their contact details. Draft must be approved first.',
  };
  return helpTexts[action];
}
