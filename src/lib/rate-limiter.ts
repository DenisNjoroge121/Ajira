/**
 * Client-side rate limiting for authentication attempts
 * Prevents brute force attacks on login
 */

interface RateLimitEntry {
  attempts: number;
  resetTime: number;
}

class RateLimiter {
  private attempts: Map<string, RateLimitEntry> = new Map();
  private maxAttempts: number;
  private windowMs: number; // Time window in milliseconds

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    // 5 attempts per 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;

    // Clean up old entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if a request should be allowed
   * @param key - Identifier (e.g., email address)
   * @returns true if request is allowed, false if rate limited
   */
  public isAllowed(key: string): boolean {
    const now = Date.now();
    const entry = this.attempts.get(key);

    if (!entry) {
      // First attempt
      this.attempts.set(key, {
        attempts: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (now > entry.resetTime) {
      // Time window expired, reset
      this.attempts.set(key, {
        attempts: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    // Check if under limit
    if (entry.attempts < this.maxAttempts) {
      entry.attempts++;
      return true;
    }

    // Rate limit exceeded
    return false;
  }

  /**
   * Get time until next allowed attempt
   * @param key - Identifier (e.g., email address)
   * @returns milliseconds until reset, or 0 if allowed
   */
  public getResetTime(key: string): number {
    const entry = this.attempts.get(key);
    if (!entry) return 0;

    const now = Date.now();
    const timeLeft = entry.resetTime - now;
    return timeLeft > 0 ? timeLeft : 0;
  }

  /**
   * Get remaining attempts
   * @param key - Identifier
   * @returns number of remaining attempts
   */
  public getRemaining(key: string): number {
    const entry = this.attempts.get(key);
    if (!entry) return this.maxAttempts;

    const now = Date.now();
    if (now > entry.resetTime) {
      return this.maxAttempts;
    }

    return Math.max(0, this.maxAttempts - entry.attempts);
  }

  /**
   * Reset rate limit for a key
   * @param key - Identifier
   */
  public reset(key: string): void {
    this.attempts.delete(key);
  }

  /**
   * Clear all rate limit entries
   */
  public clear(): void {
    this.attempts.clear();
  }

  /**
   * Remove expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.attempts.entries()) {
      if (now > entry.resetTime) {
        this.attempts.delete(key);
      }
    }
  }
}

// Export singleton instance
export const authRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
export const formRateLimiter = new RateLimiter(10, 60 * 1000); // 10 submissions per minute
