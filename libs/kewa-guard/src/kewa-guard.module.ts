import { DynamicModule, Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { KEWA_REDIS_CLIENT } from './constants';
import { KewaGuardService } from './kewa-guard.service';
import { KewaGuardOptions } from './interfaces/kewa-options.interface';

@Global()
@Module({})
export class KewaGuardModule {
  static register(options: KewaGuardOptions): DynamicModule {
    return {
      module: KewaGuardModule,
      providers: [
        {
          provide: KEWA_REDIS_CLIENT,
          useFactory: () => {
            return new Redis({
              host: options.host,
              port: options.port,
              password: options.password,
            });
          },
        },
        KewaGuardService,
      ],
      exports: [KewaGuardService],
    };
  }
}
