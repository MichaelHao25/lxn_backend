import { Test, TestingModule } from '@nestjs/testing';
import { VvtoolService } from './vvtool.service';

describe('VvtoolService', () => {
  let service: VvtoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VvtoolService],
    }).compile();

    service = module.get<VvtoolService>(VvtoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
