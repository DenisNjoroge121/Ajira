import type { ViteDevServer } from 'vite';

/**
 * Vite middleware to add security headers to all responses
 * Prevents common web vulnerabilities (XSS, clickjacking, etc.)
 */
export function securityHeadersMiddleware() {
  return (req: any, res: any, next: () => void) => {
    // Content Security Policy - restricts content sources
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; " +
      "script-src 'self' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https://myhtugexrcxmkiwtpxwp.supabase.co; " +
      "frame-ancestors 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self'"
    );

    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Prevent clickjacking attacks
    res.setHeader('X-Frame-Options', 'DENY');

    // Enable XSS protection in legacy browsers
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Referrer policy - limit referrer information
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Feature policy - disable dangerous features
    res.setHeader(
      'Permissions-Policy',
      'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
    );

    // Strict Transport Security (enable after HTTPS is confirmed)
    // res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    next();
  };
}
