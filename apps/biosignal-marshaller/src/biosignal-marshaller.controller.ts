import { RawSignal } from '@nestdemo/biosignal-conversion';
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BiosignalMarshallerService } from './biosignal-marshaller.service';

@Controller()
export class BiosignalMarshallerController {
  constructor(private readonly biosignalMarshallerService: BiosignalMarshallerService) {}

  @MessagePattern('biosignal-data')
  async processRawSignal(@Payload() signal: RawSignal): Promise<void> {
    this.biosignalMarshallerService.processRawSignal(signal);
  }
}
