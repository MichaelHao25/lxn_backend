import { Test, TestingModule } from '@nestjs/testing';
import { VvtoolController } from './vvtool.controller';
import { VvtoolService } from './vvtool.service';

describe('VvtoolController', () => {
  let controller: VvtoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VvtoolController],
      providers: [VvtoolService],
    }).compile();

    controller = module.get<VvtoolController>(VvtoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
