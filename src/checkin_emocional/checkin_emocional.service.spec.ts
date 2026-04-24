import { Test, TestingModule } from '@nestjs/testing';
import { CheckinEmocionalService } from './checkin_emocional.service';

describe('CheckinEmocionalService', () => {
  let service: CheckinEmocionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckinEmocionalService],
    }).compile();

    service = module.get<CheckinEmocionalService>(CheckinEmocionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
