import { Test, TestingModule } from '@nestjs/testing';
import { BiosignalMarshallerController } from './biosignal-marshaller.controller';
import { BiosignalMarshallerService } from './biosignal-marshaller.service';

describe('BiosignalMarshallerController', () => {
  let biosignalMarshallerController: BiosignalMarshallerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BiosignalMarshallerController],
      providers: [BiosignalMarshallerService],
    }).compile();

    biosignalMarshallerController = app.get<BiosignalMarshallerController>(BiosignalMarshallerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(biosignalMarshallerController.getHello()).toBe('Hello World!');
    });
  });
});
