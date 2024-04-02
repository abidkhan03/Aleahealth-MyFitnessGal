import { Test, TestingModule } from '@nestjs/testing';
import { AccountabilityController } from './accountability.controller';
import { AccountabilityService } from './accountability.service';

describe('AccountabilityController', () => {
  let controller: AccountabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountabilityController],
      providers: [AccountabilityService],
    }).compile();

    controller = module.get<AccountabilityController>(AccountabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
