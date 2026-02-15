import { Test, TestingModule } from '@nestjs/testing';
import { KewaGuardService } from './kewa-guard.service';

describe('KewaGuardService', () => {
  let service: KewaGuardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KewaGuardService],
    }).compile();

    service = module.get<KewaGuardService>(KewaGuardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
