/**
 * Development-only logging utility
 * Prevents detailed error information from being exposed in production browser console
 */

const isDev = import.meta.env.DEV;

/**
 * Log errors only in development mode
 * In production, errors are silently swallowed to prevent information leakage
 */
export const logError = (message: string, error?: unknown): void => {
  if (isDev) {
    console.error(message, error);
  }
  // In production, you could optionally send to an error tracking service
};

/**
 * Log warnings only in development mode
 */
export const logWarn = (message: string, data?: unknown): void => {
  if (isDev) {
    console.warn(message, data);
  }
};

/**
 * Log info only in development mode
 */
export const logInfo = (message: string, data?: unknown): void => {
  if (isDev) {
    console.log(message, data);
  }
};
