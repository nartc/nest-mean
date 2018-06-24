import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategyService } from './jwt-strategy.service';

describe('JwtStrategyService', () => {
  let service: JwtStrategyService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategyService],
    }).compile();
    service = module.get<JwtStrategyService>(JwtStrategyService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
