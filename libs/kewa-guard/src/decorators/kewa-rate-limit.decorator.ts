import { SetMetadata } from '@nestjs/common';

export const KEWA_RATE_LIMIT_KEY = 'kewa_rate_limit_key';

export interface KewaRateLimitOptions {
  limit: number;
  ttl: number;
}

export const KewaRateLimit = (options: KewaRateLimitOptions) =>
  SetMetadata(KEWA_RATE_LIMIT_KEY, options);
