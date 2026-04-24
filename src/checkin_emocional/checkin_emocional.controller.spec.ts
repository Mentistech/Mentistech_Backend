import { Test, TestingModule } from '@nestjs/testing';
import { CheckinEmocionalController } from './checkin_emocional.controller';
import { CheckinEmocionalService } from './checkin_emocional.service';

describe('CheckinEmocionalController', () => {
  let controller: CheckinEmocionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckinEmocionalController],
      providers: [CheckinEmocionalService],
    }).compile();

    controller = module.get<CheckinEmocionalController>(
      CheckinEmocionalController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
