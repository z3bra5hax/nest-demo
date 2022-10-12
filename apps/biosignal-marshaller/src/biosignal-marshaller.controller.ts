import { Controller, Get } from '@nestjs/common';
import { BiosignalMarshallerService } from './biosignal-marshaller.service';

@Controller()
export class BiosignalMarshallerController {
  constructor(private readonly biosignalMarshallerService: BiosignalMarshallerService) {}

  @Get()
  getHello(): string {
    return this.biosignalMarshallerService.getHello();
  }
}
