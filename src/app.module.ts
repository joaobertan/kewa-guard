import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KewaGuardModule } from '@app/kewa-guard';

@Module({
  imports: [
    KewaGuardModule.register({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6374,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
