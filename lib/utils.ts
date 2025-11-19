import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date consistently between server and client to avoid hydration mismatches.
 * Uses UTC to ensure same output regardless of server/client timezone.
 */
export function formatDate(dateString: string, format: 'long' | 'short' = 'long'): string {
  const date = new Date(dateString);
  
  const months = format === 'long' 
    ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  
  return `${month} ${day}, ${year}`;
}

