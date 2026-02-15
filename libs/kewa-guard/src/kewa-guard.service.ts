import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { KEWA_REDIS_CLIENT } from './constants';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

@Injectable()
export class KewaGuardService implements OnModuleDestroy {
  constructor(@Inject(KEWA_REDIS_CLIENT) private readonly redis: Redis) {}

  onModuleDestroy() {
    this.redis.disconnect();
  }

  async checkLimit(
    key: string,
    limit: number,
    ttlSeconds: number,
  ): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = now - ttlSeconds * 1000;

    const luaScript = `
      local key = KEYS[1]
      local limit = tonumber(ARGV[1])
      local now = tonumber(ARGV[2])
      local windowStart = tonumber(ARGV[3])
      local ttl = tonumber(ARGV[4])

      redis.call('ZREMRANGEBYSCORE', key, 0, windowStart)

      local currentCount = redis.call('ZCARD', key)

      local allowed = 1
      local remaining = 0

      if currentCount >= limit then
        allowed = 0
        remaining = 0
      else
        redis.call('ZADD', key, now, now)
        redis.call('EXPIRE', key, ttl)
        allowed = 1
        remaining = limit - (currentCount + 1)
      end

      local resetAt = math.floor((now + (ttl * 1000)) / 1000)
      
      return { allowed, remaining, resetAt }
    `;

    const result = (await this.redis.eval(
      luaScript,
      1,
      key,
      limit,
      now,
      windowStart,
      ttlSeconds,
    )) as [number, number, number];

    return {
      allowed: result[0] === 1,
      remaining: result[1],
      resetAt: result[2],
    };
  }

  async ping() {
    return await this.redis.ping();
  }

  getClient() {
    return this.redis;
  }
}
