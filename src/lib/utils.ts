import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPriceString(prices: string): string {
  if (!isValidFormat(prices)){
    return prices;
  }
  const parts = prices.split(",").map(p => p.trim());

  const formattedParts = parts.map(part => {
    const [symbol, rawStr] = part.split(":").map(p => p.trim());
    const raw = BigInt(rawStr);

    const value = Number(raw) / 1e8;

    const formatted = value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `${symbol}: ${formatted}`;
  });

  return formattedParts.join(", ");

}

function isValidFormat(message: string): boolean {
  const regex = /^BTC:\s*\d+,\s*ETH:\s*\d+,\s*USDC:\s*\d+$/;
  return regex.test(message.trim());
}

console.log(formatPriceString("BTC: 11683329101346, ETH: 452517953600, USDC: 99975343"))
console.log(isValidFormat("BTC: 11683329101346, ETH: 452517953600, USDC: 99975343"))
