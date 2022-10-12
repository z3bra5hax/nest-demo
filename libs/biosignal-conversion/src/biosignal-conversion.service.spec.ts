import { Test, TestingModule } from '@nestjs/testing';
import { BiosignalConversionService } from './biosignal-conversion.service';

describe('BiosignalConversionService', () => {
  let service: BiosignalConversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiosignalConversionService],
    }).compile();

    service = module.get<BiosignalConversionService>(BiosignalConversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
