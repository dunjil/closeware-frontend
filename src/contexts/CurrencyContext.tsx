'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  detectCurrencyFromIP,
  formatCurrency as formatCurrencyUtil,
  getCurrencyConfig,
  SUPPORTED_CURRENCIES,
  type CurrencyConfig,
} from '@/lib/currency';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatCurrency: (
    amountUSD: number,
    options?: { compact?: boolean; decimals?: number }
  ) => string;
  config: CurrencyConfig;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<string>('USD');
  const [isLoading, setIsLoading] = useState(true);

  // Detect currency on mount
  useEffect(() => {
    async function detectCurrency() {
      try {
        // Check localStorage first
        const stored = localStorage.getItem('closeware_currency');
        if (stored && SUPPORTED_CURRENCIES[stored]) {
          setCurrencyState(stored);
          setIsLoading(false);
          return;
        }

        // Detect from IP
        const detected = await detectCurrencyFromIP();
        setCurrencyState(detected);
        localStorage.setItem('closeware_currency', detected);
      } catch (error) {
        console.warn('Currency detection failed:', error);
        setCurrencyState('USD');
      } finally {
        setIsLoading(false);
      }
    }

    detectCurrency();
  }, []);

  const setCurrency = (newCurrency: string) => {
    if (SUPPORTED_CURRENCIES[newCurrency]) {
      setCurrencyState(newCurrency);
      localStorage.setItem('closeware_currency', newCurrency);
    } else {
      console.warn(`Unsupported currency: ${newCurrency}`);
    }
  };

  const formatCurrency = (
    amountUSD: number,
    options?: { compact?: boolean; decimals?: number }
  ) => {
    return formatCurrencyUtil(amountUSD, currency, options);
  };

  const config = getCurrencyConfig(currency);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatCurrency,
        config,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
