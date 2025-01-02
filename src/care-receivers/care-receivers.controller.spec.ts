import { Test, TestingModule } from '@nestjs/testing';
import { CareReceiversController } from './care-receivers.controller';
import { CareReceiversService } from './care-receivers.service';

describe('CareReceiversController', () => {
  let controller: CareReceiversController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareReceiversController],
      providers: [CareReceiversService],
    }).compile();

    controller = module.get<CareReceiversController>(CareReceiversController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
