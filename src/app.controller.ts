import { KewaGuardService } from '@app/kewa-guard';
import { KewaRateLimit } from '@app/kewa-guard/decorators/kewa-rate-limit.decorator';
import { KewaRateLimitGuard } from '@app/kewa-guard/guards/kewa-rate-limit.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly redisService: KewaGuardService) {}

  @Get()
  @UseGuards(KewaRateLimitGuard)
  @KewaRateLimit({ limit: 3, ttl: 10 })
  async getHello() {
    const pong = await this.redisService.ping();
    return { status: 'Redis Online', response: pong };
  }
}
