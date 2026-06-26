export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return 'Email is required';
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return 'Invalid email format';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (password.length > 72) return 'Password must be less than 72 characters';
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return null;
}

export function validateMaxLength(value: string, maxLength: number, fieldName: string): string | null {
  if (value && value.length > maxLength) {
    return `${fieldName} must be less than ${maxLength} characters`;
  }
  return null;
}

export function validatePrice(value: string): string | null {
  if (!value) return null; // Price is optional
  const num = parseFloat(value);
  if (isNaN(num)) return 'Price must be a valid number';
  if (num < 0) return 'Price cannot be negative';
  return null;
}

export function validateFileSize(file: File, maxSizeMB: number = 10): string | null {
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return `File size must be less than ${maxSizeMB}MB`;
  }
  return null;
}

export function validateFileType(file: File): string | null {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/jpg'
  ];

  if (!allowedTypes.includes(file.type)) {
    return 'File type not allowed. Accepted: PDF, Word, Images';
  }

  // Check dangerous extensions
  const dangerousExtensions = ['.exe', '.sh', '.bat', '.cmd', '.com', '.scr'];
  if (dangerousExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
    return 'File type not allowed for security reasons';
  }

  return null;
}
