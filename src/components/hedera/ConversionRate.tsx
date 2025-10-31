"use client";

import { useState, useEffect } from "react";

interface ConversionRateProps {
    fromCurrency: string;
    toCurrency: string;
    className?: string;
}

/**
 * Display real-time conversion rate between currencies
 * For hackathon: Shows Hedera-based rates
 */
export function ConversionRate({ fromCurrency, toCurrency, className = "" }: ConversionRateProps) {
    const [rate, setRate] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRate() {
            setLoading(true);
            try {
                // For hackathon demo: Use static rates
                // In production: Fetch from price API (CoinGecko, SaucerSwap, etc.)
                const rates: { [key: string]: number } = {
                    'HBAR-USD': 0.052, // 1 HBAR = $0.052
                    'USD-HBAR': 19.23, // 1 USD = 19.23 HBAR
                    'BPUSD-HBAR': 19.23, // 1 BPUSD = 19.23 HBAR
                    'HBAR-BPUSD': 0.052, // 1 HBAR = 0.052 BPUSD
                    'USDC-HBAR': 19.23,
                    'HBAR-USDC': 0.052,
                };

                const key = `${fromCurrency}-${toCurrency}`;
                const reverseKey = `${toCurrency}-${fromCurrency}`;

                if (rates[key]) {
                    setRate(rates[key]);
                } else if (rates[reverseKey]) {
                    setRate(1 / rates[reverseKey]);
                } else {
                    setRate(1); // Same currency
                }
            } catch (error) {
                console.error('Error fetching rate:', error);
                setRate(null);
            } finally {
                setLoading(false);
            }
        }

        fetchRate();
    }, [fromCurrency, toCurrency]);

    if (loading) {
        return (
            <div className={`text-sm text-gray-500 animate-pulse ${className}`}>
                Loading rate...
            </div>
        );
    }

    if (!rate) {
        return null;
    }

    return (
        <div className={`text-sm text-gray-700 ${className}`}>
            <span className="font-medium">Exchange Rate:</span>{' '}
            <span className="font-mono">
                1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
            </span>
        </div>
    );
}

interface ConversionCalculatorProps {
    amount: string;
    fromCurrency: string;
    toCurrency: string;
}

/**
 * Calculate and display converted amount
 */
export function ConversionCalculator({ amount, fromCurrency, toCurrency }: ConversionCalculatorProps) {
    const [convertedAmount, setConvertedAmount] = useState<string>('0.00');

    useEffect(() => {
        if (!amount || isNaN(parseFloat(amount))) {
            setConvertedAmount('0.00');
            return;
        }

        // Simple conversion rates (for hackathon demo)
        const rates: { [key: string]: number } = {
            'HBAR-USD': 0.052,
            'USD-HBAR': 19.23,
            'BPUSD-HBAR': 19.23,
            'HBAR-BPUSD': 0.052,
            'USDC-HBAR': 19.23,
            'HBAR-USDC': 0.052,
        };

        const key = `${fromCurrency}-${toCurrency}`;
        const rate = rates[key] || 1;
        const result = parseFloat(amount) * rate;

        setConvertedAmount(result.toFixed(4));
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className="text-lg font-semibold text-gray-900">
            ≈ {convertedAmount} {toCurrency}
        </div>
    );
}
