// Currency detection and conversion utilities

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  conversionRate: number; // Rate from USD
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    conversionRate: 1,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    conversionRate: 0.92,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    conversionRate: 0.79,
  },
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    conversionRate: 1550,
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    conversionRate: 3.67,
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    conversionRate: 1.36,
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    conversionRate: 1.52,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    conversionRate: 83,
  },
};

// Map countries to currencies
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD',
  GB: 'GBP',
  NG: 'NGN',
  AE: 'AED',
  CA: 'CAD',
  AU: 'AUD',
  IN: 'INR',
  // EU countries
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  IE: 'EUR',
  GR: 'EUR',
  FI: 'EUR',
};

export interface LocationData {
  country: string;
  currency: string;
  ip: string;
}

/**
 * Detect user's currency based on IP geolocation
 * Falls back to USD if detection fails
 */
export async function detectCurrencyFromIP(): Promise<string> {
  try {
    // Try multiple geolocation services (free tier)
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3000), // 3s timeout
    });

    if (!response.ok) {
      console.warn('IP geolocation failed, using USD');
      return 'USD';
    }

    const data = await response.json();
    const countryCode = data.country_code || data.country;

    if (!countryCode) {
      return 'USD';
    }

    // Map country to currency
    const currency = COUNTRY_TO_CURRENCY[countryCode] || 'USD';

    // Verify we support this currency
    if (!SUPPORTED_CURRENCIES[currency]) {
      return 'USD';
    }

    console.log(`Detected currency: ${currency} (${countryCode})`);
    return currency;
  } catch (error) {
    console.warn('Currency detection failed:', error);
    return 'USD';
  }
}

/**
 * Convert USD amount to target currency
 */
export function convertCurrency(
  amountUSD: number,
  targetCurrency: string
): number {
  const config = SUPPORTED_CURRENCIES[targetCurrency];
  if (!config) {
    console.warn(`Unsupported currency: ${targetCurrency}, using USD`);
    return amountUSD;
  }

  return amountUSD * config.conversionRate;
}

/**
 * Format amount with currency symbol
 */
export function formatCurrency(
  amountUSD: number,
  currency: string,
  options: {
    compact?: boolean; // $2K instead of $2,000
    decimals?: number;
  } = {}
): string {
  const config = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.USD;
  const amount = convertCurrency(amountUSD, currency);

  const { compact = false, decimals = 0 } = options;

  if (compact && amount >= 1000) {
    // Format as K/M/B
    if (amount >= 1000000000) {
      return `${config.symbol}${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `${config.symbol}${(amount / 1000000).toFixed(1)}M`;
    } else {
      return `${config.symbol}${(amount / 1000).toFixed(1)}K`;
    }
  }

  // Standard formatting with thousands separator
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${config.symbol}${formatted}`;
}

/**
 * Get currency config
 */
export function getCurrencyConfig(currency: string): CurrencyConfig {
  return SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.USD;
}
