import { Test, TestingModule } from '@nestjs/testing';
import { CareReceiversService } from './care-receivers.service';

describe('CareReceiversService', () => {
  let service: CareReceiversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareReceiversService],
    }).compile();

    service = module.get<CareReceiversService>(CareReceiversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
