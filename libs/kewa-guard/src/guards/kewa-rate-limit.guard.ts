import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import {
  KEWA_RATE_LIMIT_KEY,
  KewaRateLimitOptions,
} from '../decorators/kewa-rate-limit.decorator';
import { KewaGuardService } from '../kewa-guard.service';

@Injectable()
export class KewaRateLimitGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private kewaGuardService: KewaGuardService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<KewaRateLimitOptions>(
      KEWA_RATE_LIMIT_KEY,
      context.getHandler(),
    );

    if (!options) {
      return true;
    }

    const { limit, ttl } = options;

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const ip = request.ip || request.connection.remoteAddress;

    const key = `rate_limit:${ip}:${context.getClass().name}.${context.getHandler().name}`;

    const { allowed, remaining, resetAt } =
      await this.kewaGuardService.checkLimit(key, limit, ttl);

    response.header('X-RateLimit-Limit', limit.toString());
    response.header('X-RateLimit-Remaining', remaining.toString());
    response.header('X-RateLimit-Reset', resetAt.toString());

    if (!allowed) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          error: 'Too Many Requests',
          message: `Você excedeu o limite de ${limit} requisições em ${ttl} segundos.`,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
